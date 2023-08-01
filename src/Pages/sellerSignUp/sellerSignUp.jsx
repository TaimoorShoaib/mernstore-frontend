import React, { useState } from "react";
import style from "./sellerSignUp.module.css";
import TextInput from "../../compnents/TextInput/textInput";
import sellerUserRegisterSchema from "../../schemas/selleruserRegisterSchema";
import { useFormik } from "formik";
import { sellerSignup } from "../../api/internal";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SellerSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSellerSignup = async () => {
    const data = {
      username: values.username,
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      country: values.country,
      city: values.city,
      zipCode: values.zipCode,
      phoneNumber: values.phoneNumber,
      companyName: values.companyName,
    };
    const response = await sellerSignup(data);

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
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error message
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      city: "",
      zipCode: "",
      phoneNumber: "",
      companyName: "",
    },
    validationSchema: sellerUserRegisterSchema,
  });

  return (
    <body className={style.orderBody}>
    <div className={style.loginWrapper}>
      <div className={style.loginHeader}>Create a Account</div>

      <TextInput
        type="text"
        value={values.username}
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="enter your username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />
      <TextInput
        type="text"
        value={values.name}
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="enter your name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />
      <TextInput
        type="email"
        value={values.email}
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="enter your email"
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />
      <TextInput
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="enter your password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="enter your password"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />
      <TextInput
        type="text"
        name="country"
        value={values.country}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="enter your country"
        error={errors.country && touched.country ? 1 : undefined}
        errormessage={errors.country}
      />
      <TextInput
        type="text"
        name="city"
        value={values.city}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="enter your city"
        error={errors.city && touched.city ? 1 : undefined}
        errormessage={errors.city}
      />
      <TextInput
        type="text"
        name="zipCode"
        value={values.zipCode}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="enter zipCode"
        error={errors.zipCode && touched.zipCode ? 1 : undefined}
        errormessage={errors.zipCode}
      />
      <TextInput
        type="text"
        name="phoneNumber"
        value={values.phoneNumber}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="enter your phoneNumber"
        error={errors.phoneNumber && touched.phoneNumber ? 1 : undefined}
        errormessage={errors.phoneNumber}
      />
      <TextInput
        type="text"
        name="companyName"
        value={values.companyName}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="enter your companyName"
        error={errors.companyName && touched.companyName ? 1 : undefined}
        errormessage={errors.companyName}
      />
      <button
        className={style.loginButton}
        onClick={handleSellerSignup}
        disabled={
          !values.email ||
          !values.password ||
          !values.username ||
          !values.name ||
          !values.confirmPassword ||
          !values.country ||
          !values.city ||
          !values.zipCode ||
          !values.phoneNumber ||
          !values.companyName ||
          errors.email ||
          errors.password ||
          errors.username ||
          errors.name ||
          errors.confirmPassword ||
          errors.country ||
          errors.city ||
          errors.zipCode ||
          errors.phoneNumber ||
          errors.companyName 
          
        }
      >
        SignUp
      </button>
      <span>
        Already have an account ?
        <button
          className={style.createAccount}
          onClick={() => navigate("/login")}
        >
          Register
        </button>
      </span>
      <span>
        want to become a user ?
        <button
          className={style.createAccount}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </span>
      {error != "" ? <p className={style.errorMessage}>{error}</p> : ""}
    </div>
    </body>
  );
}
