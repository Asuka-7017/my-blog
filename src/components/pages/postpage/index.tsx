import Link from 'next/link'
import { Post } from '@/lib/posts'
import MDXContent from '@/components/mdx-content'
import styles from './style.module.scss'

type Props = {
  post: Post
}

export default function PostPage({ post }: Props) {
  return (
    <article className="max-w-3xl mx-auto py-10 px-4 ">
      <header className="mb-10 border-b pb-4">
        <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Link
              href={`/category/${post.category.slug}`}
              key={post.category.slug}
              className="px-4 py-2 bg-sky-200 hover:bg-sky-300 rounded text-gray-700 transition flex item-center gap-2"
            >
              {post.category.name}
            </Link>
            {post.frontmatter.tags && (
              <div className="flex flex-wrap gap-3">
                {post.frontmatter.tags.map((tag) => {
                  return (
                    <Link
                      key={tag}
                      href={`/tag/${tag}/`}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition flex item-center gap-2"
                    >
                      <span>#{tag}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          <time>{post.frontmatter.date}</time>
        </div>
      </header>
      <div className={styles.contents}>
        <MDXContent source={post.content} />
      </div>
    </article>
  )
}
