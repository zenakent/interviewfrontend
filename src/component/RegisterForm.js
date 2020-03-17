import React, { Component } from 'react';
import axios from 'axios'

class RegisterForm extends Component {
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
    event.preventDefault()
    axios.post('/users/register', {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      console.log(res)
      if (res.data) {
        console.log('successful registration')
        this.setState({
          redirectTo: '/login'
        })
      } else {
        console.log('registration error')
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
          <h5 className="card-title text-center text-dark">Chat App Register</h5>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="text-dark">Username</label>
              <input type="text" className="form-control" name="username" onChange={this.handeChange} value={this.state.username} placeholder="username" required />>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-dark">Password</label>
              <input type="password" className="form-control" name="password" onChange={this.handeChange} value={this.state.password} placeholder="Password" required />>
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

export default RegisterForm;