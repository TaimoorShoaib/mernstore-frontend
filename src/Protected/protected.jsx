import { Navigate } from "react-router-dom";

export default function Protected({isAuth,isSeller,children}){
if(isAuth){
  
   if(isSeller){
    return children
   }else{
    return children
   }
} else{
    return <Navigate to='/login'/>
}
}