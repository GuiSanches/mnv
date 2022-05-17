import { FC, useEffect, useMemo, useState } from "react";
import Modal from "../Modal";
import { NavItem, NavLink } from "./styles";

interface Props<T extends object> {
    isKeep?: boolean;
    isOpen?: boolean;
    Component: FC;
    title: string;
}

const Navitem = <T extends object>({ Component, title }: Props<T>) => {
    const [Open, setOpen] = useState<boolean>(false)
    const handleItemClick = () => {
        setOpen(!Open);
    }

    const content = useMemo(() => {
        return <Component />
    }, [])

    return (
        <>
            <NavItem>
                <NavLink onClick={() => handleItemClick()}>
                    {title}
                </NavLink>
            </NavItem>

            {Open && <Modal setOpen={setOpen} content={content} idPortal="__next" />}
        </>
    )
}

export default Navitem;