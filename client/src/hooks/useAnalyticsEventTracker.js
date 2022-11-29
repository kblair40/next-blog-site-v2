import ReactGA from "react-ga";
import { useRouter } from "next/router";

const useAnalyticsEventTracker = (category = null) => {
  const router = useRouter();

  const eventTracker = (action = "test action", label = "test label") => {
    ReactGA.event({ category, action, label, location: router.asPath });
  };
  return eventTracker;
};

export default useAnalyticsEventTracker;
