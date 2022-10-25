import s from './App.module.scss'
import { useEffect, useState } from 'react'
import { holidays } from './data/holidays'
import tableData from './utils/tableData'
import useWindowSize from './hooks/useWindowSize'
import columnsPerPage from './utils/columnsPerPage'
import { Controls, Table } from './components'

function App() {
  const [transposed, setTransposed] = useState(false)
  const [page, setPage] = useState(1)
  const [windowWidth] = useWindowSize()

  const { rows, cols } = tableData(holidays)
  const data = transposed ? cols : rows

  // Set number of columns per page based on screen width
  const colsPerPage = columnsPerPage(windowWidth, data[0].length)
  const pageCount = Math.ceil((data[0].length - 1) / colsPerPage)

  // Reset page number after transposition
  // or resize that led to columns per page change
  useEffect(() => {
    setPage(1)
  }, [transposed, colsPerPage])

  // Transpose button click handler
  function transposeTable() {
    setTransposed((transposed) => !transposed)
  }

  return (
    <main className={s.main}>
      <Controls
        pageCount={pageCount}
        page={page}
        onTranspose={transposeTable}
        onSetPage={setPage}
      />
      <Table data={data} colsPerPage={colsPerPage} page={page} />
    </main>
  )
}

export default App
