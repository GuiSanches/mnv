import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import { CloseHeader, CloseIcon, CloseLabel, ModalContainer } from "./styles";

interface Props {
    content: ReactNode;
    idPortal: string;
    setOpen: (open: boolean) => void;
}

const Modal: FC<Props> = ({ setOpen, content, idPortal }) => {
    const [message, setMessage] = useState<'KEEP' | 'DISPLACE'>('KEEP')
    const nodeRef = useRef(null);
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [])

    const handleClose = () => {
        setOpen(false);
    }

    const handleKeep = () => {
        setMessage(message === 'DISPLACE' ? 'KEEP' : 'DISPLACE')
    }

    const id = document.getElementById(idPortal);

    return (
        id &&
        createPortal(
            <Draggable nodeRef={nodeRef}>
                <ModalContainer ref={nodeRef}>
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
}

export const withModal = <P extends object>(Component: FC<P>) => {
    const Wrapper: FC<P> = ({ ...props }) => {
        const content = () => <Component {...props} />

        return <Modal setOpen={(open: boolean) => { }} content={content()} idPortal='__next' />
    }

    return Wrapper;
}

export default Modal;