import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    POCKETBASE_URL: process.env.POCKETBASE_URL,
    PB_TYPEGEN_URL: process.env.PB_TYPEGEN_URL,
    PB_TYPEGEN_EMAIL: process.env.PB_TYPEGEN_EMAIL,
    PB_TYPEGEN_PASSWORD: process.env.PB_TYPEGEN_PASSWORD,
    PB_TYPEGEN_TOKEN: process.env.PB_TYPEGEN_TOKEN,
  },
});
