import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function SectionChapterNav({
  onPrevChapter,
  onNextChapter,
  hasPrev,
  hasNext,
  chapters,
  slugStory,
  currentChapterSlug,
}) {
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedChapter(currentChapterSlug);
  }, [currentChapterSlug]);

  const toggleSelectVisibility = () => {
    setIsSelectVisible(!isSelectVisible);
  };

  const handleChapterChange = (e) => {
    const selectedSlug = e.target.value;
    setSelectedChapter(selectedSlug);
    if (selectedSlug) {
      navigate(`/${slugStory}/${selectedSlug}`);
    }
  };

  return (
    <div className="chapter-nav text-center">
      <div className="chapter-actions chapter-actions-origin d-flex align-items-center justify-content-center">
        <button
          className="btn btn-success me-1 chapter-prev"
          onClick={onPrevChapter}
          disabled={!hasPrev}
        >
          <span>Chương trước</span>
        </button>

        <button
          className="btn btn-success me-1"
          onClick={toggleSelectVisibility}
        >
          <FaBars />
        </button>

        {isSelectVisible && (
          <select
            className="form-select"
            value={selectedChapter}
            onChange={handleChapterChange}
            style={{
              width: "auto",
              maxWidth: "100%",
            }}
          >
            <option value="">Chọn chương</option>
            {chapters.map((chapter) => (
              <option key={chapter.slug} value={chapter.slug}>
                {chapter.title}
              </option>
            ))}
          </select>
        )}

        <button
          className="btn btn-success chapter-next"
          onClick={onNextChapter}
          disabled={!hasNext}
        >
          <span>Chương tiếp</span>
        </button>
      </div>
    </div>
  );
}

export default SectionChapterNav;
