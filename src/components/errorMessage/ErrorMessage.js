import imgError from './error.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <img src={imgError} alt="error" className='errorMessage'/>
    )
}

export default ErrorMessage;