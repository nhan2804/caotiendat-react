import { useMutation, useQueryClient } from "react-query";
import Api from "../config/network";

const useEdit = () => {
  const queryClient = useQueryClient();
  const query = useMutation(
    async ([id, datas]) => {
      const { data } = await Api.put("manager/" + id, datas);
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

export default useEdit;
