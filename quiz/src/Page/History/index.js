import { useEffect, useState } from "react";
import { getAnswers } from "../../Services/Answers";
import "./History.scss"
import { Link } from "react-router-dom";
import { getQuestion } from "../../Services/Questions";
import { getTopic } from "../../Services/Topics";

function History() {

  const [userAnswers, setUserAnswers] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const allAnswers = await getAnswers();
      const allQuestions = await getQuestion();
      const allTopic = await getTopic();
      const userId = parseInt(sessionStorage.getItem("id"));
      if (!userId) return;

      const fUserAnswers = allAnswers.filter(a => a.userId === userId);

      const updatedAnswers = fUserAnswers.map(attempt => {
        let score = 0;
        attempt.answers.forEach(item => {
          const question = allQuestions.find(q => q.id === item.questionId);
          if (question && question.correctAnswer === item.answer) {

            score++;
          }
        });
        const topic = allTopic.find(t => t.id === attempt.topicId);
        // console.log(topic);
        return { ...attempt, score, topicName: topic?.name || "" };
      });

      setUserAnswers(updatedAnswers);

      // console.log(updatedAnswers);
    };

    fetchApi();
  }, []);


  // return (
  //   <>
  //     <h2>Lịch sử làm bài</h2>
  //     <div className="history">
  //       {userAnswers?.map(item => (
  //         <div className="history__item" key={item.id}>
  //           <div className="history__topic">Chủ đề: {item.topicName}</div>
  //           <div className="history__score">Điểm: {item.score}/{item.answers.length}</div>
  //           <div className="history__time">Thời gian làm: {item.time}</div>
  //           {/* <Link to={`/result?id=${item.id}`} className="history__btn_xem">Xem</Link> */}
  //           <Link
  //             to={`/result?id=${item.id}`}
  //             state={{score: item.score }}
  //             className="history__btn_xem"
  //           >
  //             Xem
  //           </Link>

  //         </div>
  //       ))}
  //     </div>
  //   </>
  // )

  return (
    <>
      <h2>Lịch sử làm bài</h2>
      <div className="history">
        {userAnswers === null ? (
          <p>Đang tải dữ liệu...</p>
        ) : userAnswers.length === 0 ? (
          <p>Bạn chưa làm bài nào.</p>
        ) : (
          userAnswers.map(item => (
            <div className="history__item" key={item.id}>
              <div className="history__topic">Chủ đề: {item.topicName}</div>
              <div className="history__score">Điểm: {item.score}/{item.answers.length}</div>
              <div className="history__time">Thời gian làm: {item.time}</div>
              <Link
                to={`/result?id=${item.id}`}
                state={{ score: item.score }}
                className="history__btn_xem"
              >
                Xem
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );

}

export default History;