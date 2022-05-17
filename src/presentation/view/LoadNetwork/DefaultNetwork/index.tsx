import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { Container, Input, Select, Submit } from "./styles";
import { Line, Label, InputGroup, InputGroupPrepend, InputGroupText } from "../../../../../styles/global";

interface Props {
  onLoadNetwork: (filename: string) => void;
  options: string[];
}

const DefaultNetwork: FC<Props> = ({ onLoadNetwork, options }) => {
  const [selectedValue, setSelectedValue] = useState('-1')
  useEffect(() => {

  })

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value)
  }

  const handleSubmit = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    onLoadNetwork(selectedValue);
  }

  return (
    <Container>
      <Label>Default networks</Label>
      <Line />
      <InputGroupPrepend>
        <InputGroupText className="span-125">Load a network:</InputGroupText>
        <Select value={selectedValue} onChange={handleChange}>
          <option value="-1">Select</option>
          {options.map(option => <option value={option} key={option}>{option}</option>)}
        </Select>
        <Submit>
          <Input as="input" type="submit" value="Load" onClick={handleSubmit}/>
        </Submit>
      </InputGroupPrepend>
    </Container>
  );
};

export default DefaultNetwork;
