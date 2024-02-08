import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import "./EmailDetail.css";

const SentEmailDetails = () => {
  const Email = useSelector((state) => state.auth.email);
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const myEmail = Email.replace(/[.@]/g, "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(
          `https://mailboxapporiginal-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/sent/${myEmail}/${id}.json`
        );
        if (response.status === 200) {
          setEmail(response.data);
        } else {
          console.error("Failed to fetch email data:", response);
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail();
  }, [dispatch, id, myEmail]);

  if (!email) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="email-details-container">
      <h3 className="emailSender">To: {email.to}</h3>
      <h2 className="emailsubject">{email.subject}</h2>
      <p className="email-content">{email.content}</p>
      <button className="backBtn" onClick={() => navigate("/sent")}>
        Back
      </button>
    </div>
  );
};

export default SentEmailDetails;
