import TextInput from "../../compnents/TextInput/textInput";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./cartBuy.module.css";
import buyProductRegisterSchema from '../../schemas/BuyProductSchema'
import { orderCart } from "../../api/internal";

export default function CartBuy(){
    
    const navigate = useNavigate()

    const userId = useSelector((state)=>state.user._id)

    const handleSubmit = async () => {
    
        const data = {
          country: values.country,
          city: values.city,
          address: values.address,
          zipCode: values.zipCode,
          phoneNumber: values.phoneNumber,
          usernameId: userId, // Change values.password to values.usernameId
        };
        const response = await orderCart(data);
      
        if (response.status === 200) {
          // set user
           navigate('/')
      
         
        } else if (response.code === 'ERR_BAD_REQUEST') {
          // display error message
          console.log("Error")
        }
      };
      
      const { values, touched, handleBlur, handleChange, errors } = useFormik({
        initialValues: {
          country: '',
          city: '',
          address: '',
          zipCode: '',
          phoneNumber: '',
        },
        validationSchema: buyProductRegisterSchema,
      });
   
    return(
      <body className={style.orderBody}>
        
            <div className={style.buy}>
              <h2 className={style.almostDone}>You are almost done</h2>
            <TextInput
        type='text'
        value={values.country}
        name='country'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your country'
        error={errors.country && touched.country ? 1 : undefined}
        errormessage={errors.country}
      />
      <TextInput
        type='text'
        name='city'
        value={values.city }
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your city'
        error={errors.city && touched.city ? 1 : undefined}
        errormessage={errors.city}
      />
       <TextInput
        type='text'
        value={values.address}
        name='address'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your address'
        error={errors.address && touched.address ? 1 : undefined}
        errormessage={errors.address}
      />
      <TextInput
        type='text'
        name='zipCode'
        value={values.zipCode }
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your zipCode'
        error={errors.zipCode && touched.zipCode ? 1 : undefined}
        errormessage={errors.zipCode}
      />
       <TextInput
        type='text'
        name='phoneNumber'
        value={values.phoneNumber }
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your phoneNumber'
        error={errors.phoneNumber && touched.phoneNumber ? 1 : undefined}
        errormessage={errors.phoneNumber}
      />
            

                <button className={style.buyButton}   onClick={handleSubmit}>Buy</button> 
             </div>
             </body>
    )
}