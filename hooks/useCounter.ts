import React from "react"
import { DataNode } from "../lib/interfaces/allInterfaces"

export const useCounter = (data: DataNode, setData: React.Dispatch<any>) => {
  const counterAdd = (id: number) => {
    const comments = [...data.comments].map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          score: obj.score + 1,
        }
      }
      return obj
    })

    setData((prevState: DataNode) => ({
      ...prevState,
      comments: comments,
    }))
  }

  const counterMinus = (id: number) => {
    const comments = [...data.comments].map((obj) => {
      if (obj.id === id && obj.score !== 0) {
        return {
          ...obj,
          score: obj.score - 1,
        }
      }
      return obj
    })

    setData((prevState: DataNode) => ({
      ...prevState,
      comments: comments,
    }))
  }

  return { counterAdd, counterMinus }
}

export const useCounterReply = (
  data: DataNode,
  setData: React.Dispatch<any>,
  id: number
) => {
  const replyCounterAdd = (replyId: number) => {
    const comments = [...data.comments].map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          replies: [...obj.replies].map((obj) => {
            if (obj.id === replyId) {
              return {
                ...obj,
                score: obj.score + 1,
              }
            }

            return obj
          }),
        }
      }
      return obj
    })

    setData((prevState: DataNode) => ({
      ...prevState,
      comments: comments,
    }))

  }

  const replyCounterMinus = (replyId: number) => {
    const comments = [...data.comments].map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          replies: [...obj.replies].map((obj) => {
            if (obj.id === replyId && obj.score !== 0) {
              return {
                ...obj,
                score: obj.score - 1,
              }
            }

            return obj
          }),
        }
      }
      return obj
    })

    setData((prevState: DataNode) => ({
      ...prevState,
      comments: comments,
    }))

  }

  return {replyCounterAdd, replyCounterMinus}
}
