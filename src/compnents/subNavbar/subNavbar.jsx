import style from "./subNavbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { resetUser } from "../../store/userSlice";
import { logout } from "../../api/internal";
import { useNavigate } from "react-router-dom";
export default function SubNavbar() {
  const navigate = useNavigate()
  let isAuthenticated= useSelector(state => state.user.auth)
  let isSeller = useSelector(state => state.user.seller)
  let userId = useSelector(state => state.user._id)

 const dispatch = useDispatch()

  return (
    
    <nav className={style.navbar}>
    
      
      
      
      <NavLink
        to="/product/kitchenItem"
        className={({ isActive }) =>
          isActive ? style.activeStyle : style.inActiveStyle
        }
      >
        kitchenItem
      </NavLink>

      <NavLink
        to="/product/computerproduct"
        className={({ isActive }) =>
          isActive ? style.activeStyle : style.inActiveStyle
        }
      >
        computerProduct
      </NavLink>
      <NavLink
        to="/product/smartPhone"
        className={({ isActive }) =>
          isActive ? style.activeStyle : style.inActiveStyle
        }
      >
        smartPhone
      </NavLink>
      <NavLink
        to="/product/speakers"
        className={({ isActive }) =>
          isActive ? style.activeStyle : style.inActiveStyle
        }
      >
        speakers
      </NavLink>
      <NavLink
        to="/product/others"
        className={({ isActive }) =>
          isActive ? style.activeStyle : style.inActiveStyle
        }
      >
        others
      </NavLink>


      
    </nav>
      
  );
}
