import { getByIdDetailOrder } from "../../api/internal"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import style from './detailOrder.module.css'
import Loader from "../../compnents/Loader/loader"
import {deleteByIdDetailOrder} from '../../api/internal'
export default function DetailOrder() {
  const [orderDetail, setOrdersDetail] = useState([])
  const params = useParams()
  let id = params.id
  const navigate = useNavigate()

  useEffect(() => {
    (async function detailOrdergetApiCall() {
      const response = await getByIdDetailOrder(id)
      if (response.status === 200) {
        setOrdersDetail(response.data.Product)
      } else {
        navigate('/')
      }
    })()
  }, [])
  const HandleDone = async()=>{
    try {
        const response = await deleteByIdDetailOrder(id)
        if (response.status === 200) {
            navigate('/')
          }
    } catch (error) {
        return error
    }
  }
  if(orderDetail.length === 0){
    return <Loader text="products Detail"/>
    }
  return (
    <body className={style.OrderBody}>
    <div className={style.detailWrapper}>
      <div className={style.left} key={orderDetail._id}>
        {orderDetail.product && orderDetail.product[0] && (
          <>
            
            <h1 className={style.h1}>{orderDetail.product[0].productName}</h1>
            
            <img src={orderDetail.product[0].photoPath} width={300} height={300} alt="Product" className={style.img_photo} />
            <p className={style.p}>
              @{orderDetail.username[0].username + " from " + orderDetail.country +
                " order on " +
                new Date(orderDetail.createdAt).toDateString()}
            </p>
            <p className={style.p}>Price : {orderDetail.product[0].price} Rs</p>
          </>
        )}
        
          <h4 className={style.p}>Buyer PhoneNumber : {orderDetail.phoneNumber}</h4>
        
        <h4 className={style.p}>Buyer city : {orderDetail.city}</h4>
        <h4 className={style.p}>Buyer address : {orderDetail.address}</h4>
        <h4 className={style.p}>Buyer zipCode : {orderDetail.zipCode}</h4>
        <h4 className={style.p}>Buyer email : {orderDetail.username[0].email}</h4>
        <div className={style.controls}>
          <button className={style.deleteButton} onDoubleClick={HandleDone}>
            Done
          </button>
        </div>
      </div>
    </div>
    </body>
  )
}
