import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";

const Navbar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Finance Tracker
          </Typography>
          <Link href="/" color="inherit" sx={{ marginRight: 2 }}>
            Home
          </Link>
          <Link href="/expenses" color="inherit" sx={{ marginRight: 2 }}>
            Expenses
          </Link>
          <Link href="/budgets" color="inherit" sx={{ marginRight: 2 }}>
            Budgets
          </Link>
          <Link href="/reports" color="inherit">
            Reports
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
