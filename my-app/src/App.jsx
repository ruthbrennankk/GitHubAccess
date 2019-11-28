import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form.jsx';
import SortedList from './components/SortedList.jsx';
import ProfileDetails from './components/ProfileDetails.jsx';
import LanguageList from './components/LanguageList.jsx';
import lda from './lda';
import BarChart from './components/BarChart'

class App extends Component {
  constructor() {
    super();
    this.state = {
      gitun: 'No username',
      info: '',
      formData: {
        username: '',
    }
  }
  this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
  this.handleFormChange= this.handleFormChange.bind(this);
}

handleUserFormSubmit(event) {
    event.preventDefault();
    axios.get('https://api.github.com/users/'+this.state.formData.username)
    .then(response => this.setState({
      gitun: response.data.login,
      info : JSON.stringify(response.data)
    })).catch((err) => { console.log(err); });
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
        <b>Information:</b>
        <pre>{this.state.info}</pre>
        <div className='App'>
          <div className='App-header'>
            <h2>d3ia dashboard</h2>
          </div>
          <div>
            <BarChart data={[5,10,1,3]} size={[300,300]} />
          </div>
        </div>
</div>
    );
  }
}
export default App;