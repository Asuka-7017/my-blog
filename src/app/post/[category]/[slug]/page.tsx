import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { WEBSITE_NAME } from '@/lib/getEnvVar'
import MDXContent from '@/components/mdx-content'

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
  const post = await getPostBySlug(category, slug)
  if (!post) notFound()
  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <header className="mb-10 border-b pb-4">
        <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
        <div className="flex gap-4 text-gray-500">
          <time>{post.frontmatter.date}</time>
          <span>{post.category.name}</span>
        </div>
      </header>
      <MDXContent source={post.content} />
    </article>
  )
}
