import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/posts'

type Props = {
  post: Post
}

export default function PostCard({ post }: Props) {
  let tumbnailImage: string
  if (post.frontmatter.thumbnail) {
    tumbnailImage = post.frontmatter.thumbnail
  } else {
    const params = new URLSearchParams()
    params.set('title', post.frontmatter.title)
    tumbnailImage = `/api/og?${params.toString()}`
  }

  return (
    <article className="h-24 block rounded-lg border overflow-clip hover:border-gray-400">
      <Link
        href={`/post/${post.category.slug}/${post.slug}`}
        className="relative h-full w-full flex"
      >
        <div className="h-full mr-auto object-cover hidden border-r sm:block aspect-[1200/630] bg-gray-100">
          <Image
            src={tumbnailImage}
            alt={post.frontmatter.title}
            width={1200}
            height={630}
            className="rounded-t-lg"
            priority={false}
          />
        </div>
        <div className="flex flex-col justify-between gap-1 overflow-hidden p-3 mr-auto w-full">
          <h2 className="text-xl font-semibold mb-2">
            {post.frontmatter.title}
          </h2>
          <div className="text-sm text-gray-500 mb-2 flex gap-2 items-center">
            <time>{post.frontmatter.date}</time>
            <span>|</span>
            <span className="text-sky-600">{post.category.name}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
