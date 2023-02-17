import { useState } from "react";

function Login({ handleSignin }) {
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

    if (!userData.email || !userData.password) {
      return;
    }

    handleSignin(userData);
    setUserData({ email: "", password: "" });
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
            <input className="auth__input" name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Email"/>
            <input className="auth__input" name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Пароль"/>
            <button className="auth__button button" type="submit">Войти</button>
          </form>
      </div>
    </div>
  )
}

export default Login