import React from 'react';
import spinner from "./spinner.gif"
export default  () => (
    <div>
        <img
            src={spinner}
            style={{width:"500px",margin:"auto",display:"block"}}
            alt="loading...."/>
    </div>
);