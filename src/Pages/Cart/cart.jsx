import style from './cart.module.css';
import { getCartById } from '../../api/internal';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeCartProduct, numOfProductCart } from '../../api/internal';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [numOfProduct1, setNumOfProduct1] = useState(); // Array of numOfProduct states
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  useEffect(() => {
    (async function getCartByIdApiCall() {
      try {
        const response = await getCartById(userId);
        if (response.status === 200) {
          setCart(response.data.Products);
          // Initialize the array of numOfProduct states with default values
          setNumOfProduct1(response.data.Products.map(item => item.numOfProduct));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [userId]);

  const HandleRemove = async (id) => {
    try {
      const response = await removeCartProduct(id);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuy = async () => {
    const data = {
      userId: userId,
      numOfProduct: numOfProduct1,
    };
    try {
      const response = await numOfProductCart(data);
      if (response.status === 200) {
        navigate(`/user/product/cart/buy`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNumOfProductChange = (index, value) => {
    // Ensure value is a positive integer or set it to 1
    const newValue = Math.max( Math.min(parseInt(value) , cart[index].product[0].numOfProduct));
    console.log("New Value:", newValue);
    
    // Update the state with the new value for the specific index
    setNumOfProduct1(prevNumOfProduct => {
      const newNumOfProductArray = [...prevNumOfProduct];
      newNumOfProductArray[index] = newValue;
      return newNumOfProductArray;
    });
  };

  return (
    <div className={style.orderBody}>
      <div className={style.cartWrapper}>
        {cart.length === 0 ? (
          <h2 className={style.nothingCart}>You have nothing inside the cart</h2>
        ) : (
          <>
            {cart.map((item, index) => (
              <div key={item._id} className={style.cartItem}>
                <img src={item.product[0].photoPath} alt={item.product[0].productName} />
                <div className={style.cartItemDetails}>
                  <h1>{item.product[0].productName}</h1>
                  <h5>Price: Rs.{item.product[0].price}</h5>
                  {item.product[0].numOfProduct === 0 ? <h5>Out of stock</h5> : ''}
                  <h5>Added on {new Date(item.createdAt).toDateString()}</h5>
                  <input
                    className={style.quantityInput}
                    type="number"
                    min={1}
                    max={item.product[0].numOfProduct}
                    value={numOfProduct1[index]}
                    onChange={(e) => handleNumOfProductChange(index, e.target.value)}
                  />
                  <button onClick={() => HandleRemove(item._id)} className={style.removeButton}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className={style.cartTotal}>
              <h3>Total:</h3>
              <h3>Rs. {cart.reduce((total, item, index) => total + item.product[0].price * numOfProduct1[index], 0)}</h3>
            </div>
            <button className={style.buyButton} onClick={handleBuy}>
              Buy
            </button>
          </>
        )}
      </div>
    </div>
  );
}