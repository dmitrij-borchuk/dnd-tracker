import * as React from 'react'
import * as styles from './styles.css'

interface IOption {
  label: string
  onClick?: () => void
}
interface IDropMenuProps {
  options: IOption[]
}
export const DropMenu: React.FC<IDropMenuProps> = (props) => {
  const { options, children } = props
  const [opened, setOpened] = React.useState(false)

  return (
    <div className={styles.dropMenu}>
      <div onClick={() => setOpened(!opened)}>
        {children}
      </div>
      {opened && (
        <div className={styles.select} onClick={() => setOpened(!opened)}>
          {options.map((option) => (
            <option key={option.label} onClick={option.onClick} className={styles.option}>{option.label}</option>
          ))}
        </div>
      )}
    </div>
  )
}
