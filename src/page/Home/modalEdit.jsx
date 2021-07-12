import React, { useState, useRef } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button, message } from "antd";
import { useFind } from "../../hooks/useFind";
import { useForm } from "react-hook-form";
import useEdit from "../../hooks/useEdit";
const ModalEdit = ({ isShow, id, close }) => {
  const { data: staff } = useFind(id);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submitRef = useRef(null);
  const { mutate: edit } = useEdit();
  const onSubmit = (data) => {
    edit([staff?.id, data], {
      onSuccess: () => {
        close();
        message.success("Sửa thành công");
      },
    });
  };

  return (
    <>
      <Modal
        onOk={() => {
          submitRef.current.click();
        }}
        title="Basic Modal"
        visible={isShow}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">Tên</label>
          <input defaultValue={staff?.name} name="name" {...register("name")} />
          <br />
          <label htmlFor="">Địa chỉ</label>

          <input
            defaultValue={staff?.address}
            name="address"
            {...register("address", { required: "Vui lòng điền" })}
          />
          <br />
          <label htmlFor="">Số điện thoại</label>
          <input
            defaultValue={staff?.phone}
            name="phone"
            {...register("phone", { required: "Vui lòng điền" })}
          />
          <br />
          <select name="gender" {...register("gender")}>
            <option value="0">Nữ</option>
            <option value="1">Nam</option>
          </select>
          <br />
          <input style={{ display: "none" }} ref={submitRef} type="submit" />
        </form>
      </Modal>
    </>
  );
};
export default ModalEdit;
