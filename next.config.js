
/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:["localhost"],
    remotePatterns:[
      {
        protocol:"http",
        hostname:"localhost",
        port:"8888",
      }
    ]

  },
  reactStrictMode: true,
  future: { webpack5: true },
  webpack: config => {
    config.resolve.fallback = { fs: false, module: false }
    return config
  },
}

// Webpack 5 config
// module.exports = {
//   future: { webpack5: true },
//   webpack: config => {
//     config.resolve.fallback = { fs: false, module: false }

//     return config
//   },
// }
module.exports = nextConfig
