import React from 'react'
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { palette } from '../assets/theme';


const LoaderWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

function loader(props) {
    return (
        <LoaderWrapper>
            <CircularProgress sx={{color: palette.green}}/>
        </LoaderWrapper>
    )
}



export default loader

