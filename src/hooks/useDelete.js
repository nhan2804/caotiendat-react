import { useMutation, useQueryClient } from "react-query";
import Api from "../config/network";

const useDelete = () => {
  const queryClient = useQueryClient();
  const query = useMutation(
    async (id) => {
      const { data } = await Api.delete("manager/" + id);
      return data;
    },
    {
      onError: (err) => {},
      onSuccess: (data) => {
        queryClient.invalidateQueries("staff", { exact: false });
      },
    }
  );
  return query;
};

export default useDelete;
