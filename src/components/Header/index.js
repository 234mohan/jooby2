import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logOutFunction = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="container-header">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="imageu"
      />
      <ul className="lists">
        <li>
          <Link to="/" className="list">
            Home
          </Link>
        </li>
        <li>
          <Link to="/Jobs" className="list">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" onClick={logOutFunction} className="button-log">
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
