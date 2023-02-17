import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleNameChange({ target }) {
    setName(target.value);
  }

  function handleDescriptionChange({ target }) {
    setDescription(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
  });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="profile" isOpen={isOpen}
          children={<>
            <input className="popup__input popup__input_type_name" value={name || ''} onChange={handleNameChange} id="input-name" name="name" type="text" required minLength="2" maxLength="40" />
            <span className="popup__error input-name-error"></span>
            <input className="popup__input popup__input_type_occupation" value={description || ''} onChange={handleDescriptionChange} id="input-occupation" name="about" type="text" required minLength="2" maxLength="200" />
            <span className="popup__error input-occupation-error"></span>
          </>}
          onSubmit={handleSubmit} onClose={onClose} buttonText="Сохранить" />
  )
}

export default EditProfilePopup