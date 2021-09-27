import React, { FC } from 'react'
import styled from 'styled-components';
import { palette } from '../assets/theme';
import StarRatings from 'react-star-ratings';

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
const CardWrapper = styled.div`
  background-color: ${palette.white};
  display: flex;
  //flex: 2 0 21%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  max-width: 400px;
  max-height: 640px;
  min-width: 400px;
  min-height: 640px; 
  word-wrap: break-word;
`
const ImageWrapper = styled.img`
  width: 100%;
  height: 100%;
  //object-fit: cover;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${palette.green};

  
`
const CardInfo = styled.div`
  background-color: ${palette.white};
  display: flex;
  flex: 0.5;
  flex-direction: column;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  flex-grow: 1;
`
const PreviewButton = styled.button`
  background-color: ${palette.green};
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-width: 0;
  font-size: medium;
  padding: 5px;
  color: ${palette.green};
  font-weight: bold;
  font-size: larger;
`
const Title = styled.p`
    font-size: 1.5em;
    font-weight: bold;
    margin: 0;
    margin-bottom: 8px;
`
const SubTitle = styled.p`
    font-size: 1em;
    margin: 0;
`


const Card: FC<CardProps> = props => {
    return (
        <CardWrapper>
            <ImageWrapper src={props.image? props.image: 'https://i2.wp.com/mattymacchiato.com/wp-content/uploads/2019/02/spotify-logo.png?w=386&ssl=1'}></ImageWrapper>

            <CardInfo>
                <div style={{ padding: '10px', margin: '15px 0px' }}>
                    <Title>{props.title}</Title>
                    <SubTitle>{props.subtitle}
                        {
                            props.isArtist && ' Followers'
                        }
                    </SubTitle>
                </div>

                <div style={{ padding: '10px' }}>
                    {
                        props.isArtist ? (<StarRatings
                            rating={props.rating/20}
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
                    !props.isArtist && <PreviewButton><a href={props.previewLink}>Preview on Spotify</a> </PreviewButton>
                }

            </CardInfo>
        </CardWrapper>
    )
}


export default Card
