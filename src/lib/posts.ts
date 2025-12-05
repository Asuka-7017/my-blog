import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Category, getAllCategories, getCategoryBySlug } from '@/lib/categories'

// 記事ファイルの格納場所
const postsDirectory = path.join(process.cwd(), '_posts')

export type Post = {
  slug: string
  category: Category
  frontmatter: {
    title: string
    date: string
    tags?: string[]
    thumbnail?: string
  }
  content: string // MDXの本文
}

// ディレクトリがない場合にエラーにならないよう確認
if (!fs.existsSync(postsDirectory)) {
  fs.readdirSync(postsDirectory, { recursive: true })
}

// すべての記事を取得し、日付の新しい順で返す
// 記事一覧用
export function getAllPosts(): Post[] {
  const categoryData = getAllCategories()
  const allPosts = categoryData.map((categoryData: Category) => {
    const folderPath = path.join(postsDirectory, categoryData.slug)
    const mdxFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith('.mdx'))

    return mdxFiles.map((file) => {
      const fullPath = path.join(folderPath, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const slug = file.replace(/\.mdx$/, '')
      const category: Category = getCategoryBySlug(categoryData.slug)
      // gray-matterでメタデータを解析
      const { data, content } = matter(fileContents)
      return {
        slug,
        category,
        frontmatter: data as Post['frontmatter'],
        content,
      }
    })
  })

  return allPosts
    .flat()
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

// 特定の記事を取得
// 詳細ページ用
export function getPostBySlug(categorySlug: string, slug: string): Post | null {
  try {
    const category = getCategoryBySlug(categorySlug)
    const fullPath = path.join(postsDirectory, `${categorySlug}`, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      slug,
      category,
      frontmatter: data as Post['frontmatter'],
      content,
    }
  } catch (error) {
    return null
  }
}

// 特定のカテゴリーに属する記事のみを取得
export function getPostsByCategory(categorySlug: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category.slug === categorySlug)
}

// すべての記事から重複のないタグ一覧を取得
export function getAllUniqueTags(): string[] {
  const allPosts = getAllPosts()
  let tags: string[] = []
  allPosts.forEach((post) => {
    tags = post.frontmatter.tags ? tags.concat(post.frontmatter.tags) : []
  })
  const sortedTags = tags.sort((a, b) => {
    return a.localeCompare(b, 'ja')
  })
  return [...new Set(sortedTags)]
}

// タグ名を含む記事を取得する
export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(
    (post) => post.frontmatter.tags && post.frontmatter.tags.includes(tag)
  )
}

// 1ページ当たりの記事数
export const POSTS_PER_PAGE = 6

// ページ番号に応じた記事を取得
export function getPostsByPage(page: number): Post[] {
  const allPosts = getAllPosts()
  const startIndex = (page - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  return allPosts.slice(startIndex, endIndex)
}

// 全体のページ数を計算
export function getTotalPages(): number {
  const allPosts = getAllPosts()
  return Math.ceil(allPosts.length / POSTS_PER_PAGE)
}
