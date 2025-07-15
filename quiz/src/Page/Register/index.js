import { useState } from "react";
import { createUser, getUser } from "../../Services/UserServiecs";
import "./Register.scss"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function Register() {

    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
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

        const allUsers = await getUser();
        const foundUser = allUsers.find(
            (user) =>
                user.email === data.email
        );

        if (foundUser) {
            Swal.fire({
                title: "Email đã sử dụng. \n Vui lòng sử dụng email khác!",
                icon: "error",
                draggable: true
            });
            setLoading(false);
        } else {
            const newData = {
                id: Date.now().toString(),
                ...data,
                token: "",
            }
            createUser(newData);
            navigate("/login");
            Swal.fire({
                title: "Đã tạo tài khoản thành công!",
                icon: "success",
                draggable: true
            });
            setLoading(true);
        }
    }
    return (
        <>
            <div className="wrapper">
                <form onSubmit={handleSubmit} className="form__register">
                    <h1 className="title">Đăng ký</h1>
                    <div className="input">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" onChange={handleChange} required />
                    </div>
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={handleChange} required />
                    </div>
                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={handleChange} name="password" required />
                    </div>
                    {/* <button type="submit">Đăng ký</button> */}
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Đăng ký
                    </Button>

                </form>
            </div>
        </>
    )
}

export default Register;