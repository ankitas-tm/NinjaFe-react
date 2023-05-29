import React from "react";
import { Select, MenuItem } from "@mui/material";
import Funnel from '@mui/icons-material/FilterAltOutlined';
import FormLabel from '@mui/material/FormLabel';
import { PropTypes } from "prop-types";

function SelectComponent({options, changeFun, value, customClassWrapper, labelName}) {
    return (
        <Select onChange={changeFun} value={value} IconComponent = {Funnel} className={customClassWrapper}>
            {labelName !== undefined && <FormLabel component="legend">{labelName}</FormLabel>}
            {options.map((option, index) => (
                <MenuItem value={option.value} selected={index === option.value}>{option.displayName}</MenuItem>
            ))}
        </Select> 
    )
}
SelectComponent.propTypes = {
    options: PropTypes.array,
    changeFun: PropTypes.func,
    value: PropTypes.string,
    customClassWrapper: PropTypes.string,
    labelName: PropTypes.string,
};

export default SelectComponent;