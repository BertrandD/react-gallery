import React, {Component} from 'react';
import './Gallery.scss';
import Photo from './Photo.js';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: -1,
            loading: true,
            xDiff: 0,
            e: 1,
            items: [props.photos.files[0]],
            alb: []
        };

        // this.photos;
        // this.xDown;
        // this.yDown;
        // this.img;
        // this.rect;
        // this.resolution;

        this.handlePhotoClick = this.handlePhotoClick.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        this.close = this.close.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.loadMore = this.loadMore.bind(this);

        if (window.innerWidth > 1280) {
            this.resolution = "1920x1080";
        } else {
            this.resolution = "1280x720";
        }
    }

    handlePhotoClick(photo, alb) {
        this.setState({
            x: "50%",
            photo,
            alb
        });
    }

    prev(e) {
        this.setState({
            photo: this.state.photo - 1
        });
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
    }

    next(e) {
        this.setState({
            photo: this.state.photo + 1
        });
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
    }

    close(e) {
        this.setState({
            photo: -1
        });
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleEvent, false);
        document.addEventListener('touchstart', this.handleTouchStart, false);
        document.addEventListener('touchmove', this.handleTouchMove, false);
        document.addEventListener('touchend', this.handleTouchEnd, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEvent, false);
        document.removeEventListener('touchstart', this.handleTouchStart, false);
        document.removeEventListener('touchmove', this.handleTouchMove, false);
        document.removeEventListener('touchend', this.handleTouchEnd, false);
    }

    handleTouchStart(evt) {
        if (this.img) {
            this.rect = this.img.getBoundingClientRect();
        }
        this.xDown = evt.touches[0].clientX;
        this.yDown = evt.touches[0].clientY;
    }

    handleTouchEnd() {
        if (!this.rect) {
            return;
        }

        if (this.state.xDiff > 0) {
            this.next();
        } else {
            this.prev();
        }

        this.setState({
            x: '50%',
            loading: true,
            xDiff: 0
        });
    }

    handleTouchMove(evt) {
        if (!this.rect) {
            return;
        }

        const xUp = evt.touches[0].clientX;

        const xDiff = this.xDown - xUp;

        this.setState({
            x: (this.rect.x + this.rect.width / 2) - xDiff,
            xDiff
        });
    }

    handleEvent(event) {
        switch (event.keyCode) {
            case 27:
                this.close();
                break;
            case 39:
                this.next();
                break;
            case 37:
                this.prev();
                break;
            default:
                break
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            e: 1,
            items: [newProps.photos.files[0]],
        })
    }

    prevent(e) {
        e.stopPropagation();
    }

    loadMore() {
        if (this.props.photos.files[this.state.e]) {
            this.setState({
                e: this.state.e + 1,
                items: [
                    ...this.state.items,
                    this.props.photos.files[this.state.e]
                ]
            })
            }
    }

    render() {
        const photo = this.state.alb[this.state.photo];

        let staticUrl = this.props.staticUrl;
        if (!staticUrl) {
            staticUrl = "";
        }

        return (
            <section>
                <h1>
                    {this.props.photos.name}<span className="nbPhotos">{this.props.photos.files.length} Photos</span>
                </h1>
                {photo && photo.path && (
                    <div className="BigPhoto" onClick={this.close}>
                        <span className="close" onClick={this.close}>&times;</span>
                        <a className="prev" onClick={this.prev}>&#10094;</a>
                        <a className="next" onClick={this.next}>&#10095;</a>

                        <img ref={(img) => {
                            this.img = img
                        }} onClick={(e) => e.stopPropagation()}
                             onLoad={() => {
                                 this.setState({loading: false})
                             }}
                             style={{left: this.state.x}}
                             className={this.state.loading ? 'hidden' : ''}
                             src={staticUrl + photo.src[this.resolution]} alt=""/>
                        <div className={'Loading ' + (this.state.loading ? '' : 'hidden')}>Chargement...</div>
                        {this.props.size !== "thumb" && (
                            <div className="details" onClick={e => e.stopPropagation()}>
                                <ul>
                                    <li>
                                        Photo prise par {photo.author}
                                    </li>
                                    <li>
                                        Date : {photo.birthtime}
                                    </li>
                                    {/*<li>*/}
                                        {/*<a href={config.staticUrl + photo.path} target="_blank">Voir l'image en grand ({Math.round(photo.size)} Mo)</a>*/}
                                    {/*</li>*/}

                                </ul>
                            </div>
                        )}
                    </div>
                )}
                <div className="Gallery">
                    {this.state.items.map((photo, index) => (<div>
                        <Photo onLoaded={this.loadMore} handleClick={this.handlePhotoClick.bind(null, index, this.props.photos.files)} staticUrl={staticUrl} key={photo.path} photo={photo}
                            size="thumb"/>
                    </div>)
                    )}
                </div>
                {this.props.photos.subalbums && this.props.photos.subalbums.map((sub) => {
                    return (
                        <div key={sub.name}>
                            <h3>
                                {sub.name}<span className="nbPhotos">{sub.files.length} Photos</span>
                            </h3>
                            <div className="Gallery">
                                {sub.files.map((photo, index) => (
                                    <Photo handleClick={this.handlePhotoClick.bind(null, index, sub.files)} staticUrl={staticUrl} key={photo.path} photo={photo}
                                           size="thumb"/>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </section>
        );
    }
}

export default Gallery;
