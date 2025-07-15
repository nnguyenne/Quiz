import { useSearchParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import { getQuestion } from "../../Services/Questions";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import "./Question.scss";
import { createAnswers } from "../../Services/Answers";
import { Button } from 'antd';

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(false);

    // const { topicName } = useParams();
    const [searchParams] = useSearchParams();
    const id = parseInt(searchParams.get("id"));


    useEffect(() => {
        const fetchApi = async () => {
            const allQuestion = await getQuestion();
            const result = allQuestion.filter(q => q.topicId === id);
            setQuestions(result)
        };
        fetchApi();
    }, [id]);


    const handleSubmit = () => {
        setLoading(true);
        const userId = parseInt(sessionStorage.getItem("id"));
        if (!userId) {
            alert("Bạn chưa đăng nhập!");
            return;
        }


        const answersArray = Object.keys(userAnswers).map(qid => ({
            questionId: parseInt(qid),
            answer: userAnswers[qid]
        }));

        const now = new Date();
        const dateString = now.toLocaleString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

        const formatted = dateString.replace(",", "");

        const payload = {
            userId: userId,
            topicId: id,
            time: formatted,
            answers: answersArray
        };



        if (Object.keys(userAnswers).length < questions.length) {
            alert("Bạn chưa trả lời hết các câu hỏi!");
            setLoading(false);
            return;
        }


        const swalWithBootstrapButtons = Swal.mixin({
        });

        swalWithBootstrapButtons.fire({
            title: "Xác nhận nộp bài?",
            text: "Bạn đã trả lời xong các câu hỏi?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Nộp bài",
            cancelButtonText: "Hủy",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await createAnswers(payload)

                    if (res && res.id) {
                        await swalWithBootstrapButtons.fire({
                            title: "Đã nộp!",
                            text: "Bạn đã nộp bài thành công!",
                            icon: "success",
                            confirmButtonText: "Xem đáp án"
                        });

                        window.location.href = `/result?id=${res.id}`;
                    } else {
                        Swal.fire("Lỗi!", "Có lỗi xảy ra khi nộp bài.", "error");
                        setLoading(false);
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire("Lỗi!", "Không thể kết nối tới server.", "error");
                    setLoading(false);
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Đã hủy",
                    text: "Bạn đã hủy nộp bài.",
                    icon: "info"
                });
                setLoading(false);
            }
        });
    };


    // console.log(id)
    // console.log(questions);

    return (
        <>
            <GoBack />

            <div className="quesion">
                <h2 className="question__title">Danh sách câu hỏi:</h2>
                {questions.map((item, index) => (
                    <div key={index}>
                        <div className="question__question">Câu {index + 1}: {item.question}</div>
                        {item.answers.map((answer, i) => (
                            <div key={i}>
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={i}
                                    id={`q${index}_a${i}`}
                                    className="question__answer"
                                    onChange={(e) => {
                                        setUserAnswers(prev => ({
                                            ...prev,
                                            [item.id]: parseInt(e.target.value)
                                        }));
                                    }}

                                />
                                <label htmlFor={`q${index}_a${i}`} >{answer}</label>
                            </div>
                        ))}
                        <hr />
                    </div>
                ))}
            </div>
            {/* <button className="question__submit" onClick={handleSubmit}>Nộp</button> */}
            <Button type="primary" loading={loading} onClick={handleSubmit}>
                Nộp bài
            </Button>
        </>
    )
}

export default Questions;




