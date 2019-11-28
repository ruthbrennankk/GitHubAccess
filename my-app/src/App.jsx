import React, { Component } from 'react';
import Form from './components/Form.jsx';
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
    }
  }
  this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
  this.handleFormChange= this.handleFormChange.bind(this);
}

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
          type = 'size'
        />
        <Button
            handleClick={this.handleClick}
          />
      </div>
    );
  }
}
export default App;