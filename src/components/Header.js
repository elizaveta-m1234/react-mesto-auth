import { Link, useLocation } from 'react-router-dom'
import logo from '../images/logo.svg'
//дополнительную мобильную версию не будем делать

function Header({ loggedIn, userData }) {
  const location = useLocation();

  function handleSignout() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className="header page__header">
      <img src={logo} className="header__logo" alt="Логотип" />

      {loggedIn ? (
        <div className="header__nav">
          <p>{userData.email}</p>
          <Link className="header__link" to='/sign-in' onClick={handleSignout}>Выйти</Link>
        </div>
      ) : location.pathname === "/sign-up" ? (
          <Link className="header__link" to='/sign-in' onClick={handleSignout}>Войти</Link>
      ) : (
        <Link className="header__link" to='/sign-up' onClick={handleSignout}>Регистрация</Link>
      )} 
    </header>
  )
}

export default Header