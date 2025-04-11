import { useEffect } from "react";

function useRefreshWarning() {
  useEffect(() => {
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
}

export default useRefreshWarning;
