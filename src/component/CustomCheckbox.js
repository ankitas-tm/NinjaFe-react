import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import PropTypes from 'prop-types';


function CustomCheckbox({items, changeFun, targetedData}) {
    console.log(items,"items")
    return (
        <FormGroup>
            <FormControlLabel control={
                <Checkbox 
                    name={items.name}  
                    value={items.email}
                    checked={targetedData.includes(items.email)}
                    onChange={changeFun}
                />
            } 
            label={items.name} />
        </FormGroup>
    )
}

CustomCheckbox.propTypes = {
    items: PropTypes.array,
    changeFun: PropTypes.func,
    targetedData: PropTypes.array
};

export default CustomCheckbox;