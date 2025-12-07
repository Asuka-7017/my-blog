import Link from 'next/link'
import { getAllCategories } from '@/lib/categories'

export const metadata = {
  title: 'カテゴリー一覧',
  description: 'ブログ内のカテゴリー一覧です。',
}

export default function CategoryIndexPage() {
  // yamlからカテゴリー取得
  const categories = getAllCategories()
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">カテゴリー一覧</h1>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => {
          return (
            <Link
              key={category.slug}
              href={`/category/${category.slug}/`}
              className="px-4 py-2 bg-sky-200 hover:bg-sky-300 text-gray-700 flex items-center justify-center rounded"
            >
              {category.name}
            </Link>
          )
        })}
      </div>
    </main>
  )
}
