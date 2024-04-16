import React from "react";

const hoverList = () => {

    const boxStyle = {
        height: '200px',
        width: '200px',
        backgroundColor: 'rgb(0, 191, 255)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '30px',
        cursor: 'pointer',
    };

    return (
        <div>
            <div style={boxStyle}>
                <p>Hover me!</p>
            </div>
        </div>
    );
};
export default hoverList;