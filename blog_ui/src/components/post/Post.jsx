import React from 'react'
import './post.css'
import {format} from "timeago.js"


const Post = (props) => {
  return (
    <div className='post'>
        <img
            className='postImg'
            src={props.article.img}
            alt=''
        />
        <div className='postInfo'>
            <div className='postCats'>
                <span className='postCat'>{props.article.fullName}</span>
                <span className='postCat'></span>
            </div>
            <span className='postTitle'>{props.article.title}</span>
            <hr/>
            <span className='postDate'>{format(props.article.createdAt)}</span>
        </div>
        <p className='postDesc'>{props.article.desc}</p>
    </div>
  )
}

export default Post