import { useRef } from "react";
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={isOpen}
          children={<>
            <input className="popup__input popup__input_type_link" id="avatar-link" name="link" placeholder="Ссылка на картинку"
              type="url" required ref={avatarRef}/>
            <span className="popup__error avatar-link-error"></span>
          </>}
          onSubmit={handleSubmit} onClose={onClose} buttonText="Сохранить" />
  )
}

export default EditAvatarPopup