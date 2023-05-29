import React from "react";
import  GlobalFilter from './SearchBox';
import Notifications from '@mui/icons-material/Notifications';
import Menu from '@mui/icons-material/Menu';

function Header({globalFilter, setGlobalFilter, data}) {
    return (
        <div className="App-header">
            <Menu className="menu" />
            <Notifications className="notification" />
            <div className="App-searchBox">
                <GlobalFilter filter={globalFilter}  setFilter={setGlobalFilter} data={data}/>
            </div>
        </div>
    )
}

export default Header;