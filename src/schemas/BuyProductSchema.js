import * as yup from 'yup'


const  buyProductRegisterSchema = yup.object().shape({
    country:yup.string().required('country Name is required'),
    city:yup.string().required('city Name is required'),
    address:yup.string().required('address  is required') ,
    zipCode:yup.string().required('zipCode is required'),
    phoneNumber:yup.string().required('phoneNumber is required') ,

})

export default buyProductRegisterSchema