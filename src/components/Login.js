import Header from './Header';
import { useRef, useState } from 'react';
import { checkValidData } from '../utils/validate';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BACKGROUND_IMAGE } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errormessage, setErrorMessage] = useState(null);
  const toggleSignInForm = () => setIsSignInForm(!isSignInForm);
  const dispatch = useDispatch();

  const name = useRef('');
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // const nameValue = name.current.value;
    const nameValue = isSignInForm ? '' : name.current?.value;
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

    if (message) return;

    if (!isSignInForm) {
      // signup logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue,
            // photoURL: 'https://example.com/jane-q-user/profile.jpg',
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(errormessage);
            });
          // console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
          // ..
        });
    } else {
      //signin
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    }
  };
  return (
    <div className="overflow-x-hidden w-full h-full">
      <Header />

      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <img
          className="fixed top-0 left-0 w-screen h-screen object-cover"
          src={BACKGROUND_IMAGE}
          alt="Background of different movie poster for login page of netflix"
        />
      </div>
      {/* <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black bg-opacity-70 p-6 md:p-12 w-3/4 md:w-3/12  my-20 md:my-36 mx-auto right-0 left-0 text-white rounded-xl"
      >
        <h2 className=" font-semibold text-lg md:font-bold md:text-3xl md:py-4 md:m-2">
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
      </form> */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black bg-opacity-70 p-3 sm:p-5 md:p-10 lg:p-12 w-9/12 sm:w-3/4 md:w-2/5 lg:w-1/4 my-20 mt-24 md:my-24 mx-auto right-0 left-0 text-white rounded-xl shadow-lg"
      >
        {/* Form Heading */}
        <h2 className="font-semibold text-lg sm:text-xl md:text-3xl mb-3 sm:mb-4 text-center">
          {isSignInForm ? 'Sign in' : 'Sign up'}
        </h2>

        {/* Full Name Field (Visible only for Sign-Up) */}
        {!isSignInForm && (
          <input
            ref={name}
            className="p-2 sm:p-3 mb-2 sm:mb-3 w-full text-sm sm:text-base bg-gray-800 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Full Name"
            type="text"
          />
        )}

        {/* Email Field */}
        <input
          ref={email}
          className="p-2 sm:p-3 mb-2 sm:mb-3 w-full text-sm sm:text-base bg-gray-800 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Email Address"
          type="email"
        />

        {/* Password Field */}
        <input
          ref={password}
          className="p-2 sm:p-3 mb-2 sm:mb-3 w-full text-sm sm:text-base bg-gray-800 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Password"
          type="password"
        />

        {/* Error Message */}
        {errormessage && (
          <p className="text-red-500 text-xs sm:text-sm text-center mb-2 sm:mb-3">
            {errormessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          className="p-2 sm:p-3 mb-4 sm:mb-5 mt-2 bg-red-700 hover:bg-red-800 transition-all text-white w-full rounded-md text-sm sm:text-base font-semibold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? 'Sign in' : 'Sign up'}
        </button>

        {/* Toggle Form */}
        <p
          className="text-xs sm:text-sm text-center cursor-pointer text-gray-300 hover:text-white transition-all"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? 'New to Netflix? Sign Up Now'
            : 'Already Registered? Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
