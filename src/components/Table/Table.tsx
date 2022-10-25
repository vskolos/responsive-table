import useStickyTableHead from '../../hooks/useStickyTableHead'
import './Table.module.scss'

type Props = {
  data: string[][]
  colsPerPage: number
  page: number
}

export function Table({ data, colsPerPage, page }: Props) {
  const [tableRef] = useStickyTableHead()

  // Check if the column index belongs to the current page
  function belongsToPage(index: number): boolean {
    return (
      index === 0 ||
      (index > colsPerPage * (page - 1) && index < colsPerPage * page + 1)
    )
  }

  return (
    <table ref={tableRef}>
      <thead>
        <tr>
          {data[0]
            .filter((_, index) => belongsToPage(index))
            .map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map(
          (row, rowIndex) =>
            rowIndex > 0 && (
              <tr key={rowIndex}>
                {row
                  .filter((_, cellIndex) => belongsToPage(cellIndex))
                  .map((cell, cellIndex) =>
                    cellIndex ? (
                      <td key={cellIndex}>{cell}</td>
                    ) : (
                      <th key={cellIndex}>{cell}</th>
                    )
                  )}
              </tr>
            )
        )}
      </tbody>
    </table>
  )
}
