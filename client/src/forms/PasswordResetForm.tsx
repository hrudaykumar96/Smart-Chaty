import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const PasswordResetForm = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
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
    onSubmit: (values) => {
      setLoading(true);

      console.log(values);

      setTimeout(() => {
        setLoading(false);
      }, 1500);
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
              Reset Password
            </h1>
            <p className="text-sm text-slate-500 text-center mt-2">
              Enter your details to create a new password
            </p>
          </div>

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
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
              />

              {formik.errors.email && (
                <small className="text-red-500">{formik.errors.email}</small>
              )}
            </div>

            <div>
              <label className="mb-2 text-slate-900 font-medium text-sm inline-block">
                New Password<span className="text-red-500">*</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={inputClass(formik.errors.password)}
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
                placeholder="Confirm new password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                className={inputClass(formik.errors.confirmPassword)}
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
              Reset Password
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-slate-700">
            Remember your password?
            <Link to="/" className="text-blue-700 hover:underline ml-1">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PasswordResetForm;
