import { ImageResponse } from 'next/og'
import { WEBSITE_NAME } from '@/lib/getEnvVar'
import { loadGoogleFont } from '@/lib/font'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hasTitle = searchParams.get('title')
    // 長すぎるタイトルはカット
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 80)
      : WEBSITE_NAME

    // 表示するテキストに含まれる文字からフォントデータを動的に取得
    const fontData = await loadGoogleFont({
      fontName: 'Noto Sans JP',
      weight: 700,
      text: title + WEBSITE_NAME,
    })
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#e0f2fe',
          }}
        >
          {/* 記事タイトル */}
          <div
            style={{
              fontSize: '60',
              color: 'rgba(0,0,0, 0.87)',
              letterSpacing: '0.025rem',
              display: 'flex',
              maxWidth: '80%',
              height: '100%',
              lineHeight: '1.5',
              padding: '8rem 10rem 0',
              textAlign: 'center',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
            }}
          >
            {title}
          </div>
          {/* サイト名 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              fontSize: '50',
              color: 'rgba(0,0,0, 0.87)',
              lineHeight: '1.5',
              marginBottom: 48,
            }}
          >
            {WEBSITE_NAME}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Noto Sans JP',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    )
  } catch (error) {
    console.error('Error while generating OGP image:', error)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
