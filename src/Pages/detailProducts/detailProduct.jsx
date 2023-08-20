import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createReview,
  getProductById,
  getReviewById,
  deleteProduct,
  addToCart
} from "../../api/internal";
import { useSelector } from "react-redux";
import style from "./detailProduct.module.css";
import ReviewList from "../ReviewsList/reviewList";
import Loader from "../../compnents/Loader/loader";
import { numOfProduct } from "../../api/internal";
export default function DetailProduct() {
  const [product, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ownsProduct, setOwnsProduct] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState("");
  const [numOfProduct1, setNumOfProduct1] = useState(1);
    const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;

  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user._id);
  const seller = useSelector((state) => state.user.seller);
  

  useEffect(() => {
    (async function getByIdApiCall() {
      const productDetailResponse = await getProductById(productId);
      if (productDetailResponse.status === 200) {
        setOwnsProduct(
          username === productDetailResponse.data.product.ownerUsername
        );
        setProduct(productDetailResponse.data.product);
      }
      const commentResponse = await getReviewById(productId);
      if (commentResponse.status === 200) {
        setReviews(commentResponse.data.Review);
      }
    })();
  }, [reload]);

  const handleDelete = async () => {
    try {
      const response = await deleteProduct(productId);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBuy = async () => {
   const data = {
    productId:productId,
    userId:userId,
    numOfProduct:numOfProduct1
   }
    try {
      const response = await numOfProduct(data);
      if (response.status === 200) {
        navigate(`/product/submit/${product._id}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostComment = async () => {
    const data = {
      author: userId,
      product: productId,
      content: newComment,
      rating: newRating,
    };

    const response = await createReview(data);
    if (response.status === 200) {
      setNewComment("");
      setNewRating("");
      setReload(!reload);
    }
  };

  const handlerAddToCart = async () => {
  
    const data = {
      usernameId: userId,
      productId: productId
    };

    const response = addToCart(data);
    if (response.status === 201) {
      navigate('/products');
    }
  };

  if (product.length === 0) {
    return <Loader text="Product Detail" />;
  }
  const stepperMinus1 = () => {
    setNumOfProduct1((prevNum) => Math.max(prevNum - 1, 1));
  };
  
  const stepperPlus1 = () => {
    setNumOfProduct1((prevNum) => Math.min(prevNum + 1, product.numOfProduct));
  };

  return (
    <div className={style.orderBody}>
      <div className={style.detailWrapper}>
        <div className={style.left}>
         {product.numOfProduct === 0 ? (<h1 className={style.outOfStock}>out of stock</h1>):''}
          {ownsProduct && seller && (
            <div className={style.controls}>
              <button
                className={style.editButton}
                onClick={() => navigate(`/product/update/${product._id}`)}
              >
                Edit
              </button>
              <button
                className={style.deleteButton}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
          <img
            className={style.photoImageProduct}
            src={product.photoPath}
            alt={product.productName}
          />
          <p className={style.description}>{product.decs}</p>
        </div>
        <div className={style.right}>
        <div className={style.bottomButtonsWrapper}>
      
        <p className={style.description}>{product.ownerCompanyName}</p>
      
          <h2 className={style.headerName}>{product.productName}</h2>
          <div className={style.inputContainer}>
  <button className={style.decrement} onClick={stepperMinus1}>-</button>
  <input
    className={style.input}
    type="number"
    min={1}
    max={product.numOfProduct}
    value={numOfProduct1}
    onChange={(e) => setNumOfProduct1(e.target.value)}
    readOnly
  />
  <button className={style.increment} onClick={stepperPlus1}>+</button>
</div>
          <p className={style.price}>Rs.{product.price}</p>
        {seller === undefined ? (
          <>
            <button
              className={style.addToCartButton}
              onClick={handlerAddToCart}
              disabled={product.numOfProduct === 0}
            >
              Add to Cart
            </button>
            <button
              className={style.buyButton}
              onClick={handleBuy}
              disabled={product.numOfProduct === 0}
            >
              Buy Now
            </button>
          </>
        ) : (
          <p className={style.p}>
            Sellers cannot buy products. You have to create a buyer account!
          </p>
        )}
        
      </div>
          {seller === undefined ? (
            <div className={style.commentsWrapper}>
              <ReviewList reviews={reviews} />
              <div className={style.postComment}>
                <input
                  className={style.input}
                  type="text"
                  placeholder="Leave a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                {newComment !== "" && (
  <div className={style.ratingInputContainer}>
    <input
      className={style.inputRating}
      type="number"
      placeholder="Rating (1-5)"
      min={1}
      max={5}
      value={newRating}
      onChange={(e) => {
        const value = Math.min(5, Math.max( parseInt(e.target.value) ));
        setNewRating(value);
      }}
    />
  </div>
)}
                <button
                  className={style.postCommentButton}
                  onClick={handlePostComment}
                  disabled={!newComment}
                >
                  Post
                </button>
              </div>
            </div>
          ) : (
            <p className={style.p}>Sellers cannot post comments!</p>
          )}
        </div>
      </div>
      
    </div>
  );
}