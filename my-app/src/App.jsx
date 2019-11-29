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
            token: '81e64c4b1e93e35e241cf11ab82968f230158f52'
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
    this.showDescription = this.showDescription.bind(this)
    this.hideDecription = this.hideDecription.bind(this)
  };

  handleUserFormSubmit(event) {
    event.preventDefault();
    const user = this.state.gh.getUser(this.state.formData.username);
    user.listRepos()
    .then(response => this.setState({
      gitun: this.state.formData.username,
      info : response.data,
      info2 : JSON.stringify(response.data, undefined, 2)
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
        this.setState({ buttons: {stars: true,size: false,issues: false,forks: false}})
        break;
      case 'forks':
        this.setState({ buttons: {stars: false,size: false,issues: false,forks: true}})
        break;
      case 'issues':
        this.setState({ buttons: {stars: false,size: false,issues: true,forks: false}})
        break;
      default:
        this.setState({ buttons: {stars: false, size: true, issues: false, forks: false }})
    }
  };

  showDescription(name) {
    this.setState({ 
      description: true,
      value: 'name',
    })
  }

  hideDecription() {
    this.setState({ 
      description: false,
      value: '',
    })
  }

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
        <p><b>Username: {this.state.gitun}</b></p>

        

        <DrawBubbleChart
          state = {this.state}
          type = {getType({state: this.state})}
          showDescription = {this.showDescription}
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
//<DrawInfo/>