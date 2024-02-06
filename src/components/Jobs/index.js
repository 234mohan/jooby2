import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItem from '../JobItem'
import UserProfile from '../UserProfile'
import Filters from '../Filters'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    employmentType: [],
    salaryRangeId: 0,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {searchInput, employmentType, salaryRangeId} = this.state
    this.setState({apiStatus: apiStatusConstants.progress})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${employmentType.join()}&minimum_package=${salaryRangeId}`
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
      console.log(fetchedData)
      const updatedData = fetchedData.jobs.map(eachJob => ({
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobData()
    }
  }

  onChangeEmploymentType = type => {
    this.setState(
      prevState => ({employmentType: [...prevState.employmentType, type]}),
      this.getJobData,
    )
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({salaryRangeId}, this.getJobData)
  }

  renderSuccessView = () => {
    const {jobsList, searchInput, salaryRangeId, employmentTypeId} = this.state

    return (
      <div className="consec">
        <div>
          <UserProfile />
          <hr className="horizontal" />
          <Filters
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            employmentTypeId={employmentTypeId}
            salaryRangeId={salaryRangeId}
            onChangeEmploymentType={this.onChangeEmploymentType}
            onChangeSalaryRange={this.onChangeSalaryRange}
          />
        </div>
        <div>
          <input
            type="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            placeholder="search"
            className="input-see"
            onKeyDown={this.onKeyDown}
          />
          <ul className="list">
            {jobsList.map(eachItem => (
              <JobItem jobDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="job">
        <Header />
        {this.renderSuccessView()}
      </div>
    )
  }
}

export default Jobs
