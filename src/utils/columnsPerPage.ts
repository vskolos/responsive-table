export default function columnsPerPage(
  windowWidth: number,
  columnsTotal: number
): number {
  if (windowWidth < 768) return columnsTotal
  if (windowWidth >= 768 && windowWidth < 1024) return 3
  if (windowWidth >= 1024 && windowWidth < 1200) return 4
  return 5
}
