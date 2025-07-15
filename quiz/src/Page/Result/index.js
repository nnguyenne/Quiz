import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getQuestion } from "../../Services/Questions";
import { getAnswers } from "../../Services/Answers";

function Result() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const allQuestions = await getQuestion();
      const allAnswers = await getAnswers();

      const currentAnswer = allAnswers.find(a => a.id === id); // Kiểm tra xem có tồn tại bài làm không

      if (!currentAnswer) {
        alert("Không tìm thấy bài làm!\nQuay về trang lịch sử làm bài!");
        window.location.href = "/"
        return;
      }

      setAnswers(currentAnswer.answers); // lưu đáp án

      const matchedQuestions = allQuestions.filter(q =>
        currentAnswer.answers.some(ans => ans.questionId === q.id)
      );

      setQuestions(matchedQuestions); // lưu các câu hỏi có trong bài đang mở xem.
    };

    fetchApi();
  }, [id]);

  return (
    <>
      <h2>Đáp án</h2>
      {questions.map((q, index) => {
        const userAnswer = answers.find(a => a.questionId === q.id)?.answer;
        return (
          <div key={q.id}>
            <p><strong>Câu {index + 1}:</strong> {q.question}</p>
            <ul>
              {q.answers.map((ans, i) => (
                <li
                  key={i}
                  style={{
                    color:
                      i === q.correctAnswer
                        ? "green"
                        : i === userAnswer
                        ? "red"
                        : "black",
                    fontWeight: i === userAnswer || i === q.correctAnswer ? "bold" : "normal"
                  }}
                >
                  {ans}
                  {i === q.correctAnswer ? " ✅" : ""}
                  {i === userAnswer && i !== q.correctAnswer ? " ❌" : ""}
                </li>
              ))}
            </ul>
            <hr />
          </div>
        );
      })}
    </>
  );
}

export default Result;
