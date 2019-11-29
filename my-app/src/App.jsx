import React, { Component } from 'react';
import Form from './components/Form.jsx';
import {DrawButtons, getType} from './components/drawButtons.jsx';
import DrawBubbleChart from './components/drawBubbleChart.jsx'


var GitHub = require('github-api');


class App extends Component {
  constructor() {
    super();
    this.state = {
      gitun: 'No username',
      info: null,
      ready: false,
      type: 'size',
      // basic auth
      gh : new GitHub({
            // ------- Enter your own OAuth Token to proceed -------
            //token: 'OAuth Code Here'
            token: 'ae2bfe86d8135c68bb430b1c4f8488aa040fe8fb'
      }),
      formData: {
        username: '',
      },
      buttons: {
        stars: false,
        size: true,
        issues: false,
        forks: false
      }
    }
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    this.handleFormChange= this.handleFormChange.bind(this);
    this.handleClick = this.handleClick.bind(this)
  };

  handleUserFormSubmit(event) {
    event.preventDefault();
    const user = this.state.gh.getUser(this.state.formData.username);
    user.listRepos()
    .then(response => this.setState({
      gitun: this.state.formData.username,
      info : response.data
    })).catch((err) => { console.log(err);   
    });
    this.state.ready = true;
  };

  handleFormChange(event) {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  handleClick(name) {
    switch(name) {
      case 'stars':
        this.setState({ buttons: {
          stars: true,
          size: false,
          issues: false,
          forks: false
        }})
        break;
      case 'forks':
        this.setState({ buttons: {
            stars: false,
            size: false,
            issues: false,
            forks: true
          }})
        break;
      case 'issues':
        this.setState({ buttons: {
          stars: false,
          size: false,
          issues: true,
          forks: false
        }})
        break;
      default:
        this.setState({ buttons: {
          stars: false,
          size: true,
          issues: false,
          forks: false
        }})
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Github Repositories Data Visualisation</h1>
        </header>
        <Form
          formData={this.state.formData}
          handleUserFormSubmit={this.handleUserFormSubmit}
          handleFormChange={this.handleFormChange}
        />
        <p><b>Username:</b></p>
        <p>{this.state.gitun}</p>
        <DrawBubbleChart
          state = {this.state}
          type = {getType({state: this.state})}
        />
        <DrawButtons
            handleClick = {this.handleClick}
            state = {this.state}
        />
      </div>
    );
  };
}
export default App;