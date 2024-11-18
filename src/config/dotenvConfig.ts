import dotenv from 'dotenv'

dotenv.config()

export const environment = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
}