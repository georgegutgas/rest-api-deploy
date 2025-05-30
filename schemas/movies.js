import z from 'zod';    // Para validar los tipos de datos sin hacerlo manualmente

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().min(1900).max(2026),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: 'Poster must be a valid url'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Terror', ]),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of Enum genre'
        }
    )
});

export function validateMovie(object) {
    return movieSchema.safeParse(object);
}

export function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object);
}
 