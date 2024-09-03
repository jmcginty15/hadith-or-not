import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

import ak from "~/assets/ak-rotated-right.jpeg";
import title from "~/assets/main-text.png";
import Footer from "~/components/footer";
import QuestionPanel from "~/components/questionPanel";
import { images } from "~/utils/images";

export const meta: MetaFunction = () => [{ title: "Hadith or Not?" }];

export default function Index() {
  const [imageIndices, setImageIndices] = useState<number[]>([0, 1]);

  const rotateImages = () => {
    let indexToAdd;
    if (imageIndices[0] === 0 && imageIndices[1] !== 1) indexToAdd = 1;
    else if (imageIndices[1] === 0 && imageIndices[0] !== 1) indexToAdd = 0;
    else indexToAdd = imageIndices[0] > imageIndices[1] ? 1 : 0;

    const nextIndices = [...imageIndices];
    nextIndices[indexToAdd] += 2;

    if (nextIndices[indexToAdd] === images.length) nextIndices[indexToAdd] = 0;
    else if (nextIndices[indexToAdd] > images.length)
      nextIndices[indexToAdd] = 1;

    setImageIndices(nextIndices);
  };

  return (
    <main className="main relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <img className="main-title" src={title} alt="hadith-or-not-text" />
      <div
        className="main-image"
        style={{
          backgroundImage: `url(${images[imageIndices[0]]})`,
        }}
      />
      <QuestionPanel rotateImages={rotateImages} />
      <div
        className="main-image"
        style={{
          backgroundImage: `url(${imageIndices[1] === 2 ? ak : images[imageIndices[1]]})`,
        }}
      />
      <Footer />
    </main>
  );
}
