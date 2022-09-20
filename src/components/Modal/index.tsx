import React, {
  FC,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { CloseHeader, CloseIcon, CloseLabel, ModalContainer } from "./styles";

interface Props {
  open: boolean;
  content: ReactNode;
  idPortal: string;
  setOpen: (open: boolean) => void;
}

const Modal: FC<Props> = ({ open, setOpen, content, idPortal }) => {
  const [message, setMessage] = useState<"KEEP" | "DISPLACE">("KEEP");
  const nodeRef = useRef(null);
  const [id, setId] = useState<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const id = document.getElementById(idPortal);
    setId(id);

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeep = () => {
    setMessage(message === "DISPLACE" ? "KEEP" : "DISPLACE");
  };

  return (
    id &&
    createPortal(
      <Draggable nodeRef={nodeRef}>
        <ModalContainer ref={nodeRef} isShow={open}>
          <CloseHeader>
            <CloseLabel onClick={() => handleKeep()}>{message}</CloseLabel>
            <CloseIcon onClick={() => handleClose()} />
          </CloseHeader>
          {content}
        </ModalContainer>
      </Draggable>,
      id
    )
  );
};

interface Prop {
  open: boolean;
}

export const withModal = <P extends Prop>(Component: FC<P>) => {
  const Wrapper: FC<P> = ({ ...props }) => {
    const content = () => <Component {...props} />;

    return (
      <Modal
        setOpen={(open: boolean) => {}}
        open={props.open}
        content={content()}
        idPortal="__next"
      />
    );
  };

  return Wrapper;
};

export default Modal;
