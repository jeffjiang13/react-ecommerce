import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromLocalStorage = () => {
  try {
    const serializedWishlist = localStorage.getItem("wishlist");
    if (serializedWishlist === null) {
      return [];
    }
    return JSON.parse(serializedWishlist);
  } catch (e) {
    console.warn("Error loading wishlist from local storage:", e);
    return [];
  }
};

const saveWishlistToLocalStorage = (wishlist) => {
  try {
    const serializedWishlist = JSON.stringify(wishlist);
    localStorage.setItem("wishlist", serializedWishlist);
  } catch (e) {
    console.warn("Error saving wishlist to local storage:", e);
  }
};

const initialState = {
  items: loadWishlistFromLocalStorage(),
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const index = state.items.findIndex(
        (wishlistItem) => wishlistItem.id === item.id
      );

      if (index < 0) {
        state.items.push(item);
      } else {
        state.items[index] = item;
      }
      saveWishlistToLocalStorage(state.items);
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (wishlistItem) => wishlistItem.id !== action.payload
      );
      saveWishlistToLocalStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;

export default wishlistSlice.reducer;
