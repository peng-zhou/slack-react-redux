import React from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Avatar } from "@mui/material";

function Header() {
  const [user] = useAuthState(auth);

  console.log("user is", user);
  return (
    <HeaderContainer>
      {/* header left */}
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => auth.signOut()}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </HeaderLeft>

      {/* Header Search */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search ..." />
      </HeaderSearch>

      {/* header middle */}

      {/* header right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  justify-content: space-between;

  > .MuiSvgIcon-root {
    margin-left: 0;
    margin-right: 30px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  flex: 0.3;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  :hover {
    opacity: 0.8;
  }
`;
