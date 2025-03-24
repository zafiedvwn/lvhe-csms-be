import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    database: {
      url: process.env.DATABASE_URL,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    app: {
      port: process.env.PORT,
      nodeEnv: process.env.NODE_ENV || 'development',
    },
  }));