import { useState } from "react";
import { editUser, getUser } from "../../Services/UserServiecs";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import "./Login.scss"
import { Button } from 'antd';

function Login() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;


        setData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const allUsers = await getUser();
            const foundUser = allUsers.find(
                (user) =>
                    user.email === data.email &&
                    user.password === data.password
            );

            if (foundUser) {

                const token = Math.random().toString(36).substring(2) +
                    Math.random().toString(36).substring(2);
                const shortToken = token.substring(0, 20);
                const newData = {
                    ...data,
                    token: shortToken,
                }

                sessionStorage.setItem("id", foundUser.id);
                sessionStorage.setItem("token", shortToken);
                editUser(foundUser.id, newData)

                navigate("/");

            } else {
                Swal.fire({
                    title: "Thông tin đăng nhập không đúng, vui lòng thử lại",
                    icon: "error",
                    draggable: true
                });
                setLoading(false);
            }

        } catch (err) {
            // console.error("Lỗi:", err);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="wrapper">
                <form onSubmit={handleSubmit} className="form__login">
                    <h1 className="title">Đăng nhập</h1>
                    <p>Cùng nhau học tập - Tiến bộ từng ngày</p>
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={handleChange} required />
                    </div>
                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={handleChange} name="password" required />
                    </div>
                    {/* <button type="submit">Đăng nhập</button> */}
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Đăng nhập
                    </Button>

                </form>
            </div>
        </>
    )
}

export default Login;