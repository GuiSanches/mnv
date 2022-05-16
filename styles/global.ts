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
    margin-bottom: .25rem;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
`

export const InputGroupPrepend = styled.div`
  margin-right: -1px;
  display: flex;
  background-color: #e9ecef;
`;

export const InputGroupText = styled.span`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: .375rem .75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;  
  border: 1px solid #ced4da;
  border-radius: .25rem;
  outline-color: rgb(73, 80, 87);
`;
