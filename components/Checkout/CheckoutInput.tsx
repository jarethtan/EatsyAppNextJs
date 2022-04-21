import React, { Fragment } from "react";
import classes from "./ProductCheckoutList.module.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DatePicker from "@mui/lab/DatePicker";
import Input from "../../ui/Input";
import { format } from "date-fns";
import { TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const DeliveryPickupTimeInput: React.FC<{ deliveryMethod: boolean }> = (props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const readOnlyOnFocus = (e: any) => {
    console.log((e.target.readOnly = "not allowed to manually key selected date in"));
  };
  return (
    <Fragment>
      {!props.deliveryMethod ? (
        <Input names="contactNumPickUp" type="number" label="Contact Number" pageType="checkout" multiLines={false} disable={false} autoFocus={false} />
      ) : (
        ""
      )}
      <br />
      <br />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="selectDate"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label={props.deliveryMethod ? "Delivery Date" : "Pick-up Date"}
              inputFormat="MM/dd/yyyy"
              value={value}
              disablePast
              maxDate={Date.now() + 7 * 24 * 60 * 60 * 1000}
              onChange={(value) => onChange(format(new Date(value), "MM/dd/yyyy"))}
              renderInput={(params) => (
                <TextField
                  id="selectDate"
                  {...params}
                  error={!!errors.selectDate}
                  onFocus={readOnlyOnFocus}
                  autoComplete="off"
                  helperText={errors.selectDate ? errors.selectDate?.message : ""}
                  style={{ width: "100%" }}
                  className={classes.dateTimeInput}
                />
              )}
            />
          )}
        />
      </LocalizationProvider>
      <br />
      <br />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name="selectTime"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TimePicker
              label={props.deliveryMethod ? "Delivery Time (10am - 10pm)" : "Pick-up Time (10am - 10pm)"}
              value={value}
              ampm={false}
              onChange={(value) => onChange(value)}
              minutesStep={15}
              minTime={new Date(0, 0, 0, 10)}
              maxTime={new Date(0, 0, 0, 22)}
              renderInput={(params) => (
                <TextField
                  id="selectTime"
                  {...params}
                  onFocus={readOnlyOnFocus}
                  error={!!errors.selectTime}
                  helperText={errors.selectTime ? errors.selectTime?.message : ""}
                  style={{ width: "100%" }}
                  className={classes.dateTimeInput}
                />
              )}
            />
          )}
        />
      </LocalizationProvider>
    </Fragment>
  );
};

export default DeliveryPickupTimeInput;

// <Fragment>
//   {!props.deliveryMethod ? (
//     <Input names="contactNumPickUp" type="number" label="Contact Number" pageType="checkout" multiLines={false} disable={false} autoFocus={false} />
//   ) : (
//     ""
//   )}
//   <br />
//   <br />
//   <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <Controller
//       name="selectTime"
//       control={control}
//       defaultValue=""
//       render={({ field: { onChange, value } }) => (
//         <input type="datetime-local" step={900} value={value} onChange={(value) => onChange(value)} className={classes.dateTimeInput} />
//       )}
//     />
//     <span style={{ color: "rgb(255, 66, 66)", background: "white", fontSize: "0.8rem" }}>{errors.selectTime ? errors.selectTime?.message : ""}</span>
//   </LocalizationProvider>
// </Fragment>;
