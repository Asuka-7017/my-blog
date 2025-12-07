import { notFound } from 'next/navigation'
import { getPostsByPage, getTotalPages } from '@/lib/posts'
import PostList from '@/components/postlist'

type Props = {
  params: Promise<{ current: string }>
}

export const metadata = {
  title: 'すべての記事一覧',
  description: 'ブログ内のすべての記事一覧です。',
}

// SSG: 必要なページ数分のパスを生成
export async function generateStaticParams() {
  const totalPages = getTotalPages()
  const paths = []

  // 1ページ目から生成
  for (let i = 1; i <= totalPages; i++) {
    paths.push({
      current: i.toString(),
    })
  }
  return paths
}

export default async function PageList({ params }: Props) {
  const { current } = await params
  const currentPage = parseInt(current, 10)
  const totalPages = getTotalPages()

  // 範囲外のページ番号なら404
  if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    notFound()
  }

  const posts = getPostsByPage(currentPage)
  const title = `すべての記事一覧`

  return (
    <PostList
      posts={posts}
      title={title}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
