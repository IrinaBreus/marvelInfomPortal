

class MarvelService {

    
    _apiBase = process.env.REACT_APP_DOMAIN;
    _apiKey = process.env.REACT_APP_API_KEY;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(this._apiBase + 'characters?limit=9&offset=210&apikey=' + this._apiKey);
        return res.data.results.map(this._transformCharacter);
    }
    
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }
    
    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url

        }
    }
}

export default MarvelService;