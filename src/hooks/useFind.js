import { useQuery } from "react-query";
import Api from "../config/network";

export const useFind = (id) => {
  const queryInstance = useQuery(
    ["staff", { id }],
    async () => {
      const { data } = await Api.get("manager/" + id);
      return data;
    },
    { refetchOnWindowFocus: false }
  );
  return queryInstance;
};
