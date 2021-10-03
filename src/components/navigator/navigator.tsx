import React from 'react'
import Button from '@mui/material/Button';
import { palette } from '../../assets/theme';
import './navigator.css';

function Navigator(props) {
    return (
        <div className='navParent'>
            <Button onClick={() => props.apiCall(props.prevUrl)} style={{ color: palette.white, backgroundColor: palette.green, fontWeight: 'bold', fontSize: 'larger', borderRadius: '100px', padding: '10px 10px', width: '15%', marginTop: '50px' }}>{'<<'}</Button>
            <p>Page: {props.pageNumber}</p>
            <Button onClick={() => props.apiCall(props.nextUrl)} style={{ color: palette.white, backgroundColor: palette.green, fontWeight: 'bold', fontSize: 'larger', borderRadius: '100px', padding: '10px 10px', width: '15%', marginTop: '50px' }}>{'>>'}</Button>
        </div>
    )
}
export default Navigator

