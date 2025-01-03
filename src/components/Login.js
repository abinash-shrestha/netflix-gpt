import Header from './Header';

const Login = () => {
  return (
    <div>
      <Header className />

      <div className="absolute">
        <img
          className=""
          src="https://assets.nflxext.com/ffe/siteui/vlv3/150c4b42-11f6-4576-a00f-c631308b1e43/web/NP-en-20241216-TRIFECTA-perspective_76746de6-1d78-441b-bf03-f98deb75294b_large.jpg"
        />
      </div>
      <form className="absolute bg-black bg-opacity-70 p-12 w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-xl">
        <h2 className="font-bold text-3xl py-4 m-2">Sign in</h2>
        <input
          className="p-2 my-2 w-full bg-gray-700"
          placeholder="Email Address"
          type="text"
        />
        <input
          className="p-2 my-2 w-full bg-gray-700"
          placeholder="Password"
          type="password"
        />
        <button className="p-2 my-5  bg-red-700 w-full rounded-lg">
          Sign Up
        </button>

        <p>New to Netflix? Sign Up Now</p>
      </form>
    </div>
  );
};

export default Login;
