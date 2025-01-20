import "dotenv/config";
export default {
  secret: process.env.APP_SECRET || "nextech@newtech.com",
  expiresIn: "1d",
};
