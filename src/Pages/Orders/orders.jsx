import style from './orders.module.css'
import { useEffect, useState } from 'react'
import { getByIdOrders } from '../../api/internal'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Loader from '../../compnents/Loader/loader'
export default function Order() {
  const navigate = useNavigate()
  const [ordersList, setOrdersList] = useState([])
  const params = useParams()
  const OwnerId = params.id

  useEffect(() => {
    (async function getByIdApiCall() {
      const response = await getByIdOrders(OwnerId)
      if (response.status === 200) {
        setOrdersList(response.data.Order)
      } else if (response.code === "ERR_BAD_REQUEST") {
        window.location.reload()
        navigate('/')
      }
    })()
  }, [])

 
  
  return (
    <body className={style.orderBody}>
   {ordersList.length !== 0 ? <div className={style.blogsWrapper}>
      {ordersList.map((order) => (
        <div  className={style.blog} id={order._id} onClick={()=>navigate(`/owner/order/detail/${order._id}`)}>
          <h1>{order.product[0].productName}</h1>
          <img src={order.product[0].photoPath} width={1000} alt="Product" />
          <h3>from  {order.username[0].username}</h3>
          <h5>Order on {new Date(order.createdAt).toDateString()}</h5>
        </div>
      ))}
    </div> : <h2 className={style.noOrder}>You don't have any order currently</h2>}
    </body>
  )
}
