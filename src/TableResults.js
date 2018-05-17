import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class TableResults extends Component {
  render() {
    console.log(this.props.values);
    return (
      <React.Fragment>
        Nombre de jours au total: <span>{this.props.values.totalDays}</span>
        <table>
          <thead>
            <tr>

            </tr>
          </thead>
          <tbody>
            <tr>

            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

TableResults.propTypes = {
  values: PropTypes.shape({
    totalDays: PropTypes.number.isRequired,
  }).isRequired,
};