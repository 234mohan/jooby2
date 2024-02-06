import {IoLocationOutline} from 'react-icons/io5'
import {FaBriefcase} from 'react-icons/fa'
import SkillItem from '../SkillItem'
import './index.css'

const JobDetails = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    lifeAtCompany,
    skills,
  } = jobDetails

  return (
    <li>
      <div>
        <img src={companyLogoUrl} alt={title} className="imageUrl" />
        <h1> {title} </h1>
        <p> {rating}</p>
        <IoLocationOutline className="line" />
        <p> {location}</p>
        <FaBriefcase className="case" />
        <p>{employmentType}</p>
        <p> {packagePerAnnum}</p>
        <hr />
        <h1> description </h1>
        <a href={companyWebsiteUrl}>Visit</a>
        <p> {jobDescription}</p>
        <div>
          <h1> Skills </h1>
          <ul>
            {skills.map(skill => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </ul>
        </div>

        <h1> Life At Company </h1>
      </div>
    </li>
  )
}

export default JobDetails
