import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

const Hero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Personal Finance Tracker
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Take control of your finances and achieve your financial goals
      </Typography>
      <Box mt={4}>
        <Button
          component={Link}
          href="/sign-up"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mr: 2 }}
        >
          Sign Up
        </Button>
        <Button
          component={Link}
          href="/sign-in"
          variant="outlined"
          color="primary"
          size="large"
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
