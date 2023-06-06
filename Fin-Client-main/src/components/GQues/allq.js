import React from "react";
import QuestionCard from "./SQs.js";

const questions = [
  {
    title: "What is the best way to learn React?",
    description:
      "I want to learn React, but I am not sure where to start. What are some good resources or tutorials to get started?",
    interactions: { likes: 12, shares: 4 },
    tags: ["React", "Web Development", "Learning"],
    username: "johndoe",
    created: "2022-02-17T18:22:12.000Z",
  },
  {
    title: "How can I optimize my website for speed?",
    description:
      "My website is slow to load. What are some strategies or tools I can use to improve its performance?",
    interactions: { likes: 8, shares: 2 },
    tags: ["Web Development", "Performance", "Optimization"],
    username: "janedoe",
    created: "2022-02-16T10:10:10.000Z",
  },
  {
    title: "What are some best practices for API design?",
    description:
      "I am designing an API for my web application. What are some best practices or patterns to follow for API design?",
    interactions: { likes: 5, shares: 1 },
    tags: ["Web Development", "API", "Design"],
    username: "bobsmith",
    created: "2022-02-14T15:45:00.000Z",
  },
];

const QuestionList = () => {
  return (
    <div>
      {questions.map((question) => (
        <QuestionCard key={question.created} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
