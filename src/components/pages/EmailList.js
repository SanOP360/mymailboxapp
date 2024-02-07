import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./EmailList.css"; // Import CSS file for styling

const EmailList = () => {
  const Email = useSelector((state) => state.auth.email);
  const [emails, setEmails] = useState([]);
  const myEmail = Email.replace(/[.@]/g, "");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          `https://mailboxapporiginal-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/${myEmail}.json`
        );
        if (response.status === 200) {
          const fetchedEmails = [];
          for (const key in response.data) {
            fetchedEmails.push({
              id: key,
              ...response.data[key],
            });
          }
          setEmails(fetchedEmails);
        }
      } catch (error) {
        console.error("Error fetching emails: ", error);
      }
    };

    fetchEmails();
  }, [myEmail]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="email-list-container">
      <ul className="email-list">
        {emails.map((email) => (
          <li key={email.id} className="email-item">
            <div className="email-header">
              <p className="sender-email">
                Sender: <strong>{email.from}</strong>
              </p>
              <p className="email-subject">
                Subject: <strong>{email.subject}</strong>
              </p>
            </div>
            <p className="email-content">{truncateText(email.content, 100)}</p>
            <p className="email-time">{email.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
