
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmailsSuccess} from "../store/emailSlice";
import { useNavigate } from "react-router-dom";
import "./EmailList.css";
import { deleteEmail } from "../store/emailSlice";

const EmailList = () => {
  const Email = useSelector((state) => state.auth.email);
  const emails = useSelector((state) => state.email.emails);
  const myEmail = Email.replace(/[.@]/g, "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          `https://mailboxapporiginal-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/drafts/${myEmail}.json`
        );
        if (response.status === 200) {
          const fetchedEmails = [];
          for (const key in response.data) {
            fetchedEmails.push({
              id: key,
              ...response.data[key],
            });
          }
          dispatch(fetchEmailsSuccess(fetchedEmails));
        }
      } catch (error) {
        console.error("Error fetching emails: ", error);
      }
    };
    const fetchEmailsPeriodically = () => {
    
      fetchEmails();
      const intervalId = setInterval(fetchEmails, 2000);
      return () => clearInterval(intervalId);
    };

    fetchEmailsPeriodically(); 
  }, [dispatch, myEmail]);

  

  const handleDelete = async (emailId,event) => {
     event.stopPropagation();
    try {
      await axios.delete(
        `https://mailboxapporiginal-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/drafts/${myEmail}/${emailId}.json`
      );
      dispatch(deleteEmail(emailId));
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const handleClick = (id) => {
    navigate(`/emails/${id}`);
  };

  const renderDot = (email) => {
    if (email.read) {
      return <span className="dot white"></span>;
    } else {
      return <span className="dot blue"></span>;
    }
  };

  return (
    <div className="email-list-container">
      <ul className="email-list">
        {emails.map((email) => (
          <li
            key={email.id}
            className="email-item"
            onClick={() => handleClick(email.id)}
          >
            <div className="email-header">
              {renderDot(email)}
              <p className="sender-email">
                From: <strong>{email.from}</strong>
              </p>
              <p className="email-subject">
                 <strong>{email.subject}</strong>
              </p>
            </div>
            <p className="email-content">{email.content}</p>

            <div className="delTime">
              <button
                className="delEmailBtn"
                onClick={(event) => handleDelete(email.id, event)}
              >
                Delete
              </button>

              <p className="email-time">{email.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
