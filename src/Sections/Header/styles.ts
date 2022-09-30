import styled from 'styled-components';

export const Container = styled.header`
    height: 40px;
    z-index: 2;
    color: white;
    padding: 0;
    margin: 0;
    background-color: #343a40;
    position: relative;
    display: flex;
    align-items: center;
    
    @media screen and (min-width: 576px) {
        flex-flow: row nowrap;
        justify-content: flex-start;
    }
`

export const Nav = styled.nav`
    display: flex;
    flex-basis: auto;
    align-items: center;
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    color: white;
    font-wieght: 400;
    line-height: 1.5;
    text-align: left; 
`

export const NavbarNav = styled.ul`
    display: flex;
    flex: 1;
    flex-direction: row;
    padding-left: 60px;
    margin-bottom: 0;
    margin-top: 0;
    list-style: none;
    justify-content: space-around;
    align-items: center;
    align-content: center;
`

export const NavItem = styled.li`

`