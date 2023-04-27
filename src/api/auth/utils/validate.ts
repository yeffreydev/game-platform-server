export function validateEmail(email: string): string {
  const regex = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  return !regex.test(email) ? "Invalid email" : "";
}

export function validateUsername(username: string): string {
  if (username.length < 3) return "Username must be at least 3 characters long";
  if (username.length > 20) return "Username must be less than 20 characters long";
  if (!username.match(/^[a-zA-Z0-9_]+$/)) return "Username can only contain letters, numbers and underscores";
  return "";
}

export function validatePassword(password: string): string {
  const minLength = 6;
  return password.length < minLength ? `Password must be at least ${minLength} characters long` : "";
}
