/** @type {import('next').NextConfig} */
require("dotenv");

module.exports = {
  reactStrictMode: true,
  env: {
    ENDPOINT: process.env.PROD_API || process.env.DEV_API
  },
  future: {
    webpack5: true,
  }
}
