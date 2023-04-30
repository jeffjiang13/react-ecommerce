import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const getUserInfo = async (userId, authToken) => {
  console.log("getUserInfo function called");
  try {
    const response = await axios.get(
      `https://react-ecommerce-7d0j.onrender.com/api/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
};

const getOrderHistory = async (authToken, username) => {
  console.log("getOrderHistory function called");

  try {
    const limit = 25; // The number of orders per request (page size)
    let start = 0;
    let allOrders = [];
    let hasMore = true;

    while (hasMore) {
      const response = await axios.get(
        `https://react-ecommerce-7d0j.onrender.com/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          params: {
            username: username,
            _limit: limit,
            _start: start,
          },
        }
      );

      console.log("Response data:", response.data);
      const orders = response.data.data;
      const pagination = response.data.meta.pagination;

      if (orders.length > 0) {
        allOrders = [...allOrders, ...orders];
        start += limit;
      } else {
        hasMore = false;
      }

      if (start >= pagination.total) {
        hasMore = false;
      }
    }

    return allOrders;
  } catch (error) {
    console.error("Error fetching order history:", error);
    return [];
  }
};

const ProfilePage = () => {
  console.log("ProfilePage component rendered");

  const [userInfo, setUserInfo] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user && state.auth.user.id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    console.log("ProfilePage useEffect for isAuthenticated");
    if (!isAuthenticated && !isInitialLoad) {
      navigate("/login");
    }
  }, [isAuthenticated, isInitialLoad, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  useEffect(() => {
    console.log("ProfilePage useEffect for fetchData");
    const fetchData = async () => {
      const userInfo = await getUserInfo(userId, authToken);

      if (userInfo) {
        const orders = await getOrderHistory(authToken, userInfo.username);
        setUserInfo(userInfo);
        setOrderHistory(orders);
      } else {
        console.error("Unable to fetch user information");
      }
      setIsInitialLoad(false);
    };
    if (isAuthenticated && userId && authToken) {
      fetchData();
    }
  }, [userId, authToken, isAuthenticated]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={4}
    >
      <br />
      <br />
      <br />
      <Typography variant="h3" gutterBottom>
        User Profile
      </Typography>

      {userInfo && (
        <Box display="" alignItems="start">
          <Typography variant="h6">Name: {userInfo.username}</Typography>
          <Typography variant="h6">Email: {userInfo.email}</Typography>
        </Box>
      )}
      <br />

      <Typography variant="h3" gutterBottom marginTop={4}>
        Order History
      </Typography>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(orderHistory) &&
              orderHistory.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.attributes.stripeSessionId}</TableCell>
                  <TableCell>
                    {new Date(order.attributes.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    ${order.attributes.products.reduce(
                      (acc, product) => acc + product.total,
                      0
                    )}
                  </TableCell>
                  <TableCell>
                    {Math.random() < 0.5 ? "processed" : "order placed"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ marginTop: "16px" }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default ProfilePage;
