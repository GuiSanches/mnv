import { ChangeEvent, FC, useState } from "react";
import {
  CheckboxWrapper,
  CustomControlCheckbox,
  CustomControlLabel,
  InputGroup,
  Line,
} from "../../../../styles/global";
import { Title } from "../InfoNetwork/styles";

const LayoutComponent: FC = () => {
  const title = "Enable/Disable Grid Visualization";
  const label = "Grid (Better for MNV interactions)";

  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      //   neighborViewModel?.onSwitchSelected();
      setChecked(e.currentTarget.checked);
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <>
      <Title>{title}</Title>
      <Line />

      <InputGroup>
        <CheckboxWrapper>
          <CustomControlCheckbox
            type="checkbox"
            id="layout"
            name="layout"
            checked={checked}
            onChange={handleChange}
          />
          <CustomControlLabel htmlFor="layout">{label}</CustomControlLabel>
        </CheckboxWrapper>
      </InputGroup>
    </>
  );
};

export default LayoutComponent;
