import './charList.scss';
import MarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import { Spinner } from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = () => {

    const marvelService = new MarvelService();

    const [state, setState] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        marvelService.getAllCharacters()
            .then(res => {
                setState(res);
                setLoading(false)
                setError(false)
            })
            .catch(() => {
                setError(true)
                setLoading(false)
            });
            
    })

    const renderItems = (arr) => {
        let items = arr.map(item => {
            
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail.indexOf('image_not_available.jpg') > - 1) {
                imgStyle = {'objectFit': 'unset'};
            }
            return (
                <li 
                    className="char__item" 
                    key={item.id}
                    
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        return items;
    };

    const lists = renderItems(state);

    const content = (
        <ul className="char__grid">
            {lists}
        </ul>
    )

    return (
        <div className="char__list">
            {loading && <Spinner/>}
            {error && <ErrorMessage/>}
            {!(loading || error) && content}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;