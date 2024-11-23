import { useParams } from "react-router-dom";
import { storyDetails, topRatingData } from "./Data";

import SectionStoryDetails from "./SectionStoryDetails";
import SectionTopRating from "./SectionTopRating";
import { useEffect, useState } from "react";
import axios from "axios";

function SectionDetails() {
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slugStory } = useParams(); // Lấy slug từ URL
  const [detailStory, setDetailStory] = useState([]);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`https://truyen.ntu264.vpsttt.vn/api/story/${slugStory}`)
      .then((res) => {
        if (isMounted) {
          setDetailStory(res.data.body.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching category data:", err),
          setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slugStory]);

  if (loading) {
    return (
      <div className="container">
        <h4>Loading story...</h4>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md-7 col-lg-8">
            <div className="head-title-global d-flex justify-content-between mb-4">
              <div className="col-12 col-md-12 col-lg-4 head-title-global__left d-flex">
                <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                  <span
                    className="d-block text-decoration-none text-dark fs-4 title-head-name"
                    title="Thông tin truyện"
                  >
                    Thông tin truyện
                  </span>
                </h2>
              </div>
            </div>
            <SectionStoryDetails detailStory={detailStory} />
          </div>

          <div className="col-12 col-md-5 col-lg-4 sticky-md-top">
            <SectionTopRating topRatingData={topRatingData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionDetails;
