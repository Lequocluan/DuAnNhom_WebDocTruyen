import { Form, Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Register() {
  useEffect(() => {
    document.title = "Truyện online.vn - Đăng ký";
  }, []);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let item = { name, email, password };
    console.log(item);

    try {
      let result = await fetch(
        "https://truyen.ntu264.vpsttt.vn/api/auth/user/register",
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      result = await result.json();

      if (result.status === 400) {
        const errorMessages = result.body.message.reduce((acc, err) => {
          acc[err.field] = err.error_message;
          return acc;
        }, {});
        setErrors(errorMessages);
      } else if (result.status === 201) {
        const { message, token } = result.body;
        localStorage.setItem("user-token", token);

        toast.success(message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="vh-100 d-flex justify-content-center align-items-center bg-body-secondary">
        <Form
          onSubmit={handleSubmit}
          method="POST"
          className="card p-4"
          style={{ maxWidth: "24rem", width: "100%" }}
        >
          <h4 className="text-center fs-3 fw-bold">Register</h4>

          <FormInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Username"
            name="name"
            error={errors.name}
          />
          <FormInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            name="email"
            error={errors.email}
          />
          <FormInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            name="password"
            error={errors.password}
          />

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
    </>
  );
}

export default Register;
