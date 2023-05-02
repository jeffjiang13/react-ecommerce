import React from "react";
import { useSelector } from "react-redux";
import { selectWishlistItems } from "../features/wishlist/wishlistSlice";
import { Box, Typography } from "@mui/material";
import Item from "../components/Item";

const WishlistPage = () => {
  const wishlistItems = useSelector(selectWishlistItems);

  return (
    <div>
      <Typography
        variant="h3"
        gutterBottom
        style={{ textAlign: "center", marginTop: "180px", marginBottom: "100px" }}
      >
        Wishlist
      </Typography>

      {wishlistItems.length > 0 ? (
        <Box
          margin="0 auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {wishlistItems.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Box>
      ) : (
        <p style={{ textAlign: "center", marginTop: "200px", marginBottom: "300px" }}>No items in wishlist.</p>
      )}
    </div>
  );
};

export default WishlistPage;
