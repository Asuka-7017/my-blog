import Link from 'next/link'
import { generatePagination } from '@/lib/pagination'

type Props = {
  totalPages: number
  currentPage: number
  basePath?: string // ベースとなるパス（/category/hoge、デフォルトは''）
  q?: string // 検索キーワードがある場合
}

export default function Pagination({
  totalPages,
  currentPage,
  basePath = '',
  q,
}: Props) {
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1

  const getPageLink = (page: number) => {
    // 検索モード（?q=...&p=...）
    if (q) {
      const params = new URLSearchParams()
      params.set('q', q)
      if (page > 1) {
        params.set('p', page.toString())
      }
      return `/search?${params.toString()}`
    }
    // 通常（/page/...）
    // 1ページ目はbasePathそのもの、2ページ目以降は basePath/page/2
    if (page === 1) {
      return basePath || '1'
    }
    return `${basePath}/page/${page}`
  }

  const pagination = generatePagination(currentPage, totalPages)
  return (
    <ul className="flex -space-x-px text-sm mt-10">
      {currentPage === 1 ? (
        ''
      ) : (
        <li>
          <Link href={getPageLink(prevPage)}>
            <span className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm w-9 h-9 focus:outline-none">
              ←
            </span>
          </Link>
        </li>
      )}
      {pagination.map((page, index) => (
        <li key={index}>
          {page.page === currentPage ? (
            <span className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none">
              {page.page}
            </span>
          ) : (
            <>
              {page.excerpt ? (
                <span className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none">
                  ...
                </span>
              ) : (
                <Link href={getPageLink(page.page ?? 1)}>
                  <span className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none">
                    {page.page}
                  </span>
                </Link>
              )}
            </>
          )}
        </li>
      ))}
      {currentPage === totalPages ? (
        ''
      ) : (
        <li>
          <Link href={getPageLink(nextPage)}>
            <span className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm w-9 h-9 focus:outline-none">
              →
            </span>
          </Link>
        </li>
      )}
    </ul>
  )
}
