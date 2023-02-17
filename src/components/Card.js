import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
  `element__like ${isLiked && 'element__like_active'}` //имена классов изменила в соответсвии со своей разметкой
);; 

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  
  return (
    <li className="element">
      {isOwn && (
      <button className="element__delete button" onClick={handleDeleteClick} aria-label="Удалить" type="button"></button>)}
      <img onClick={handleClick} src={card.link} className="element__image" alt={card.name} />
      <div className="element__info">
        <h2 className="element__place">{card.name}</h2>
        <div className="element__likes">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится" type="button"></button>
          <span className="element__likes-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )

}

export default Card