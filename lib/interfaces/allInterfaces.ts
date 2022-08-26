export interface Image {
  png: string
  webp: string
}

export interface User {
  image: Image
  username: string
}

interface BaseNode {
  id: number
  content: string
  createdAt: string
  score: number
  user: User
}

export interface DataCommentNode extends BaseNode {
  replies: DataReply[]
}

export interface DataReply extends BaseNode {
  replyingTo: string
}

export interface DataNode {
  currentUser: User
  comments: DataCommentNode[]
}

export interface CommentProps extends DataCommentNode {
  currentUser: User
  show: boolean
  setShow: React.Dispatch<any>
  onOpen: (commentId: number, replyId: number | null) => void
  counterAdd: (id: number) => void
  counterMinus: (id: number) => void
  setData: React.Dispatch<any>
  data: DataNode
  isCurrentCommentEdit: boolean
  setIsCurrentCommentEdit: React.Dispatch<any>
}

export interface ReplyProps
  extends Omit<
    CommentProps,
    | "replies"
    | "handleComment"
    | "handleCommentChange"
    | "commentText"
    | "isCurrentCommentEdit"
    | "setIsCurrentCommentEdit"
  > {
  replyingTo: string
  isCurrentEdit: boolean
  setIsCurrentEdit: React.Dispatch<any>
  handleShow: (id: number, setShow: React.Dispatch<any>) => void
  replyText: string
  handleNewReply: (args: {
    addTextType: string
    username?: string
    id?: number
    repliesLength?: number
  }) => void
  handleReplyChange: React.ChangeEventHandler<HTMLTextAreaElement>
  commentId: number
  repliesLength: number
}

export interface ModalNode {
  isOpen: boolean
  onClose: () => void
  handleDelete: () => void
}

export interface CommentBoxProps {
  image: string
  handleSubmit: () => void
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>
  text: string
  buttonText?: string
}
