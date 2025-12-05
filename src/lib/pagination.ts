type Pagination = {
  page: number | null
  current: boolean
  excerpt: boolean
}

export function generatePagination(
  currentPage: number,
  totalPages: number
): Pagination[] {
  // ページ番号の配列を生成
  const pageNumbers = Array.from(Array(totalPages).keys()).map(
    (index) => index + 1
  )

  // ページネーション情報を生成
  const pagination = pageNumbers
    .filter(
      (pageNumber) =>
        pageNumber === 1 ||
        pageNumber === totalPages ||
        Math.abs(currentPage - pageNumber) <= 2
    )
    .map((pageNumber) => ({
      page:
        Math.abs(currentPage - pageNumber) === 2 &&
        pageNumber !== 1 &&
        pageNumber !== totalPages
          ? null
          : pageNumber,
      current: pageNumber === currentPage,
      excerpt:
        Math.abs(currentPage - pageNumber) === 2 &&
        pageNumber !== 1 &&
        pageNumber !== totalPages,
    }))

  return pagination
}
