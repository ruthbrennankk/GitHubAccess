import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form.jsx';
import SortedList from './components/SortedList.jsx';
import ProfileDetails from './components/ProfileDetails.jsx';
import LanguageList from './components/LanguageList.jsx';
import lda from './lda';
import BarChart from './components/BarChart'
import BubbleChart from './components/BubbleChart'
import * as d3 from "d3";


class App extends Component {
  constructor() {
    super();
    this.state = {
      gitun: 'No username',
      info: '',
      info2: null,
      ready: false,
      formData: {
        username: '',
    }
  }
  this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
  this.handleFormChange= this.handleFormChange.bind(this);
}

handleUserFormSubmit(event) {
    event.preventDefault();
    axios.get('https://api.github.com/users/'+this.state.formData.username+'/repos')
    .then(response => this.setState({
      gitun: this.state.formData.username,
      info : JSON.stringify(response.data,undefined, 2),
      info2 : response.data
    })).catch((err) => { console.log(err); });
    this.state.ready = true;
  };

handleFormChange(event) {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  dragstarted = (d) => {
    BubbleChart.dragstarted(d);
  }

  dragged = (d) => {
    BubbleChart.dragged(d);
  }

  dragended = (d) => {
    BubbleChart.dragended(d);
  }

drawBarChart = () => {
  if (this.state.ready) {
    return (
      <div>
        <p>Size</p>
        <BarChart data={this.getSizeArray()} size={[200,200]} />
        <p>Stars</p>
        <BarChart data={this.getStarsArray()} size={[200,200]} />
      </div>
    )
  }
};


drawBubbleChart = () => {
  if (this.state.ready) {
    return (
      <div>
         <BubbleChart data={this.getDataObject()}/>
      </div>
    )
  }
};

getDataObject() {
  console.log(this.state.info2.length);
  var objects = [];
  for (var i=0; i<this.state.info2.length;i++) {
      objects[i] = {forks_count:this.state.info2[i].forks_count, size:this.state.info2[i].size};
  }
  return objects;
}

//Forks of repos
getForksArray = () => {
  console.log(this.state.info2.length);
  var arr = [];
  for (var i=0; i<this.state.info2.length;i++) {
      arr[i] = this.state.info2[i].forks_count;
  }
  return arr;
};

//Size of repos
getSizeArray = () => {
  console.log(this.state.info2.length);
  var arr = [];
  for (var i=0; i<this.state.info2.length;i++) {
      arr[i] = this.state.info2[i].size;
  }
  return arr;
};

//times the repo was starred
getStarsArray = () => {
  console.log(this.state.info2.length);
  var arr = [];
  for (var i=0; i<this.state.info2.length;i++) {
      arr[i] = this.state.info2[i].stargazers_count;
  }
  return arr;
};

//current issues with the repo
getIssuesArray = () => {
  console.log(this.state.info2.length);
  var arr = [];
  for (var i=0; i<this.state.info2.length;i++) {
      arr[i] = this.state.info2[i].open_issues_count;
      console.log(arr[i]);
  }
  return arr;
};


//contributors
//  "https://api.github.com/repos/ruthbrennankk/Software-Engineering-Essay/contributors"


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
        <div className='App'>
          {this.drawBubbleChart()}
        </div>
        
        
      </div>
    );
  }
}
export default App;

/*
<b>Information:</b>
<pre>{this.state.info}</pre>

<div className='App'>
  {this.drawBarChart()}
</div>

*/