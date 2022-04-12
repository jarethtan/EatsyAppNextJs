import React from "react";
import { Grid } from "@mui/material";
import classes from "./CategoryList.module.css";
import { image } from "../../public/CountryIcons";

const CatagoryList: React.FC<{ catList: string[] }> = (props) => {
  return (
    <Grid container>
      {props.catList.map((category, i) => (
        <Grid item key={category} xs={4} sm={4} md={3} lg={2} textAlign="center">
          <a
            href={"/" + category}
            className={classes.link}
            style={{
              backgroundImage: `url(${image[i]})`,
            }}
          >
            <button className={classes.button}>
              <span>{category.toUpperCase()}</span>
            </button>
          </a>
        </Grid>
      ))}
    </Grid>
  );
};

export default CatagoryList;
