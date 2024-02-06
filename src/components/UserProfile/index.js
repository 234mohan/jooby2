import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class UserProfile extends Component {
  state = {
    profileData: {},
    isShown: false,
  }

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response.ok)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData.profile_details)
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({profileData: updatedData, isShown: true})
    } else {
      this.setState({isShown: false})
    }
  }

  renderUserProfile = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="container-profile">
        <img src={profileImageUrl} alt={name} className="profile" />
        <h1 className="profile-name"> {name} </h1>
        <p className="para"> {shortBio} </p>
      </div>
    )
  }

  getFailure = () => (
    <div className="container-button">
      <button type="button" className="button-control">
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  render() {
    const {isShown} = this.state
    return isShown ? this.renderUserProfile() : this.getFailure()
  }
}

export default UserProfile
