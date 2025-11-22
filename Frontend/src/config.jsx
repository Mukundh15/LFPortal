export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080" 
    : "https://lfportal.onrender.com";
