import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleSignup}) {
  const [userData, setUserData] = useState({ email: "", password: "" });
  
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { password, email } = userData;
    handleSignup(password, email);
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
            <input className="auth__input" name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Email"/>
            <input className="auth__input" name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Пароль"/>
            <button className="auth__button button" type="submit">Зарегистрироваться</button>
          </form>
        <Link to="/sign-in" className="auth__link button">Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  )
}

export default Register