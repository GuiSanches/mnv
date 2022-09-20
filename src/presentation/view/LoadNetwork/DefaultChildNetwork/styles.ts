import styled from "styled-components";
import { InputGroupText } from "../../../../../styles/global";

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.2rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  position: relative;
  flex: 1 1 0%;
  min-width: 0;
  margin-bottom: 0;
  max-width: 150px;
  width: 150px;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  display: inline-block;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background: #fff
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e")
    no-repeat right 0.75rem center/8px 10px;
  border: 1px solid #ced4da;
  appearance: none;
  word-wrap: normal;
  text-transform: none;
  margin: 0;
`;

export const Submit = styled.div`
  margin-left: -1px;
  display: flex;
  align-items: center;
  min-width: 100px;
  justify-content: center;

  & > span {
    margin-right: 0.5rem;
  }
`;

export const Input = styled(InputGroupText)`
    padding: 0;
    border-style: none;
    border-top-left-radius: 0;
    border-bottom-left-radius;
    cursor: pointer;
    padding-left: 0;
    padding-right: 0;
    display: table-cell;
`;
