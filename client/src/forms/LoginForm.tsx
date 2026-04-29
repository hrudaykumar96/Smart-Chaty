import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: yup.object({
      email: yup.string().email("Enter Valid Email").required("Enter Email"),
      password: yup.string().required("Enter Password"),
    }),
    onSubmit: (values) => {
      if (values.remember) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        );
      } else {
        localStorage.removeItem("user");
      }

      setLoading(true);

      console.log(values);

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    },
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);

      formik.setValues({
        email: parsed.email,
        password: parsed.password,
        remember: true,
      });
    }
  }, [formik]);

  if (loading) return <Spinner />;

  return (
    <main className="bg-gray-50 px-4 md:px-8">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          <div className="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-8">
            <h1 className="text-slate-900 text-center text-3xl font-bold">
              Sign in
            </h1>
            <p className="text-sm text-slate-500 text-center mt-2">
              Welcome back, login to continue
            </p>

            <form className="space-y-6 mt-10" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 text-slate-900 font-medium text-sm inline-block"
                >
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1  focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 ${formik.errors.email ? "outline-red-500" : "outline-slate-300"}`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && (
                  <small className="text-red-500">{formik.errors.email}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 text-slate-900 font-medium text-sm inline-block"
                >
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 ${formik.errors.password ? "outline-red-500" : "outline-slate-300"}`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && (
                  <small className="text-red-500">
                    {formik.errors.password}
                  </small>
                )}
              </div>

              <div className="flex items-start flex-wrap gap-2">
                <label className="flex items-center group has-[input:checked]:text-slate-900">
                  <input
                    name="remember"
                    type="checkbox"
                    className="sr-only"
                    checked={formik.values.remember}
                    onChange={formik.handleChange}
                  />
                  {/* Custom box */}
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 
                                 bg-white 
                                 group-has-[input:checked]:bg-blue-600
                                 group-has-[input:checked]:outline-blue-600
                                 group-focus-within:outline-2
                                 group-focus-within:outline-blue-600"
                    aria-hidden="true"
                  >
                    {/* Checkmark */}
                    <svg
                      className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100"
                      viewBox="0 0 12 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 5l3 3 7-7" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm text-slate-700">
                    Remember me
                  </span>
                </label>

                <Link
                  to="/reset-password"
                  className="ml-auto text-sm font-medium text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                Sign in
              </button>

              <div className="text-slate-900 text-sm text-center">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-700 hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
