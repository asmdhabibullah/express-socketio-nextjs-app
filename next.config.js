/** @type {import('next').NextConfig} */
require("dotenv");

module.exports = {
  reactStrictMode: true,
  env: {
    ENDPOINT: process.env.URI || "http://localhost:3000"
  },
  future: {
    webpack5: true,
  }
}
