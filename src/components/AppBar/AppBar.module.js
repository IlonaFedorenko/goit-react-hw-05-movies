import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  gap: 20px;
  margin: 0px auto;
  padding: 20px;
  border-bottom: 1px solid #bfbfbf;
  box-shadow: 0 0 8px 0 rgba(66, 68, 90, 0.35);
`;
export const NavItem = styled(NavLink)`
  display: block;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  color: black;
  &.active {
    color: red;
  }
  :hover:not(.active),
  :focus-visible:not(.active) {
    color: black;
  }
`;
