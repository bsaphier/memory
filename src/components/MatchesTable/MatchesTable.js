import React from 'react';
import PropTypes from 'prop-types';
import GridTable from '../GridTable/GridTable';
import Card from '../Card/Card';


const MatchesTable = ({ rows, total, level, matches, cardsById }) => {
  const isTriples = level === 'triples';
  const condensed = level === 'hard' || isTriples;
  const totalSets = total / (isTriples ? 3 : 2);
  const unMatchedTotal = totalSets - matches.length;
  const cols = Math.ceil(totalSets / rows);
  const setStyle = {
    flexDirection: condensed ? 'row' : 'column',
    minWidth: `calc(${100 / cols}% - 16px)`,
    height: `calc(${100 / rows}% - 16px)`,
    margin: 8,
  };

  let cardStyle = {};
  if (condensed) {
    cardStyle = {
      first: { marginRight: isTriples ? '16px' : '8px' },
      second: isTriples ? {} : { marginLeft: '8px' },
      third: { marginLeft: '16px' },
    };
  } else {
    cardStyle = {
      first: { marginBottom: '8px' },
      second: { marginTop: '8px' },
    };
  }

  return (
    <GridTable>
      {matches.map(match => {
        const card1 = cardsById[match[0]]
        const card2 = cardsById[match[1]]
        return (
          <li key={card1.id + card2.id} style={setStyle}>
            <Card symbol={card1.symbol} style={cardStyle.first} condensed={condensed} selected />
            <Card symbol={card2.symbol} style={cardStyle.second} condensed={condensed} selected />
            {isTriples ? (
              <Card
                symbol={cardsById[match[2]].symbol}
                style={cardStyle.third}
                condensed={condensed}
                selected
              />
            ) : null}
          </li>
        );
      })}
      {Array.from(Array(unMatchedTotal)).map((_, idx) => (
        <li key={`empty${+idx}`} style={setStyle}>
          <Card symbol="" style={cardStyle.first} condensed={condensed} selected empty />
          <Card symbol="" style={cardStyle.second} condensed={condensed} selected empty />
          {isTriples ? (
            <Card symbol="" style={cardStyle.third} condensed={condensed} selected empty />
          ) : null}
        </li>
      ))}
    </GridTable>
  );
};

MatchesTable.propTypes = {
  rows: PropTypes.number,
  level: PropTypes.string,
  total: PropTypes.number,
  cardsById: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      symbol: PropTypes.string,
    })
  ),
  matches: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    /** matches is an array of arrays with two or three numbers */
    if (
      !Array.isArray(propValue[key]) ||
      (propValue[key].length !== 2 && propValue[key].length !== 3) ||
      !propValue[key].every(item => typeof item === 'number' && !isNaN(item))
    ) {
      return new Error(
        `Invalid prop ${propFullName} supplied to '${componentName}'. Each item in the prop ${
          propFullName
        } array must be an array of only two or three numbers.`
      )
    }
    return null;
  }),
};

export default MatchesTable;
