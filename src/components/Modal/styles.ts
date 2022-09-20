import styled from "styled-components";

export const ModalContainer = styled.div<{ isShow: boolean }>`
  display: flex;
  flex-direction: column;
  z-index: ${(props) => (props.isShow ? 30 : -1)};
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  position: absolute;
  box-shadow: 8px 8px 8px 8px #888888;
  touch-action: none;
  padding: 1rem;
  margin: 0.5rem;
  float: left;
  border-radius: 0.25rem;
  cursor: move;
  background-color: #f8f9fa;
  top: 40px;
`;

export const CloseHeader = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
`;

export const CloseLabel = styled.span`
  padding-right: 0.2rem;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;

  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

export const CloseIcon = styled.div`
  cursor: pointer;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
  &::after {
    font-size: 1.3em;
    display: inline-block;
    content: "\\00d7";
  }
`;
