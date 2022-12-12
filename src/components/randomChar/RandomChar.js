import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import { Spinner } from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
    
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    
    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvelService
            .getCharacter(id)
            .then(res => {
                setState(res);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            })
        
    }

    useEffect(() => {
        updateChar();
    }, [])

   

    return (
        <div className="randomchar">
            {loading && <Spinner/>}
            {error && <ErrorMessage/>} 
            {!(error || loading) && <View char={state} />}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div 
                        className="inner"
                        onClick={updateChar}
                    >try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char;
    const clazz = thumbnail.indexOf('image_not_available.jpg') > - 1 ? "randomchar__img_center" : "randomchar__img"
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={clazz}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} 
                        className="button button__main"
                        target='blank'
                    >
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} 
                        className="button button__secondary"
                        target='blank'
                    >
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;