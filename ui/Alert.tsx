import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { AppBar } from "@mui/material";

import { alertService, AlertType } from "../lib/services/alert";

Alert.propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

Alert.defaultProps = {
  id: "default-alert",
  fade: true,
};

function Alert({ id, fade }: { id: any; fade: any }) {
  const router = useRouter();
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    // subscribe to new alert notifications
    const subscription = alertService.onAlert(id).subscribe((alert) => {
      // clear alerts when an empty alert is received
      if (!alert.message) {
        setAlerts((alerts) => {
          // filter out alerts without 'keepAfterRouteChange' flag
          const filteredAlerts = alerts.filter((x: any) => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          filteredAlerts.forEach((x: any) => delete x.keepAfterRouteChange);
          return filteredAlerts;
        });
      } else {
        // add alert to array
        setAlerts((alerts) => [...alerts, alert]);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => removeAlert(alert), 5000);
        }
      }
    });

    // clear alerts on location change
    const onRouteChange = () => alertService.clear(id);
    router.events.on("routeChangeStart", onRouteChange);

    // clean up function that runs when the component unmounts
    return () => {
      // unsubscribe to avoid memory leaks
      subscription.unsubscribe();
      router.events.off("routeChangeStart", onRouteChange);
    };
  }, []);

  function removeAlert(alert: any) {
    if (fade) {
      // fade out alert
      const alertWithFade = { ...alert, fade: true };
      setAlerts((alerts: any) => alerts.map((x: any) => (x === alert ? alertWithFade : x)));

      // remove alert after faded out
      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x !== alertWithFade));
      }, 250);
    } else {
      // remove alert
      setAlerts((alerts) => alerts.filter((x) => x !== alert));
    }
  }

  function cssClasses(alert: any) {
    if (!alert) return;

    const classes = ["alert", "alert-dismissable"];

    const alertTypeClass = {
      [AlertType.Success]: "success",
      [AlertType.Error]: "error",
      [AlertType.Info]: "info",
      [AlertType.Warning]: "warning",
    };
    classes.push(alertTypeClass[alert]);

    if (alert.fade) {
      classes.push("fade");
    }

    return alert.type;
  }
  if (!alerts.length) return null;
  ///////////////////////////////////////////// Style sheet for alert type resides in the global.css file under styles folder.
  return (
    <AppBar position="sticky" sx={{ top: "7vh" }} className="container">
      <div>
        {alerts.map((alert: any, index: any) => (
          <div key={index} className={cssClasses(alert)}>
            <a className="close" onClick={() => removeAlert(alert)}>
              &times;
            </a>
            <span>{alert.message}</span>
          </div>
        ))}
      </div>
    </AppBar>
  );
}

export { Alert };
