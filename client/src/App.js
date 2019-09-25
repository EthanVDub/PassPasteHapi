import React, { Component } from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import './App.css';
import Search from './Search'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      password: '',
      postText: '',
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
      '/api/post/' + id,
      { password: passedPassword},
      { headers: { 'Content-Type': 'application/json' }}
    )
    this.setState({text : response.data, loaded: true})
  }

  onInputChangeText = async (text) => {
    this.setState({postText: text})
  }

  onInputChangePass = e => {
      this.setState({ password: e.target.value})
  }

  onFormSubmit = async (e) => {
    e.preventDefault()
    const req = {
      text: this.state.postText,
      password: this.state.password
    }
    const response = await axios.post(
      '/api/make_post',
      req,
      { headers: { 'Content-Type': 'application/json' }}
    )
    this.setState({text: response.data.text})
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <Search submit={this.onIdSubmit} />
        </div>
        <header className="App-header">
          <SimpleMDE 
            onChange={this.onInputChangeText} 
            label="New Post"
          />
          <form className="url-form-form" onSubmit={this.onFormSubmit}>
            <label>
                Post Password:&nbsp;
                <input 
                    onChange={this.onInputChangePass}
                    value={this.state.url}
                    type='text'
                    className='centerInput'
                    placeholder='Password...'
                />
            </label>
            <br/>
            <button>Create Post</button>
          </form>
          <h1>{this.state.text}</h1>
        </header>
      </div>
    );
  }
 
}

export default App;
