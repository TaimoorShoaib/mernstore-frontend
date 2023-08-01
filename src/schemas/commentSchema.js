import * as yup from 'yup'


const  commentSchema = yup.object().shape({
    content:yup.string().required('please give us review as well'),
    rating:yup.string().min(1).max(5).required('please give us rating as well')
})

export default commentSchema