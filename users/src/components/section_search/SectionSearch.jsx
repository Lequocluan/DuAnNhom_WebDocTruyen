import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SectionCategoryItem from "../section_category/SectionCategoryItem";

function SectionSearch() {
  const { search } = useLocation();
  const [stories, setStories] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const queryParams = new URLSearchParams(search);
  const keyword = queryParams.get("keyword");
  useEffect(() => {
    if (keyword) {
      axios
        .get(
          `https://truyen.ntu264.vpsttt.vn/api/search?q=${encodeURIComponent(
            keyword
          )}`
        )
        .then((res) => {
          setStories(res.data.body.data);
          setIsLoading(false);
        })
        .catch((err) => console.error("Error fetching search results:", err));
    } else {
    }
  }, [keyword]);

  if (loading) {
    return (
      <div className="container">
        <h4>Đang tìm kiếm...</h4>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="container">
        <h4>Không tìm thấy kết quả nào cho "{keyword}".</h4>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>Kết quả tìm kiếm cho "{keyword}"</h2>
          <div className="container">
            <div className="row g-3">
              {stories.map((story) => (
                <div
                  className="col-4 col-sm-4 col-md-3 col-lg-2"
                  key={story.id}
                >
                  <SectionCategoryItem {...story} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionSearch;
