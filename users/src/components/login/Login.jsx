import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";

function Login() {
  return (
    <>
      <section className="vh-100 d-flex justify-content-center align-items-center bg-body-secondary">
        <form
          method="post"
          className="card w-100"
          style={{
            maxWidth: "24rem",
            padding: "2rem",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4 className="text-center fs-3 fw-bold">Login</h4>
          <FormInput
            type="email"
            label="email"
            name="identifier"
            defaultValue="test@test.com"
          />
          <FormInput type="password" label="password" defaultValue="secret" />
          <div className="mb-4 mt-3">
            <SubmitBtn text="Login" />
          </div>
          <p className="text-center">
            Not a member yet?
            <Link
              to="/register"
              className="text-decoration-none text-primary fw-semibold ms-2"
            >
              REGISTER
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}

export default Login;
