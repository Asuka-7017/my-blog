import { getOgpData } from '@/lib/ogp'

// URLのホスト名を取得するヘルパー関数
function getDomain(url: string) {
  try {
    return new URL(url).hostname
  } catch (_) {
    return url
  }
}

export async function LinkCard({ url }: { url: string }) {
  const ogp = await getOgpData(url)
  // OGP取得失敗時はシンプルなリンクを表示
  if (!ogp) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    )
  }
  const domain = getDomain(ogp.url)
  return (
    <div className="not-prose h-24 my-10 block rounded-lg border overflow-clip hover:border-gray-400">
      <a
        href={ogp.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-full w-full flex"
      >
        <div className="flex flex-col justify-between gap-1 overflow-hidden p-3">
          {/* テキスト情報エリア */}
          <div className="font-medium line-clamp-1 leading-tight">
            {ogp.title}
          </div>
          {ogp.description && (
            <div className="line-clamp-1 text-sm leading-tight text-gray-500">
              {ogp.description}
            </div>
          )}
          {/* ファビコンを表示する（Googleのサービスを利用） */}
          <div className="flex items-center gap-2 truncate text-sm leading-tight text-gray-500">
            <img
              src={`https://www.google.com/s2/favicons?domain=${domain}`}
              alt=""
              className="w-4 h-4"
              width={16}
              height={16}
            />
            <span>{ogp.siteName || domain}</span>
          </div>
        </div>
        {/* サムネイル画像 */}
        {ogp.image && (
          <div className="h-full ml-auto object-cover hidden border-l sm:block">
            <img
              src={ogp.image}
              alt={ogp.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </a>
    </div>
  )
}

export default LinkCard
