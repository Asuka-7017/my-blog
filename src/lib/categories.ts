import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export type Category = {
  slug: string
  name: string
}

// カテゴリーファイルの格納場所
const categoriesFile = path.join(process.cwd(), 'meta/categories.yaml')

// すべてのカテゴリーを取得
export function getAllCategories(): Category[] {
  try {
    const fileContents = fs.readFileSync(categoriesFile, 'utf8')
    const data = yaml.load(fileContents) as { categories: Category[] }
    const categories: Category[] = data.categories
    return categories
  } catch (error) {
    console.error('Categories file not found or invalid YAML', error)
    return []
  }
}

const categoryMap: { [key: string]: Category } = generateCategoryMap()

function generateCategoryMap(): { [key: string]: Category } {
  const categories = getAllCategories()
  const result: { [key: string]: Category } = categories.reduce(
    (acc, category) => {
      acc[category.slug] = category
      return acc
    },
    {} as { [key: string]: Category }
  )
  return result
}

// Slugから特定のカテゴリーを取得
export function getCategoryBySlug(slug: string): Category {
  return categoryMap[slug]
}

// Slugからカテゴリー名を取得
export function getCategoryName(slug: string): string {
  const category = getCategoryBySlug(slug)
  return category ? category.name : slug
}
