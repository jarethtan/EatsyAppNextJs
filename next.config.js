const { nanoid } = require("nanoid");
const crypto = require("crypto");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const generateCsp = () => {
  const hash = crypto.createHash("sha256");
  hash.update(nanoid());
  const production = process.env.NODE_ENV === "production";

  return `default-src 'self' http://localhost:3000 ; style-src https://fonts.googleapis.com 'self' 'unsafe-inline'; script-src 'sha256-${hash.digest(
    "base64"
  )}' 'self' 'unsafe-inline' ${
    production ? "" : "'unsafe-eval'"
  }; font-src https://fonts.gstatic.com 'self' data:; img-src https://res.cloudinary.com https://s.gravatar.com https://avatars.githubusercontent.com https://lh3.googleusercontent.com 'self' data:; connect-src http://localhost:3000 https://eatsy-app-next-js-jarethtan.vercel.app/ https://eatsy-app-next-oc8svwvfh-jarethtan.vercel.app/ https://eatsy-app-next-js-git-main-jarethtan.vercel.app/ https://eatsy-app-next-js.vercel.app/api/auth/session  https://eatsy-app-next-js.vercel.app/_next/data/fOAhjDR5Af_fZFm3qpugr/index.json https://eatsy-app-next-js.vercel.app/_next/static/css/d20e9ea84c9a5480.css https://eatsy-app-next-js.vercel.app/_next/static/css/1ec32d8cf33a974c.css https://eatsy-app-next-js.vercel.app/_next/static/css/411f7593dc5a8374.css https://eatsy-app-next-js.vercel.app/_next/static/css/da4aafe200e8d77b.css https://eatsy-app-next-js.vercel.app/_next/data/zwA8KRL-WOVvOSggrbMeQ/index.json https://eatsy-app-next-js.vercel.app/_next/static/css/582f2aa4b07fc71e.css https://eatsy-app-next-js.vercel.app/_next/static/css/e1676f50bc3674f6.css ws://localhost:3000/_next/webpack-hmr https://eatsy-app-next-js.vercel.app/_next/data/ol6EOn-W5u0bmh0fd9bQs/index.json`;
};

module.exports = {
  nextConfig,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    GITHUB_CLIENT_ID: "c01702a6fa355c32ebfe",
    GITHUB_CLIENT_SECRET: "099b1440e712e46ac555dedb795cc3f76efbd426",
    GOOGLE_CLIENT_ID: "907168694604-01a2g10vfp7i1gbloum9sj3pk9301lo5.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    MONGODB_USER: "josh88",
    MONGODB_PASSWORD: "tgdwcd2xBoz2L6cA",
    MONGODB_DATABASE: "ReactEShop",
    NEXT_PUBLIC_VERCEL_URL: "https://eatsy-app-next-lm00qzawx-jarethtan.vercel.app/",
    SECRET: "3989f4c911b02a60cd54f82475698555",
    JWT_SECRET: "brownie",
    NEXTAUTH_URL: "http://localhost:3000",
    CREDENTIAL_CLIENT_ID: "brownietan",
    CREDENTIAL_CLIENT_SECRET: "brownie",
    CLOUDINARY_API_CLOUD_NAME: "dplfqp7kf",
    CLOUDINARY_API_KEY: "455848441783982",
    CLOUDINARY_API_SECRET: "RzYPMMxPB92psHcrNUwEM0aPrO0",
  },
  headers: () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: generateCsp(),
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Server",
          value: "Apache",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "sameorigin",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "same-origin",
        },
        {
          key: "Permissions-Policy",
          value: "geolocation=*",
        },
      ],
    },
  ],
};
