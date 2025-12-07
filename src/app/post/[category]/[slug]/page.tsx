import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { WEBSITE_NAME } from '@/lib/getEnvVar'
import PostPage from '@/components/pages/postpage'

type Props = {
  params: Promise<{
    // Next.js v15からはparamsはPromise型
    category: string
    slug: string
  }>
}

// SSGのためのパス生成
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    category: post.category.slug,
    slug: post.slug,
  }))
}

// メタデータ生成
export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params
  const post = getPostBySlug(category, slug)
  if (!post) return

  let ogImageUrl = `/image/ogp.png`
  if (post.frontmatter.thumbnail) {
    // サムネイル指定あり
    ogImageUrl = `/image/${post.frontmatter.thumbnail}`
  } else {
    // サムネイル指定なし
    const searchParams = new URLSearchParams()
    searchParams.set('title', post.frontmatter.title)
    ogImageUrl = `/api/og?${searchParams.toString()}`
  }

  if (post) {
    const postDescription = post.content
      ? post.content
          .replace(/(^#+\s)|(\s#+$)/gm, '') // ヘッダータグ
          .replace(/\[([^\]]+)\]\([^\)]+\)/gm, '$1') // リンク
          .replace(/!\[[^\]]*\]\([^\)]+\)/gm, '') // 画像
          .replace(/(?:^|\n)(?:-|\d+\.)\s+/gm, '') // リスト
          .replace(/`[^`]+`/gm, '') // インラインコード
          .replace(/(?:^|\n)```[\s\S]*?```/gm, '') // 複数行のコードブロック
          .replace(/\n/g, '') // 改行文字
          .substring(0, 100)
      : ''
    return {
      title: post.frontmatter.title,
      description: postDescription,
      openGraph: {
        title: post.frontmatter.title,
        description: postDescription,
        url: `/post/${post.category.slug}/${post.slug}`,
        siteName: `${WEBSITE_NAME}`,
        images: {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
        locale: 'ja_JP',
        type: 'article',
      },
    }
  }
  return {}
}

export default async function BlogPost({ params }: Props) {
  const { category, slug } = await params
  const post = getPostBySlug(category, slug)
  if (!post) notFound()
  return <PostPage post={post} />
}
