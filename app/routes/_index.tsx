import type { MetaFunction } from "@remix-run/node";

import camel from "~/assets/camel.jpeg";
import title from "~/assets/main-text.png";
import muhammad from "~/assets/muhammad.jpeg";
import Footer from "~/components/footer";
import QuestionPanel from "~/components/questionPanel";

export const meta: MetaFunction = () => [{ title: "Hadith or Not?" }];

export default function Index() {
  return (
    <main className="main relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <img className="main-title" src={title} alt="hadith-or-not-text" />
      <div
        className="main-image"
        style={{ backgroundImage: `url(${camel})` }}
      />
      <QuestionPanel />
      <div
        className="main-image"
        style={{ backgroundImage: `url(${muhammad})` }}
      />
      <Footer />
    </main>
  );
}
