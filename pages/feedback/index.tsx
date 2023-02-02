import React, { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedBackPage = (props: any) => {
  const [singleFeedbackData, setSingleFeedbackData] = useState("");
  function loadFeedBackHandler(id: any) {
    console.log("object", id);
    fetch(`/api/feedback/${id}`)
      .then((data: any) => data.json())
      .then((result) => {
        console.log(`result`, result);
        setSingleFeedbackData(result.filteredData[0]);
      });
  }
  const { feedbackData } = props;
  return (
    <>
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
