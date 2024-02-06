import './index.css'

const Skills = props => {
  const {skill} = props
  const {name, imageUrl} = skill

  return (
    <li>
      <img src={imageUrl} alt={name} className="image8" />
      <p> {name}</p>
    </li>
  )
}

export default Skills
