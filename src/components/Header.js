import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import lang from '../utils/languageConstants';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate('/browse');
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/');
        // ...
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between ">
      <img className="w-44" src={LOGO} alt="netflix logo" />
      {user && (
        <div className="flex items-center gap-3 p-2">
          {showGptSearch && (
            <select
              className="py-1 px-3 rounded-md bg-gray-700 text-white"
              onChange={handleLanguageChange}
              value={langKey}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGptSearchClick}
            className="bg-purple-600 px-3 py-1 rounded-md text-white hover:bg-purple-700 m-2 "
          >
            {showGptSearch
              ? lang[langKey].homeButton
              : lang[langKey].gptSearchButton}
          </button>
          <img
            src={USER_AVATAR}
            className="w-7 h-7"
            alt="netflix user profile icon"
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-white bg-red-800 py-1 px-3 rounded-md"
          >
            {lang[langKey].signOutButton}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
