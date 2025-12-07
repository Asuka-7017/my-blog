import { getAllPosts } from '@/lib/posts'
import {
  WEBSITE_NAME,
  WEBSITE_DESCRIPTION,
  WEBSITE_URL,
  AUTHOR,
} from '@/lib/getEnvVar'
import { Feed } from 'feed'

export async function GET() {
  const feed = new Feed({
    title: WEBSITE_NAME,
    description: WEBSITE_DESCRIPTION,
    id: WEBSITE_URL,
    link: WEBSITE_URL,
    image: `${WEBSITE_URL}/og-image.png`,
    favicon: `${WEBSITE_URL}/favicon.ico`,
    copyright: `Copyright ${new Date().getFullYear()} ${AUTHOR}`,
    updated: new Date(), // 最終更新日
    generator: 'Next.js + Feed',
    author: {
      name: AUTHOR,
      link: WEBSITE_URL,
    },
  })
  // 全記事を取得してフィードに追加
  const posts = getAllPosts()
  posts.forEach((post) => {
    const url = `${WEBSITE_URL}/post/${post.category.slug}/${post.slug}`
    const postDescription = post.content
      ? post.content
          .replace(/(^#+\s)|(\s#+$)/gm, '') // ヘッダータグ
          .replace(/\[([^\]]+)\]\([^\)]+\)/gm, '$1') // リンク
          .replace(/!\[[^\]]*\]\([^\)]+\)/gm, '') // 画像
          .replace(/(?:^|\n)(?:-|\d+\.)\s+/gm, '') // リスト
          .replace(/`[^`]+`/gm, '') // インラインコード
          .replace(/(?:^|\n)```[\s\S]*?```/gm, '') // 複数行のコードブロック
          .replace(/\n/g, '') // 改行文字
          .substring(0, 100)
      : ''
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: postDescription,
      content: postDescription,
      author: [
        {
          name: AUTHOR,
          link: WEBSITE_URL,
        },
      ],
      date: new Date(post.frontmatter.date),
      image: post.frontmatter.thumbnail
        ? `${WEBSITE_URL}/image/${post.frontmatter.thumbnail}`
        : undefined,
    })
  })
  // XML形式でレスポンスを返す
  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'text/uml; charset=utf-8',
      // キャッシュ制御
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
