import style from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { logout } from "../../api/internal";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate()
  let isAuthenticated= useSelector(state => state.user.auth)
  let isSeller = useSelector(state => state.user.seller)
  let userId = useSelector(state => state.user._id)

 const dispatch = useDispatch()
const handleSignOut = async ()=>{
      await logout()
      dispatch(resetUser())
}
  return (
    
    <nav className={style.navbar}>
    
      
      <NavLink to="/" className={`${style.logo} ${style.inActiveStyle}`}>
        HyperBounce
      </NavLink>
      
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? style.activeStyle : style.inActiveStyle
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? style.activeStyle : style.inActiveStyle
        }
      >
        products
      </NavLink>

      {isSeller &&(<><NavLink
        to="/product/create"
        className={({ isActive }) =>
          isActive ? style.activeStyle : style.inActiveStyle
        }
      >
        create product  
      </NavLink>
      <NavLink
       to={`/owner/order/${userId}`}
      className={({ isActive }) =>
        isActive ? style.activeStyle : style.inActiveStyle
      }
    >
      Orders
    </NavLink>
    </>
        )}

        {!isSeller  && isAuthenticated && (<NavLink
       to={`/user/product/cart/${userId}`}
      className={({ isActive }) =>
        isActive ? style.activeStyle : style.inActiveStyle
      }
    >
      Cart
    </NavLink>)}

      

      {isAuthenticated ? (
        <div>
          <NavLink>
            <button className={style.signOutButton} onClick={handleSignOut}>
              Sign Out
            </button>
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink
            to="login"
            className={({ isActive }) =>
              isActive ? style.activeStyle : style.inActiveStyle
            }
          >
            <button className={style.logInButton}>Log In</button>
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? style.activeStyle : style.inActiveStyle
            }
          >
            <button className={style.signUpButton}>Sign Up</button>
          </NavLink>
        </div>
      )}
     
      
    </nav>
      
  );
}
