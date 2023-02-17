import { Link, useLocation } from 'react-router-dom'
import logo from '../images/logo.svg'
//дополнительную мобильную версию не будем делать

function Header({ loggedIn, userEmail, handleLogut }) {
  const location = useLocation();

  function handleSignout() {
    localStorage.removeItem("jwt");
    handleLogut();
  }

  return (
    <header className="header page__header">
      <img src={logo} className="header__logo" alt="Логотип" />

      {loggedIn ? (
        <div className="header__nav">
          <p className="header__email">{userEmail}</p>
          <Link className="header__link-exit button" to='/sign-in' onClick={handleSignout}>Выйти</Link>
        </div>
      ) : location.pathname === "/sign-up" ? (
          <Link className="header__link button" to='/sign-in' onClick={handleSignout}>Войти</Link>
      ) : (
        <Link className="header__link button" to='/sign-up' onClick={handleSignout}>Регистрация</Link>
      )} 
    </header>
  )
}

export default Header