import axios from 'axios'


const api = axios.create({
    baseURL:`http://localhost:5000`,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
});

export const login = async (data)=>{ 
    let response
    try {
         response =await api.post('/login',data)
    } catch (error) {
        return error
    }

    return response
}
export const signup = async (data)=>{ 
    let response
    try {
         response =await api.post('/register',data)
    } catch (error) {
        return error
    }

    return response
}
export const sellerSignup = async (data)=>{ 
    let response
    try {
         response =await api.post('/registerseller',data)
    } catch (error) {
        return error
    }

    return response
}
export const logout = async ()=>{ 
    let response
    try {
         response =await api.post('/logout')
    } catch (error) {
        return error
    }

    return response
}
export const getAll = async ()=>{ 
    let response
    try {
         response =await api.get('/products')
    } catch (error) {
        return error
    }

    return response
}
export const createProduct = async (data)=>{ 
    let response
    try {
         response =await api.post('/product/create',data)
    } catch (error) {
        return error
    }

    return response
}
export const getProductById = async (id)=>{ 
    let response
    try {
         response =await api.get(`/product/${id}`)
    } catch (error) {
        return error
    }

    return response
}
export const createReview = async (data)=>{ 
    let response
    try {
         response =await api.post('/comment',data)
    } catch (error) {
        return error
    }

    return response
}
export const getReviewById = async (id)=>{ 
    let response
    try {
         response =await api.get(`/comment/${id}`,{
            validateStatus:false
         })
    } catch (error) {
        return error
    }

    return response
}
export const submitProduct = async (data)=>{ 
    let response
    try {
         response =await api.post('/product/submit/:id',data)
    } catch (error) {
        return error
    }

    return response
}
export const deleteProduct = async (id)=>{ 
    let response
    try {
         response =await api.delete(`/product/${id}`)
    } catch (error) {
        return error
    }

    return response
}
export const updateProduct = async (data)=>{ 
    let response
    try {
         response =await api.put(`/product`,data)
    } catch (error) {
        return error
    }

    return response
}
export const getByIdOrders = async (id)=>{ 
    let response
    try {
         response =await api.get(`/owner/order/${id}`)
    } catch (error) {
        return error
    }

    return response
}
export const getByIdDetailOrder = async (id)=>{ 
    let response
    try {
         response =await api.get(`/owner/order/detail/${id}`)
    } catch (error) {
        return error
    }

    return response
}
export const deleteByIdDetailOrder = async (id)=>{ 
    let response
    try {
         response =await api.delete(`/owner/order/detail/delete/${id}`)
    } catch (error) {
        return error
    }

    return response
}
export const addToCart = async (data)=>{ 
    let response
    try {
         response =await api.post(`/user/product/cart`,data)
    } catch (error) {
        return error
    }

    return response
}
export const getCartById = async (id)=>{ 
    let response
    try {
         response =await api.get(`/user/product/cart/${id}`)
    } catch (error) {
        return error
    }

    return response
}
export const orderCart = async (data)=>{ 
    let response
    try {
         response =await api.post(`/user/product/cart/buy`,data)
    } catch (error) {
        return error
    }

    return response
}
export const removeCartProduct = async (id)=>{ 
    let response
    try {
         response =await api.delete(`/user/product/cart/${id}`)
    } catch (error) {
        return error
    }

    return response
}
export const numOfProduct = async (data)=>{ 
    let response
    try {
         response =await api.post(`/product/number/amount`,data)
    } catch (error) {
        return error
    }

    return response
}
export const numOfProductCart = async (data)=>{ 
    let response
    try {
         response =await api.post(`/product/cart/number/amount`,data)
    } catch (error) {
        return error
    }

    return response
}