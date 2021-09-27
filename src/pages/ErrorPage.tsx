import React from 'react'
import { palette } from '../assets/theme';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const ErrorWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${palette.white};
    flex-direction: column;

`

const ErrorTitle = styled.h1`
text-align: center;
  
`

const ErrorMessage = styled.p`
    text-align: center;
  
`

function ErrorPage({message}) {
    return (
        <ErrorWrapper>
            <div>
                <ErrorTitle>An Error has occurred</ErrorTitle>
                <ErrorMessage>{message}</ErrorMessage>
            </div>
        </ErrorWrapper>
    )
}

ErrorPage.propTypes = {
    error : PropTypes.object
}



export default ErrorPage

