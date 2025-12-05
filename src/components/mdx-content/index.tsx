import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'

type Props = {
  source: string
}

// MDX内で使うカスタムコンポーネント
const components = {}

export function MDXContent({ source }: Props) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [
              [
                rehypePrettyCode,
                { theme: 'catppuccin-frappe', keepBackgroune: true },
              ],
            ],
          },
        }}
      />
    </div>
  )
}

export default MDXContent
