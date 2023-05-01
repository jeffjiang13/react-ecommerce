import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, TextField } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import { setIsMenuOpen } from "../../state/menuActions";

import Menu from "./Menu";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

const handleSearch = (e) => {
  e.preventDefault();
  if (!search.trim()) return; // Prevents submission when the search input is empty
  navigate(`/search/${search}`);
};

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          ChiqueChick
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          <form
            onSubmit={handleSearch}
            style={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              InputProps={{
                startAdornment: <SearchOutlined />,
                endAdornment: (
                  <IconButton type="submit" edge="end">
                    <ArrowForwardIosOutlined fontSize="small" />
                  </IconButton>
                ),
              }}
            />
          </form>
          <IconButton sx={{ color: "black" }} onClick={handleProfileClick}>
            {isAuthenticated ? <PersonOutline /> : <PersonOutline />}
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton
            onClick={() => dispatch(setIsMenuOpen())}
            sx={{ color: "black" }}
          >
            <MenuOutlined />
            <Menu />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
