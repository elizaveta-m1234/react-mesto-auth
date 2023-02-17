import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setPlace('');
    setLink('');
  }, [isOpen]);


  function handleNewPlace(e) {
    setPlace(e.target.value);
  }

  function handleNewLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAddCard(place, link);
  }


  return (
    <PopupWithForm title="Новое место" name="entry" isOpen={isOpen}
          children={<>
            <input onChange={handleNewPlace} value={place} className="popup__input popup__input_type_place" id="input-place" name="place" placeholder="Название" type="text" required minLength="2" maxLength="30" />
            <span className="popup__error input-place-error"></span>
            <input onChange={handleNewLink} value={link} className="popup__input popup__input_type_link" id="input-link" name="link" placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error input-link-error"></span>
          </>}
          onSubmit={handleSubmit} onClose={onClose} buttonText="Создать" />
  )
}

export default AddPlacePopup;