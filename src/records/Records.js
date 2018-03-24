import React, {Component} from 'react';
import Audio from "../audio/Audio";
import "./Records.css"

class Records extends Component {

    constructor(p) {
        super(p);

        this.state = {
            selected: -1
        };

        this.handleSelectSong = this.handleSelectSong.bind(this);
    }

    handleSelectSong(index) {
        this.setState({
            selected: index
        })
    }

    render() {
        const { albums, songs } = this.props;
        let index = -1;

        return (
            <section>
                <h1>Enregistrements</h1>
                <Audio songs={songs} selected={this.state.selected}/>
                {albums.map((album) => (
                    <div key={album.name}>
                        <h3>{album.name}</h3>
                        {album.description && (
                            <p dangerouslySetInnerHTML={{__html: album.description}}>
                            </p>
                        )}
                        <dl>
                        {album.songs.map((song) => {
                            index++;
                            return (
                                    <dt onClick={this.handleSelectSong.bind(null, index)} key={song.name}>{song.name}</dt>
                                )
                        })}
                        </dl>
                    </div>
                ))}
            </section>
        );
    }
}

export default Records;
