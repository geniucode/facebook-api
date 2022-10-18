import { useState } from "react";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    const finalEmail = event.target.value;
    setEmail(finalEmail);
  };

  const onChangePassword = (event) => {
    const finalPassword = event.target.value;
    setPassword(finalPassword);
  };

  const checkLogin = async (event) => {
    event.preventDefault();
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const response = await axios.post("http://localhost:3001/user/login", {
      email,
      hashedPassword,
    });
    if (response.success) {
      console.log("Login successful");
    } else {
      console.log("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <form>
        <div className="login-box">
          <input onChange={onChangeEmail} type="email" placeholder="Email" />
          <input
            onChange={onChangePassword}
            type="password"
            placeholder="Password"
          />
          <button onClick={checkLogin} type="submit" className="login-Btn">
            Log In
          </button>
          <hr />
          {/* <button type="submit" className="signupBtn">
            Create new account
          </button> */}
        </div>
      </form>
    </div>
  );
};

export { Login };
