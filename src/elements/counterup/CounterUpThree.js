import React from 'react';
import CountUp from 'react-countup';
import TrackVisibility from "react-on-screen";
import ScrollAnimation from "react-animate-on-scroll";

const Data = [
    {
        countNum : 199,
        countTitle: 'Happy Clients.',
    },
    {
        countNum : 575,
        countTitle: 'Employees',
    },
    {
        countNum : 69,
        countTitle: 'Useful Programs',
    },
];
const CounterUpThree = ({textALign, counterStyle, column}) => {
    return (
        <div className="row">
            {Data.map((data, index) => (
                <div className={`${column}`} key={index}>
                    <ScrollAnimation 
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    animateOnce={true}>
                        <div className={`count-box ${counterStyle} ${textALign}`}>
                            <TrackVisibility once>
                                {({ isVisible }) => isVisible && 
                                    <div className="count-number">{isVisible ? <CountUp end={data.countNum} /> : 0}</div>}
                            </TrackVisibility>
                            <h5 className="title">{data.countTitle}</h5>
                            <p className="description">{data.description}</p>
                        </div>
                    </ScrollAnimation>
                </div>
            ))}
        </div>
    )
}
export default CounterUpThree;