import img11 from "../../assets/images/diu_dang_tan_xuong.jpg";

export const storyDetails = {
  img: img11,
  title: "Nàng Không Muốn Làm Hoàng Hậu",
  author: "Thâm Bích Sắc",
  genres: ["Ngôn Tình", "Cổ Đại", "Ngược", "Khác"],
  status: "Full",
  rating: {
    score: 7.0,
    outOf: 10,
    count: 415,
  },
  description: `
    Phụ mẫu Vân Kiều mất sớm, một mình nàng tự buôn bán nhỏ, còn
    nhặt được một thư sinh nghèo mi thanh mục tú về làm phu quân,
    mỗi ngày trôi qua cũng có chút thú vị. Sau này, khi phu quân nàng vào kinh đi thi, hắn bỗng
    nhiên trở thành Thái tử tôn quý. Ai ai cũng đều nói Vân Kiều nàng có phúc, ấy vậy mà lại được gả
    cho hoàng tử lưu lạc ở dân gian. Song, Vân Kiều lại cảm thấy vô cùng hụt hẫng...
  `,
  chapters: [
    "Chương 1: Nàng không tin Yến Đình lại lừa nàng chuyện lớn đến vậy!",
    "Chương 2: Ngũ hoàng tử bùi thừa tư trở về!",
    "Chương 3: Oan gia ngõ hẹp!",
    "Chương 4: Đây chính là thành trường an!",
    // add more chapters
  ],
  pagination: {
    currentPage: 1,
    totalPages: 10,
    links: [
      { page: 1, url: "https://example.com?page=1" },
      { page: 2, url: "https://example.com?page=2" },
      // add more links as needed
    ],
  },
};
export const topRatingData = {
  tabs: [
    {
      id: "day",
      label: "Ngày",
      stories: [
        {
          id: 1,
          rank: 1,
          name: "Linh Vũ Thiên Hạ",
          link: "https://suustore.com/truyen/linh-vu-thien-ha",
          categories: [
            {
              name: "Tiên Hiệp",
              link: "https://suustore.com/the-loai/tien-hiep",
            },
            { name: "Dị Giới", link: "https://suustore.com/the-loai/di-gioi" },
            {
              name: "Huyền Huyễn",
              link: "https://suustore.com/the-loai/huyen-huyen",
            },
            {
              name: "Xuyên Không",
              link: "https://suustore.com/the-loai/xuyen-khong",
            },
          ],
        },
        // Các câu chuyện tiếp theo cho tab "Ngày"
      ],
    },
    {
      id: "month",
      label: "Tháng",
      stories: [
        {
          id: 1,
          rank: 1,
          name: "Linh Vũ Thiên Hạ",
          link: "https://suustore.com/truyen/linh-vu-thien-ha",
          categories: [
            {
              name: "Tiên Hiệp",
              link: "https://suustore.com/the-loai/tien-hiep",
            },
            { name: "Dị Giới", link: "https://suustore.com/the-loai/di-gioi" },
            {
              name: "Huyền Huyễn",
              link: "https://suustore.com/the-loai/huyen-huyen",
            },
            {
              name: "Xuyên Không",
              link: "https://suustore.com/the-loai/xuyen-khong",
            },
          ],
        },
        // Các câu chuyện tiếp theo cho tab "Tháng"
      ],
    },
    {
      id: "allTime",
      label: "All Time",
      stories: [
        {
          id: 1,
          rank: 1,
          name: "Linh Vũ Thiên Hạ",
          link: "https://suustore.com/truyen/linh-vu-thien-ha",
          categories: [
            {
              name: "Tiên Hiệp",
              link: "https://suustore.com/the-loai/tien-hiep",
            },
            { name: "Dị Giới", link: "https://suustore.com/the-loai/di-gioi" },
            {
              name: "Huyền Huyễn",
              link: "https://suustore.com/the-loai/huyen-huyen",
            },
            {
              name: "Xuyên Không",
              link: "https://suustore.com/the-loai/xuyen-khong",
            },
          ],
        },
        // Các câu chuyện tiếp theo cho tab "All Time"
      ],
    },
  ],
};
