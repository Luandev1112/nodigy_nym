import React from 'react';
import CountUp from 'react-countup';
import TrackVisibility from "react-on-screen";

const Data = [
    {
        countNum : 199,
        countTitle: 'Happy Clients.',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
    {
        countNum : 575,
        countTitle: 'Employees',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
    {
        countNum : 69,
        countTitle: 'Useful Programs',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
];
const CounterUpTwo = ({textALign, counterStyle, column}) => {
    return (
        <div className="row">
            {Data.map((data, index) => (
                <div className={`${column}`} key={index}>
                    <div className={`count-box ${counterStyle} ${textALign}`}>
                        <TrackVisibility once>
                            {({ isVisible }) => isVisible && 
                                <div className="count-number">{isVisible ? <CountUp end={data.countNum} /> : 0}</div>}
                        </TrackVisibility>
                        <h5 className="title">{data.countTitle}</h5>
                        <p className="description">{data.description}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default CounterUpTwo;