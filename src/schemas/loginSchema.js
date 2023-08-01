import * as yup from 'yup'


const  loginSchema = yup.object().shape({
    email:yup.string().min(5).email().required('email is required'),
    password:yup.string().min(8).max(25).required('password is required')
})

export default loginSchema