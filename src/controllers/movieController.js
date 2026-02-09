import * as model from '../models/movieModel.js';

const VALID_GENRES = [
    'Ação',
    'Drama',
    'Comédia',
    'Terror',
    'Romance',
    'Animação',
    'Ficção Científica',
    'Suspense',
];

export const getAll = async (req, res) => {
    try {
        const movies = await model.findAll(req.query);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar registros' });
    }
};

export const create = async (req, res) => {
    try {
        const { title, description, duration, genre, rating } = req.body;

        if (!title || title.length < 3)
            return res.status(400).json({ error: 'Título inválido (min 3 caracteres).' });
        if (!description || description.length < 10)
            return res.status(400).json({ error: 'Descrição inválida (min 10 caracteres).' });

        const intDuration = parseInt(duration);
        if (isNaN(intDuration) || intDuration <= 0 || intDuration > 300)
            return res.status(400).json({ error: 'Duração deve ser entre 1 e 300 minutos.' });

        if (!VALID_GENRES.includes(genre))
            return res.status(400).json({ error: 'Gênero inválido.' });

        const floatRating = parseFloat(rating);
        if (isNaN(floatRating) || floatRating < 0 || floatRating > 10)
            return res.status(400).json({ error: 'Rating deve ser entre 0 e 10.' });

        const duplicated = await model.findByTitle(title);
        if (duplicated) return res.status(400).json({ error: 'Título duplicado.' });

        const data = await model.create({
            title,
            description,
            genre,
            duration: intDuration,
            rating: floatRating,
            available: true,
        });

        res.status(201).json({ message: 'Cadastrado com sucesso!', data });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno ao salvar.' });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const data = await model.findById(id);
        if (!data) return res.status(404).json({ error: 'Registro não encontrado.' });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar registro' });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const movie = await model.findById(id);
        if (!movie) return res.status(404).json({ error: 'Filme não encontrado.' });

        if (movie.available === false)
            return res
                .status(400)
                .json({ error: 'Filmes indisponíveis não podem ser atualizados.' });

        const data = await model.update(id, req.body);
        res.json({ message: 'Atualizado com sucesso!', data });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar' });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const movie = await model.findById(id);
        if (!movie) return res.status(404).json({ error: 'Filme não encontrado.' });

        if (parseFloat(movie.rating) >= 9)
            return res
                .status(400)
                .json({ error: 'Filmes com rating >= 9 não podem ser deletados.' });

        await model.remove(id);
        res.json({ message: 'Deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar' });
    }
};
