import { Button } from '../'
import s from './Controls.module.scss'

type Props = {
  pageCount: number
  page: number
  onTranspose: () => void
  onSetPage: (page: number) => void
}

export function Controls({ pageCount, page, onTranspose, onSetPage }: Props) {
  // Create page numbers array 1 ... N
  const pages: number[] = []
  for (let i = 0; i < pageCount; i++) pages.push(i + 1)

  return (
    <div className={s.controls}>
      <Button onClick={onTranspose}>Транспонировать</Button>
      {pageCount > 1 && (
        <ul className={s.pagination}>
          {pages.map((pageNumber) => (
            <li key={pageNumber}>
              <Button
                onClick={() => onSetPage(pageNumber)}
                disabled={page === pageNumber}
              >
                {pageNumber}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
