import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../post/Post'
import './posts.css'
import axios from 'axios'

const Posts = () => {

  const [articles, setArticles] = React.useState([])
  
  React.useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/articles"
        )
        setArticles(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getArticles()
  }, [])

  return (
    <div className='posts'>
      {articles.map(article => 
        <Link 
          className='link' 
          to={`/article/${article._id}`}
          >
            {<Post 
              article={article} 
              Key={article._id} 
            />}
        </Link>
      )}


      {/* <Link className='link' to="/post/postId">{<Post/>}</Link>
      <Link className='link' to="/post/postId">{<Post/>}</Link>
      <Link className='link' to="/post/postId">{<Post/>}</Link>
      <Link className='link' to="/post/postId">{<Post/>}</Link>
      <Link className='link' to="/post/postId">{<Post/>}</Link>
      <Link className='link' to="/post/postId">{<Post/>}</Link> */}
    </div>
  )
}

export default Posts