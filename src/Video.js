import React, { Component } from 'react';
import './Video.scss';

class Video extends Component {
    render() {
        const src = this.props.src;
        return (
            <video controls src={src}>Votre navigateur ne supporte pas le lecteur vidéo HTML5, merci de mettre
                à jour votre navigateur</video>
        );
    }
}

export default Video;
