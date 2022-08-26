import React from "react"
import { ModalNode } from "../lib/interfaces/allInterfaces"

const Modal: React.FC<ModalNode> = ({ onClose, handleDelete }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-header">Delete comment</div>
        <div className="modal-body">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, est in ipsa ab
          voluptatibus debitis quae
        </div>
        <div className="modal-btns">
          <button className="cancel" onClick={onClose}>
            No, cancel
          </button>
          <button className="delete" onClick={handleDelete}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
