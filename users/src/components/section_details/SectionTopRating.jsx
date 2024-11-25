import { Link } from "react-router-dom";
import { useState } from "react";

function SectionTopRating() {
  const [activeTab, setActiveTab] = useState("top-day");

  const tabs = [
    { id: "top-day", label: "Ngày" },
    { id: "top-month", label: "Tháng" },
    { id: "top-all-time", label: "All time" },
  ];

  const topStories = {
    "top-day": [
      {
        rank: 1,
        name: "Linh Vũ Thiên Hạ",
        link: "https://suustore.com/truyen/linh-vu-thien-ha",
        categories: [
          {
            name: "Tiên Hiệp",
            link: "https://suustore.com/the-loai/tien-hiep",
          },
        ],
      },
      // (Các câu chuyện khác tương tự)
    ],
    "top-month": [
      {
        rank: 1,
        name: "Linh Vũ Thiên Hạ",
        link: "https://suustore.com/truyen/linh-vu-thien-ha",
        categories: [
          {
            name: "Tiên Hiệp",
            link: "https://suustore.com/the-loai/tien-hiep",
          },
        ],
      },
      // (Các câu chuyện khác tương tự)
    ],
    "top-all-time": [
      {
        rank: 1,
        name: "Linh Vũ Thiên Hạ",
        link: "https://suustore.com/truyen/linh-vu-thien-ha",
        categories: [
          {
            name: "Tiên Hiệp",
            link: "https://suustore.com/the-loai/tien-hiep",
          },
        ],
      },
      {
        rank: 2,
        name: "Linh Vũ Thiên Hạ",
        link: "https://suustore.com/truyen/linh-vu-thien-ha",
        categories: [
          {
            name: "Tiên Hiệp",
            link: "https://suustore.com/the-loai/tien-hiep",
          },
        ],
      },
      {
        rank: 3,
        name: "Linh Vũ Thiên Hạ",
        link: "https://suustore.com/truyen/linh-vu-thien-ha",
        categories: [
          {
            name: "Tiên Hiệp",
            link: "https://suustore.com/the-loai/tien-hiep",
          },
        ],
      },
    ],
  };

  const renderStories = (stories) =>
    stories.map((story) => (
      <li key={story.rank}>
        <div className="rating-item d-flex align-items-center">
          <div
            className={`rating-item__number rounded-circle ${
              story.rank === 1
                ? "bg-danger text-light"
                : story.rank === 2
                ? "bg-success text-light"
                : story.rank === 3
                ? "bg-info text-light"
                : "bg-light text-dark border"
            }`}
          >
            <span>{story.rank}</span>
          </div>
          <div className="rating-item__story">
            <Link
              to={story.link}
              className="text-decoration-none hover-title rating-item__story--name text-one-row"
            >
              {story.name}
            </Link>
            <div className="d-flex flex-wrap rating-item__story--categories">
              {story.categories.map((category, index) => (
                <Link
                  key={index}
                  to={category.link}
                  className="text-decoration-none text-dark hover-title me-1"
                >
                  {category.name}
                  {index < story.categories.length - 1 && ","}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </li>
    ));

  return (
    <div className="row top-ratings" style={{ zIndex: "10" }}>
      {/* Inline CSS */}
      <style>
        {`
          .tab-pane {
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .tab-pane.show.active {
            display: block;
            opacity: 1;
          }
          .top-ratings__content {
            min-height: 300px;
          }
        `}
      </style>

      {/* Tabs */}
      <div className="col-12 top-ratings__tab mb-2">
        <div className="list-group d-flex flex-row" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`list-group-item list-group-item-action ${
                activeTab === tab.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="col-12 top-ratings__content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-pane fade ${
              activeTab === tab.id ? "show active" : ""
            }`}
            role="tabpanel"
          >
            <ul>{renderStories(topStories[tab.id])}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionTopRating;
