import styled from "styled-components";

export const Label = styled.p`
  font-weight: 500;
  font-size: 14px;
  margin: 0;
  padding: 0;
`;

export const Line = styled.hr`
  margin-bottom: 0.5rem;
  margin-top: 0.25rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
  height: 0;
  overflow: visible;
`;

export const InputGroup = styled.div`
  margin-bottom: 0.25rem;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
`;

export const InputGroupPrepend = styled.div`
  margin-right: -1px;
  display: flex;
  background-color: #e9ecef;
`;

export const InputGroupText = styled.span`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  outline-color: rgb(73, 80, 87);
`;

export const FormControl = styled.input`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  position: relative;
  flex: 1 1 0%;
  min-width: 0%;
  margin-bottom: 0;

  &:disabled {
    background-color: #e9ecef;
    opacity: 1;
  }

  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: visible;
`;

export const Button = styled.button`
  border: none;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.375rem 0.75rem;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  border-left: none;
  display: flex;
  justify-content: space-between;

  & > span {
    margin-right: 0.3rem;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex: 1;
  padding-left: 1.75rem;
  transition: all 0.15s ease-in-out;
`;
export const CustomSwitch = styled.div`
    padding-left: 2.25rem;
    position: relative.
    display: block;
    min-height: 1.5rem;
`;

export const CustomControlCheckbox = styled.input`
  box-sizing: border-box;
  padding: 0;
  position: absolute;
  left: -0.2rem;
  top: calc(1rem - 0.8rem);
  z-index: 1;
  width: 0.75rem;
  height: 0.75rem;
  text-decoration: none;
  appearance: none;
  background-color: #adb5bd;
  border-radius: 100%;

  &:checked {
    background-color: #fff;
    left: 0.3rem;

    & ~ label::before {
      background-color: #007bff;
    }
  }
`;

export const CustomControlLabel = styled.label`
  position: relative;
  margin-bottom: 0;
  vertical-align: top;

  &::before {
    display: block;
    position: absolute;
    height: 1rem;
    content: "";
    // background-color: #fff;
    border: #adb5bd solid 1px;
    left: -2.25rem;
    width: 1.75rem;
    pointer-events: all;
    border-radius: 0.5rem;

    // background-color: #adb5bd;
    border-radius: 0.5rem;

    transition: all 0.15s ease-in-out;
  }

  & span {
    margin-right: 0.3em;
  }
`;
