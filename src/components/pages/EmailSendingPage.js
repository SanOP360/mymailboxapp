import React, { useRef } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EmailSending.css";
import { useSelector } from "react-redux";

const EmailSending = () => {
  const emailRef = useRef();
  const subjectRef = useRef();
  const editorRef = useRef();
  const SendersMail = useSelector((state) => state.auth.email);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video", "file"],
      ["clean"],
    ],
  };

  const sendEmail = async () => {
    const enteredEmail = emailRef.current.value;
    const enteredSubject = subjectRef.current.value;
    const emailContent = editorRef.current.getEditor().getText();
    const myEmail = enteredEmail.replace(/[.@]/g, "");

    // Get current date and time
    const currentDate = new Date();
    const sentDate = currentDate.toDateString();
    const sentTime = currentDate.toLocaleTimeString();

    try {
      await axios.post(
        `https://mailboxapporiginal-default-rtdb.asia-southeast1.firebasedatabase.app/mailbox/${myEmail}.json`,
        {
          to: enteredEmail,
          subject: enteredSubject,
          content: emailContent,
          from: SendersMail,
          date: sentDate,
          time: sentTime,
        }
      );

      emailRef.current.value = "";
      subjectRef.current.value = "";
      editorRef.current.getEditor().setText("");
    } catch (error) {
      console.error("Error in sending the mail", error);
    }
  };

  return (
    <div className="email-sending-container">
      <input
        className="input-field"
        type="email"
        placeholder="Recipient's email"
        ref={emailRef}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Subject"
        ref={subjectRef}
      />
      <div className="editor-container">
        <ReactQuill
          placeholder="Write your text here..."
          className="quill-editor "
          ref={editorRef}
          theme="snow"
          modules={modules}
        />
      </div>
      <button className="sendbutton" onClick={sendEmail}>
        Send
      </button>
    </div>
  );
};

export default EmailSending;
