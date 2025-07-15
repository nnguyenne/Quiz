import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./LayoutDefault.scss"
import { editUser, getUser } from "../../Services/UserServiecs";
import logo from '../../assets/images/logo.jpg';
import { useState } from "react";

function LayoutDefault() {
  const token = sessionStorage.getItem("token");
  const isLogin = !!token;
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const navLinkActive = (e) => {
    // console.log(e);
    return e.isActive ? "menu__link menu__link--active" : "menu__link"
  }

  const handleLogout = async () => {
    const allUsers = await getUser();
    const foundUser = allUsers.find((user) => user.id === sessionStorage.getItem("id"));

    if (foundUser) {
      const newData = { ...foundUser, token: "" };
      await editUser(foundUser.id, newData);
    }


    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    navigate("/login");
  };


  return (
    <>
      <div className="layoutdefault">
        <header className="layoutdefault__header">
          <div className="layoutdefault__header__logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>


          <div className="layoutdefault__header__toggle" onClick={() => setShowMenu(!showMenu)}>
            ☰
          </div>

          <ul className={`menu ${showMenu ? "menu--active" : ""}`}>
            <li>
              <NavLink to="/" className={navLinkActive}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/Topics" className={navLinkActive}>Topics</NavLink>
            </li>
            <li>
              <NavLink to="/History" className={navLinkActive}>History</NavLink>
            </li>
          </ul>
          <div className="layoutdefault__header__right">
            {isLogin ? (
              <>
                <button className="layoutdefault__header__right--logout" onClick={handleLogout}>Đăng xuất</button>
              </>
            ) : (
              <>
                <div className="layoutdefault__header__right--item">
                  <Link to="/login">Login</Link>
                </div>
                <div className="layoutdefault__header__right--item">
                  <Link to="/register">Register</Link>
                </div>
              </>
            )}
          </div>
        </header>
        <main className="layoutdefault__main">
          <div className="container">
            <Outlet />
          </div>
        </main>

        <footer className="layoutdefault__footer">
          Footer
        </footer>
      </div>

    </>
  )
}

export default LayoutDefault;