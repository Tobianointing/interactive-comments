import { ReplyProps, DataNode } from "../lib/interfaces/allInterfaces"
import React, { useState } from "react"
import CommentBox from "./CommentBox"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

/* eslint-disable @next/next/no-img-element */
const Reply: React.FC<ReplyProps> = ({
  id,
  content,
  createdAt,
  score,
  user,
  replyingTo,
  currentUser,
  show,
  setShow,
  handleShow,
  isCurrentEdit,
  setIsCurrentEdit,
  onOpen,
  counterAdd,
  counterMinus,
  replyText,
  handleNewReply,
  handleReplyChange,
  data,
  setData,
  commentId,
  repliesLength
}) => {
  const [edit, setEdit] = useState(false)
  const [reply, setReply] = useState(`@${replyingTo} ${content}`)

  const formattedCreatedAt = dayjs(createdAt).fromNow()

  const handleReply = () => {
    handleShow(id, setShow)
  }

  const handleEditShow = () => {
    handleShow(id, setIsCurrentEdit)
  }

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReply(e.target.value)
  }

  const handleEditSubmit = () => {
    if (reply) {
      const comments = [...data.comments].map((obj) => {
        if (obj.id === commentId) {
          return {
            ...obj,
            replies: [...obj.replies].map((obj) => {
              if (obj.id === id) {
                return {
                  ...obj,
                  content: reply,
                  createdAt: new Date().toISOString(),
                }
              }

              return obj
            }),
          }
        }

        return obj
      })

      setData((p: DataNode) => ({
        ...p,
        comments: comments,
      }))


      handleEditShow()
    }
  }

  return (
    <>
      <li className="bottom-comment">
        <ul className="bottom comments-wrapper">
          <li className="comment">
            <div className="counter">
              <div className="add" onClick={() => counterAdd(id)}>
                +
              </div>
              <div className="counter-text">{score}</div>
              <div className="minus" onClick={() => counterMinus(id)}>
                -
              </div>
            </div>

            <div className="comment-header">
              <img src={user.image.webp} alt="avater" />
              <span className="name">{user.username}</span>
              {currentUser?.username === user.username && <span className="you">you</span>}
              <span className="time">{formattedCreatedAt}</span>
            </div>

            <div className="action-btns">
              {currentUser?.username === user.username ? (
                <>
                  <div className="delete-btn" onClick={() => onOpen(commentId, id)}>
                    <img src="images/icon-delete.svg" alt="delete-btn" />
                    <span>Delete</span>
                  </div>
                  <div className="edit-btn" onClick={handleEditShow}>
                    <img src="images/icon-edit.svg" alt="edit-btn" />
                    <span>Edit</span>
                  </div>{" "}
                </>
              ) : (
                <div className="reply-btn" onClick={handleReply}>
                  <img src="./images/icon-reply.svg" alt="reply-btn" />
                  <span>Reply</span>
                </div>
              )}
            </div>

            {isCurrentEdit && currentUser?.username === user.username ? (
              <>
                <div className="comment-body">
                  <textarea
                    className="comment-box"
                    name="comment"
                    value={reply}
                    placeholder="Add comment"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button className="edit-btn" onClick={handleEditSubmit}>Update</button>
              </>
            ) : (
              <div className="comment-body">
                <span className="at">@{replyingTo}</span> {content}
              </div>
            )}
          </li>

          {show && (
            <CommentBox
              image={currentUser?.image.webp}
              text={replyText}
              handleSubmit={() => handleNewReply({
                username: user.username,
                addTextType: "reply",
                repliesLength: repliesLength,
                id: commentId
              })}
              handleChange={handleReplyChange}
              buttonText={"REPLY"}
            />
          )}
        </ul>
      </li>
    </>
  )
}

export default Reply
