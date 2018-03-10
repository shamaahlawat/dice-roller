import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StyleMenu from './functional/StyleMenu';
import { randomRoll } from '../utils/';

class Die extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sides: 20,
      roll: null,
      style: "classic",
      showStyleMenu: false
    };

    this._toggleStyleMenu = this._toggleStyleMenu.bind(this);
  }
  componentDidMount() {
    const idCode = this.props.id.split('&');
    const sides = Number(idCode[1]);
    const style = idCode[2];
    if (this.state.sides !== sides) {
      this.setState({ sides });
    }
    if (this.state.style !== style) {
      this.setState({ style });
    }
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  render() {
    return (
      <div className={"die " + this.state.style}>
        <div className="die-screen">
          <div className="die-info">
            <label className="die-label">D</label>
            <input
              name="die-input"
              className="die-input"
              type="number"
              value={this.state.sides}
              onChange={this._handleInput.bind(this)}
              min="2"
            />
          </div>
          <div
            className="die-remove click center"
            onClick={this._handleRemove.bind(this)}
          >
            <i className="material-icons">close</i>
          </div>
        </div>
        <div
          className="die-roll click center"
          onClick={this._handleRoll.bind(this)}
        >
          {this.state.roll || this.state.sides}
        </div>
        <div
          className="die-style click center"
          onClick={this._toggleStyleMenu.bind(this)}
        >
          <i className="material-icons">color_lens</i>
        </div>
        {
          this.state.showStyleMenu
          ? (
            <StyleMenu
            handleSelect={this._handleSelect.bind(this)}
            toggleStyleMenu={this._toggleStyleMenu}
            />
          )
          : null
        }
      </div>
    );
  }

  _handleRoll() {
    const sides = this.state.sides;
    const roll = randomRoll(sides);
    this.setState({ roll });
  }

  _handleInput(event) {
    const newVal = Number(event.target.value);
    this.setState({ sides: newVal });
  }

  _handleRemove() {
    this.props.removeDie(this.props.id);
  }

  _handleSelect(style) {
    this.setState({ style });
    this._toggleStyleMenu();
  }

  _toggleStyleMenu() {
    this.setState({ showStyleMenu: !this.state.showStyleMenu });
  }

};

Die.propTypes = {
  id: PropTypes.string.isRequired,
  removeDie: PropTypes.func.isRequired,
};

export default Die;
