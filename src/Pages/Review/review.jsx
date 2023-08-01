import style from './review.module.css'


export default function Review(props){
 const date = new Date(props.Review.createdAt).toDateString()

 
    return(
    <div className={style.comment}>
        <div className={style.header}>
            <div className={style.author}>{props.Review.authorUsername}</div>
            <div className={style.date}>{date}</div>
            <div className={style.commentText}>{props.Review.content}</div>
            <div className={style.commentText}>{props.Review.rating}</div>
        </div>
    </div>
  )
}

