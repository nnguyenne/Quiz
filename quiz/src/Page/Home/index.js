import History from "../History";
import ListTopic from "../Topics/listTopic";
import "./home.scss"
import bgHome from '../../assets/images/bg_home1.png';

function Home() {
    const token = sessionStorage.getItem("token");
    return (
        <>
            <div className="home">
                <h2 className="home__title">QUIZ - Cùng ôn lại kiến thức lập trình</h2>
                <div className="home__content">
                    <img src={bgHome} alt="backgroud" />
                    <h3 className="home__content__title">Cùng nhau hướng tới FullStack - Khởi đầu cùng React</h3>
                    <p>Đây là một nền tảng trắc nghiệm trực tuyến giúp bạn ôn luyện kiến thức về HTML, CSS, JavaScript và React. Ứng dụng được xây dựng bằng ReactJS và sử dụng JSON Server để lưu trữ dữ liệu người dùng, câu hỏi và kết quả làm bài.
                        Giao diện đơn giản, thân thiện, dễ sử dụng giúp bạn dễ dàng bắt đầu hành trình trở thành lập trình viên FullStack.</p>
                </div>

            </div>

            <h2>Một vài chủ đề</h2>
            <ListTopic />
            {token && <History />}
        </>
    )
}

export default Home;