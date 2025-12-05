/**
 * Google Fontsからフォントデータを取得するヘルパー関数
 */
export async function loadGoogleFont({
  fontName,
  weight,
  text,
}: {
  fontName: string
  weight?: number
  text?: string
}): Promise<ArrayBuffer> {
  const params = new URLSearchParams({
    family: `${fontName}${weight ? `:wght@${weight}` : ''}`,
  })

  if (text) {
    params.append('text', text)
  } else {
    params.append('subset', 'latin')
  }

  const url = `https://fonts.googleapis.com/css2?${params.toString()}`
  const css = await fetch(url).then((res) => res.text())
  // CSSの中からフォントファイルのURLを抽出する
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  )?.[1]

  if (!resource) {
    throw new Error('Font file not found in CSS fetched from Google Fonts')
  }

  return await fetch(resource).then((res) => res.arrayBuffer())
}
