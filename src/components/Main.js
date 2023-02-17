import { useContext } from 'react';
import edit_avatar from '../images/edit_avatar.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main page__main">
      <section className="profile page__profile">
            
        <div className="profile__data">
          <div className="profile__avatar-place">
            <button onClick={onEditAvatar} className="profile__avatar-btn" aria-label="Изменить">
              <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})`, backgroundSize: 'cover' }}></div>
              <img className="profile__hover" src={edit_avatar}></img>
            </button>
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={onEditProfile} className="profile__edit-button button" aria-label="Изменить" type="button"></button>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
        </div>

        <button onClick={onAddPlace} className="profile__add-button button" aria-label="Добавить" type="button"></button>
      </section>
      
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} /> /*пропсы, не забыть key, чтобы отличать карточки друг от друга*/
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main