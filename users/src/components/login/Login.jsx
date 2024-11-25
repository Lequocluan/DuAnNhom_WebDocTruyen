import { Form, Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/login");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let item = { email, password };
    console.log(item);

    try {
      let result = await fetch(
        "https://truyen.ntu264.vpsttt.vn/api/auth/user/login",
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

      if (result.status === 401) {
        toast.error(result.body.message);
      } else {
        const mess = "Login Success!";
        const { token } = result.body;
        localStorage.setItem("user-token", token);
        toast.success(mess);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="vh-100 d-flex justify-content-center align-items-center bg-body-secondary">
        <Form
          method="post"
          className="card w-100"
          onSubmit={handleSubmit}
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
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="test@test.com"
          />
          <FormInput
            type="password"
            label="password"
            name="password"
            defaultValue="secret"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-row-reverse">
            <Link to={"/forgot"}>Forgot password?</Link>
          </div>
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
          {/* <p className="text-center">
            Forgot your password?
            <Link
              // style={{ fontSize: "0.85rem" }}
              to="/forgot_password"
              className="text-decoration-none text-primary fw-semibold ms-2"
            >
              Click here to reset
            </Link>
          </p> */}
        </Form>
      </section>
    </>
  );
}

export default Login;
