function ImagePopup({ onClose, card}) {
  return (
    <div className={ card ? 'popup_is-opened popup popup_type_picture' : 'popup popup_type_picture'}>
      <div className="popup__container">
        <button onClick={onClose} className="popup__close button" aria-label="Закрыть" type="button"></button>
        <img src={card ? card.link : ''} className="popup__picture" alt={card ? card.name: ''} />
        <h2 className="popup__caption">{card ? card.name: ''}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;