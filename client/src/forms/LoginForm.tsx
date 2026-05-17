import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.routes";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      const response = await loginUser(values);
      if (response?.status === "success") {
        sessionStorage.setItem("token", response?.data);
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
        resetForm();
        navigate("/chat");
        setLoading(false);
        toast.success("User Logged in Successfully");
      } else {
        setLoading(false);
        toast.error(response?.message || "Please try again later");
      }
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
    <main className="min-h-screen w-full relative bg-[#030C31] text-white flex items-center justify-center px-4 overflow-hidden select-none">
      {/* Dynamic Cosmic Glow Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#5245FA] opacity-20 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#02D3F8] opacity-15 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse duration-[6s]" />

      <div className="w-full max-w-md z-10 transition-all duration-300">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl p-6 md:p-8">
          
          {/* Logo Brand Header */}
          <div className="flex flex-col items-center mb-8">
            <img src="/favicon.svg" alt="Smart Chaty Logo" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(82,69,250,0.4)] animate-float" />
            <h1 className="text-white text-3xl font-extrabold tracking-tight mt-3 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Smart Chaty
            </h1>
            <p className="text-sm text-slate-400 mt-1.5 text-center">
              Welcome back, login to continue
            </p>
          </div>

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 text-slate-300 font-semibold text-xs uppercase tracking-wider block"
              >
                Email Address<span className="text-red-400 font-bold ml-1">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className={`px-4 py-3 text-sm text-white rounded-xl bg-black/30 w-full border transition-all duration-200 outline-none placeholder-slate-600 focus:border-[#02D3F8] focus:ring-2 focus:ring-[#02D3F8]/20 ${formik.errors.email && formik.touched.email ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20" : "border-white/10"}`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-400 text-xs mt-1.5 font-medium">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 text-slate-300 font-semibold text-xs uppercase tracking-wider block"
              >
                Password<span className="text-red-400 font-bold ml-1">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className={`px-4 py-3 text-sm text-white rounded-xl bg-black/30 w-full border transition-all duration-200 outline-none placeholder-slate-600 focus:border-[#02D3F8] focus:ring-2 focus:ring-[#02D3F8]/20 ${formik.errors.password && formik.touched.password ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20" : "border-white/10"}`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-400 text-xs mt-1.5 font-medium">{formik.errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center group cursor-pointer">
                <input
                  name="remember"
                  type="checkbox"
                  className="sr-only"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                />
                <span
                  className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-all duration-150 ${formik.values.remember ? "bg-gradient-to-r from-[#5245FA] to-[#0F89F7] border-transparent" : "border-white/20 bg-black/30 group-hover:border-white/40"}`}
                  aria-hidden="true"
                >
                  <svg
                    className={`size-3 text-white transition-opacity ${formik.values.remember ? "opacity-100" : "opacity-0"}`}
                    viewBox="0 0 12 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M1 5l3 3 7-7" />
                  </svg>
                </span>
                <span className="ml-2.5 text-slate-300 font-medium select-none group-hover:text-white transition-colors duration-150 text-xs">
                  Remember me
                </span>
              </label>

              <Link
                to="/reset-password"
                className="text-xs font-semibold text-[#02D3F8] hover:text-[#2AACF9] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3 px-4 text-sm rounded-xl font-bold tracking-wide text-white bg-gradient-to-r from-[#5245FA] to-[#0F89F7] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_20px_rgba(82,69,250,0.3)] hover:shadow-[0_4px_25px_rgba(82,69,250,0.5)] flex items-center justify-center"
            >
              Sign in
            </button>

            <div className="text-slate-400 text-xs text-center mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#02D3F8] hover:text-[#2AACF9] font-bold transition-colors ml-1"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
