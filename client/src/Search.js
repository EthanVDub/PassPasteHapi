import React, {Component} from 'react';
import './App.css'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            password: ''
        }
    }

    onInputChangeUrl = e => {
        this.setState({ url: e.target.value });
    };

    onInputChangePass = e => {
        this.setState({ password: e.target.value})
    }

    onFormSubmit = e => {
        e.preventDefault();
        this.props.submit(this.state.url, this.state.password);
    };

    render() {
        return (
            <div className="url-form">
                <form className="url-form-form" onSubmit={this.onFormSubmit}>
                    <label>
                        Post id:&nbsp;
                        <input 
                            onChange={this.onInputChangeUrl}
                            value={this.state.url}
                            type='text'
                            className='centerInput'
                            placeholder='Enter a post id'
                        />
                    </label>
                    &nbsp;
                    <label>
                        Post Pass: &nbsp;
                        <input 
                            onChange={this.onInputChangePass}
                            value={this.state.password}
                            type='text'
                            className='centerInput'
                            placeholder='Enter a password'
                        />
                    </label>
                    &nbsp;
                    <button>Find Post!</button>
                    
                </form>
                
            </div>
        )
    }
}

export default Search