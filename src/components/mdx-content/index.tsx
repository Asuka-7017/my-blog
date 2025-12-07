import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import LinkCard from '@/components/mdx-linkcard'

type Props = {
  source: string
}

// MDX内で使うカスタムコンポーネント
const components = { LinkCard }

export function MDXContent({ source }: Props) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              [remarkToc, { maxDepth: 3, heading: '目次' }],
            ],
            rehypePlugins: [
              [
                rehypePrettyCode,
                { theme: 'catppuccin-frappe', keepBackgroune: true },
              ],
              rehypeSlug,
            ],
          },
        }}
      />
    </div>
  )
}

export default MDXContent
