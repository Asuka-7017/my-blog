import Link from 'next/link'
import { Post } from '@/lib/posts'
import PostCard from '@/components/postcard'
import Pagination from '@/components/pagination'

type Props = {
  posts: Post[]
  title: string
  currentPage: number
  totalPages: number
  basePath?: string
  q?: string
}

export default function PostList({
  posts,
  title,
  currentPage,
  totalPages,
  basePath,
  q,
}: Props) {
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-gray-500 underline hover:no-underline mb-4 block"
        >
          ← トップへ戻る
        </Link>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <div className="grid gap-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-gray-500">この記事はまだありません</p>
        )}
      </div>
      {/*ページネーション*/}
      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={basePath}
            q={q}
          />
        </div>
      )}
    </main>
  )
}
