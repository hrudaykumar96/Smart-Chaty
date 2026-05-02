import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { signUpUser } from "../services/auth.routes";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, "Minimum 2 characters")
        .max(100, "Maximum 100 characters")
        .required("Enter name"),
      email: yup.string().email("Enter valid email").required("Enter email"),
      password: yup
        .string()
        .min(8, "Minimum 8 characters")
        .max(12, "Maximum 12 characters")
        .required("Enter password"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Confirm password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const response = await signUpUser(values);
      if (response?.status === "success") {
        resetForm();
        setLoading(false);
        toast.success(response.message);
      } else {
        toast.error(response?.message || "Please try again later");
        setLoading(false);
      }
    },
  });

  if (loading) return <Spinner />;

  const inputClass = (error?: string) =>
    `px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 ${
      error ? "outline-red-500" : "outline-slate-300"
    }`;

  return (
    <main className="bg-gray-50 flex items-center min-h-screen p-4 md:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="w-full p-6 md:p-8 shadow-sm rounded-lg bg-white border border-slate-300">
          <div className="mb-8">
            <h1 className="text-slate-900 text-3xl font-bold text-center">
              Create an account
            </h1>
            <p className="text-sm text-slate-500 text-center mt-2">
              Sign up to continue
            </p>
          </div>

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div>
              <label className="mb-2 text-slate-900 font-medium text-sm inline-block">
                Name<span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className={inputClass(formik.errors.name)}
              />

              {formik.errors.name && (
                <small className="text-red-500">{formik.errors.name}</small>
              )}
            </div>
            <div>
              <label className="mb-2 text-slate-900 font-medium text-sm inline-block">
                Email<span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={inputClass(formik.errors.email)}
                autoComplete="email"
              />

              {formik.errors.email && (
                <small className="text-red-500">{formik.errors.email}</small>
              )}
            </div>

            <div>
              <label className="mb-2 text-slate-900 font-medium text-sm inline-block">
                Password<span className="text-red-500">*</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={inputClass(formik.errors.password)}
                autoComplete="new-password"
              />

              {formik.errors.password && (
                <small className="text-red-500">{formik.errors.password}</small>
              )}
            </div>

            <div>
              <label className="mb-2 text-slate-900 font-medium text-sm inline-block">
                Confirm Password<span className="text-red-500">*</span>
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                className={inputClass(formik.errors.confirmPassword)}
                autoComplete="new-password"
              />

              {formik.errors.confirmPassword && (
                <small className="text-red-500">
                  {formik.errors.confirmPassword}
                </small>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer"
            >
              Create an account
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-slate-700">
            Already have an account?
            <Link to="/" className="text-blue-700 hover:underline ml-1">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpForm;
