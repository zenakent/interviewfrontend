import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  } 

  handleSubmit(event) {
    event.preventDefault();

    axios.post('/users/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        if (res.status === 200) {
          this.props.updateUser({
            loggedIn: true,
            username: res.data.username
          })
          this.setState({
            redirectTo: '/'
          })
      }
      })
      .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="container d-flex justify-content-center">
    <div className="col-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center text-dark">Chat App Log In</h5>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="text-dark">Username</label>
              <input type="text" className="form-control" name="username" onChange={this.handleChange} value={this.state.username} placeholder="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-dark">Password</label>
              <input type="password" className="form-control" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" required />
            </div>            
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

export default LoginForm;