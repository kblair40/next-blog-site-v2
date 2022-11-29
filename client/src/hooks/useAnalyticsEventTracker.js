import ReactGA from "react-ga";

const useAnalyticsEventTracker = () => {
  const eventTracker = (action = "test action", label = "test label") => {
    ReactGA.event({ action, label, category: "User" });
  };
  return eventTracker;
};

export default useAnalyticsEventTracker;
