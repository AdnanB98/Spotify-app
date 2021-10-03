import React, { FC } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { palette } from '../../assets/theme';
import styled from 'styled-components';
import './searchBar.css';


interface SearchBarProps {
    handleChange: any;
    placeholder: string;
    onClick?: any;
    value: string;
}

const SearchBar: FC<SearchBarProps> = (props) => {
    const onEnter = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
            props.onClick();
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '50pt' }}>
            <input className='TextInput' value={props.value} onKeyDown={onEnter} name="artistName" onChange={props.handleChange} placeholder={props.placeholder} />
            <Button variant="contained" onClick={props.onClick} style={{ backgroundColor: palette.white, borderRadius: '0 5px 5px 0', boxShadow: 'none', border: '0' }}>
                <SearchIcon sx={{ color: palette.green }} fontSize='large' />
            </Button>
        </div>
    )
}



export default SearchBar
