import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { shades } from "../../theme";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "clamp(20%, 30%, 40%)",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
}));

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <StyledBox>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            ChiqueChick - Unique Embroidered Creations
          </Typography>
          <div>
            <p>At ChiqueChick, we're passionate about bringing you high-quality, uniquely embroidered shirts, sweaters, towels, and more. Our mission is to provide exceptional products that celebrate individuality, creativity, and style. Each item is thoughtfully designed and skillfully crafted with the utmost attention to detail, ensuring you receive a truly one-of-a-kind piece.</p>
            <p>Our selection includes a diverse range of designs, from intricate patterns to personalized monograms, catering to various tastes and occasions. We believe that your wardrobe and home should be an extension of your personality, and our embroidered creations are the perfect way to express yourself.</p>
            <p>We're committed to using the finest materials and techniques, as well as offering outstanding customer service, to ensure a delightful shopping experience. Thank you for choosing ChiqueChick, where every stitch tells a story.</p>
            <p>Connect with us on social media to stay updated on new arrivals, promotions, and more. We can't wait to see how you style your ChiqueChick creations!</p>
            <p>© ChiqueChick 2021. All rights reserved.</p>
          </div>
        </StyledBox>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Order</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            50 north Whatever Blvd, Washington, DC 10501
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: mredwardroh@gmail.com
          </Typography>
          <Typography mb="30px">(222)333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
