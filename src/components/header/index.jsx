import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Header = (props) => {
  const {
    user,
    onSignIn,
    onSignOut,
  } = props;

  return (
    <header className={styles.header}>
      <div>DnD Tracker</div>
      {user ? (
        <button
          type="button"
          onClick={() => onSignOut()}
        >
          Sign out
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onSignIn()}
        >
          Sign in
        </button>
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
};
Header.defaultProps = {
  user: null,
};

export default Header;
