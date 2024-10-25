/* eslint-disable tailwindcss/classnames-order */
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { SigninSchema } from "../../Validations/SigninSchema.joi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/UserSlice";
import { decode } from "../../Services/tokenService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

interface FormData {
  email: string;
  password: string;
}

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
    resolver: joiResolver(SigninSchema),
  });

  const submit = async (form: FormData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        form
      );

      const token = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = token;

      const { _id } = decode(token);
      const userResponse = await axios.get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${_id}`
      );

      const user = userResponse.data;
      dispatch(userActions.login(user));

      Swal.fire({
        title: "You Logged in!",
        icon: "success",
        timerProgressBar: true,
        timer: 2000,
        background: '#6d6d6d',
        color: '#ffffff',
        showConfirmButton: false,
        showCloseButton: true,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        icon: "error",
        timerProgressBar: true,
        timer: 2000,
        toast: true,
        showCloseButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary-50 dark:bg-gray-700 transition-colors duration-300 px-4 sm:px-6 lg:px-8">
      <form
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-colors duration-300"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="text-3xl font-bold text-center text-primary-900 dark:text-white mb-6">
          Sign In
        </h1>

        <FloatingLabel
          type="email"
          variant="outlined"
          label="Email"
          {...register("email")}
          color={errors.email ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.email?.message}</span>

        <FloatingLabel
          type="password"
          variant="outlined"
          label="Password"
          className=" mt-4"
          {...register("password")}
          color={errors.password ? "error" : "success"}
        />
        <span className="text-sm text-red-500">{errors.password?.message}</span>

        <Button
          type="submit"
          disabled={!isValid || loading}
          className="w-full mt-6 py-2 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none focus:ring focus:ring-primary-300 text-white"
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
