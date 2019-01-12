import React from 'react';
import PropTypes from 'prop-types';
import { Button, KIND } from '../button';
import styles from './styles.css';

const Header = (props) => {
  const {
    user,
    onSignIn,
    onSignOut,
    title,
  } = props;

  return (
    <header className={styles.header}>
      <div>{title}</div>
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
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
};
Header.defaultProps = {
  user: null,
};

export default Header;
