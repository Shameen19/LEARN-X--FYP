import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./nuj.css";
const TopWEEK = () => {
  const [squestions, setsQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch top viewed questions data from backend API

    const fetchTopViewedQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/questions/randquestion`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        setsQuestions(data.topQuestions);
      } catch (error) {
        console.error("Error fetching top viewed questions:", error.message);
      }
    };

    fetchTopViewedQuestions();
  }, []);

  return (
    <div>
      <div className="question-card-container">
        {squestions.map((question) => (
          <div
            key={question._id}
            className="question-card"
            onClick={() => {
              navigate(`/questions/${question._id}`);
            }}
          >
            <div className="question-details">
              <div className="question-title">
                {question.title.slice(0, 50)}
              </div>
              <div className="question-tags">
                <strong>Tags:</strong> {question.tags.join(", ")}
              </div>
              <div className="question-views">
                <strong>Views:</strong> {question.totalviews}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopWEEK;
