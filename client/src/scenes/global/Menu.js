import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsMenuOpen } from "../../state/menuActions";
import { Box, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      dispatch(setIsMenuOpen({ }));
    },
    [navigate, dispatch]
  );


  return (
    <Box
      display={isMenuOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"

      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="15px"
          >
            <Typography variant="h3">Menu</Typography>
              <IconButton
                onClick={() => {
                  dispatch(setIsMenuOpen({}));
                }}
              >
                <CloseIcon />
              </IconButton>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb="15px"
          >
            <Button onClick={() => handleNavigate("/wishlist")}>
            Wishlist
          </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb="15px"
          >
          <Button onClick={() => handleNavigate("/contact-us")}>
            Contact Us
          </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Menu;
