
// EmailList.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmailsSuccess } from '../store/emailSlice';
import { useNavigate } from 'react-router-dom';
import './EmailList.css';

const EmailList = () => {
  const Email = useSelector(state => state.auth.email);
  const emails = useSelector(state => state.email.emails);
  const myEmail = Email.replace(/[.@]/g, '');
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          dispatch(fetchEmailsSuccess(fetchedEmails));
        }
      } catch (error) {
        console.error('Error fetching emails: ', error);
      }
    };

    fetchEmails();
  }, [dispatch, myEmail]);

  const handleClick = id => {
    navigate(`/emails/${id}`);
  };

  const renderDot = email => {
    if (email.read) {
      return <span className="dot white"></span>;
      
    } else {
      
      return <span className="dot blue"></span>;
    }
  };

  return (
    <div className="email-list-container">
      <ul className="email-list">
        {emails.map(email => (
          <li
            key={email.id}
            className="email-item"
            onClick={() => handleClick(email.id)}
          >
            <div className="email-header">
              {renderDot(email)}
              <p className="sender-email">
                Sender: <strong>{email.from}</strong>
              </p>
              <p className="email-subject">
                Subject: <strong>{email.subject}</strong>
              </p>
            </div>
            <p className="email-content">{email.content}</p>
            <p className="email-time">{email.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
