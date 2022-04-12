import React, { useState } from "react";
import { Card, Grid, Typography, Menu, MenuItem, Button } from "@mui/material";
import classes from "./UserProfile.module.css";

const UserProfile: React.FC<{ userProfile: any }> = (props) => {
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (index: any, event: any) => {
    // retrieve the specific AnchorEl for the specific list. Since we are mapping the paidCartArray, there could be multiple paid cart per user. SO display the right list to the right paid card, we need a unique AnchorEl for each paid cart. we do this by pass the index of each paid cart when we are mapping.
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const paidCartArray: any = [];
  props.userProfile.map((user: any) =>
    Object.keys(user).filter((k) => (k.startsWith("paidCart") ? paidCartArray.push(Object.values(user[k.toString()])) : null))
  );
  return (
    <Card className={classes.container}>
      <h1 className="pageHeader">User Profile Page</h1>
      <Grid container>
        <Grid item xs={12} sm={6} md={4} order={{ xs: 2, md: 1 }}>
          <Typography className={classes.subTitleInfo}>Personal Details</Typography>
          <Typography className={classes.info}>User Name: {props.userProfile[0].userName}</Typography>
          <Typography className={classes.info}>First Name: {props.userProfile[0].firstName}</Typography>
          <Typography className={classes.info}>Last Name: {props.userProfile[0].lastName}</Typography>
          <Typography className={classes.info}>Email: {props.userProfile[0].email}</Typography>
          <br />
          <Typography className={classes.subTitleInfo}>Shipping Details</Typography>
          <Typography className={classes.info}>Delivery Address: {props.userProfile[0].deliveryAddress}</Typography>
          <Typography className={classes.info}>Postal Code: {props.userProfile[0].postalCode}</Typography>
          <Typography className={classes.info}>Contact Number: {props.userProfile[0].contactNumber}</Typography>
          <br />
        </Grid>
        <Grid item xs={12} sm={6} md={4} order={{ xs: 3, md: 2 }}>
          <Typography className={classes.subTitleOrder}>Previous Orders</Typography>
          {paidCartArray.map((paidCart: any, i: number) => (
            <div key={i} className={classes.eachPaidCart}>
              <Typography className={classes.orderNum}>No.{i + 1} Order</Typography>
              <Typography className={classes.orderInfo}>Date of Purchase: {paidCart[0].purchaseDate ? paidCart[0].purchaseDate : "Not available"}</Typography>
              <Typography className={classes.orderInfo}>Order Cost: ${paidCart[0].cartTotalPrice ? paidCart[0].cartTotalPrice : "Not available"}</Typography>
              <Typography className={classes.orderInfo}>
                No. of Dishes: {paidCart.length} /
                <Button className={classes.seeOrderButton} onClick={(e) => handleClick(i, e)}>
                  See Order
                </Button>
              </Typography>
              <div>
                <Menu anchorEl={anchorEl && anchorEl[i]} open={Boolean(anchorEl && anchorEl[i])} onClose={handleClose}>
                  {paidCart.map((product: any, i: number) => (
                    <MenuItem key={i} className={classes.orderInfo}>
                      Dish: {product.productName} / Qty: {product.quantity}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          ))}
        </Grid>
        <Grid item xs={12} md={4} order={{ xs: 1, md: 3 }}>
          <img src={props.userProfile[0].userImage} className={classes.userImage} alt="User Image" />
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserProfile;
