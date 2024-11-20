import { Data } from "./Data";
import { Link } from "react-router-dom";
import Img from "../../assets/images/88x31.png";
import { useGlobalContext } from "../../context";

function Footer() {
  const { dataCetegory } = useGlobalContext();

  return (
    <>
      <div id="footer" className="footer border-top pt-2">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5">
              <strong>Truyện Online</strong> {"  - "}
              <Link
                to="/"
                title="Đọc truyện online"
                className="text-dark text-decoration-none"
              >
                Đọc truyện
              </Link>{" "}
              online một cách nhanh nhất. Hỗ trợ mọi thiết bị như di động và máy
              tính bảng.
            </div>
            <ul className="col-12 col-md-7 list-unstyled d-flex flex-wrap list-tag">
              {dataCetegory.map((data) => {
                return (
                  <li key={data.id} className="me-1">
                    <span className="badge text-bg-light">
                      <Link
                        to={`/category/${data.slug}`}
                        className="text-dark text-decoration-none"
                      >
                        {data.name}
                      </Link>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="col-12">
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by/4.0/"
              >
                <img
                  alt="Creative Commons License"
                  style={{ borderWidth: 0, marginBottom: "10px" }}
                  src={Img}
                />
              </a>
              <br />
              <p>
                Website hoạt động dưới Giấy phép truy cập mở
                <Link className="text-decoration-none text-dark hover-title">
                  Creative Commons Attribution 4.0 International License
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
