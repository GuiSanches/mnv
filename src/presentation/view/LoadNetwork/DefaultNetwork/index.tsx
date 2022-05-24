import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { Container, Input, Select, Submit } from "./styles";
import { Line, Label, InputGroup, InputGroupPrepend, InputGroupText } from "../../../../../styles/global";
import { ClipLoader } from "react-spinners";

interface Props {
  onLoadNetwork: (filename: string) => void;
  options: string[];
  loaded: boolean;
}

const DefaultNetwork: FC<Props> = ({ onLoadNetwork, options, loaded }) => {
  const title = `Default networks`;
  const label = `Load a network:`;

  const [selectedValue, setSelectedValue] = useState('-1');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  }

  const handleSubmit = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    onLoadNetwork(selectedValue);
  }

  return (
    <Container>
      <Label>{title}</Label>
      <Line />
      <InputGroupPrepend>
        <InputGroupText className="span-125">{label}</InputGroupText>
        <Select value={selectedValue} onChange={handleChange}>
          <option value="-1">Select</option>
          {options.map(option => <option value={option} key={option}>{option}</option>)}
        </Select>
        <Submit>
          <ClipLoader color={'#ffffff'} loading={loaded}
            css={'border: red'}
            size={15} />
          <Input as="input" type="submit" value="Load" onClick={handleSubmit} />
        </Submit>
      </InputGroupPrepend>
    </Container>
  );
};

export default DefaultNetwork;
