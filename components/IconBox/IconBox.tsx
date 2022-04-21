import React from "react";
import classes from "./IconBox.module.css";
import { iconsArray } from "../../public/CountryIcons";
import { addSearchFields } from "../../redux/search";
import { useDispatch } from "react-redux";

const IconBox = () => {
  const dispatch = useDispatch();
  return (
    <div className={classes.box}>
      {iconsArray.map((icon, i) => (
        <div key={i} className={classes.card}>
          <a
            className={classes.iconLink}
            onClick={() => {
              dispatch(addSearchFields({ fieldParameter: icon[2], fieldSelect: "productCategory", greaterOrLessThanPrice: "equal" }));
            }}
          >
            <span className={classes.imageContainer}>
              <img src={icon[0]} width="100%" height={40} alt="" className={classes.image} />
            </span>
            <div className={classes.content}>
              <span className={classes.word}>{icon[1]}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default IconBox;
