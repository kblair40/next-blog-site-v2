import ReactGA from "react-ga";

const TRACKING_ID = "UA-250380145-1";
// ReactGA.initialize(TRACKING_ID, { redactEmail: false });

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
};
// export const initGA = (trackingID) => {
//   ReactGA.initialize(trackingID);
// };

export const PageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

export const Event = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
