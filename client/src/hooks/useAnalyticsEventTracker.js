import ReactGA from "react-ga";

const TRACKING_ID = "UA-250380145-1";
ReactGA.initialize(TRACKING_ID, { redactEmail: false });

const useAnalyticsEventTracker = () => {
  const eventTracker = (action, label) => {
    if (!action) return;
    let evtObject = { action, category: "User" };
    if (label) evtObject["label"] = label;

    ReactGA.event(evtObject);
  };
  return eventTracker;
};

export default useAnalyticsEventTracker;
