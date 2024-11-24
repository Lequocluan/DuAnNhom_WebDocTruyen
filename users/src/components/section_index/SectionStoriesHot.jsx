import { Link } from "react-router-dom";
import { Data1, Data2 } from "./Data";
import SectionStoriesHotItem from "./SectionStoriesHotItem";
import SectionTitle from "../SectionTitle";
import { useGlobalContext } from "../../context";
import { useEffect, useState } from "react";
import axios from "axios";

function SectionStoriesHot() {
  const { dataCetegory } = useGlobalContext();
  const [dataStoryHot, setDataStoryHot] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log(dataStoryHot);

  // Sửa hàm fetchStories
  const fetchStories = (categorySlug = "") => {
    const url = categorySlug
      ? `https://truyen.ntu264.vpsttt.vn/api/hot-stories/${categorySlug}` // Sử dụng categorySlug
      : "https://truyen.ntu264.vpsttt.vn/api/hot-stories";

    axios
      .get(url)
      .then((res) => {
        setDataStoryHot(res.data.body.data);
        if (!categorySlug) {
          setSelectedCategory("");
        }
      })
      .catch((err) => console.error(err));
  };

  // Sửa hàm handleCategoryChange
  const handleCategoryChange = (e) => {
    const categorySlug = e.target.value; // Lấy slug từ giá trị chọn
    setSelectedCategory(categorySlug); // Cập nhật state
    fetchStories(categorySlug); // Gọi API với slug mới
  };

  useEffect(() => {
    fetchStories(); // Lần đầu gọi API để lấy tất cả truyện
  }, []);

  return (
    <>
      <div className="section-stories-hot mb-3">
        <div className="container">
          <div className="row">
            <div className="head-title-global d-flex justify-content-between mb-2">
              <div className="col-6 col-md-4 col-lg-4 head-title-global__left d-flex align-items-center">
                <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                  <SectionTitle title="Truyện Hot" link="#" />
                </h2>
                <i className="fa-solid fa-fire-flame-curved"></i>
              </div>

              <div className="col-4 col-md-3 col-lg-2">
                <select
                  className="form-select select-stories-hot"
                  aria-label="Truyen hot"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Tất cả</option>
                  {dataCetegory.map((data) => (
                    <option key={data.id} value={data.slug}>
                      {" "}
                      {/* Truyền slug */}
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {dataStoryHot.length === 0 ? (
                <div className="col-12" style={{ minHeight: "30vh" }}>
                  <p className="text-primary" style={{ fontWeight: "bold" }}>
                    Không có truyện nào trong thể loại này.
                  </p>
                </div>
              ) : (
                <div className="section-stories-hot__list">
                  {dataStoryHot.map((data) => (
                    <SectionStoriesHotItem key={data.id} {...data} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionStoriesHot;
