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
  try {
    const response = await axios.get(
      `https://react-ecommerce-7d0j.onrender.com/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          username: username,
        },
      }
    );
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    return [];
  }
};

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user && state.auth.user.id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
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
    const fetchData = async () => {
      const userInfo = await getUserInfo(userId, authToken);

      if (userInfo) {
        const orders = await getOrderHistory(authToken, userInfo.username);
        setUserInfo(userInfo);
        setOrderHistory(orders);
      } else {
        console.error('Unable to fetch user information');
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
        <Box
          display=""
          alignItems="start"
        >
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
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
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
