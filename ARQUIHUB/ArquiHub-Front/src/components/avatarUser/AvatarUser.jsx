import React, { useState } from 'react'
import Modal from '../modal/Modal'

function AvatarUser({
  img,
  alt = "",
  className = "",
  action = false}) {

  const [overlayAvatar, setOverlayAvatar] = useState(false)
  const toggleOverlay = (e) => {
    e.preventDefault()
    setOverlayAvatar(!overlayAvatar)
  }
  return (
    <div>
      <div onClick={() => action && setOverlayAvatar(true)}>
        <img 
        className={`object-cover rounded-full ${className}`} src={img} alt={alt} />
      </div>
      <Modal active={overlayAvatar} toggle={toggleOverlay}>
        <img className="w-full min-h-[25vw] object-cover" src={img} alt="" />
      </Modal>
    </div>
  )
}

export default AvatarUser