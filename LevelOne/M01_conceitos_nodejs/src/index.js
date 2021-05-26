const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json()) 

/**
 * Metódos HTTP:
 * GET
 * POST
 * PUT/PATCH
 * DELETE 
 */

/**
 * Tipos de parâmetros
 * 
 * Query Params: filtros e paginação
 * Route Params: Identificar recursos(
 * Request Body: Counteudo na hora de criar ou editar um recurso (JSON)
 */

const projects = [];

app.get('/projects', (req, res) => {
    const { title } = req.query;

    const results = title ? projects.filter(project => project.title.includes(title)) : projects;

    return res.json(results);
});

app.post('/projects', (req, res) => {
    const { title, owner } = req.body;

    const project = { id: uuid(), title, owner }

    projects.push(project);

    return res.json(project);
});

app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0) {
        return res.status(400).json({ error: 'Project not found'})
    }

    const project = {
        id, 
        title,
        owner,
    };

    projects[projectIndex] = project;

    return res.json(project);
});

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0) {
        return res.status(400).json({ error: 'Project not found'})
    }

    projects.splice(projectIndex, 1)

    return res.status(204).send();
});


app.listen(3333, () => {
    console.log('🚀 Back-end started!')
});