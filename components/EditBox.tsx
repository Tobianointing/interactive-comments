import React, { useState } from "react";
import { ReplyProps } from "../lib/interfaces/allInterfaces";

/* eslint-disable @next/next/no-img-element */
const EditBox: React.FC<ReplyProps> = ({
  content,
  createdAt,
  id,
  score,
  user,
  currentUser,
  replyingTo,
}) => {
  const [edit, setEdit] = useState(false);

  const [comment, setComment] = useState(`@${replyingTo} ${content}`)

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setComment(e.target.value)
  };

  return (
    <li className="comment">
      <div className="counter">
        <div className="add">+</div>
        <div className="counter-text">{score}</div>
        <div className="minus">-</div>
      </div>

      <div className="comment-header">
        <img src={user.image.webp} alt="avater" />
        <span className="name">{user.username}</span>
        {currentUser?.username === user.username && <span className="you">you</span>}
        <span className="time">{createdAt}</span>
      </div>

      <div className="action-btns">
        <>
          <div className="delete-btn">
            <img src="images/icon-delete.svg" alt="delete-btn" />
            <span>Delete</span>
          </div>
          <div className="edit-btn">
            <img src="images/icon-edit.svg" alt="edit-btn" />
            <span>Edit</span>
          </div>{" "}
        </>
      </div>

      <div className="comment-body">
        <textarea
          className="comment-box"
          name="comment"
          value={comment}
          placeholder="Add comment"
          onChange={handleChange}
        ></textarea>
      </div>

      <button className="edit-btn">Update</button>
    </li>
  );
};

export default EditBox;
