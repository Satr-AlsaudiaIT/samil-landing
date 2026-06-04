/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // better-sqlite3 is a native module — Next.js must keep it external
  // (not bundle it) so the .node binary is loaded from node_modules at runtime.
  serverExternalPackages: ['better-sqlite3'],
}

export default nextConfig
