import './index.css'

const Filters = props => {
  const renderEmploymentTypeList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachEmploymentType => {
      const {onChangeEmploymentType} = props
      const onChangeEmployments = event => {
        onChangeEmploymentType(event.target.value)
      }
      return (
        <li
          onClick={onChangeEmployments}
          key={eachEmploymentType.employmentTypeId}
        >
          <input
            type="checkbox"
            id={eachEmploymentType.employmentTypeId}
            className="checkbox"
            value={eachEmploymentType.employmentTypeId}
          />
          <label
            htmlFor={eachEmploymentType.employmentTypeId}
            className="check-label"
          >
            {eachEmploymentType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentType = () => (
    <div>
      <h1 className="check-heading"> Type of Employment </h1>
      <ul className="container-check">{renderEmploymentTypeList()}</ul>
    </div>
  )

  return <>{renderEmploymentType()}</>
}

export default Filters
