import { styled } from '@mui/material/styles';
import {  alpha, InputBase, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { ReactNode, useState } from 'react';
import { SearchType, SearchTypeList, useSearchStore } from '../../models/search';
import { AlertSeverity, useAlertStore } from '../../models/alert';
import Box from '@mui/material/Box';


const StyledSearch = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.dark, 0.75),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.dark, 0.9)
    },
    marginLeft: 0,
    marginRight: 50,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch'
            }
        }
    }
}));

const SearchTypeSelect = styled(Select)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    color: 'inherit',
    backgroundColor: alpha(theme.palette.primary.dark, 1)
}));

export function Search() {
    const { searchType, setSearchType, setSearchTxtAndType, clearSearchTxt } = useSearchStore();
    const [text, setText] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('searchType.maxLength', searchType.maxLength);
        console.log('event.target.value.length', event.target.value.length);
        setText(event.target.value);
        if (searchType.maxLength === event.target.value.length) {
            console.log('maxLength reached');
            setSearchTxtAndType(event.target.value, searchType);
        }
    };

    const handleSearchTypeChange = (event: SelectChangeEvent<unknown>, child: ReactNode) => {
        const value = event.target.value as SearchType;
        setSearchType(value);
        setText('');
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const pattern = new RegExp(searchType.pattern ?? '.*');
            if (text.length === searchType.maxLength && pattern.test(text)) {
                console.log("enter clear-------------")
                clearSearchTxt();
                setSearchTxtAndType(text, searchType);
            } else {
                useAlertStore.getState().setAlert('Invalid ' + searchType.name, AlertSeverity.ERROR);
            }
        }
    };

    return (
        <StyledSearch>
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <SearchTypeSelect
                    size="small"
                    value={searchType}
                    onChange={handleSearchTypeChange}
                    inputProps={{ 'aria-label': 'search type' }}
                >
                    {SearchTypeList.map((type) => (
                        //@ts-expect-error - necessary to load an object into value
                        <MenuItem key={type.name} value={type}>{type.name}</MenuItem>
                    ))}
                </SearchTypeSelect>
                <Box sx={{ display: 'inline-flex', alignItems: 'start' }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={text}
                        placeholder="Search…"
                        inputProps={{
                            'aria-label': 'search',
                            maxLength: searchType.maxLength,
                            pattern: searchType.pattern ? searchType.pattern : undefined,
                            title: searchType.hint ? 'Input should match this pattern: ' + searchType.hint : 'Input any text'

                        }}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress}
                    />
                </Box>

            </ Box>
        </StyledSearch>
    );
}

export default Search;
