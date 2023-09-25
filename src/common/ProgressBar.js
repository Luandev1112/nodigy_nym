import React, { useState, useEffect } from 'react';

const ProgressBar = ({step}) => {
  const [activePercent, setActivePercent] = useState(0);
  useEffect(()=>{
    const stepProgressElement = document.getElementById('progress-step-'+step);
    const {top, left} = stepProgressElement.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    if(step == 8) {
      setActivePercent(100);
    }else{
      const _activePercent = (left +16) * 100 / windowWidth;
      setActivePercent(_activePercent);
    }
  }, []);

  return (
    <div className="step-bar">
      <div className="line"><span style={{width: activePercent + "%"}}></span></div>
        <a className={step>=1?"checked active":""} id="progress-step-1" />
        <a className={step>=2?"checked active":""} id="progress-step-2" />
        <a className={step>=3?"checked active":""} id="progress-step-3" />
        <a className={step>=4?"checked active":""} id="progress-step-4" />
        <a className={step>=5?"checked active":""} id="progress-step-5" />
        <a className={step>=6?"checked active":""} id="progress-step-6" />
        <a className={step>=7?"checked active":""} id="progress-step-7" />
        <a className={step>=8?"checked active":""} id="progress-step-8" />
    </div>
  )
}
export default ProgressBar;
