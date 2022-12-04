// import ReactGA from "react-ga";

const useAnalyticsEventTracker = () => {
  const eventTracker = (action, label) => {
    if (!action) return;
    let evtObject = { action, category: "User" };
    if (label) evtObject["label"] = label;

    // ReactGA.event(evtObject);
  };
  return eventTracker;
};

export default useAnalyticsEventTracker;
