import React from 'react';
import { Container, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function GlobalFilter({filter, setFilter, data}) {
    const handleChange = e => {
        // const keyword = e.target.value;
        // const filtered = data.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));
        const dataItem = data.map((itm) => {
            return itm.dpNo;
        })
       // setFilter(e.target.value);
        var str = "DP - ";
        // let val1 = e.target.value.replace(str, '');
        // let int = parseInt(val1);
        // console.log(int," int val")
        // e.target.value = int;
        if(dataItem.includes(parseInt(e.target.value.replace(str, '')))){
            setFilter(parseInt(e.target.value.replace(str, '')));
        } else {
            setFilter(e.target.value);
        }
    };
    // var str = "DP - ";
    // let val2;
    // if(![null, undefined].includes(filter)){
    //     let val1 = filter.replace(str, '');
    //     val2 = val1;
    //     return val2;
    // }
    // console.log(val2,"val2")
    return (
        <div className='search-container'>
            <div className='searchIcon'>
                <SearchIcon />
            </div>
            <Container maxWidth="md" sx={{ mt: 20 }} className='searchTextField'>
                <TextField
                    type="search" 
                    placeholder='Search by name, mobile or email' 
                    value={filter || ''}  
                    onChange={handleChange} 
                    sx={{ width: 400 }}
                />
            </Container>
        </div>
    )
}
export default GlobalFilter;
