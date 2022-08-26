import React, { useState } from "react"
import { DataCommentNode, DataNode } from "../lib/interfaces/allInterfaces"

interface Props {
  commentId: number | null
  replyId: number | null
}

export const useModal = (data: DataNode, setData: React.Dispatch<any>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteIds, setDeleteIds] = useState<Props>({ commentId: null, replyId: null })

  const onOpen = (commentId: number, replyId: number | null) => {
    setIsOpen(true)
    setDeleteIds({
      commentId: commentId,
      replyId: replyId,
    })
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const handleDelete = () => {
    let comments: DataCommentNode[]

    if (deleteIds.replyId) {
      comments = [...data.comments].map((obj) => {
        if (obj.id === deleteIds.commentId) {
          return {
            ...obj,
            replies: [...obj.replies].filter((obj) => obj.id !== deleteIds.replyId),
          }
        }
        return obj
      })
    } else {
      comments = [...data.comments].filter((obj) => obj.id !== deleteIds.commentId)
    }

    setData((prevState: DataNode) => ({
      ...prevState,
      comments: comments,
    }))


    setDeleteIds({
      commentId: null,
      replyId: null,
    })

    onClose()
  }

  return { isOpen, onOpen, onClose, handleDelete }
}
