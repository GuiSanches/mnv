import styled from "styled-components";

export const NavItem = styled.li`

`

export const NavLink = styled.a`
    color: rgba(255,255,255,.5);
    padding: .5rem 1rem;    
    padding-right: .5rem;
    padding-left: .5rem;
    display: block;
    text-decoration: none;
    background-color: transparent;
    font-size: 14px;
    list-style: none;

    &:hover {
        cursor: pointer;
    }
`