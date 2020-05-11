import * as React from 'react'
import cn from 'classnames'
import * as styles from './styles.css'

interface IListItemProps {
  className?: string
  onClick?: () => void
}
export const ListItem: React.FC<IListItemProps> = (props) => {
  const { children, className = '', onClick = () => {}, ...other } = props

  return (
    <div className={cn(styles.listItem, className, { [styles.pointer]: !!onClick })} onClick={onClick} {...other}>
      {children}
    </div>
  )
}
