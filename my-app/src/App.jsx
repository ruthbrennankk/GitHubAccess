import React, { Component } from 'react';
import Form from './components/Form.jsx';
import Button from './components/Button.jsx';
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
                token: 'bffafb9b4091b77da9fd0d528dfb8d2851d3aba0'
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
    this.getName = this.getName.bind(this)
    this.getType = this.getType.bind(this)
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

  getName(no) {
    var r=null;
    switch(no) {
      case 0:
        if (!this.state.buttons.stars) r = 'stars'
        else r = 'size'
        break;
      case 1:
        if (!this.state.buttons.stars && !this.state.buttons.size) r = 'size'
        else r = 'issues'
        break;
      case 2:
        if (!this.state.buttons.stars && !this.state.buttons.size && !this.state.buttons.issues) r = 'issues'
        else r = 'forks'
        break;
    }
      return r;
  };

  getType() {
    if (this.state.buttons.stars) return 'stars'
    else if (this.state.buttons.forks) return 'forks'
    else if (this.state.buttons.issues) return 'issues'
    else return 'size'
  };

  drawButtons() {
    if (this.state.ready) {
      return (
        <div>
          <Button
            handleClick={this.handleClick}
            name={this.getName(0)}
          />
          <Button
              handleClick={this.handleClick}
              name={this.getName(1)}
          />
          <Button
              handleClick={this.handleClick}
              name={this.getName(2)}
          />
        </div> 
      )
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GitHub Analytics</h1>
        </header>
        <p className="App-intro">
          Watch this space...
        </p>
        <Form
          formData={this.state.formData}
          handleUserFormSubmit={this.handleUserFormSubmit}
          handleFormChange={this.handleFormChange}
        />
        <p><b>Username:</b></p>
        <p>{this.state.gitun}</p>
        <DrawBubbleChart
          state = {this.state}
          type = {this.getType()}
        />
        {this.drawButtons()}
      </div>
    );
  };
}
export default App;