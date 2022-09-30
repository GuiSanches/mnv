import { FC, useMemo, useState } from "react";
import Modal from "../Modal";
import { NavItem, NavLink } from "./styles";

interface Props {
  isKeep?: boolean;
  isOpen?: boolean;
  Component: FC;
  title: string;
}

const Navitem = <T extends object>({ Component, title }: Props) => {
  const [Open, setOpen] = useState<boolean>(false);
  const handleItemClick = () => {
    setOpen(!Open);
  };

  const content = useMemo(() => {
    return <Component />;
  }, [Component]);

  return (
    <>
      <NavItem>
        <NavLink onClick={() => handleItemClick()}>{title}</NavLink>
      </NavItem>

      {
        <Modal
          open={Open}
          setOpen={setOpen}
          content={content}
          idPortal="__next"
        />
      }
    </>
  );
};

export default Navitem;
