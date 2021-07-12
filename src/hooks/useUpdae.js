import { useMutation, useQueryClient } from "react-query";
import Api from "../config/network";

const useUpdate = () => {
  const queryClient = useQueryClient();
  const query = useMutation(
    async (id) => {
      const { data } = await Api.put("manager/" + id);
      return data;
    },
    {
      onError: (err) => {},
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("staff", { exact: false });
      },
    }
  );
  return query;
};

export default useUpdate;
