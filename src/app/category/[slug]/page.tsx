import { notFound } from 'next/navigation'
import { getPostsByCategory, POSTS_PER_PAGE } from '@/lib/posts'
import { getAllCategories, getCategoryBySlug } from '@/lib/categories'
import PostList from '@/components/postlist'

type Props = {
  params: Promise<{ slug: string }>
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

// ビルド時に全カテゴリーのパスを生成
export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((cat) => ({
    slug: cat.slug,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) {
    notFound()
  }
  // カテゴリーに属する全記事を取得
  const allPosts = getPostsByCategory(slug)
  // ページネーション計算
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  // １ページ目の分だけ取り出す
  const posts = allPosts.slice(0, POSTS_PER_PAGE)
  const title = `${category.name} の記事一覧`
  return (
    <PostList
      posts={posts}
      title={title}
      currentPage={1}
      totalPages={totalPages}
      basePath={`/category/${slug}`}
    />
  )
}
