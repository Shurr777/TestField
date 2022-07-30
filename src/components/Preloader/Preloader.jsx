import React from 'react';
import preloader from "../../assets/images/preloader.gif";

const Preloader = () => {
    return (
        <div style={{display: 'grid', justifyContent: 'center', paddingTop: '5rem'}}>
            <img src={preloader} alt={'loading'}/>
        </div>
    );
};

export default Preloader;