export default function (env: NodeJS.ProcessEnv) {
  return {
    port: env.PORT,
    jwtSecret: env.JWT_SECRET,
    jwtExpiry: env.JWT_EXPIRE_TIME || "7d",
    saltRounds: env.SALT_ROUND || 10,
    frontEndURL: env.FRONTEND_URL || `http://localhost:5173`,
    dbName: env.DB_NAME,
    dbPassword: env.DB_PASSWORD,
    dbUserName: env.DB_USERNAME,
    dbUrl: env.DATABASE_URL,
    host: env.HOST,
    dbPort: env.DB_PORT,
  };
}
