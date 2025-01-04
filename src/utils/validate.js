export const checkValidData = (name, email, password, isSignInForm) => {
  if (!isSignInForm) {
    const isNameValid = /([a-zA-Z0-9_\s]+)/.test(name);
    if (!isNameValid) return 'Name is not valid';
  }

  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return 'Email is not valid';
  if (!isPasswordValid) return 'Password is not valid';

  return null;
};
