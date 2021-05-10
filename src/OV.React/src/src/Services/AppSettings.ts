
const development: boolean = !process.env.APP_ENV || process.env.APP_ENV === 'development';

export const settings = {
    baseUrl: development ? "http://localhost:3000" : "/"
} 