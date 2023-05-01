import React from "react";
import { Box, Typography } from "@mui/material";

function ContactUs() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 60px)"
      paddingTop="60px"
      paddingBottom="50px"
    >
      <Typography variant="h3" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        For any inquiries, please contact us at:
      </Typography>
      <Typography variant="body1" paragraph>
        Email: support@chiquechick.com
      </Typography>
      <Typography variant="body1" paragraph>
        Phone: +1 (555) 123-4567
      </Typography>
    </Box>
  );
}

export default ContactUs;
