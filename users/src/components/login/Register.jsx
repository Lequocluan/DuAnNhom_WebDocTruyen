import { Form, Link } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";

function Register() {
  return (
    <section className="vh-100 d-flex justify-content-center align-items-center bg-body-secondary">
      <Form
        method="POST"
        className="card p-4"
        style={{ maxWidth: "24rem", width: "100%" }}
      >
        <h4 className="text-center fs-3 fw-bold">Register</h4>

        <FormInput type="text" label="Username" name="username" />
        <FormInput type="email" label="Email" name="email" />
        <FormInput type="password" label="Password" name="password" />

        <div className="mt-2">
          <SubmitBtn text="REGISTER" />
        </div>

        <p className="text-center mt-2">
          Already a member?
          <Link
            to="/login"
            className="ms-2 text-decoration-none text-primary fw-semibold"
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
}

export default Register;
