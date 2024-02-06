import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isErrorMessage: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMsg,
      isErrorMessage: true,
    })
  }

  onAddLogin = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {password, username} = this.state
    const userDetails = {password, username}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response.ok)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {isErrorMessage, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="container-row">
        <div className="containerser">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image-logo"
          />
          <form onSubmit={this.onAddLogin} className="form">
            <label htmlFor="user" className="place">
              USERNAME
            </label>
            <input
              type="text"
              id="user"
              placeholder="Username"
              className="inputs"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="login" className="place">
              PASSWORD
            </label>
            <input
              type="password"
              id="login"
              placeholder="Password"
              className="inputs"
              onChange={this.onChangePassword}
            />
            <button type="submit" className="button">
              Login
            </button>
            {isErrorMessage && <p className="error"> *{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
