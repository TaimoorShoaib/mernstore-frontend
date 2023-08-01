import * as yup from 'yup'

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = 'use uppercase , lowercase and digits'

const  sellerUserRegisterSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required('username is required'),
    name: yup.string().max(30).required('name is required'),
    email: yup.string().email('Enter a valid Email').required('Email is required'),
    password: yup.string().min(8).max(25).matches(passwordPattern,{message:errorMessage}).required ('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')],'passwords must match ').required('confirmPassword is required'),
    country:yup.string().required('country is required'),
    city:yup.string().required('city is required'),
    zipCode:yup.string().required('zipCode is required'),
    phoneNumber:yup.string().required('phoneNumber is required'),
    companyName: yup.string().min(5).max(25).required('companyName is required')
})

export default sellerUserRegisterSchema