'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // URLにすでにクエリがある場合は初期値にする
  const defaultQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(defaultQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    // 検索ページへ遷移
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="relative">
        <label>
          <input
            type="text"
            placeholder="記事を検索"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
            className="pl-4 pr-10 py-2 border rounded text-sm outline-none focus:border-sky-500 w-48 transition-all focus:w-64"
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-sky-200 hover:bg-sky-300 rounded text-gray-700 transition"
        >
          検索
        </button>
      </form>
    </div>
  )
}
