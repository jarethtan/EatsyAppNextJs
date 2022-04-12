import React from "react";
import classes from "./IconBox.module.css";
import Image from "next/image";
import { CardContent, Typography, Card, Grid, Box } from "@mui/material";
import { iconsArray } from "../../public/CountryIcons";
import { addSearchFields } from "../../redux/search";
import { useDispatch } from "react-redux";

const IconBox = () => {
  const dispatch = useDispatch();
  return (
    <Box className={classes.box}>
      <Grid container>
        {iconsArray.map((icon, i) => (
          <Grid item key={i} xs={3} sm={2} md={1} xl={1}>
            <Card className={classes.card}>
              <a
                className={classes.iconLink}
                onClick={() => {
                  dispatch(addSearchFields({ fieldParameter: icon[2], fieldSelect: "productCategory", greaterOrLessThanPrice: "equal" }));
                }}
              >
                <span className={classes.imageContainer}>
                  <Image src={icon[0]} width="100%" height={50} className={classes.image} />
                </span>
                <CardContent className={classes.content}>
                  <Typography className={classes.word}>{icon[1]}</Typography>
                </CardContent>
              </a>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IconBox;
