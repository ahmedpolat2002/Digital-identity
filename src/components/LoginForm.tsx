"use client";

import { useForm } from "react-hook-form";
import { useAuthStore } from "../features/auth/stores/authStore";
import { LoginRequest } from "@/features/auth/types/auth.types";

const LoginForm = () => {
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data.email, data.password);
      // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
