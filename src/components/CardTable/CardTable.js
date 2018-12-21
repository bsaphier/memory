import React from 'react';
import PropTypes from 'prop-types';
import GridTable from '../GridTable/GridTable';
import Card from '../Card/Card';


const CardTable = props => {
  const { rows, cards, level, running, onSelectCard, selectedCards, onSelectFirstCard } = props;
  const isTriples = level === 'triples';
  const condensed = level === 'hard' || isTriples;
  const cols = cards.length / rows;
  const cardStyle = {
    minWidth: `calc(${100 / cols}% - 32px)`,
    minHeight: `calc(${100 / rows}% - 32px)`,
  }

  return (
    <GridTable>
      {cards.map(({ id, match, symbol }) => (
        <li key={`card=${id}`} style={cardStyle}>
          <Card
            id={id}
            empty={match}
            condensed={condensed}
            symbol={match ? '' : symbol}
            selected={match || selectedCards.includes(id)}
            onSelect={
              match
                ? () => { }
                : () => {
                  if (
                    (isTriples && selectedCards.length === 3) ||
                    (!isTriples && selectedCards.length === 2)
                  ) {
                    return;
                  }
                  if (running) {
                    onSelectCard(id);
                  } else {
                    onSelectFirstCard(id);
                  }
                }
            }
          />
        </li>
      ))}
    </GridTable>
  );
};

CardTable.propTypes = {
  rows: PropTypes.number,
  level: PropTypes.string,
  running: PropTypes.bool,
  onSelectCard: PropTypes.func,
  onSelectFirstCard: PropTypes.func,
  selectedCards: PropTypes.arrayOf(PropTypes.number),
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      symbol: PropTypes.string,
    })
  ),
};

export default CardTable;
