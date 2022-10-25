import { RefObject, useEffect, useRef } from 'react'

export default function useStickyTableHead(): [RefObject<HTMLTableElement>] {
  const tableRef = useRef<HTMLTableElement>(null)

  // Make table header stick to the top of the screen
  useEffect(() => {
    function handleScroll() {
      const table = tableRef.current
      if (!table) return

      const tHead = table.querySelector('thead')
      if (!tHead) return

      const { height: tHeadHeight } = tHead.getBoundingClientRect()

      if (window.innerWidth < 768 || window.scrollY <= table.offsetTop) {
        table.style.removeProperty('padding-top')
        tHead.style.removeProperty('position')
        tHead.style.removeProperty('top')
        tHead.style.removeProperty('width')
        return
      }

      table.style.paddingTop = `${tHeadHeight}px`
      tHead.style.position = 'fixed'
      tHead.style.top = '0'
      tHead.style.width = `${table.offsetWidth}px`
      return
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Change sticky header width on resize
  useEffect(() => {
    function handleResize() {
      const table = tableRef.current
      if (!table) return

      const tHead = table.querySelector('thead')
      if (!tHead) return

      if (window.innerWidth < 768) tHead.style.removeProperty('width')
      else tHead.style.width = `${table.offsetWidth}px`
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return [tableRef]
}
