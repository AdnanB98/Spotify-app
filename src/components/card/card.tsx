import React, { FC } from 'react'
import { palette } from '../../assets/theme';
import StarRatings from 'react-star-ratings';
import './card.css';

interface CardProps {
    title: string;
    subtitle: string;
    image?: string;
    previewLink?: string;
    numberOfTracks?: string;
    rating?: number;
    albumReleaseDate?: string;
    isArtist?: boolean;

}

const Card: FC<CardProps> = props => {
    return (
        <div className="CardWrapper">
            <div className='ImageWrapper'>
                <img className='Image' alt='artist' src={props.image ? props.image : 'https://i2.wp.com/mattymacchiato.com/wp-content/uploads/2019/02/spotify-logo.png?w=386&ssl=1'}></img>
            </div>
            <div className='CardInfo'>
                <div style={{ padding: '10px', margin: '15px 0px' }}>
                    <p className='Title'>{props.title}</p>
                    <p className='SubTitle'>{props.subtitle}
                        {
                            props.isArtist && ' Followers'
                        }
                    </p>
                </div>

                <div style={{ padding: '10px' }}>
                    {
                        props.isArtist ? (<StarRatings
                            rating={props.rating / 20}
                            starRatedColor={palette.green}
                            starEmptyColor={palette.black}
                            numberOfStars={5}
                            name='rating'
                            starDimension='25px'
                            starSpacing='3px'
                        />) : (
                            <>
                                <p>{props.albumReleaseDate}</p>
                                <p>{props.numberOfTracks}&nbsp;tracks</p>
                            </>)
                    }

                </div>
                {
                    !props.isArtist && <button className="PreviewButton"><a href={props.previewLink}>Preview on Spotify</a> </button>
                }

            </div>
        </div>
    )
}


export default Card
