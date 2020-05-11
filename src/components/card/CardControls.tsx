import * as React from 'react'
import * as styles from './styles.css'

interface ICardControlsProps {}
export const CardControls: React.FC<ICardControlsProps> = ({ children }) => {
  return (
    <div className={styles.carControls}>
      {children}
    </div>
  )
}
