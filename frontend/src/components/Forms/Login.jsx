import { Link } from "react-router-dom";

const Login = () => {
 
  return (
    <>
      <section className="py-4 md:py-16 bg-white">
        <div className="container px-4 mx-auto ">
          <div className="max-w-sm mx-auto">
            <div className="mb-6 text-center">
              <h3 className="mb-4 text-xl md:text-2xl font-bold">
                Sign in to your account
              </h3>
              
            </div>
            <form className="shadow sm:rounded-lg py-8 px-8">
              <div className="mb-6">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor
                >
                  Email
                </label>
                <input
                  name="email"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lgshadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="email"
                  placeholder="abc@gmail.com"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor
                >
                  Password
                </label>
                <input
                  name="password"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lgshadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="password"
                  placeholder="************"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="w-full md:w-1/2">
                  <label className="relative inline-flex items-center">
                    <input
                      className="form-checkbox appearance-none"
                      type="checkbox"
                    />
                  </label>
                </div>
              </div>
              <button
                className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                type="submit"
              >
                Sign In
              </button>
              <p className="text-center">
                <span className="text-xs font-medium">
                  Don't have an account?  <button
                  className="inline-block ml:1 text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
                  type="submit"
                >
                 <Link to="/register">Sign up</Link>
                </button>
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
