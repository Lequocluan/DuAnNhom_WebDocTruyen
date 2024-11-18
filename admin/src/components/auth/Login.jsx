import { useState } from 'react';
import Cookies from 'universal-cookie';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const cookies = new Cookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://truyen.ntu264.vpsttt.vn/api/auth/admin/login', { email, password });
      if (res.data.status === 200) {
        const token = res.data.body.token;
        const decoded = jwtDecode(token);

        // Lưu token vào Cookies với thời gian hết hạn từ token
        cookies.set('authToken', token, {
          expires: new Date(decoded.exp * 1000),
          path: '/',
        });

        navigate('/home');
      } else {
        setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      setError("Đăng nhập thất bại. Lỗi máy chủ.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
