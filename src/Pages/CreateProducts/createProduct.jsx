import { useState } from "react";
import { createProduct } from "../../api/internal";
import TextInput from "../../compnents/TextInput/textInput";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from './createProduct.module.css';

export default function CreateProduct() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState('');
  const [decs, setDecs] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [numOfProduct, setNumOfProduct] = useState();
  const [type1,setType1]=useState('')

  const owner = useSelector((state) => state.user._id);

  const getPhoto = async (e) => {
   try {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
   } catch (error) {
     console.log("please pick an image")
   }
   
  };

  const handleSubmit = async () => {
    const data = {
      photo,
      decs,
      productName,
      price,
      owner,
      numOfProduct,
      type:type1
    };
    const response = await createProduct(data);

    if (response.status === 201) {
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
        name="title"
        placeholder="Enter your product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        style={{ with: `60%` }}
      />
      <TextInput 
        type="text"
        name="price"
        placeholder="Enter your product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        
      />
        <TextInput 
        type="number"
        name="numOfProduct"
        placeholder="Enter your number of products you have"
        value={numOfProduct}
        onChange={(e) => setNumOfProduct(e.target.value)}
        
      />
       <div>
          <p>Enter product type</p>
          <select value={type1} onChange={(e) => setType1(e.target.value)}>
            <option value="">Select Type</option>
            <option value="kitcehItem">kitcehItem</option>
            <option value="computerProduct">computerProduct</option>
            <option value="speakers">speakers</option>
            <option value="smartPhone">smartPhone</option>
            <option value="others">others</option>
          </select>
        </div>
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
        {photo !== '' && <img className={style.renderdimg} src={photo} width={150} height={150} alt="Product" />}
      </div>
      <button className={style.submit} onClick={handleSubmit}>Submit</button>
    </div>
    </body>
  );
}
