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
    <div>
      <Header className />

      <div className="absolute">
        <img
          className=""
          src={BACKGROUND_IMAGE}
          alt="Background of different movie poster for login page of netflix"
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
