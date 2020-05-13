import * as React from 'react';
import cn from 'classnames';
import * as styles from './styles.css';
import KIND from './kind';

const kind2class = {
  [KIND.PRIMARY]: styles.primary,
  [KIND.DANGER]: styles.danger,
};

interface IModalHeaderProps {
  kind?: string
  withClose?: boolean
  onClose?: () => void
}
const ModalHeader: React.FC<IModalHeaderProps> = (props) => {
  const {
    children,
    kind = KIND.PRIMARY,
    withClose = false,
    onClose = () => {},
  } = props;

  return (
    <div className={cn(styles.header, kind2class[kind])}>
      {children}
      {withClose && (
        <button className={styles.modalHeaderClose} onClick={onClose}>X</button>
      )}
    </div>
  );
};

export default ModalHeader;
