import { notFound } from 'next/navigation'
import { getAllUniqueTags, getPostsByTag, POSTS_PER_PAGE } from '@/lib/posts'
import PostList from '@/components/postlist'

type Props = {
  params: Promise<{ tag: string; current: string }>
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

// SSG: 全タグ * ページ数分パスを生成
export async function generateStaticParams() {
  const tags = getAllUniqueTags()
  const paths = []

  for (const tag of tags) {
    const posts = getPostsByTag(tag)
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

    // 2ページ目から生成
    for (let i = 2; i <= totalPages; i++) {
      paths.push({
        tag: tag,
        current: i.toString(),
      })
    }
  }
  return paths
}

export default async function TagPagedPage({ params }: Props) {
  const { tag, current } = await params
  const decodedTag = decodeURIComponent(tag)
  const currentPage = parseInt(current, 10)

  const allPosts = getPostsByTag(decodedTag)
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  // 範囲外のページ番号なら404
  if (isNaN(currentPage) || currentPage < 2 || currentPage > totalPages) {
    notFound()
  }

  // 該当ページの分だけ切り出し
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const posts = allPosts.slice(startIndex, endIndex)
  const title = `${decodedTag} の記事一覧`

  return (
    <PostList
      posts={posts}
      title={title}
      currentPage={currentPage}
      totalPages={totalPages}
      basePath={`/tag/${tag}`}
    />
  )
}
