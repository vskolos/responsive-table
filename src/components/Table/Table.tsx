import { CSSProperties } from 'react'
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

  // Set dynamic inline styles to avoid issue when the width won't change
  // after table transposition on mobile screens
  const tableRowGridStyle = {
    gridTemplateColumns: `9rem repeat(${
      colsPerPage === data[0].length ? colsPerPage - 1 : colsPerPage
    }, minmax(11rem, 1fr))`,
  } as CSSProperties

  return (
    <table ref={tableRef}>
      <thead>
        <tr style={tableRowGridStyle}>
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
              <tr key={rowIndex} style={tableRowGridStyle}>
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
