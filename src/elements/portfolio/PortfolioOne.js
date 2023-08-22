import React, { useState, useEffect } from "react";
import PortfolioData from "../../data/portfolio/PortfolioData.json";
import PortfolioItem from "./PortfolioItem";
import { FaSpinner } from "react-icons/fa";

const filters = [
    {
      id: 1,
      text: "All",
    },
    {
      id: 2,
      text: "design",
    },
    {
      id: 3,
      text: "art",
    },
    {
      id: 4,
      text: "development",
    }
];



const alldata = PortfolioData;
const PortfolioOne = ({ Column }) => {
    const [getAllItems] = useState(alldata);
    const [dataVisibleCount, setDataVisibleCount] = useState(6);
    const [dataIncrement] = useState(6) ;
    const [noMorePost, setNoMorePost] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");
    const [visibleItems, setVisibleItems] = useState([]);
    useEffect(() => {
        setActiveFilter(filters[0].text.toLowerCase());
        setVisibleItems(getAllItems.filter((item) => item.id <= dataVisibleCount));
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setActiveFilter(e.target.textContent.toLowerCase());
        let tempData;
        if (e.target.textContent.toLowerCase() === filters[0].text.toLowerCase()) {
          tempData = getAllItems.filter((data) => data.id <= dataVisibleCount);
        } else {
          tempData = getAllItems.filter(
            (data) =>
              data.category === e.target.textContent.toLowerCase() &&
              data.id <= dataVisibleCount
          );
        }
        setVisibleItems(tempData);
    };

    const handleLoadmore = (e) => {
        e.preventDefault();
        let tempCount = dataVisibleCount + dataIncrement;
        if (dataVisibleCount >= getAllItems.length) {
            setNoMorePost(true);
        } else {
            setDataVisibleCount(tempCount);
            if (activeFilter === filters[0].text.toLowerCase()) {
                setVisibleItems(getAllItems.filter((data) => data.id <= tempCount));
            }else {
                setVisibleItems(
                    getAllItems.filter(
                      (data) => data.category === activeFilter && data.id <= tempCount
                    )
                );
            }
        }
    }
    
    return (
        <>
            <div className="row row--15">
                <div className="col-lg-12">
                    <ul className="rwt-portfolio-filter filter-button-default liststyle mb--20">
                        {filters.map((filter) => (
                        <li className="list-item" key={filter.id}>
                            <button
                            onClick={handleChange}
                            className={
                                filter.text.toLowerCase() === activeFilter
                                ? "current"
                                : " "
                            }
                            >
                            {filter.text}
                            </button>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="row row--15">
                {visibleItems.map((item) => (
                    <div key={item.id} className={Column}>
                        <PortfolioItem portfolio={item} />
                    </div>
                ))}
            </div>

            <div className="row row--15">
                <div className="col-lg-12">
                    <div className="rwt-load-more text-center mt--50">
                        <button
                            className="btn btn-default btn-large btn-icon"
                            onClick={handleLoadmore}
                            disabled={noMorePost ? "disabled" : null}
                        >
                            {noMorePost ? (
                            "No Item Here"
                            ) : (
                            <span>
                                Load More 
                                <span className="icon">
                                    <FaSpinner />
                                </span>
                            </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PortfolioOne;
