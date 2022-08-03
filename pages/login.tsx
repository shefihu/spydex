import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { stringify } from "querystring";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp, loading } = useAuth();
  const validate = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password must be more than 6 characters"),
  });
  return (
    <div className=" relative w-full h-screen flex flex-col bg-black md:items-center md:justify-center ">
      {" "}
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className=" absolute xl:text-4xl md:text-3xl cursor-pointer font-bold text-blue-500 left-4 top-4 md:left-10 md:top-6">
        spydeX
      </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        //  const validate={(values:{
        //         email:string
        //     }) => {
        //       const errors = {};

        //       if (!values.email) {
        //         errors.email = "Required";
        //       } else if (
        //         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //       ) {
        //         errors.email = "Invalid email address";
        //       }

        //       if (!values.password) {
        //         errors.password = "Required";
        //       }

        //       return errors;
        //     }}
        validationSchema={validate}
        onSubmit={async (values, { setSubmitting }) => {
          // setLoading(true);
          const email = values.email;
          const password = values.password;
          if (login) {
            await signIn(email, password);
          } else {
            await signUp(email, password);
          }
          //   signInWithEmail(email, password);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            {" "}
            <Form
              onSubmit={handleSubmit}
              className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
            >
              <h1 className="text-4xl font-semibold">Sign in</h1>
              <div className="space-y-4">
                <label className="inline-block w-full">
                  <Field
                    type="email"
                    name="email"
                    id=""
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={`input ${
                      errors.email && touched.email
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-500">{errors.email}</div>
                  ) : null}
                </label>
                <label className="inline-block w-full">
                  <Field
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    id=""
                    placeholder="password"
                    className={`input ${
                      errors.password && touched.password
                        ? "border-2 border-red-500"
                        : ""
                    }`}
                  />
                  {errors.password && touched.password ? (
                    <div className="text-red-500">{errors.password}</div>
                  ) : null}
                </label>
              </div>
              {loading ? (
                <button
                  onClick={() => setLogin(true)}
                  type="submit"
                  className="w-full rounded bg-blue-500 py-3 font-semibold"
                >
                  Sign in
                </button>
              ) : (
                <button
                  // onClick={handleSubmit}
                  onClick={() => setLogin(true)}
                  type="submit"
                  className="w-full rounded bg-blue-500 py-2 font-semibold"
                >
                  Sign in
                </button>
              )}

              <div>
                New to netflix?{" "}
                <button
                  type="submit"
                  onClick={() => setLogin(false)}
                  className="text-white hover:underline"
                >
                  Sign up Now
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}

export default Login;
