import { CommentBoxProps } from "../lib/interfaces/allInterfaces";
import React from "react";

/* eslint-disable @next/next/no-img-element */
const CommentBox: React.FC<CommentBoxProps> = ({
  image,
  text,
  handleChange,
  handleSubmit,
  buttonText
}) => {
  return (
    <div className="comment-box-wrapper">
      <img src={image} alt="avater" />
      <textarea
        className="comment-box"
        name="comment"
        placeholder="Add comment"
        value={text}
        onChange={handleChange}
      ></textarea>
      <button className="comment-btn" onClick={handleSubmit}>
        {buttonText ? buttonText : "SEND"}
      </button>
    </div>
  );
};

export default CommentBox;
