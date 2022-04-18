const production: any = false;

export const NEXT_URL = production ? process.env.VERCEL_URL : "http://localhost:3000";
