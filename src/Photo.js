import React, { Component } from 'react';
import './Photo.scss';

class Photo extends Component {
    render() {
        const photo = this.props.photo;
        return (
            <div className="Photo">
                <img onLoad={this.props.onLoaded && this.props.onLoaded.bind(null)} onClick={this.props.handleClick && this.props.handleClick.bind(null, photo)} src={this.props.staticUrl + photo.src[this.props.size]} alt=""/>
            </div>
        );
    }
}

export default Photo;
