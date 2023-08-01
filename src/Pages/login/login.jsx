import React, { useState } from 'react';
import style from './login.module.css';
import TextInput from '../../compnents/TextInput/textInput';
import loginSchema from '../../schemas/loginSchema';
import { useFormik } from 'formik';
import { login } from '../../api/internal';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const data = {
      email: values.email,
      password: values.password,
    };
    const response = await login(data);

    if (response.status === 200) {
      // set user
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
        seller: response.data.user.seller,
      };
      dispatch(setUser(user));
      // redirect -> homePage
      navigate('/');
    } else if (response.code === 'ERR_BAD_REQUEST') {
      // display error message
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
  });

  return (
    <body className={style.orderBody}>
    <div className={style.loginWrapper}>
      <div className={style.loginHeader}>login to your Account</div>
      <TextInput
        type='email'
        value={values.email}
        name='email'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your email'
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />
      <TextInput
        type='password'
        name='password'
        value={values.password }
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your password'
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <button className={style.loginButton} onClick={handleLogin} disabled={
                  !values.email || !values.password ||  errors.email || errors.password 
                }>
        Login
      </button>
      <span>
        Don't have an account ?<button className={style.createAccount} onClick={()=>navigate('/register')}>Register</button>
      </span>
      <span>
        want to become a seller ?<button className={style.createAccount} onClick={()=>navigate('/registerseller')}>Register</button>
      </span>
      
      {error != '' ? <p className={style.errorMessage}>{error}</p> : ''}
    </div>
    </body>
  );
}
