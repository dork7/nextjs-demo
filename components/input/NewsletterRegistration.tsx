import NotificationContext from "@/store/notification-context";
import { useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailRef: any = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event: any) {
    event.preventDefault();
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    notificationCtx.showNotification({
      title: "Signing up....",
      message: "Sabar karo",
      status: "pending",
    });

    const email = emailRef.current.value;
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }

        return resp.json().then((data) => {
          throw new Error(data.message || "Something is wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success",
          message: "Ho gya, Mubarik ho",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error !",
          message: err.message || "Masla ho gya ha",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
