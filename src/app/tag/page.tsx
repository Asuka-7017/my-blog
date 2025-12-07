import Link from 'next/link'
import { getAllUniqueTags, getPostsByTag } from '@/lib/posts'

export const metadata = {
  title: 'タグ一覧',
  description: 'ブログ内のすべてのタグ一覧です。',
}

export default function TagIndexPage() {
  const tags = getAllUniqueTags()
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">タグ一覧</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => {
          const count = getPostsByTag(tag).length
          return (
            <Link
              key={tag}
              href={`/tag/${tag}/`}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition flex item-center gap-2"
            >
              <span>#{tag}</span>
              <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-gray-500">
                {count}
              </span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
