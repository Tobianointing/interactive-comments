import React, { useState } from "react"
import { DataCommentNode, DataNode, DataReply } from "../lib/interfaces/allInterfaces"

export const useHandleCommentOrReply = (data: DataNode, setData: React.Dispatch<any>) => {
  const [text, setText] = useState("")

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (args: {
    addTextType: string
    username?: string
    id?: number
    repliesLength?: number
  }) => {
    let comments: DataCommentNode[]

    if (text) {
      if (args.addTextType === "reply") {
        const newReply = {
          id: (args?.repliesLength || 0) + 1,
          content: text,
          createdAt: new Date().toISOString(),
          score: 0,
          user: data.currentUser,
          replyingTo: args?.username || "",
        }

        comments = [...data.comments].map((obj) => {
          if (obj.id === args.id) {
            return {
              ...obj,
              replies: [...obj.replies, newReply],
            }
          }

          return obj
        })
      } else {
        const newComment = {
          id: data.comments.length + 1,
          content: text,
          createdAt: new Date().toISOString(),
          score: 0,
          user: data.currentUser,
          replies: [],
        }

        comments = [...data.comments, newComment]
      }

      setData((prevState: DataNode) => ({
        ...prevState,
        comments: comments,
      }))

      setText("")
    }
  }

  return { text, handleChange, handleSubmit }
}
