import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';


class ModalAction extends React.Component {
  buttonRef = null;

  setRef = el => (this.buttonRef = el)

  focusInput = () =>{
    if (this.buttonRef) {
      this.buttonRef.focus();
    }
  }

  onEnter = event => {
    if (event.charCode === 13) {
      this.props.action();
    }
  }

  componentDidUpdate() {
    this.focusInput();
  }

  render() {
    const { action, disabled, children } = this.props;
    const classNameButton = `${styles.button} ${disabled ? styles.disabled : ''}`;
    return (
      <div className={styles.buttonWrapper}>
        <div className={classNameButton} role="presentation" onClick={disabled ? () => {} : action}>
          {children}
          <input
            className={styles.hidden}
            ref={this.setRef}
            onKeyPress={disabled ? () => {} : this.onEnter}
          />
        </div>
      </div>
    );
  }
}

ModalAction.propTypes = {
  action: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default ModalAction;
