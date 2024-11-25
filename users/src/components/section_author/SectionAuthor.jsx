import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionAuthorItem from "./SectionAuthorItem"; // Nhớ nhập SectionAuthorItem
import axios from "axios";

function SectionAuthor() {
  const [loading, setIsLoading] = useState(true);
  const { idAuthor } = useParams(); // Lấy id tác giả từ URL
  const [novels, setNovels] = useState([]); // Lưu danh sách tiểu thuyết của tác giả

  const [description, setDescription] = useState(""); // Mô tả về tác giả hoặc thể loại

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://truyen.ntu264.vpsttt.vn/api/story/list_by_author/${idAuthor}`
      )
      .then((res) => {
        setNovels(res.data.body.data); // Lưu danh sách tiểu thuyết của tác giả
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [idAuthor]);

  //! Cập nhật title website
  useEffect(() => {
    if (novels.length > 0) {
      document.title = `Truyện online.vn - Truyện của tác giả ${
        novels[0]?.author?.full_name || "Chưa xác định"
      }`;
    }
  }, [novels]);

  const cleanDescription = novels[0]?.description
    ? novels[0]?.description
        .replace(/<p[^>]*>/g, "<p>") // Loại bỏ các thuộc tính thừa trong thẻ <p>
        .replace(/<\/p>/g, "</p>") // Đảm bảo thẻ đóng <p> đúng cách
        .replace(/<a[^>]*>/g, "<a>") // Loại bỏ thuộc tính thừa trong thẻ <a>
        .replace(/<\/a>/g, "</a>") // Đảm bảo thẻ đóng <a> đúng cách
        .replace(/<br>/g, "") // Xóa thẻ <br> nếu không cần thiết
    : "Mô tả không có sẵn."; // Nếu không có mô tả, hiển thị thông báo mặc định

  if (loading) {
    return (
      <div className="container">
        <h4>Loading author category story...</h4>
      </div>
    );
  }

  if (!Array.isArray(novels) || novels.length === 0) {
    return (
      <div className="container">
        <h4>Không có tiểu thuyết nào của tác giả này.</h4>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row align-items-start">
          {/* SECTION AUTHOR LIST */}
          <div className="col-12 col-md-8 col-lg-9 mb-3">
            <div className="head-title-global d-flex justify-content-between mb-2">
              <div className="col-12 col-md-12 col-lg-12 head-title-global__left d-flex">
                <h2 className="me-2 mb-0 border-bottom border-secondary pb-1">
                  <span
                    href="#"
                    className="d-block text-decoration-none text-dark fs-4 category-name"
                    title="Truyện của tác giả"
                  >
                    Truyện của{" "}
                    {novels[0]?.author?.full_name ||
                      "Tác giả chưa được xác định"}
                  </span>
                </h2>
              </div>
            </div>
            <div className="list-story-in-category section-stories-list">
              {novels.map((novel, index) => (
                <SectionAuthorItem
                  key={index}
                  novel={novel}
                  novel_type="story"
                />
              ))}
            </div>
          </div>

          {/* SECTION AUTHOR DESCRIPTION */}
          <div className="col-12 col-md-4 col-lg-3 sticky-md-top">
            <div className="category-description bg-light p-2 rounded mb-3 card-custom">
              <p className="mb-0 text-secondary"></p>
              <p dangerouslySetInnerHTML={{ __html: cleanDescription }}></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionAuthor;
