import React from 'react'
import { Col } from 'antd'
import styled from 'styled-components'

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 16px;
  display: flex;
  align-items: left;
  justify-content: flex-start;
  flex-direction: column;
  text-align: left;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  &:hover ${ImageOverlay} {
    opacity: 1;
  }
  background-color: #373B69;
  color: white;
`;

function GridCards(props) {
  if (props.landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
          <ImageWrapper>
              <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.characterName}/>
              <p style={{margin: '5px'}}>{props.movieName}</p><p style={{margin: '5px'}}>{props.vote}</p>
              <a href={`/movie/${props.movieId}`}>
              <ImageOverlay>
              <p style={{fontWeight: "bold"}}>{props.movieName}</p>
              <p>{props.movieDes}</p>
              </ImageOverlay>
              </a>
          </ImageWrapper>
      </Col>
    )
  }
  else if (props.character) {
    return (
      <Col lg={6} md={8} xs={24}>
        <ImageWrapper>
              <img style={{width: '100%', height: '320px'}} src={props.image ? props.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s'}
               alt={props.characterName}/>
              <p style={{margin: '5px'}}>{props.characterName}</p>
          </ImageWrapper>
          {/* <div style={{position: 'relative'}}>
              <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.characterName}/>
          </div> */}
      </Col>
    )
  }
else {
  return (
    <Col lg={6} md={8} xs={24}>
        <div style={{position: 'relative'}}>
            <a href={`/movie/${props.movieId}`}>
                <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.movieName}/>
            </a>
        </div>
    </Col>
  )
}
}

export default GridCards
