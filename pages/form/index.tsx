import React, { useEffect, useRef, useState } from "react";

const CustomForm = () => {
  const emailRef: any = useRef();
  const feedbackRef: any = useRef();

  const [feedbacks, setFeedbacks] = useState([]);

  const formSubmitted = (e: any) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;

    const body = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json().then((data) => console.log(`data`, data)))
      .catch((err) => console.log(`err`, err));
    fetch("/api/feedback")
      .then((data) => data.json().then((data) => setFeedbacks(data.data)))
      .catch((err) => console.log(`err`, err));
  };

  useEffect(() => {
    console.log(`feedbacks`, feedbacks);
  }, [feedbacks]);
  return (
    <div>
      <form onSubmit={formSubmitted}>
        <div>
          <label htmlFor="email">EMAIL please</label>
          <input ref={emailRef} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="feedback">feedback please</label>
          <input ref={feedbackRef} type="feedback" id="feedback" />
        </div>
        <button type="submit">Send feedback</button>
      </form>
      <div>
        <ul>
          {feedbacks?.map((item: any) => {
            return (
              <li key={item.id}>
                {item.email} <span>{item.feedback}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CustomForm;
