import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Personal Finance Tracker
        </Typography>
        <SignedIn>
          <Button component={Link} href="/" color="inherit" sx={{ mr: 2 }}>
            Home
          </Button>
          <Button
            component={Link}
            href="/expenses"
            color="inherit"
            sx={{ mr: 2 }}
          >
            Expenses
          </Button>
          <Button
            component={Link}
            href="/savings"
            color="inherit"
            sx={{ mr: 2 }}
          >
            Savings
          </Button>
          <Button component={Link} href="/reports" color="inherit">
            Reports
          </Button>
        </SignedIn>
        <SignedOut>
          <Button
            component={Link}
            href="/sign-up"
            color="inherit"
            sx={{ mr: 2 }}
          >
            Sign Up
          </Button>
          <Button component={Link} href="/sign-in" color="inherit">
            Log In
          </Button>
        </SignedOut>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
