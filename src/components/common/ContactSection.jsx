import React, { useEffect, useState } from "react";
import "../../css/common/contactSection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ContactSection = ({ isLoggedIn, itemId }) => {
  const [contacts, setContacts] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const userRole = useSelector((state) => state.auth.loginUser[0]?.role);
  const userName = useSelector((state) => state.auth.loginUser[0]?.userName);

  useEffect(() => {
    const fetchaxiosContact = async () => {
      try {
        const res = await axios.get(
          `http://192.168.23.231:3001/contacts?itemId=${itemId}`
        );
        setContacts(res.data);
      } catch (err) {
        console.error("문의내용 불러오기 실패:", err);
      }
    };
    fetchaxiosContact();
  }, [itemId]);

  const handleDelete = async (contactId) => {
    if (!window.confirm("문의글을 정말 삭제할까요?")) {
      return;
    }
    try {
      await axios.delete(`http://192.168.23.231:3001/comments/${contactId}`);
      setContacts((prev) => prev.filter((c) => c.id !== contactId));
    } catch (err) {
      console.error("삭제실패:", err);
      alert("문의글을 삭제하지 못했습니다");
    }
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      alert("문의글을 작성하시려면 먼저 로그인해주세요!");
      navigate("/auth");
      return;
    }

    if (!inputValue.trim()) {
      return;
    }

    const newContact = {
      writer: userName,
      content: inputValue.trim(),
      itemId: itemId,
    };

    try {
      const res = await axios.post(
        "http://192.168.23.231:3001/contacts",
        newContact
      );
      setContacts((prev) => [...prev, res.data]);
      setInputValue("");
    } catch (err) {
      console.error("문의 하기에 실패하였습니다:", err);
    }
  };
  return (
    <div className="contact-section">
      <h3>상품 문의</h3>

      <textarea
        rows="4"
        cols="50"
        placeholder={
          isLoggedIn ? "궁금한점을 물어봐주세요!" : "로그인 후 문의 해주세요"
        }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={!isLoggedIn}
      />
      <br />
      <button onClick={handleSubmit}>문의하기</button>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            <div className="user">
              <strong>{contact.writer}:</strong> {contact.content}
            </div>
            <div className="delete">
              {(userName === contact.writer || userRole === "ROLE_ADMIN") && (
                <button onClick={() => handleDelete(contact.id)}>삭제</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactSection;
