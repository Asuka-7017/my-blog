import { notFound } from 'next/navigation'
import { getAllUniqueTags, getPostsByTag, POSTS_PER_PAGE } from '@/lib/posts'
import PostList from '@/components/postlist'

type Props = {
  params: Promise<{ tag: string }>
}

// メタデータ生成
export async function generateMetadata({ params }: Props) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  return {
    title: `${decodedTag} の記事一覧`,
    description: `${decodedTag} タグが付いた記事のまとめです。`,
  }
}

// ビルド時に全タグのパスを生成
export async function generateStaticParams() {
  const tags = getAllUniqueTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag) // URLエンコードされた文字を戻す
  // タグを持つ全記事を取得
  const allPosts = getPostsByTag(decodedTag)
  // ページネーション計算
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  // １ページ目の分だけ取り出す
  const posts = allPosts.slice(0, POSTS_PER_PAGE)
  if (posts.length === 0) {
    notFound()
  }
  const title = `${decodedTag} の記事一覧`
  return (
    <PostList
      posts={posts}
      title={title}
      currentPage={1}
      totalPages={totalPages}
      basePath={`/tag/${tag}`} // URLエンコードされたままのタグを渡す
    />
  )
}
