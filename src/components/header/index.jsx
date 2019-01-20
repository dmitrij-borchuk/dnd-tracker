import React from 'react';
import PropTypes from 'prop-types';
import { Button, KIND } from '../button';
import styles from './styles.css';

const Header = (props) => {
  const {
    user,
    onSignIn,
    onSignOut,
    onMenuClick,
    title,
  } = props;

  return (
    <header className={styles.header}>
      <span className={styles.left}>
        <Button
          kind={KIND.GHOST}
          onClick={onMenuClick}
          className={styles.menuBtn}
        >
          <i className="fas fa-bars" />
        </Button>
        <div className={styles.title}>
          {title}
        </div>
      </span>

      {user ? (
        <Button
          kind={KIND.DANGER}
          onClick={() => onSignOut()}
        >
          Sign out
        </Button>
      ) : (
        <Button
          kind={KIND.DEFAULT}
          onClick={() => onSignIn()}
        >
          Sign in with Google
        </Button>
      )}
    </header>
  );
};
Header.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
};
Header.defaultProps = {
  user: null,
};

export default Header;
