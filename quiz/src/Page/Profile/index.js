import { useEffect, useState } from 'react';
import './Profile.scss';
import { editUser, getUser } from '../../Services/UserServiecs';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [message, setMessage] = useState("!");
  const [severity, setSeverity] = useState("success"); // success | error

  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    email: "",
    password: "password",
  });


  useEffect(() => {
    const fetchUser = async () => {
      const allUsers = await getUser(); // gọi toàn bộ user
      const userId = sessionStorage.getItem("id");
      const token = sessionStorage.getItem("token");

      if (token && userId) {
        const foundUser = allUsers.find(user => user.id === userId); // Lấy user đang đăng nhập
        if (foundUser) {
          if (isEditing) {
            setFormData(foundUser); // Cho phép chỉnh sửa password
          } else {
            setFormData({ ...foundUser, password: "password" }); // Ẩn password khi không sửa
          }
        }
      }
    };

    fetchUser();
  }, [isEditing]);

  //Xác nhận cập nhật thông tin
  const handleSubmit = () => {
    // Kiểm tra 2 mật khẩu đã nhập chưa
    if (formData.password === "" || confirmPassword === "") {
      setSeverity("error");
      setMessage("Vui lòng nhập mật khẩu để xác nhận cập nhật!");
      setShowNotify(true);
      setTimeout(() => setShowNotify(false), 3000);
      return;
    }

    // Kiểm tra 2 mật khẩu giống nhau không
    if (formData.password !== confirmPassword) {
      setSeverity("error");
      setMessage("Mật khẩu không khớp!");
      setShowNotify(true);
      setTimeout(() => setShowNotify(false), 3000);
      return;
    }

    // Gội API đổi thông tin
    const fetchApi = async () => {
      const result = await editUser(formData.id, formData)
      if (result && result.id) {
        setFormData(result);
        setSeverity("success");
        setMessage("Cập nhật thành công!");
        setShowNotify(true);
      } else {
        setSeverity("error");
        setMessage("Cập nhật thất bại!");
        setShowNotify(true);
      }
      setTimeout(() => setShowNotify(false), 3000);
    }; fetchApi();
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="profile">

      {showNotify && (
        <div className={`profile__notify profile__notify--${severity}`}>
          {message}
        </div>
      )}

      <h2 className="profile__title">USER PROFILE</h2>

      <div className="profile__form">
        <div className="profile__group">
          <label className="profile__label">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            readOnly={!isEditing}
            className="profile__input"
          />
        </div>

        <div className="profile__group">
          <label className="profile__label">Email Address</label>
          <input
            name="email"
            value={formData.email}
            readOnly={true}
            className="profile__input"
          />
        </div>

        <div className="profile__group">
          <label className="profile__label">Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            readOnly={!isEditing}
            className="profile__input"
          />
        </div>

        {isEditing && (
          <div className="profile__group">
            <label className="profile__label">Nhập lại mật khẩu/Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="profile__input"
            />
          </div>
        )}

        {!isEditing && (
          <button className="profile__button profile__button--edit" onClick={() => { setIsEditing(true); }}>
            Edit Profile
          </button>
        )}
        {isEditing && (
          <div className='profile__button--groupEdit'>
            <button className="profile__button profile__button--save" onClick={handleSubmit}>
              Save Changes
            </button>
            <button className="profile__button profile__button--exit" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;