import Header from './Header';
import { useRef, useState } from 'react';
import { checkValidData } from '../utils/validate';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errormessage, setErrorMessage] = useState(null);
  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);

  const name = useRef('');
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const nameValue = name.current.value;
    // const nameValue = isSignInForm ? '' : name.current?.value;
    // const nameValue = isSignInForm ? '' : name.current?.value || '';
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const message = checkValidData(
      nameValue,
      emailValue,
      passwordValue,
      isSignInForm
    );
    setErrorMessage(message);
    console.log(name.current.value);
    console.log(email.current.value);
    console.log(password.current.value);
  };
  return (
    <div>
      <Header className />

      <div className="absolute">
        <img
          className=""
          src="https://assets.nflxext.com/ffe/siteui/vlv3/150c4b42-11f6-4576-a00f-c631308b1e43/web/NP-en-20241216-TRIFECTA-perspective_76746de6-1d78-441b-bf03-f98deb75294b_large.jpg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black bg-opacity-70 p-12 w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-xl"
      >
        <h2 className="font-bold text-3xl py-4 m-2">
          {isSignInForm ? 'Sign in' : 'Sign up'}
        </h2>
        {!isSignInForm && (
          <input
            ref={name}
            className="p-2 my-2 w-full bg-gray-700"
            placeholder="Full Name"
            type="text"
          />
        )}
        <input
          ref={email}
          className="p-2 my-2 w-full bg-gray-700"
          placeholder="Email Address"
          type="text"
        />
        <input
          ref={password}
          className="p-2 my-2 w-full bg-gray-700"
          placeholder="Password"
          type="password"
        />
        <p className="text-red-500 text-center">{errormessage}</p>
        <button
          className="p-2 my-5  bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? 'Sign in' : 'Sign up'}
        </button>

        <p className="cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? 'New to Netflix? Sign Up Now'
            : 'Already Registered? Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
