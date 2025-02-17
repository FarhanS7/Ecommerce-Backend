import jwt from "jsonwebtoken";
import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js";

/**
 * Generates a JWT token for authentication.
 * @param {string} email - The user's email.
 * @param {string} userId - The user's unique ID.
 * @returns {string} Signed JWT token.
 */
export const TokenEncode = (email, userId) => {
  if (!JWT_KEY || !JWT_EXPIRE_TIME) {
    throw new Error("JWT_KEY or JWT_EXPIRE_TIME is not defined in config.");
  }

  const payload = { email, userId };
  return jwt.sign(payload, JWT_KEY, { expiresIn: JWT_EXPIRE_TIME });
};

/**
 * Decodes and verifies a JWT token.
 * @param {string} token - The JWT token.
 * @returns {object|null} Decoded payload or null if invalid.
 */
export const TokenDecode = (token) => {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return null;
  }
};
