import { useEffect, useState } from "react";
import { createProduct } from "../../api/internal";
import TextInput from "../../compnents/TextInput/textInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from './updateProduct.module.css';
import { useParams } from "react-router-dom";
import {getProductById} from '../../api/internal'
import { updateProduct } from "../../api/internal";
export default function UpdateProduct() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState('');
  const [decs, setDecs] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const owner = useSelector((state) => state.user._id);
 const params = useParams()
 const productId = params.id

 useEffect(()=>{
    (async function getbyId(){
        const response = await getProductById(productId)
        if(response.status === 200){
            setPhoto(response.data.product.photoPath)
            setDecs(response.data.product.decs)
            setProductName(response.data.product.productName)
            setPrice(response.data.product.price)
        }
    })()
 },[])

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const updateHandler = async () => {
    let data 
    if(photo.includes(`http`)){
    data = {
      productId,
      decs,
      productName,
      price,
      owner
    }
}else{
    data = {
        photo,
        productId,
        decs,
        productName,
        price,
        owner
      }
}
    const response = await updateProduct(data);

    if (response.status === 200) {
      navigate('/');
    } else if (response.code === "401") {
      window.location.reload();
      navigate('/');
    }
  };

  return (
    <body className={style.orderBody}>
    <div className={style.wrapper}>
      <div className={style.header}>Submit your Product</div>
      <TextInput 
        type="text"
        name="productName"
        placeholder="Enter your product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        
      />
      <TextInput 
        type="text"
        name="price"
        placeholder="Enter your product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        
      />
      <textarea
         className={style.content}
        placeholder="Your description goes here"
        value={decs}
        onChange={(e) => setDecs(e.target.value)}
      />
      <div className={style.photoPrompt}>
        <p className="chooseAPhoto">choose an image</p>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/jpg, image/jpeg, image/png"
          onChange={getPhoto}
        />
        {photo !== '' && <img src={photo} width={150} height={150} alt="Product" />}
      </div>
      <button className={style.submit} onClick={updateHandler}>Submit</button>
    </div>
    </body>
  );
}
