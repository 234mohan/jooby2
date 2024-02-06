import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="container-job">
      <h1 className="heading">
        Find The Jobs That <br /> Fits Your Life.
      </h1>
      <p className="paras">
        Millions of people are searching for jobs, <br />
        salary, information, company reviews. Find the jobs that fit your <br />
        ability and potential.
      </p>
      <button type="button" className="button-job">
        <Link to="/jobs" className="but">
          {' '}
          Find jobs{' '}
        </Link>
      </button>
    </div>
  </div>
)

export default Home
