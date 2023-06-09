import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  TextareaAutosize,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";

const Reviews = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState(""); // New state variable for storing the fetched username

  // Access the user information directly from the Redux state
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchReviews();
    if (user) {
      const token = localStorage.getItem("jwt");
      fetchUserData(user.id, token);
    }
  }, [user]);

  const fetchUserData = async (userId, authToken) => {
    try {
      const response = await axios.get(
        `https://react-ecommerce-7d0j.onrender.com/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setUsername(response.data.username); // Set the fetched username
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://react-ecommerce-7d0j.onrender.com/api/reviews?item.id=${itemId}`
      );
      console.log("API response:", response.data);
      setReviews(response.data.data); // Access the data property
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!user) {
      console.error("User data not available.");
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("jwt");
    console.log(token)
    try {
      await axios.post(
        "https://react-ecommerce-7d0j.onrender.com/api/reviews",
        {
            data: {
              author: username,
              text: newReview,
              itemId: itemId,
            },
          },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewReview("");
      setIsSubmitting(false);
      fetchReviews();
    } catch (error) {
      console.error("Failed to submit review:", error);
      setIsSubmitting(false);
    }
  };


  return (
    <Box>
    <Typography variant="h4" mb={2}>
      Reviews
    </Typography>
    {isLoading ? (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    ) : (
      reviews
        .filter((review) => review.attributes.itemId === itemId)
        .map((review) => (
          <div key={review.id}>
            <Typography fontWeight="bold">
              BY: {review.attributes.author}
            </Typography>
            <Typography>{review.attributes.text}</Typography>
            <Typography>
              CREATED AT:{" "}
              {new Date(review.attributes.createdAt).toLocaleString()}
            </Typography>
            <br />
          </div>
        ))
    )}
    <br />
    <br />
    <form onSubmit={handleSubmit}>
      <Typography mb={1} htmlFor="review">
        Write a review:
      </Typography>
      <TextareaAutosize
        id="review"
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        minRows={3}
        style={{ width: "100%" }}
        placeholder="Your review..."
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!user || isSubmitting}
        style={{ marginTop: "8px" }}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
    {!user ? (
      <Typography style={{ marginTop: "8px" }}>
        Please sign in to leave a review.
      </Typography>
    ) : null}
  </Box>
);
};

export default Reviews;
