import React from 'react';
import PropTypes from 'prop-types';
import volumeOffUrl from '../../assets/icons/baseline-volume_off-24px.svg';
import volumeOnUrl from '../../assets/icons/baseline-volume_up-24px.svg';
import ToolbarItem from '../ToolbarItem/ToolbarItem';
import Toolbar from '../Toolbar/Toolbar';
import Icon from '../Icon/Icon';


const GameToolbar = props => {
  const { levels, onMute, onHover, soundOff, selectedLevel, onSelectLevel } = props;
  const toolbarItems = levels.map((levelName, idx) => ({
    key: levelName + idx,
    active: selectedLevel === levelName,
    action: () => onSelectLevel(levelName),
    name: levelName === 'triples'
      ? 'Expert'
      : levelName.charAt(0).toUpperCase() + levelName.slice(1),
  }));

  return (
    <Toolbar
      secondary={
        <div role="presentation" onMouseEnter={onHover} style={{ float: 'right' }}>
          <ToolbarItem onClick={onMute}>
            <Icon src={soundOff ? volumeOffUrl : volumeOnUrl} />
          </ToolbarItem>
        </div>
      }
    >
      {toolbarItems.map(({ key, name, active, action }) => (
        <div key={key} role="presentation" onMouseEnter={onHover}>
          <ToolbarItem active={active} onClick={action}>
            {name}
          </ToolbarItem>
        </div>
      ))}
    </Toolbar>
  );
};

GameToolbar.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.string),
  selectedLevel: PropTypes.string,
  onSelectLevel: PropTypes.func,
  soundOff: PropTypes.bool,
  onHover: PropTypes.func,
  onMute: PropTypes.func,
};

export default GameToolbar;
