import React, { useState } from 'react';
import style from './signup.module.css';
import TextInput from '../../compnents/TextInput/textInput';
import userRegisterSchema from '../../schemas/userRegisterSchema';
import { useFormik } from 'formik';
import { signup } from '../../api/internal';
import { setUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleSignup = async () => {
    const data = {

      username: values.username,
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    const response = await signup(data);

    if (response.status === 201) {
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
      username: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: userRegisterSchema,
  });

  return (
    <body className={style.orderBody}>
    <div className={style.loginWrapper}>
      <div className={style.loginHeader}>Create a Account</div>
      
      <TextInput
        type='text'
        value={values.username}
        name='username'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your username'
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />
      <TextInput
        type='text'
        value={values.name}
        name='name'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your name'
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />
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
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your password'
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <TextInput
        type='password'
        name='confirmPassword'
        value={values.confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder='enter your password'
        error={errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
        errormessage={errors.confirmPassword}
      />
      <button className={style.loginButton} onClick={handleSignup} disabled={
                  !values.email || !values.password || !values.username || !values.name || !values.confirmPassword ||  errors.email || errors.password || errors.username || errors.name || errors.confirmPassword
                }>
      SignUp
      </button>
      <span>
        Already have an account ?<button className={style.createAccount} onClick={()=>navigate('/login')}>Register</button>
      </span>
      <span>
        want to become a seller ?<button className={style.createAccount} onClick={()=>navigate('/registerseller')}>Register</button>
      </span>
      {error != '' ? <p className={style.errorMessage}>{error}</p> : ''}
    </div>
    </body>
  );
}
