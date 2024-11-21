import React from "react";

function CommentStory() {
  return (
    <>
      <div className="mt-4 col-6 col-md-12 col-lg-4 head-title-global__left d-flex">
        <h4 className="me-2 mb-0 border-bottom border-secondary pb-1">
          Bình luận truyện
        </h4>
      </div>
      <div className="d-flex justify-content-between mt-2">
        <p>31 bình luận</p>
        <div>
          <label for="cars">Sắp xếp theo</label>{" "}
          <select name="cars" id="cars">
            <option value="volvo">Cũ nhất</option>
            <option value="saab">Mới nhất</option>
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
              {/* Input field for adding a note */}
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="text"
                  id="addANote"
                  className="form-control"
                  placeholder="Type comment..."
                />
                <label
                  className="form-label mt-2"
                  style={{ cursor: "pointer" }}
                  htmlFor="addANote"
                >
                  + Add a note
                </label>
              </div>

              {/* Comment cards */}
              {[
                {
                  avatar:
                    "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp",
                  name: "Martha",
                  text: "Type your note, and hit enter to add it",
                  upvotes: 3,
                  upvoted: false,
                },
                {
                  avatar:
                    "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
                  name: "Johny",
                  text: "Type your note, and hit enter to add it",
                  upvotes: 4,
                  upvoted: false,
                },
                {
                  avatar:
                    "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp",
                  name: "Mary Kate",
                  text: "Type your note, and hit enter to add it",
                  upvotes: 2,
                  upvoted: true,
                },
                {
                  avatar:
                    "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
                  name: "Johny",
                  text: "Type your note, and hit enter to add it",
                  upvotes: null,
                  upvoted: false,
                },
              ].map((comment, index) => (
                <div key={index} className="card mb-4">
                  <div className="card-body">
                    <p>{comment.text}</p>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <img
                          src={comment.avatar}
                          alt="avatar"
                          width="25"
                          height="25"
                        />
                        <p className="small mb-0 ms-2">{comment.name}</p>
                      </div>
                      <div className="d-flex flex-row align-items-center text-body">
                        {comment.upvoted ? (
                          <>
                            <p className="small mb-0">Upvoted</p>
                            <i
                              className="fas fa-thumbs-up mx-2 fa-xs"
                              style={{ marginTop: "-0.16rem" }}
                            ></i>
                          </>
                        ) : (
                          <>
                            <p className="small text-muted mb-0">Upvote?</p>
                            <i
                              className="far fa-thumbs-up mx-2 fa-xs text-body"
                              style={{ marginTop: "-0.16rem" }}
                            ></i>
                          </>
                        )}
                        {comment.upvotes !== null && (
                          <p className="small text-muted mb-0">
                            {comment.upvotes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <button className="mt-3 text-center pt-2 pb-2 px-0 border-0 btn btn-primary">
            Tải thêm 10 bình luận
          </button>
        </div>
      </div>
    </>
  );
}

export default CommentStory;
