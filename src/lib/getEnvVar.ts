/**
 * サーバーサイド用ユーティリティ
 */
function getEnvVar(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export const WEBSITE_NAME = getEnvVar('NEXT_PUBLIC_WEBSITE_NAME')
export const WEBSITE_DESCRIPTION = getEnvVar('NEXT_PUBLIC_WEBSITE_DESCRIPTION')
export const WEBSITE_URL = getEnvVar('NEXT_PUBLIC_WEBSITE_URL')
export const AUTHOR = getEnvVar('NEXT_PUBLIC_AUTHOR')
