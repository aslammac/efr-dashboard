import jwt from "jsonwebtoken";

interface DecodedToken {
  exp?: number;
  [key: string]: any;
  role: string;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    // console.log("token", token);
    const decoded = jwt.decode(token) as DecodedToken;
    const expDate = new Date(decoded.exp ? decoded.exp * 1000 : 0);
    // console.log("expDate", expDate);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
