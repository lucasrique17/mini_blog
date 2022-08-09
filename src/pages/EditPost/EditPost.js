// CSS
import styles from './EditPost.module.css'

import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {

  const {id} = useParams()
  const {document: post} = useFetchDocument('posts', id)

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  useEffect(() => {

    if(post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(', ')

      setTags(textTags)
    }

  }, [post])

  const navigate = useNavigate()

  const {user} = useAuthValue()

  const {updateDocument, response} = useUpdateDocument('posts') 

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    // REDIRECIONAR A PAGINA HOME
    navigate('/dashboard')

  }


  return (
    <div className={styles.edit_post}>
        {post && (
          <>
            <h2>Editando Post: {post.title}</h2>
            <p>Altere os dados do post como desejar!</p>
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
              <p className={styles.preview_title}>Preview da imagem atual:</p>
              <img className={styles.image_preview} src={post.image} alt={post.title} />
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
              {!response.loading && <button className='btn'>Editar</button>}
              {response.loading && <button className='btn' disabled>Aguarde...</button>}
              {response.error && <p className='erro'>{response.error}</p>}
              {formError && <p className='erro'>{formError}</p>}
            </form>
          </>
        )}
    </div>
  )
}

export default EditPost