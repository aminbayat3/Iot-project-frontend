const MAX_LENGTHS = {
  name: 30,
  email: 50,
  password: 30,
};

export const validateField = (name, value, context = "login") => {
  switch (name) {
    case "name":
      if (context === "signup") {
        if (!value.trim()) return "Name is required.";
        if (value.length > MAX_LENGTHS.name)
          return `Max ${MAX_LENGTHS.name} characters.`;
      }
      return null;

    case "email":
      if (!value.trim()) return "Email is required.";
      if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format.";
      return null;

    case "password":
      if (!value.trim()) return "Password is required.";
      if (context === "signup") {
        if (value.length < 6) return "Password must be at least 6 characters.";
        if (value.length > MAX_LENGTHS.password)
          return `Max ${MAX_LENGTHS.password} characters.`;
      }
      return null;

    default:
      return null;
  }
};
