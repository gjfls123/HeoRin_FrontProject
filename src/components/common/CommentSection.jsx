import React, { useEffect, useState } from "react";
import "../../css/common/commentSection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const CommentSection = ({ isLoggedIn, itemId }) => {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const userRole = useSelector((state) => state.auth.loginUser[0]?.role);
  const userName = useSelector((state) => state.auth.loginUser[0]?.userName);

  useEffect(() => {
    const fetchaxiosComment = async () => {
      try {
        const res = await axios.get(
          `http://192.168.23.231:3001/comments?itemId=${itemId}`
        );
        setComments(res.data);
      } catch (err) {
        console.error("댓글 불러오기 실패:", err);
      }
    };
    fetchaxiosComment();
  }, [itemId]);

  const handleDelete = async (commentId) => {
    if (!window.confirm("댓글을 정말 삭제할까요?")) {
      return;
    }
    try {
      await axios.delete(`http://192.168.23.231:3001/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("삭제실패:", err);
      alert("댓글을 삭제하지 못했습니다");
    }
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      alert("댓글을 작성하시려면 먼저 로그인해주세요!");
      navigate("/auth");
      return;
    }

    if (!inputValue.trim()) {
      return;
    }

    const newComment = {
      writer: userName,
      content: inputValue.trim(),
      itemId: itemId,
    };

    try {
      const res = await axios.post(
        "http://192.168.23.231:3001/comments",
        newComment
      );
      setComments((prev) => [...prev, res.data]);
      setInputValue("");
    } catch (err) {
      alert("리뷰 달기에 실패하였습니다.");
      console.error("리뷰 달기에 실패하였습니다:", err);
    }
  };
  return (
    <div className="comment-section">
      <h3>리뷰/후기</h3>

      <textarea
        rows="4"
        cols="50"
        placeholder={
          isLoggedIn
            ? "댓글을 입력하세요!"
            : "로그인 후 댓글을 작성할 수 있습니다"
        }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={!isLoggedIn}
      />
      <br />
      <button onClick={handleSubmit}>등록</button>

      <ul>
        {comments.map((comment, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            <div className="user">
              <strong>{comment.writer}:</strong> {comment.content}
            </div>
            <div className="delete">
              {(userName === comment.writer || userRole === "ROLE_ADMIN") && (
                <button onClick={() => handleDelete(comment.id)}>삭제</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
