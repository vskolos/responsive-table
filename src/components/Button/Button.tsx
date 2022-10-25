import classNames from 'classnames'
import s from './Button.module.scss'

type Props = {
  className?: string
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}

export function Button({ className, onClick, disabled, children }: Props) {
  return (
    <button
      className={classNames(s.button, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
