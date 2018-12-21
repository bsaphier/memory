import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import CardFront from './CardFront';
import CardBack from './CardBack';
import styles from './Card.module.css';


class Card extends React.Component {
  state = { initialDegree: 0, targetDegree: 0 };

  handleDegreeChange = (initialDegree, targetDegree) => {
    this.setState({ initialDegree, targetDegree });
  }

  componentDidMount() {
    const degree = this.props.selected ? 180 : 0;
    this.handleDegreeChange(degree, degree);
  }

  componentDidUpdate(prevProps) {
    const { selected } = this.props;
    const initialDegree = selected ? 0 : 180;
    const targetDegree = selected ? 180 : 0;
    if (prevProps.selected !== selected) {
      this.handleDegreeChange(initialDegree, targetDegree);
    }
  }

  render() {
    const { targetDegree, initialDegree } = this.state;
    const { style, empty, symbol, condensed, onSelect = () => { } } = this.props;
    return (
      <Motion defaultStyle={{ degree: initialDegree }} style={{ degree: spring(targetDegree) }}>
        {interpolatingStyle => {
          const { degree } = interpolatingStyle;
          const frontStyle = { transform: `rotateX(0deg) rotateY(${180 + degree}deg)` };
          const backStyle = { transform: `rotateX(0deg) rotateY(${degree}deg)` };
          return (
            <div className={styles.cardWrapper} style={style}>
              <div className={styles.cardFace} style={frontStyle}>
                <CardFront symbol={symbol} empty={empty} condensed={condensed} />
              </div>
              <div
                className={styles.cardFace}
                style={backStyle}
                role="presentation"
                onClick={onSelect}
              >
                <CardBack condensed={condensed} />
              </div>
            </div>
          );
        }}
      </Motion>
    );
  }
}

Card.propTypes = {
  empty: PropTypes.bool,
  onSelect: PropTypes.func,
  condensed: PropTypes.bool,
  symbol: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
};

export default Card;
