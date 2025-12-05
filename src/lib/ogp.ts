import ogs from 'open-graph-scraper'
import { unstable_cache } from 'next/cache'
import he from 'he'

export type OgpData = {
  title: string
  description?: string
  image?: string
  url: string
  siteName?: string
}

// 外部URLからOGP情報を取得する（キャッシュ対応）
export const getOgpData = unstable_cache(
  async (url: string): Promise<OgpData | null> => {
    try {
      const { result } = await ogs({ url, timeout: 5000 })
      if (!result.success) {
        console.error(`Failed to fetch OGP for ${url}:`, result.error)
        return null
      }
      // 必要な情報を抽出してデコード
      const title = result.ogTitle ? he.decode(result.ogTitle) : ''
      const description = result.ogDescription
        ? he.decode(result.ogDescription)
        : undefined
      // 画像は複数ある場合があるので最初の1つを取得
      let image = result.ogImage?.[0]?.url
      // Amazonの場合
      const asin = getAmazonAsin(url)
      if (asin) {
        // ASINがある場合、Amazonの画像サーバーURLを生成して画像を上書き
        // 'LZZZZZZZ'は画像を枠なしの最大サイズで取得するパラメータ
        image = `https://images-na.ssl-images-amazon.com/images/P/${asin}.09.LZZZZZZZ.jpg`
      }
      const siteName = result.ogSiteName
        ? he.decode(result.ogSiteName)
        : undefined

      // タイトルすらない場合は失敗とみなす
      if (!title) return null
      return {
        title,
        description,
        image,
        url,
        siteName,
      }
    } catch (error) {
      console.error(`Error fetching OGP for ${url}:`, error)
      return null
    }
  },
  // キャッシュのキー
  ['ogp-data'],
  {
    // 1週間キャッシュする(適宜変更)
    revalidate: 60 * 60 * 24 * 7,
  }
)

// URLからASINを抽出するヘルパー関数
function getAmazonAsin(url: string): string | null {
  try {
    const urlObj = new URL(url)
    // Amazonのドメインかチェック
    if (!urlObj.hostname.includes('amazon')) {
      return null
    }
    // 一般的な商品URLパターン（/dp/ASIN または /gp/product/ASIN）から抽出
    const match =
      urlObj.pathname.match(/\/dp\/([A-Z0-9]{10})/) ||
      urlObj.hostname.match(/\/gp\/product\/([A-Z0-9]{10})/)
    return match ? match[1] : null
  } catch (e) {
    return null
  }
}
