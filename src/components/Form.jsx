import React from "react";
import { useForm } from "react-hook-form";

const Form = ({formSub}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.id = Date.now();
    data.fav = false;
    // console.log(data);
    formSub(data);
    reset();
  };
  return (
    <div className="col-sm-4 shadow-rounded g-5">
      <div className="text-center text-secondary h2">Add Contacts</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="" className="col-form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <small className="text-danger">{errors.name.message}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="" className="col-form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                message: "invalid email format",
              },
            })}
          />
          {errors.email && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="" className="col-form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[6789][0-9]{9}/,
                message: "invalid phone format",
              },
            })}
          />
          {errors.phone && (
            <small className="text-danger">{errors.phone.message}</small>
          )}
        </div>
        <button className="btn btn-outline-primary my-3">
          Submit Contacts
        </button>
      </form>
    </div>
  );
};

export default Form;
