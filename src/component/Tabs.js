import React from "react";

const Tabs = ({menuItems}) => {

    return (
        <div className="menu-items">
            {
                menuItems.map((item) => (
                <a className="App-link" href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                ))
            }
        </div>
  
    );
  };
    
  export default Tabs;