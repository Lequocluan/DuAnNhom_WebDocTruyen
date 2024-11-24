import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SectionCategoryItem from "../section_category/SectionCategoryItem";
import StoryItem from "./SectionStoryItem";
import AuthorItem from "./SectionAuthorItem";

function SectionSearch() {
  const { search } = useLocation();
  const [stories, setStories] = useState([]);
  const [authors, setAuthors] = useState([]);
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
          setStories(res.data.body.data.stories);
          setAuthors(res.data.body.data.authors);
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
          <h2 className="text-3xl font-bold">Kết quả tìm kiếm cho "{keyword}"</h2>
          <div className="flex flex-col gap-5 mt-3">
            <div className="flex flex-col">
              {stories.length > 0 && (
                <>
                  <div className="text-2xl mb-2">Truyện chữ</div>
                  <div className="flex flex-wrap gap-6">
                    {stories.map((story) => (
                      <div className="" key={story.id}>
                        <StoryItem {...story} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="">
            {authors.length > 0 && (
                <>
                  <div className="mb-2 text-2xl">Tác giả</div>
                  <div className="flex flex-wrap gap-6">
                    {authors.map((author) => (
                      <div className="" key={author.id}>
                        <AuthorItem {...author} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionSearch;
