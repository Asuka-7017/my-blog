import Link from 'next/link'
import { getPostsByPage } from '@/lib/posts'
import PostCard from '@/components/postcard'

export default function Home() {
  // 最新6件のみ取得
  const posts = getPostsByPage(1)
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">最新記事</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-8 mb-8">
        <Link
          href={`/page/1`}
          className="text-sm text-gray-500 underline hover:no-underline mb-4 block"
        >
          もっと見る →
        </Link>
      </div>
    </main>
  )
}
