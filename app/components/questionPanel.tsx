import { useState } from "react";

import { realHadiths, fakeHadiths } from "~/utils/questions";

export default function QuestionPanel({
  rotateImages,
}: {
  rotateImages: () => void;
}) {
  const realSelect = Math.floor(Math.random() * 2);
  const list = realSelect === 1 ? realHadiths : fakeHadiths;
  const firstHadithIndex = Math.floor(Math.random() * list.length);
  const [hadith, setHadith] = useState<{
    title: string;
    text: string;
    isReal: boolean;
  }>(list[firstHadithIndex]);

  const firstRemainingRealHadiths = [...realHadiths];
  const firstRemainingFakeHadiths = [...fakeHadiths];
  if (realSelect === 1) firstRemainingRealHadiths.splice(firstHadithIndex, 1);
  else if (realSelect === 0)
    firstRemainingFakeHadiths.splice(firstHadithIndex, 1);
  const [remainingRealHadiths, setRemainingRealHadiths] = useState<
    { title: string; text: string; isReal: boolean }[]
  >(firstRemainingRealHadiths);
  const [remainingFakeHadiths, setRemainingFakeHadiths] = useState<
    { title: string; text: string; isReal: boolean }[]
  >(firstRemainingFakeHadiths);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const answer = (response: boolean) =>
    setIsCorrect(response === hadith.isReal);

  const reset = () => {
    setIsCorrect(null);

    const realSelect = Math.floor(Math.random() * 2);
    const list = realSelect === 1 ? remainingRealHadiths : remainingFakeHadiths;
    const ogList = realSelect === 1 ? realHadiths : fakeHadiths;
    const setHadiths =
      realSelect === 1 ? setRemainingRealHadiths : setRemainingFakeHadiths;

    const nextHadithIndex = Math.floor(Math.random() * list.length);
    setHadith(list[nextHadithIndex]);

    if (list.length === 1) setHadiths([...ogList]);
    else {
      const nextList = [...list];
      nextList.splice(nextHadithIndex, 1);
      setHadiths(nextList);
    }

    rotateImages();
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
