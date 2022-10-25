type EntryData = {
  [key: string]: {
    [key: string]: string
  }
}

type TableData = {
  rows: string[][]
  cols: string[][]
}

function transpose(array: string[][]): string[][] {
  if (!array.length || !array[0].length) return []

  // Create correct amount of inner arrays to be filled
  const transposed: string[][] = []
  for (let i = 0; i < array[0].length; i++) transposed.push([])

  // Switch row and column indexes to transpose array
  array.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      transposed[columnIndex][rowIndex] = column
    })
  })

  return transposed
}

export default function tableData(data: EntryData): TableData {
  const rows: string[][] = []

  Object.entries(data).forEach((outerEntry, outerIndex) => {
    // Insert new array with row header as the first element
    rows.push([outerEntry[0]])

    // Insert other cells` values
    Object.values(outerEntry[1]).forEach((innerValue) => {
      rows[outerIndex].push(innerValue)
    })
  })

  // Insert an empty string for the corner cell
  const headersRow: string[] = ['']

  // Insert other headers` values
  Object.keys(Object.values(data)[0]).forEach((key) => {
    headersRow.push(key)
  })

  // Insert headers
  rows.unshift(headersRow)

  return { rows, cols: transpose(rows) }
}
