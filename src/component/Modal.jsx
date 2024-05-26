import React from "react";
import styled from "styled-components";

const Modal = ({ show, item, onClose }) => {
  if (!show) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{"차량 번호: " + item.number}</h2>
        <img src={item.imgUrl} alt={item.number} style={{ width: "100%" }} />
        <p>{item.isOverload ? "This truck is overload" : "This truck is normal"}</p>
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 400px;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
`;

export default Modal;