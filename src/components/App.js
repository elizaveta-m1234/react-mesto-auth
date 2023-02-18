//"Мобильные версии — дополнительное задание. Оно поможет вспомнить вёрстку. Если будет время, потренируйтесь".
//Ах, если бы... Т_Т

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { auth } from '../utils/auth';

function App() {
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isAddPlacePopupOpened, setAddPlacePopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurentUser] = useState({});
  const [cards, setCards] = useState([]);
  //Авторизация
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(""); 

  
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([profile, cards])=>{ //попадаем сюда, когда оба промиса будут выполнены
          setCurentUser(profile)
          setCards(cards)
        })
        .catch((err)=>{ //попадаем сюда если один из промисов будет завершаться ошибкой
          console.log(err);
        })
    } 
  }, [loggedIn]);

// Открываем попапы
  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpened(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

//Закрываем попапы

  function closeAllPopups() {
    setIsEditProfilePopupOpened(false);
    setIsEditAvatarPopupOpened(false);
    setAddPlacePopupOpened(false);
    setSelectedCard(null);
  }
//работа с карточками
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }
//работа с профайлом
  function handleUpdateUser({ name, about }) {
    api.editProfile(name, about)
      .then((profile) => {
        setCurentUser(profile);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    api.editAvatar(avatar)
      .then((profile) => {
        setCurentUser(profile);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }
//Авторизация
  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogut() {
    setLoggedIn(false);
  }
  
  function handleSignup(password, email) {
    auth.register(password, email)
      .then(() => {
        setIsSuccess(true); //не осуществлять перенаправление, т.к. попап тут же исчезает!!!
      })
      .catch((err) => {
        console.log(err);
        setIsFail(true);
      })
  }

  function handleSignin(userData) {
    auth.authorize(userData.password, userData.email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleLogin();
          setUserEmail(userData.email);
          navigate('/mesto', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err);
        setIsFail(true);
      })
  }

  function closeResponsePopup() {
    if (isSuccess) {
      setIsSuccess(false);
      navigate('/sign-in', { replace: true }); //перенаправление только после закрытия
    } else {
      setIsFail(false);
    }
  }

  //для повторного входа
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth.getContent(token)
        .then((res) => {
          handleLogin();
          setUserEmail(res.data.email);
          navigate('/mesto');
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} userEmail={userEmail} handleLogut={handleLogut} />
        <Routes>
          <Route path='/' element={loggedIn ? <Navigate to="/mesto" replace /> : <Navigate to="/sign-up" replace />} />
          <Route path='/sign-up'
            element={
              <>
                <Register handleSignup={handleSignup} />
              </>
            } />
          <Route path='/sign-in'
            element={
              <Login handleSignin={handleSignin}/>
            }
          />
          <Route path='/mesto'
            element={
              <>
                <ProtectedRoute loggedIn={loggedIn}
                  element={Main}
                    onEditProfile={handleEditProfileClick} // по факту здесь происходит вызов Main(onEditProfile)...
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}             
                />
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpened} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpened} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                
                <AddPlacePopup isOpen={isAddPlacePopupOpened} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} />
                
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </>
          } />
        </Routes>
        <InfoTooltip isSuccess={isSuccess} isFail={isFail} onClose={closeResponsePopup} />
      </div>
    </CurrentUserContext.Provider>
      
  );
}

export default App;
