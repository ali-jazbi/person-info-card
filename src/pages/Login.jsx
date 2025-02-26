import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import { endpoints } from "../api/endpoints";
import { enqueueSnackbar } from "notistack";
import useDispatchAuth from "../hooks/useDispatchAuth";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useDispatchAuth();
  const auth = useAuth();
  const loginM = useMutation({
    mutationFn: (data) =>
      axios
        .post(endpoints.login_endpoint, { Username: data?.email, Password: data?.password })
        .then(({ data }) => data),
    onSuccess: (data) => {
      setAuth(data);
      enqueueSnackbar("logged in", { variant: "success" });
    },
    onError: (error) => {
      console.error(error?.response);
      enqueueSnackbar(JSON.stringify(error?.response?.data?.message), { variant: "error" });
    },
  });

  console.log("auth :>> ", auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("اطلاعات ورود:", data);
    loginM.mutate(data);
  };

  useEffect(() => {
    if (auth?.UserId > 0) {
      navigate("/");
    }
  }, [auth?.UserId]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <TextField
        label="ایمیل"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "ایمیل الزامی است",
          pattern: { value: /^\S+@\S+\.\S+$/, message: "ایمیل معتبر نیست" },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="رمز عبور"
        type="password"
        fullWidth
        margin="normal"
        {...register("password", {
          required: "رمز عبور الزامی است",
          minLength: { value: 6, message: "رمز عبور باید حداقل 6 کاراکتر باشد" },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        ورود
      </Button>
    </Box>
  );
};

export default LoginForm;
