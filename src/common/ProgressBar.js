import React, { useState, useEffect } from 'react';

const ProgressBar = ({step}) => {
    useEffect(()=>{
      
    }, []);

    return (
      <div className="step-bar">
        <div className="line"><span></span></div>
          <a className={step>=1?"checked active":""} />
          <a className={step>=2?"checked active":""} />
          <a className={step>=3?"checked active":""} />
          <a className={step>=4?"checked active":""} />
          <a className={step>=5?"checked active":""} />
          <a className={step>=6?"checked active":""} />
          <a className={step>=7?"checked active":""} />
          <a className={step>=8?"checked active":""} />
      </div>
    )
}
export default ProgressBar;
