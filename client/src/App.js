import React, { Component } from 'react';
import './App.css';
import Search from './Search'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      password: '',
      loaded: false
    }

    this.onIdSubmit = this.onIdSubmit.bind(this);
  }

  clear() {
    this.setState({text: ''})
  }

  onIdSubmit = async (id, passedPassword) => {
    this.clear();
    const response = await axios.post(
      'http://localhost:3000/post/' + id,
      { password: passedPassword},
      { headers: { 'Content-Type': 'application/json' }}
    )
    this.setState({text : response.data, loaded: true})
  }

  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <Search submit= {this.onIdSubmit} />
          <h1>{this.state.text}</h1>
        </header>
      </div>
    );
  }
 
}

export default App;
