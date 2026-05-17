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
    `px-4 py-3 text-sm text-white rounded-xl bg-black/30 w-full border transition-all duration-200 outline-none placeholder-slate-600 focus:border-[#02D3F8] focus:ring-2 focus:ring-[#02D3F8]/20 ${
      error ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20" : "border-white/10"
    }`;

  return (
    <main className="min-h-screen w-full relative bg-[#030C31] text-white flex items-center justify-center px-4 overflow-hidden select-none">
      {/* Dynamic Cosmic Glow Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#5245FA] opacity-20 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#02D3F8] opacity-15 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse duration-[6s]" />

      <div className="w-full max-w-md z-10 py-6 transition-all duration-300">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl p-6 md:p-8">
          
          {/* Logo Brand Header */}
          <div className="flex flex-col items-center mb-6">
            <img src="/favicon.svg" alt="Smart Chaty Logo" className="w-14 h-14 md:w-16 md:h-16 drop-shadow-[0_0_15px_rgba(82,69,250,0.4)] animate-float" />
            <h1 className="text-white text-2xl font-extrabold tracking-tight mt-3 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Smart Chaty
            </h1>
            <p className="text-sm text-slate-400 mt-1 text-center">
              Create an account to continue
            </p>
          </div>

          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <label className="mb-1 text-slate-300 font-semibold text-xs uppercase tracking-wider block">
                Name<span className="text-red-400 font-bold ml-1">*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass(formik.errors.name && formik.touched.name ? formik.errors.name : undefined)}
              />

              {formik.errors.name && formik.touched.name && (
                <p className="text-red-400 text-xs mt-1 font-medium">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <label className="mb-1 text-slate-300 font-semibold text-xs uppercase tracking-wider block">
                Email<span className="text-red-400 font-bold ml-1">*</span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass(formik.errors.email && formik.touched.email ? formik.errors.email : undefined)}
                autoComplete="email"
              />

              {formik.errors.email && formik.touched.email && (
                <p className="text-red-400 text-xs mt-1 font-medium">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-1 text-slate-300 font-semibold text-xs uppercase tracking-wider block">
                Password<span className="text-red-400 font-bold ml-1">*</span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass(formik.errors.password && formik.touched.password ? formik.errors.password : undefined)}
                autoComplete="new-password"
              />

              {formik.errors.password && formik.touched.password && (
                <p className="text-red-400 text-xs mt-1 font-medium">{formik.errors.password}</p>
              )}
            </div>

            <div>
              <label className="mb-1 text-slate-300 font-semibold text-xs uppercase tracking-wider block">
                Confirm Password<span className="text-red-400 font-bold ml-1">*</span>
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass(formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined)}
                autoComplete="new-password"
              />

              {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                <p className="text-red-400 text-xs mt-1 font-medium">
                  {formik.errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 px-4 text-sm rounded-xl font-bold tracking-wide text-white bg-gradient-to-r from-[#5245FA] to-[#0F89F7] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-[0_4px_20px_rgba(82,69,250,0.3)] hover:shadow-[0_4px_25px_rgba(82,69,250,0.5)] flex items-center justify-center"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-slate-400 text-xs text-center">
            Already have an account?
            <Link to="/" className="text-[#02D3F8] hover:text-[#2AACF9] font-bold transition-colors ml-1">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpForm;
