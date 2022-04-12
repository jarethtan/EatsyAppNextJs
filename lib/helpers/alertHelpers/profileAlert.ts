import { alertService } from "../../services/alert";
import { getSession } from "next-auth/react";

export const profileAlert = async () => {
  const session = await getSession();
  // this function is require to generate an alert for users clicking on the profile link at specific scenarios mention below.
  if (session === null) {
    alertService.warn("You will be redirected to the Homepage. Login is required to view the profile page", {
      autoClose: false,
      keepAfterRouteChange: true,
    });
  } else if (session.role === "admin") {
    alertService.warn("You will be redirected to the Homepage. An administrator is logged in. Profile page are not generated for administrators", {
      autoClose: false,
      keepAfterRouteChange: true,
    });
  } else if (!!Number(session.id) === true) {
    alertService.warn(
      "You will be redirected to the Homepage. The user is logged in via Google or Github. Profile page is only generated for users who register to Eatsy database",
      { autoClose: false, keepAfterRouteChange: true }
    );
  } else {
  }
};
