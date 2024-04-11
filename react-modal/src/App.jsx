import React, { useState } from 'react';
import './App.css';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h1>안녕하세요!</h1>
      <p>내용내용내용</p>
      <button id="open" onClick={openModal}>버튼 열기</button>
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal1" onClick={(e) => e.stopPropagation()}>
            <div className="modal2">안녕하세요</div>
            <p>모달 내용은 어쩌고 저쩌고..</p>
            <div className="close">
              <button id="close1" onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;