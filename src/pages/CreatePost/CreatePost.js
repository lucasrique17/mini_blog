// CSS
import styles from './CreatePost.module.css'

import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useInsertDocuments } from '../../hooks/useInsertDocuments'

const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()

  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocuments('posts') 

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormError('')

    // VALIDAR IMAGEM
    try {

      new URL(image)
      
    } catch (error) {
      setFormError('A imagem precisa ser uma URL!')
    }

    // ARRAY DAS TAGS
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    // CHECAR VALORES

    if(!title || !image || !body || !tags) {
      setFormError('Por favor, preencha todos os campos!')
    }

    if (formError) return

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // REDIRECIONAR A PAGINA HOME
    navigate('/')

  }


  return (
    <div className={styles.create_post}>
        <h2>Criar Post</h2>
        <p>Escreva sobre o que você quiser e compartilhe conhecimento!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Titulo:</span>
            <input type="text" name='title' required placeholder='Digite o titulo do post'
            onChange={(e) => setTitle(e.target.value)} value={title}/>
          </label>
          <label>
            <span>URL da imagem:</span>
            <input type="text" name='image' required placeholder='Insira uma imagem que represente seu post'
            onChange={(e) => setImage(e.target.value)} value={image}/>
          </label>
          <label>
            <span>Conteúdo do post:</span>
            <textarea name="body" required placeholder='Digite o conteudo do post'
            onChange={(e) => setBody(e.target.value)} value={body}></textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input type="text" name='tags' required placeholder='Insira as tags separadas por virgúla'
            onChange={(e) => setTags(e.target.value)} value={tags}/>
          </label>
          {!response.loading && <button className='btn'>Publicar</button>}
          {response.loading && <button className='btn' disabled>Aguarde...</button>}
          {response.error && <p className='erro'>{response.error}</p>}
          {formError && <p className='erro'>{formError}</p>}
        </form>
    </div>
  )
}

export default CreatePost