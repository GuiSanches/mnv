import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const Wrapper = styled.div`
    display: flex;
`

export const CustomFile = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1 1 0%;
  min-width: 0;
  margin-bottom: 0;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
`;

export const Input = styled.input`
  position: relative;
  z-index: 2;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  margin: 0;
  opacity: 0;
  overflow: visible;
`;

export const CustomFileLabel = styled.label`
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: block;
    height: calc(1.5em + 0.75rem);
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    color: #495057;
    content: "Browse";
    background-color: #e9ecef;
    border-left: inherit;
    border-radius: 0 0.25rem 0.25rem 0;
  }
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  display: inline-block;
  margin-bottom: 0.5rem;
`;
