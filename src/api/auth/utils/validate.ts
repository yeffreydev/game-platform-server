export function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  return regex.test(email);
}

export function validateUsername(username: string): boolean {
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
}

export function validatePassword(password: string): boolean {
  const minLength = 6;
  return password.length >= minLength;
}
