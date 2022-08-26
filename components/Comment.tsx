import { CommentProps, DataCommentNode, DataNode } from "../lib/interfaces/allInterfaces"
import React, { useState } from "react"
import Reply from "./Reply"
import CommentBox from "./CommentBox"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useCounterReply } from "../hooks/useCounter"
import { useHandleCommentOrReply } from "../hooks/useHandleCommentOrReply"

dayjs.extend(relativeTime)

/* eslint-disable @next/next/no-img-element */
const Comment: React.FC<CommentProps> = ({
  content,
  createdAt,
  score,
  user,
  replies,
  currentUser,
  show,
  setShow,
  id,
  onOpen,
  counterAdd,
  counterMinus,
  setData,
  data,
  isCurrentCommentEdit,
  setIsCurrentCommentEdit,
}) => {
  const [isCurrentLevel2Show, setIsCurrentLevel2Show] = useState<any>({})
  const [isCurrentEdit, setIsCurrentEdit] = useState<any>({})
  const [commentEditText, setCommentEditText] = useState(content)
  // [replyText, handleReplyChange, handleNewReply]
  const {
    text: replyText,
    handleChange: handleReplyChange,
    handleSubmit: handleNewReply,
  } = useHandleCommentOrReply(data, setData)

  const { replyCounterAdd, replyCounterMinus } = useCounterReply(data, setData, id)

  const formattedCreatedAt = dayjs(createdAt).fromNow()

  const handleShow = (id: number, setShow: React.Dispatch<any>): void => {
    setShow((prev: any) => {
      return {
        ...prev,
        [id]: !prev[id],
      }
    })
  }

  const handleReply = () => {
    handleShow(id, setShow)
  }

  const sortedReplies = replies.sort((a, b) =>
    a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0
  )

  const ReliesList = sortedReplies.map((reply) => {
    return (
      <Reply
        key={reply.id}
        id={reply.id}
        content={reply.content}
        createdAt={reply.createdAt}
        score={reply.score}
        user={reply.user}
        replyingTo={reply.replyingTo}
        currentUser={currentUser}
        show={isCurrentLevel2Show?.[reply.id] || false}
        setShow={setIsCurrentLevel2Show}
        isCurrentEdit={isCurrentEdit?.[reply.id] || false}
        setIsCurrentEdit={setIsCurrentEdit}
        handleShow={handleShow}
        onOpen={onOpen}
        counterAdd={replyCounterAdd}
        counterMinus={replyCounterMinus}
        handleNewReply={handleNewReply}
        handleReplyChange={handleReplyChange}
        replyText={replyText}
        data={data}
        setData={setData}
        commentId={id}
        repliesLength={replies.length}
      />
    )
  })

  const handleEditShow = () => {
    handleShow(id, setIsCurrentCommentEdit)
  }

  const handleCommentEditChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCommentEditText(e.target.value)
  }

  const handleEditSubmit = () => {
    if (commentEditText) {
      const comments = [...data.comments].map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            content: commentEditText,
            createdAt: new Date().toISOString(),
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
          <span className="time">{formattedCreatedAt}</span>
        </div>

        <div className="action-btns">
          {currentUser?.username === user.username ? (
            <>
              <div className="delete-btn" onClick={() => onOpen(id, null)}>
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

        {isCurrentCommentEdit && currentUser?.username === user.username ? (
          <>
            <div className="comment-body">
              <textarea
                className="comment-box"
                name="comment"
                value={commentEditText}
                placeholder="Add comment"
                onChange={handleCommentEditChange}
              ></textarea>
            </div>

            <button className="edit-btn" onClick={handleEditSubmit}>
              Update
            </button>
          </>
        ) : (
          <div className="comment-body">{content}</div>
        )}
      </li>
      {show && (
        <CommentBox
          image={currentUser?.image.webp}
          text={replyText}
          handleSubmit={() =>
            handleNewReply({
              username: user.username,
              addTextType: "reply",
              repliesLength: replies.length,
              id: id,
            })
          }
          handleChange={handleReplyChange}
          buttonText={"REPLY"}
        />
      )}
      {ReliesList}
    </>
  )
}

export default Comment
