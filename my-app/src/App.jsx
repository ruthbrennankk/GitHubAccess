
import React, { Component } from 'react';
import Form from './components/Form.jsx';
import {DrawButtons, getType} from './components/drawButtons.jsx';
import DrawBubbleChart from './components/drawBubbleChart.jsx';
import Button from './components/Button.jsx';
import "./css/App.css";


var GitHub = require('github-api');

class App extends Component {
  constructor() {
    super();
    this.state = {
      gitun: 'No username',
      info: null,
      ready: false,
      type: 'size',
      languages: false,
      langButName: 'Seperate by Languages',
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
    this.handleLangClick = this.handleLangClick.bind(this)
    this.drawLangButton = this.drawLangButton.bind(this)
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

  handleLangClick(name) {
    var name = '';
    if (!this.state.languages) {name = "Don't separate by Languages";}
    else {name = 'Seperate by Languages';}
    this.setState({ languages: !this.state.languages, langButName: name})
  }

  drawLangButton() {
    
    if(this.state.ready) {
      return (
        <Button handleClick = {this.handleLangClick} name = {this.state.langButName}/>
      )
    }
    return null;
  }

  render() {
    const { textStyle, backgroundStyle } = styles;
    return (
      <div className="App" style={textStyle}>
        <header className="App-header">
          <h1 className="App-title" >Github Repositories Data Visualisation</h1>
        </header>
        <Form
          formData={this.state.formData}
          handleUserFormSubmit={this.handleUserFormSubmit}
          handleFormChange={this.handleFormChange}
        />
        <p><b>Username: {this.state.gitun}</b></p>

        {this.drawLangButton()}
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

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#3b5998',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3b5998',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: 10,
    width: 300
  },
  backgroundStyle: {
    color: '#d3d3d3'
  }
};