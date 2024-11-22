import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import user from "../../assets/images/user.jpg";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

function formatDate(dateString) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: vi });
}

function sortComments(comments, order) {
  return [...comments].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return order === "oldest" ? dateA - dateB : dateB - dateA;
  });
}

function CommentStory({ detailStory }) {
  const { categories } = detailStory;
  const [listcomment, setListComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest"); // Mặc định: Mới nhất

  const pivot = categories[0]?.pivot || {};
  const limit = 1000;
  const offset = 0;

  console.log(listcomment);
  const token = localStorage.getItem("user-token");

  useEffect(() => {
    setListComment((prev) => sortComments(prev, sortOrder));
  }, [sortOrder]);

  //! Lấy danh sách bình luận
  async function fetchComments() {
    if (!pivot.novel_id || !pivot.novel_type) {
      console.error("Thông tin pivot không hợp lệ.");
      return;
    }

    let item = {
      novel_id: pivot.novel_id,
      novel_type: pivot.novel_type,
      limit,
      offset,
    };

    setLoading(true);

    try {
      const response = await fetch(
        "https://truyen.ntu264.vpsttt.vn/api/comment/list",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();
      if (result.status === 200) {
        setListComment(
          (prev) =>
            offset === 0
              ? result.body.data // Nếu offset = 0, thay thế toàn bộ danh sách
              : [...prev, ...result.body.data] // Nếu không, hợp nhất danh sách mới
        );
      } else {
        toast.error(result.body.message.error_message || "Lỗi tải bình luận!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }

  //! Hàm thêm bình luận
  async function handleAddComment() {
    if (!token) {
      toast.error("Vui lòng đăng nhập để bình luận");
      return;
    }
    if (!newComment) {
      toast.error("Vui lòng nhập nội dung bình luận");
      return;
    }

    let item = {
      novel_id: pivot.novel_id,
      novel_type: pivot.novel_type,
      content: newComment,
    };

    setLoading(true);

    try {
      let response = await fetch(
        "https://truyen.ntu264.vpsttt.vn/api/comment/add",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (result.status === 200) {
        toast.success("Bình luận thành công!");
        setListComment((prev) => [result.body.data, ...prev]);
        setNewComment(""); // Reset input
        // Tải lại danh sách từ server để đảm bảo dữ liệu đồng bộ
        setTimeout(fetchComments, 1000); // Delay ngắn để server cập nhật
      } else {
        toast.error(result.body.message.error_message || "Lỗi thêm bình luận!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [offset]);

  //! Trả lời bình luận
  async function handleReply(commentId) {
    const comment = listcomment.find((c) => c.id === commentId);
    const replyContent = comment?.replyContent;

    if (!token) {
      toast.error("Vui lòng đăng nhập để trả lời bình luận");
      return;
    }
    if (!replyContent) {
      toast.error("Vui lòng nhập nội dung trả lời");
      return;
    }

    let item = {
      novel_id: pivot.novel_id,
      novel_type: pivot.novel_type,
      parent_comment_id: commentId,
      content: replyContent,
    };

    setLoading(true);

    try {
      const response = await fetch(
        "https://truyen.ntu264.vpsttt.vn/api/comment/add",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (result.status === 200) {
        toast.success("Trả lời thành công!");
        fetchComments();
        // Thêm trả lời mới vào danh sách
        setListComment((prev) =>
          prev.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  reply: [result.body.data, ...(c.reply || [])],
                  replyContent: "", // Reset nội dung trả lời
                  showReplyForm: false, // Ẩn form trả lời
                }
              : c
          )
        );
      } else {
        toast.error(
          result.body.message.error_message || "Lỗi trả lời bình luận!"
        );
      }
    } catch (error) {
      console.error("Lỗi khi trả lời bình luận:", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }

  //! Hàm bật/tắt form reply
  const toggleReplyForm = (commentId) => {
    if (!token) {
      toast.error("Vui lòng đăng nhập để trả lời bình luận");
      return;
    }
    setListComment((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, showReplyForm: !comment.showReplyForm }
          : comment
      )
    );
  };

  //! Hàm cập nhật nội dung reply
  const handleReplyChange = (commentId, value) => {
    setListComment((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, replyContent: value } // Cập nhật nội dung trả lời
          : comment
      )
    );
  };

  return (
    <>
      <div className="mt-4 col-6 col-md-12 col-lg-4 head-title-global__left d-flex">
        <h4 className="me-2 mb-0 border-bottom border-secondary pb-1">
          Bình luận truyện
        </h4>
      </div>
      <div className="d-flex justify-content-between mt-2">
        <p>{listcomment.length} bình luận</p>
        <div>
          <label htmlFor="sort">Sắp xếp theo</label>
          <select
            name="sort"
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="oldest">Cũ nhất</option>
            <option value="newest">Mới nhất</option>
          </select>
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-3">
        <div className="col-md-8 col-lg-12">
          <div
            className="card shadow-0 border"
            style={{ backgroundColor: "#f0f2f5" }}
          >
            <div className="card-body p-4">
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="text"
                  id="addANote"
                  className="form-control"
                  placeholder="Nhập bình luận..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAddComment}
                >
                  Thêm bình luận
                </button>
              </div>
              {loading ? (
                <p>Đang tải bình luận...</p>
              ) : (
                <div className="comment-list-container">
                  {listcomment.map((comment, index) => (
                    <div key={index} className="card mb-4">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div>
                              <img
                                src={comment.avatar || user}
                                alt="avatar"
                                width="36"
                                height="36"
                              />
                            </div>
                            <div>
                              <p
                                style={{ fontSize: "16px", fontWeight: "bold" }}
                                className="small mb-0"
                              >
                                {comment.user?.name}
                              </p>
                              <p className="mb-0">{comment.content}</p>
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center text-body">
                            <i className="far fa-thumbs-up mx-2 fa-xs text-body"></i>
                            <p className="small text-muted mb-0">
                              {formatDate(comment.created_at)}
                            </p>
                          </div>
                        </div>
                        {/* Nút trả lời */}
                        <div className="mt-2">
                          <button
                            className="btn text-primary p-0"
                            onClick={() => toggleReplyForm(comment.id)}
                          >
                            Trả lời
                          </button>
                        </div>
                        {/* Nút trả lời */}

                        {/* Form trả lời */}
                        {comment.showReplyForm && (
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Nhập nội dung trả lời..."
                              value={comment.replyContent || ""}
                              onChange={(e) =>
                                handleReplyChange(comment.id, e.target.value)
                              }
                              className="form-control"
                            />
                            <button
                              className="btn btn-primary mt-2"
                              onClick={() => handleReply(comment.id)}
                            >
                              Gửi
                            </button>
                          </div>
                        )}
                        {/* Form trả lời */}

                        {/* Danh sách trả lời */}
                        {comment.reply?.length > 0 && (
                          <div className="mt-3 pl-4 border-start">
                            {comment.reply.map((reply, replyIndex) => (
                              <div key={replyIndex} className="mb-2 ms-4">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={reply.user?.avatar || user}
                                    alt="avatar"
                                    width="28"
                                    height="28"
                                  />
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                      marginLeft: "8px",
                                    }}
                                  >
                                    {reply.user?.name || "Ẩn danh"}:
                                  </p>
                                </div>
                                <p className="mb-0">{reply.content}</p>
                                <p className="small text-muted">
                                  {formatDate(reply.created_at)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Danh sách trả lời */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div className="row d-flex justify-content-center">
            <button
              className="mt-3 text-center pt-2 pb-2 px-0 border-0 btn btn-primary"
              disabled={listcomment.length < limit}
              onClick={() => loadMoreComments()}
            >
              Tải thêm bình luận
            </button>
          </div> */}
      </div>
    </>
  );
}

export default CommentStory;
