import ReactGA from "react-ga";
import { useRouter } from "next/router";

const useAnalyticsEventTracker = () => {
  const router = useRouter();

  const eventTracker = (action = "test action", label = "test label") => {
    ReactGA.event({ action, label, location: router.asPath });
  };
  return eventTracker;
};

export default useAnalyticsEventTracker;
