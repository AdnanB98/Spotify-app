import React from 'react'
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { palette } from '../../assets/theme';
import './loader.css';


// const LoaderWrapper = styled.div`
//     height: 100vh;
//     width: 100vw;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `

function loader(props) {
    return (
        <div className="loader">
            <CircularProgress sx={{color: palette.green}}/>
        </div>
    )
}



export default loader

