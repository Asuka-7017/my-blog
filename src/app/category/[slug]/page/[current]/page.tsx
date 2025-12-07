import { notFound } from 'next/navigation'
import { getAllCategories, getCategoryBySlug } from '@/lib/categories'
import { getPostsByCategory, POSTS_PER_PAGE } from '@/lib/posts'
import PostList from '@/components/postlist'

type Props = {
  params: Promise<{ slug: string; current: string }>
}

// メタデータ生成
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return
  return {
    title: `${category.name} の記事一覧`,
    description: `${category.name} に関する記事のまとめです。`,
  }
}

// SSG: 全カテゴリー * ページ数分のパスを生成
export async function generateStaticParams() {
  const categories = getAllCategories()
  const paths = []

  for (const cat of categories) {
    const posts = getPostsByCategory(cat.slug)
    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

    // 2ページ目から生成
    for (let i = 2; i <= totalPages; i++) {
      paths.push({
        slug: cat.slug,
        current: i.toString(),
      })
    }
  }
  return paths
}

export default async function CategoryPagedPage({ params }: Props) {
  const { slug, current } = await params
  const currentPage = parseInt(current, 10)
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const allPosts = getPostsByCategory(slug)
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  // 範囲外のページ番号なら404
  if (isNaN(currentPage) || currentPage < 2 || currentPage > totalPages) {
    notFound()
  }

  // 該当ページの分だけ切り出し
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const posts = allPosts.slice(startIndex, endIndex)
  const title = `${category.name} の記事一覧`

  return (
    <PostList
      posts={posts}
      title={title}
      currentPage={currentPage}
      totalPages={totalPages}
      basePath={`/category/${slug}`}
    />
  )
}
