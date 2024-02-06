import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobDetails from '../JobDetails'
import SimilarJobs from '../SimilarJobs'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobsData: [],
  }

  componentDidMount() {
    this.getProduct()
  }

  getUpdatedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.compan_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getSimilarJobs = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getProduct = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response.ok)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.getUpdatedData(data.job_details)
      const updatedSimilarJobs = data.similar_jobs.map(eachSimilarJob =>
        this.getSimilarJobs(eachSimilarJob),
      )
      this.setState({
        jobItemDetails: updatedData,
        similarJobsData: updatedSimilarJobs,
      })
    }
  }

  render() {
    const {jobItemDetails} = this.state
    return (
      <div>
        <Header />
        <JobDetails jobDetails={jobItemDetails} />
      </div>
    )
  }
}

export default JobItemDetails
