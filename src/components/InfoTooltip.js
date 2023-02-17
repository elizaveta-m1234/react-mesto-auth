import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip({ isSuccess, isFail, onClose }) {
  return (
    <div className= { isSuccess ? "popup popup_is-opened" : isFail ? "popup popup_is-opened" : "popup" }>
      <div className="popup__content">
        <button onClick={onClose} className="popup__close button" aria-label="Закрыть" type="button"></button>
        <img className="popup__image" src={isSuccess ? success : fail} />
        <h3 className="popup__message">{isSuccess? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip