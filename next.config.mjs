/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3", "bcryptjs", "nodemailer"],
  },
};

export default nextConfig;
