import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Navabr = styled.header`
  background: #222;
  padding: 2rem 3.5rem;
  position: relative;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Logo = styled.span`
  color: #fff;
  font-size: 2rem;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 370px) {
    position: absolute;
    top: 100%;
    left: 0;
    height: 20vh;
    background: #222;
    width: 100%;
    z-index: 1000;
    border-top: 0.1rem solid #eee;
    flex-direction: column;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    transition: all 0.2s ease-in-out;

    &.active {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
`;
const Button = styled.button`
  margin: 0 0.5rem;
  padding: 1rem 1.8rem;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 550;
  cursor: pointer;
  background: #fff;
  outline: none;
  border: 0.1rem solid #fff;
  border-radius: 0.3rem;
  transition: 0.2s linear;

  @media (max-width: 370px) {
    margin: 1rem 0;
  }

  &:hover {
    background: #f0f0f0;
  }
`;

const Icons = styled.div`
  color: #fff;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  display: none;

  @media (max-width: 370px) {
    display: block;
  }
`;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    setOpen(!open);
  };

  return (
    <Navabr>
      <Flex>
        <Link to="/">
          <Logo> Goal Setter </Logo>
        </Link>
        <Nav className={open && "active"}>
          {user ? (
            <Button onClick={onLogout}> logout </Button>
          ) : (
            <>
              <Link to="/login">
                <Button onClick={handleClick}> login </Button>
              </Link>
              <Link to="/register">
                <Button onClick={handleClick}> register </Button>
              </Link>
            </>
          )}
        </Nav>
        <Icons onClick={handleClick}>{!open ? <FaBars /> : <FaTimes />}</Icons>
      </Flex>
    </Navabr>
  );
}

export default Header;
