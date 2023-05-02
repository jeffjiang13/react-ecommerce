import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useMemo } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/wishlist/wishlistSlice";
import { selectWishlistItems } from "../../features/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";
import Reviews from "../../components/Reviews";

const ItemDetails = ({ allItems }) => {
  const { itemId } = useParams();
  const currentItemIndex = allItems.findIndex(
    (item) => item.id === itemId.toString()
  );
  const dispatch = useDispatch();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const wishlistItems = useSelector(selectWishlistItems);
  const isInWishlist = useMemo(() => {
    return wishlistItems.some((wishlistItem) => wishlistItem.id === item?.id);
  }, [wishlistItems, item]);
  const navigate = useNavigate();

  const handlePrevNext = (direction) => {
    if (!itemId) return;

    const currentItemIndex = allItems.findIndex(
      (item) => item.id === itemId.toString()
    );
    const newIndex = currentItemIndex + direction;

    if (newIndex >= 0 && newIndex < allItems.length) {
      const newId = allItems[newIndex].id;
      navigate(`/item/${newId}`);
    }
  };

  const handleAddToWishlist = (item) => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(item.id));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    const item = await fetch(
      `https://react-ecommerce-7d0j.onrender.com/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
    setIsImageLoading(false);
  }

  async function getItems() {
    const items = await fetch(
      `https://react-ecommerce-7d0j.onrender.com/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);
  console.log(item);
  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          {isImageLoading ? (
            <div>Loading...</div> // Replace this with a loading spinner or a placeholder image
          ) : (
            <img
              alt={item?.name}
              width="100%"
              height="100%"
              src={
                item?.attributes?.image?.data?.attributes?.formats?.medium?.url
              }
              style={{ objectFit: "contain" }}
            />
          )}
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Button onClick={() => navigate("/")}>Home</Button>
            </Box>
            <Box>
              <Button onClick={() => handlePrevNext(item.id - 1)}>Prev</Button>
              <Button onClick={() => handlePrevNext(item.id + 1)}>Next</Button>
            </Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography fontWeight="bold" fontSize="18px">
              ${item?.attributes?.price}
            </Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <IconButton onClick={() => handleAddToWishlist(item)}>
                {isInWishlist ? (
                  <FavoriteIcon color="error" /> // Show red heart if the item is in the wishlist
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
                <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
              </IconButton>
            </Box>

            <Typography>
              CATEGORIES: {item?.attributes?.category.toUpperCase()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === "reviews" && <Reviews itemId={itemId} />}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
