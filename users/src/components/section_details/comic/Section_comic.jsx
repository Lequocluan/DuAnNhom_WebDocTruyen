import { useParams } from "react-router-dom";

import SectionComicDetail from "./SectionComicDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import SectionTopRating from "../SectionTopRating";
import { topRatingData } from "../Data";

function SectionComic() {
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slugComic } = useParams();
  const [detailComic, setDetailComic] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(
          `https://otruyenapi.com/v1/api/truyen-tranh/${slugComic}`
        );
        if (res.status === 200) {
          console.log(res);
          const data = res.data.data.item;
          setDetailComic(data);
          setImage(res.data.data.seoOnPage.seoSchema.image);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStory();
  }, [slugComic]);

  //! Cập nhật title website
  useEffect(() => {
    if (detailComic) {
      document.title = `Truyện online.vn - ${detailComic.name} `;
    }
  }, [detailComic]);

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
            <SectionComicDetail detailComic={detailComic} image={image} />
          </div>
          <div className="col-12 col-md-5 col-lg-4 sticky-md-top">
            <SectionTopRating topRatingData={topRatingData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionComic;
