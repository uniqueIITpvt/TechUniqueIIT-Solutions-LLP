app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'https://your-frontend-domain.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})); 