import Link from 'next/link'
export default function NotFound() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <div>お探しのページは見つかりませんでした。</div>
      <Link
        href="/"
        className="text-sm text-gray-500 underline hover:no-underline mb-4 block"
      >
        ← トップへ戻る
      </Link>
    </main>
  )
}
