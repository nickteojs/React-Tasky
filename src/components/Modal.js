import React from 'react'

const Modal = ({showModal, setShowModal}) => {
    return (
        <div>
           {showModal ? 'Modal' : ''} 
        </div>
    )
}

export default Modal
