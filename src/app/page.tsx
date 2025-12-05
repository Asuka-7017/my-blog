import { getPostsByPage } from '@/lib/posts'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  // 最新6件のみ取得
  const posts = getPostsByPage(1)
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">最新記事</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border p-4 rounded-lg hover:shadow-md transition"
          >
            <Link href={`/post/${post.category.slug}/${post.slug}`}>
              <h2 className="text-xl font-semibold mb-2">
                {post.frontmatter.title}
              </h2>
              <div className="text-sm text-gray-500 mb-2">
                {post.category.name}
              </div>
              <div className="text-gray-700">{post.frontmatter.date}</div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
