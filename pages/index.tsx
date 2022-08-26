import type { NextPage } from "next"
import Head from "next/head"
import React, { useEffect, useState, useRef } from "react"
import Attribution from "../components/Attribution"
import Modal from "../components/Modal"
import Comment from "../components/Comment"
import CommentBox from "../components/CommentBox"
import commentData from "../data.json"
import { DataCommentNode, DataNode, DataReply, User } from "../lib/interfaces/allInterfaces"
import { useModal } from "../hooks/useModal"
import { useCounter } from "../hooks/useCounter"
import { useHandleCommentOrReply } from "../hooks/useHandleCommentOrReply"

/* eslint-disable @next/next/no-img-element */
const Home: NextPage = () => {
  const [data, setData] = useState<any>(commentData)
  const [isCurrentShow, setIsCurrentShow] = useState<any>({})
  const [isCurrentCommentEdit, setIsCurrentCommentEdit] = useState<any>({})

  const {
    text: commentText,
    handleSubmit: handleComment,
    handleChange: handleCommentChange,
  } = useHandleCommentOrReply(data, setData)

  const { isOpen, onOpen, onClose, handleDelete } = useModal(data, setData)
  const { counterAdd, counterMinus } = useCounter(data, setData)

  useEffect(() => {
    const localData = localStorage.getItem("interactiveComments")
    if (localData) {
      const ParseLocalData = JSON.parse(localData)

      setData(ParseLocalData)
    }
  }, [])

  const initialRender = useRef(true)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    localStorage.setItem("interactiveComments", JSON.stringify(data))
  }, [data])

  const sortedComments = data.comments.sort((a: { score: number }, b: { score: number }) =>
    a.score < b.score ? 1 : b.score < a.score ? -1 : 0
  )

  const commentList = sortedComments.map(
    (comment: {
      id: number
      content: string
      createdAt: string
      score: number
      user: User
      replies: DataReply[]
    }) => {
      return (
        <Comment
          key={comment.id}
          id={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          user={comment.user}
          replies={comment.replies}
          currentUser={data.currentUser}
          show={isCurrentShow?.[comment.id] || false}
          setShow={setIsCurrentShow}
          onOpen={onOpen}
          counterAdd={counterAdd}
          counterMinus={counterMinus}
          setData={setData}
          data={data}
          isCurrentCommentEdit={isCurrentCommentEdit?.[comment.id] || false}
          setIsCurrentCommentEdit={setIsCurrentCommentEdit}
        />
      )
    }
  )

  return (
    <div className="container">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon-32x32.png" />
        <title>Frontend Mentor | Interactive comments section</title>
      </Head>
      <div className="wrapper">
        <ul className="top comments-wrapper">{commentList}</ul>
        <CommentBox
          image={data.currentUser.image?.webp}
          text={commentText}
          handleChange={handleCommentChange}
          handleSubmit={() =>
            handleComment({
              addTextType: "comment",
            })
          }
        />
      </div>

      {isOpen && <Modal isOpen={isOpen} onClose={onClose} handleDelete={handleDelete} />}
      <Attribution />
    </div>
  )
}

export default Home
