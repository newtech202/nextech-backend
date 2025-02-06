import "dotenv/config";
export default {
  secret: process.env.JWT_SECRET || "nextech@newtech.com",
  expiresIn: "1d",
};
