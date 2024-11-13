import { Link } from "react-router-dom";

function SectionChapperNav({ onPrevChapter, onNextChapter, hasPrev, hasNext }) {
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

export default SectionChapperNav;
