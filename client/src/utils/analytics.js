import ReactGA from "react-ga";

const TRACKING_ID = "UA-250380145-1";
ReactGA.initialize(TRACKING_ID, { redactEmail: false });

export const initGA = (trackingID) => {
  ReactGA.initialize(trackingID);
};
