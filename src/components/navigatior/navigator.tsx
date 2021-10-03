import React from 'react'
import Button from '@mui/material/Button';
import { palette } from '../../assets/theme';
import './navigator.css';

interface NavProps {
    nextUrl: string;
    prevUrl: string;
    apiCall: Function;
}
function Navigator(props) {
    return (
        <div className='navParent'>
            <Button onClick={() => props.apiCall(props.prevUrl)} style={{ color: palette.green, backgroundColor: palette.black, fontWeight: 'bold', fontSize: 'larger', borderRadius: '100px', padding: '15px 15px', width: '20%' }}>{'<<'}</Button>
            <p>Page</p>
            <Button onClick={() => props.apiCall(props.nextUrl)} style={{ color: palette.green, backgroundColor: palette.black, fontWeight: 'bold', fontSize: 'larger', borderRadius: '100px', padding: '15px 15px', width: '20%' }}>{'>>'}</Button>
        </div>
    )
}
export default Navigator

