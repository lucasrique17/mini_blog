// CSS
import styles from './About.module.css'

import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
        <h2>Sobre o projeto</h2>
        <p>Este projeto consiste em....</p>
        <Link to='/login' className='btn'>Faça Parte</Link>
    </div>
  )
}

export default About