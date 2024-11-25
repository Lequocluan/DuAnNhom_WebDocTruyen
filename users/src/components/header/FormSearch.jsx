import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function FormSearch() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Khởi tạo hook useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      if (keyword.trim() !== "") {
        fetchResults();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://truyen.ntu264.vpsttt.vn/api/search?q=${encodeURIComponent(
          keyword
        )}`
      );
      const data = await response.json();
      setResults(data.body.data.stories);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <>
      <form
        className="d-flex header__form-search"
        style={{ width: "284px" }}
        onSubmit={handleSearchSubmit}
        autoComplete="off"
      >
        <input
          required
          className="form-control search-story"
          type="text"
          placeholder="Tìm kiếm truyện theo tên hoặc tác giả"
          name="keyword"
          value={keyword}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {isFocused && keyword.trim() !== "" && (
          <div
            className="col-12 search-result shadow search-story mt-1"
            style={{
              width: "284px",
              borderRadius: "10px",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {isLoading ? (
              <p className="bg-white text-[#343a40] p-10 text-center">
                Đang tìm kiếm...
              </p>
            ) : keyword.trim() !== "" && results.length === 0 ? (
              <p className="bg-white text-[#343a40] p-10 text-center">
                Không tìm thấy kết quả nào
              </p>
            ) : (
              <div className="card text-white bg-light">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    {results.length > 0 ? (
                      <>
                        {results.map((item, index) => (
                          <Link
                            to={`truyen-chu/${item.slug}`}
                            onClick={() => setKeyword("")}
                            key={index}
                          >
                            <li
                              className="list-group-item d-flex align-items-center"
                              style={{ paddingLeft: "10px", paddingRight: 0 }}
                            >
                              <img
                                src={item.story_picture.path}
                                alt={item.story_picture.title}
                                className="rounded me-3"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                              />
                              <div>
                                <a className="text-dark hover-title fw-bold">
                                  {item.name}
                                </a>
                                <p className="text-muted mb-0 fst-italic">
                                  {item.author.full_name}
                                </p>
                              </div>
                            </li>
                          </Link>
                        ))}
                        <li className="list-group-item text-center">
                          <Link
                            to={`/search?keyword=${encodeURIComponent(
                              keyword
                            )}`}
                            className="text-primary fw-bold flex justify-center items-center gap-2"
                          >
                            Xem tất cả kết quả <FaSearch />
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li className="list-group-item">
                        Không tìm thấy kết quả nào
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        <button className="btn top-1/2 -translate-y-1/2" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
          </svg>
        </button>
      </form>
    </>
  );
}

export default FormSearch;
