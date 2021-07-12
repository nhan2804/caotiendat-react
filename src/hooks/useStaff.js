import { useQuery } from "react-query";
import Api from "../config/network";

export const useStaff = (text, status) => {
  const queryInstance = useQuery(
    ["staff", { text, status }],
    async () => {
      const { data } = await Api.get("manager?q=" + text + "&status=" + status);
      return data;
    },
    { refetchOnWindowFocus: false }
  );
  return queryInstance;
};
