import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
`

export const Canva = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-height: fit-content;
    overflow: hidden;
    position: relative;
    margin: 0;
    padding: 0;
    border: 1px solid black;

    & h1 {
        margin: 1em 0 0 60px;
        font-size: 1.1em;
    }
`