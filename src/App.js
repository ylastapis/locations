import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import TableResultsWrapper from "./TableResultsWrapper";

export default class App extends Component {

  state = {
    enterDate: null,
    exitDate: null,
    typedEnterDate: '15/10/2017',
    typedExitDate: '05/04/2018',
  };

  handleSubmit = () => {
    this.setState({
      ...this.state,
      enterDate: this.state.typedEnterDate,
      exitDate: this.state.typedExitDate,
    });
  };

  handleChange = (elt, evt) => {
    this.setState({
      ...this.state,
      [elt]: evt.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <div className="form-group">
            <label>Date d'entrée</label>
            <input name="typedEnterDate" onChange={evt => this.handleChange('typedEnterDate', evt)} value="15/04/2017" />
          </div>
          <div className="form-group">
            <label>Date de sortie</label>
            <input name="typedExitDate" onChange={evt => this.handleChange('typedExitDate', evt)} value="15/02/2018" />
          </div>
          <button className="btn btn-success" onClick={this.handleSubmit}>Calculer</button>
          <hr/>
          { this.state.enterDate && this.state.exitDate && (
            <TableResultsWrapper enterDate={this.state.enterDate} exitDate={this.state.exitDate} />
          )}
        </div>
      </div>
    );
  }
}
