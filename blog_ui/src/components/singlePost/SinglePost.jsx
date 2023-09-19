import React from 'react'
import './singlePost.css'
import { publicRequest } from '../../requestMethods'
import { useLocation } from "react-router-dom"
import {format} from "timeago.js"



const SinglePost = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const [article, setArticle] = React.useState({})

    React.useEffect(() => {
        const getArticle = async () => {
            try {
                const res = await publicRequest.get("/articles/find/"+id)
                setArticle(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getArticle()
    }, [id])

  return (
    <div className='singlePost'>
        <div className='singlePostWrapper'>
            <img
                className='singlePostImg'
                src={article.img}
                alt=''
            />
            <h1 className='singlePosTitle'>
                {article.title}
                <div className='singlePostEdit'>
                    {/* <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
                    <i className="singlePostIcon fa-regular fa-trash-can"></i>               */}
                </div>
            </h1>
            <div className='singlePostInfo'>
                <span className='singlePostAuthor'>
                    Author: <b>{article.fullName}</b>
                </span>
                <span className='singlePostDate'>{format(article.createdAt)}</span>
            </div>
            <p className='singlePostDesc'>{article.desc}</p>
        </div>
    </div>
  )
}

export default SinglePost