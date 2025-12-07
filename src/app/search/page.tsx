import { getAllPosts, POSTS_PER_PAGE } from '@/lib/posts'
import Fuse from 'fuse.js'
import PostList from '@/components/postlist'

type Props = {
  searchParams: Promise<{ q?: string; p?: string }>
}

// メタデータ生成
export async function generateMetadata({ searchParams }: Props) {
  const { q, p } = await searchParams
  const query = q || ''
  return {
    title: `${query} の検索結果`,
    description: `${query} の記事の検索結果一覧です。`,
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, p } = await searchParams
  const query = q || ''
  const currentPage = p ? parseInt(p, 10) : 1
  // 全記事を取得
  const allPosts = getAllPosts()
  let results = allPosts
  // クエリがある場合のみ検索を実行
  if (query) {
    const fuse = new Fuse(allPosts, {
      keys: [`frontmatter.title`, 'frontmatter.tags', 'content'],
      threshold: 0.3, // あいまい検索の感度
    })
    results = fuse.search(query).map((result) => result.item)
  } else {
    // クエリがない場合は結果を空にする
    results = []
  }

  const totalPages = results
    ? Math.ceil(Number(results.length) / POSTS_PER_PAGE)
    : 0

  // 範囲外ページのガード（検索結果0件の場合は無視）
  if (results.length > 0 && (currentPage < 1 || currentPage > totalPages)) {
    // 範囲外なら1ページ目などを表示する、あるいは何もしないなど。
    // ここでは単純に空の結果が表示されるようにslice範囲外になるのでそのままでもエラーにならない。
  }

  // 表示する記事の切り出し
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const displayPosts = results.slice(startIndex, endIndex)

  const title = `${query} の検索結果`

  return (
    <PostList
      posts={displayPosts}
      title={title}
      currentPage={currentPage}
      totalPages={totalPages}
      q={query}
    />
  )
}
