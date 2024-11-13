import { useState } from "react";
import { Link } from "react-router-dom";
import { storyData } from "./Data";
import SectionChapperContent from "./SectionChapperContent";
import SectionChapperNav from "./SectionChapperNav";

function SectionChapper() {
  // Lấy câu chuyện đầu tiên và bắt đầu với chương đầu tiên
  const story = storyData[0];
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  // Lấy chương hiện tại dựa trên chỉ số
  const chapter = story.chapters[currentChapterIndex];

  // Xử lý sự kiện khi người dùng click vào "Chương trước" hoặc "Chương tiếp"
  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < story.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  return (
    <>
      <div className="chapter-wrapper container my-5">
        <Link to="#" className="text-decoration-none">
          <h1 className="text-center text-success">{story.title}</h1>
        </Link>
        <Link to="#" className="text-decoration-none">
          <p className="text-center text-dark">{chapter.chapterTitle}</p>
        </Link>
        <hr className="chapter-start container-fluid" />

        <SectionChapperNav
          onPrevChapter={handlePrevChapter}
          onNextChapter={handleNextChapter}
          hasPrev={currentChapterIndex > 0}
          hasNext={currentChapterIndex < story.chapters.length - 1}
        />
        <hr className="chapter-end container-fluid" />
        <SectionChapperContent text={chapter.text} />

        <div
          className="text-center px-2 py-2 alert alert-success d-none d-lg-block"
          role="alert"
        >
          Bạn có thể dùng phím mũi tên hoặc WASD để lùi/sang chương
        </div>
      </div>
    </>
  );
}

export default SectionChapper;
