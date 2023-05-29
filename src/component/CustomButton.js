import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function ButtonComponent(props) {
    const { buttonClass, clickFunc, buttonText} = props;
    return (
        <Button className={`primaryButton ${buttonClass}`} onClick={clickFunc}>{buttonText}</Button>
    );
}
ButtonComponent.defaultProps = {
    buttonText: 'Button',
}

ButtonComponent.propTypes = {
    buttonClass: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
};

export default ButtonComponent;
