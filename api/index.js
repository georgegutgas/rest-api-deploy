import express, { json } from 'express';
import serverless from 'serverless-http';
import { moviesRouter } from '../routes/movies.js';
import { corsMiddleware } from '../middlewares/cors.js';
// Forma actualizada para importar tipos json en vez del de utils.js
// import movies from '../data/movies.json' with { type: 'json' };


const app = express();
app.disable('x-powered-by');

app.use(json());

app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.use(corsMiddleware());

// Cuando detecte hay /movies agarro lo de moviesRouter
app.use('/movies', moviesRouter);

// const PORT = process.env.PORT ?? 1234;

// app.listen(PORT, () => {
//     console.log(`server listening on port http://localhost:${PORT}`);
    
// });

export default app;
export const handler = serverless(app);