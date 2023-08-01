import style from './reviewList.module.css'
import Review from '../Review/review'
export default function ReviewList(props){
    return(
        <div className={style.commentListWrapper}>
            <div className={style.commentList}>
            {props.reviews.length === 0 ? (
                <div className={style.noComment}>No comment Posted</div>
            ) : props.reviews.map(review =>(
                <Review key={review._id} Review={review}/>
            ))}
            </div>
        </div>
    )
}