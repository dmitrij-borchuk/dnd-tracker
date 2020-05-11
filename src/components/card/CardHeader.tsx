import * as React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import * as styles from './styles.css'

interface ICardHeaderProps {
  className?: string
  flex?: boolean
}
const CardHeader: React.FC<ICardHeaderProps> = (props) => {
  const { children, className = '', flex = false } = props
  const classNames = cn(
    styles.cardHeader,
    {
      [styles.headerFlex]: flex,
    },
    className,
  )

  return <div className={classNames}>{children}</div>
}

export default CardHeader
