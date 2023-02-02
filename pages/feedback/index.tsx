import Head from "next/head";
import React, { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedBackPage = (props: any) => {
  const { title } = props;
  const [singleFeedbackData, setSingleFeedbackData] = useState({
    feedback: "",
  });
  function loadFeedBackHandler(id: any) {
    fetch(`/api/feedback/${id}`)
      .then((data: any) => data.json())
      .then((result) => {
        console.log(`result`, result);
        setSingleFeedbackData(result[0]);
      });
  }
  const { feedbackData } = props;
  return (
    <>
      <Head>
        <title>{title} - feedback</title>
      </Head>
      <ul>
        {feedbackData.map((item: any) => {
          return (
            <li key={item.id}>
              {item.email} - {item.feedback}{" "}
              <button onClick={loadFeedBackHandler.bind(null, item.id)}>
                {" "}
                Show details
              </button>
            </li>
          );
        })}
      </ul>
      {singleFeedbackData && <p>feedback {singleFeedbackData.feedback}</p>}
    </>
  );
};

export async function getStaticProps() {
  const path = buildFeedbackPath();
  const feedbackData = extractFeedback(path);
  return {
    props: {
      feedbackData,
    },
  };
}

export default FeedBackPage;
