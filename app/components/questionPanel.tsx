import { useState } from "react";

import { questions } from "~/utils/questions";

const getRandomHadithIndex = () => Math.floor(Math.random() * questions.length);

export default function QuestionPanel() {
  const [hadith, setHadith] = useState(questions[getRandomHadithIndex()]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const answer = (response: boolean) =>
    setIsCorrect(response === hadith.isReal);

  const reset = () => {
    setIsCorrect(null);
    setHadith(questions[getRandomHadithIndex()]);
  };

  return (
    <div className="QuestionPanel">
      <h1 className="QuestionPanel-title">{hadith.title}</h1>
      <p className="QuestionPanel-text">{hadith.text}</p>
      {isCorrect === null ? (
        <div className="QuestionPanel-buttonBox">
          <button
            className="QuestionPanel-button QuestionPanel-buttonReal"
            onClick={() => answer(true)}
          >
            Real
          </button>
          <button
            className="QuestionPanel-button QuestionPanel-buttonFake"
            onClick={() => answer(false)}
          >
            Fake
          </button>
        </div>
      ) : (
        <div className="QuestionPanel-answerBox">
          <h2
            className={`QuestionPanel-answerTitle QuestionPanel-answer${isCorrect ? "Correct" : "Incorrect"}`}
          >
            {isCorrect ? "Correct!" : "Wrong!"}
          </h2>
          <p className="QuestionPanel-text" style={{ margin: 0 }}>
            This is a {hadith.isReal ? "real" : "fake"} hadith!
          </p>
          <button
            className="QuestionPanel-button QuestionPanel-buttonNeutral"
            onClick={reset}
          >
            Try another one
          </button>
        </div>
      )}
    </div>
  );
}
