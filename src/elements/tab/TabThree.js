import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Link} from "react-router-dom";

const dataList = [
    {
        image: '/images/service/serviice-01.jpg',
        title: 'Awarded Design',
        description: 'There are many variations variats  of passages of Lorem Ipsum available.'
    },
    {
        image: '/images/service/serviice-02.jpg',
        title: 'Design & Creative',
        description: 'Passages there are many variatin Lorem Ipsum available have suffered.'
    }
]

const dataList2 = [
    {
        image: '/images/service/serviice-03.jpg',
        title: 'App Development',
        description: 'There are many variations variats  of passages of Lorem Ipsum available.'
    },
    {
        image: '/images/service/serviice-04.jpg',
        title: 'Business Design',
        description: 'Passages there are many variatin Lorem Ipsum available have suffered.'
    }
]

const dataList3 = [
    {
        image: '/images/service/serviice-03.jpg',
        title: 'App Development',
        description: 'There are many variations variats  of passages of Lorem Ipsum available.'
    },
    {
        image: '/images/service/serviice-04.jpg',
        title: 'Business Design',
        description: 'Passages there are many variatin Lorem Ipsum available have suffered.'
    },
    {
        image: '/images/service/serviice-04.jpg',
        title: 'Business Design',
        description: 'Passages there are many variatin Lorem Ipsum available have suffered.'
    }
]

const TabThree = () => {
    return (
        <div>
            <div className="row">
                    <div className="col-lg-12">
                        <Tabs>
                            <div className="row row--30 align-items-center">
                                <div className="col-lg-12">
                                    <div className="rn-default-tab style-three">
                                        <div className="tab-button-panel">
                                            <TabList className="tab-button">
                                                <Tab>
                                                    <div className="rn-tab-button">
                                                        <button>Stategy</button>
                                                    </div>   
                                                </Tab>
                                                <Tab>
                                                    <div className="rn-tab-button">
                                                        <button>Development</button>
                                                    </div>   
                                                </Tab>
                                                <Tab>
                                                    <div className="rn-tab-button">
                                                        <button>Reporting</button>
                                                    </div>   
                                                </Tab>
                                            </TabList>
                                        </div>

                                        <div className="tab-content-panel">
                                            <TabPanel>
                                                <div className="rn-tab-content">
                                                    <div className="inner">
                                                        <div className="row align-items-center row--30">
                                                            <div className="col-lg-4">
                                                                <div className="section-title">
                                                                    <h4 className="title">How can we help you?</h4>
                                                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero ea sint nihil corrupti! Harum nemo eius odio.</p>
                                                                    <div className="read-more">
                                                                        <a className="btn-default btn-small" href="#">Read More</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-8 mt_md--30 mt_sm--30">
                                                                <div className="row row--15 mt_dec--30 service-wrapper">
                                                                    {dataList.map( (val , i) => (
                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12" key={i}>
                                                                            <div className="card-box card-style-1 text-start">
                                                                                <div className="inner">
                                                                                    <div className="image">
                                                                                        <Link to="#service">
                                                                                            <img src={`${val.image}`} alt="card Images" />
                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="content">
                                                                                        <h4 className="title mb--20"><Link to="#service" dangerouslySetInnerHTML={{__html: val.title}}></Link></h4>
                                                                                        <p className="description b1 color-gray mb--0" dangerouslySetInnerHTML={{__html: val.description}}></p>
                                                                                        <Link className="btn-default btn-small" to="#service">Read More</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            
                                            <TabPanel>
                                                <div className="rn-tab-content">
                                                    <div className="inner">
                                                        <div className="row align-items-center row--30">
                                                            <div className="col-lg-4">
                                                                <div className="section-title">
                                                                    <h4 className="title">Whice Service Provided?</h4>
                                                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero ea sint nihil corrupti! Harum nemo eius odio.</p>
                                                                    <div className="read-more">
                                                                        <a className="btn-default btn-small" href="#">Read More</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-8 mt_md--30 mt_sm--30">
                                                                <div className="row row--15 mt_dec--30 service-wrapper">
                                                                    {dataList2.map( (val , i) => (
                                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-12" key={i}>
                                                                            <div className="card-box card-style-1 text-start">
                                                                                <div className="inner">
                                                                                    <div className="image">
                                                                                        <Link to="#service">
                                                                                            <img src={`${val.image}`} alt="card Images" />
                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="content">
                                                                                        <h4 className="title mb--20"><Link to="#service" dangerouslySetInnerHTML={{__html: val.title}}></Link></h4>
                                                                                        <p className="description b1 color-gray mb--0" dangerouslySetInnerHTML={{__html: val.description}}></p>
                                                                                        <Link className="btn-default btn-small" to="#service">Read More</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <div className="rn-tab-content">
                                                    <div className="inner">
                                                        <div className="row align-items-center row--30">
                                                            <div className="col-lg-12">
                                                                <div className="row row--15 mt_dec--30 service-wrapper">
                                                                    {dataList3.map( (val , i) => (
                                                                        <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={i}>
                                                                            <div className="card-box card-style-1 text-start">
                                                                                <div className="inner">
                                                                                    <div className="image">
                                                                                        <Link to="#service">
                                                                                            <img src={`${val.image}`} alt="card Images" />
                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="content">
                                                                                        <h4 className="title mb--20"><Link to="#service" dangerouslySetInnerHTML={{__html: val.title}}></Link></h4>
                                                                                        <p className="description b1 color-gray mb--0" dangerouslySetInnerHTML={{__html: val.description}}></p>
                                                                                        <Link className="btn-default btn-small" to="#service">Read More</Link>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPanel>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>
        </div>
    )
}

export default TabThree
