const express = require('express');
const LocaisDescarte = require('../models/locaisDescarte');
const router = express.Router();

// Criar um local de descarte
router.post('/locaisDescarte', async (req, res) => {
   try 
   {
       const local = await LocaisDescarte.create(req.body);
       res.status(201).json(local);
   } catch (error) 
   {
       res.status(400).json({ error: error.message });
   }
});

// Listar locais
router.get('/locaisDescarte', async (req, res) => {
   try
   {
        const locais = await LocaisDescarte.findAll();
        res.json(locais);
   }catch (error)
   {
        res.status(500).json({ error: error.message });    
   }
});

// Buscar local por id
router.get('/locaisDescarte/:id', async (req, res) => {
   try
   {
        const local = await LocaisDescarte.findByPk(req.params.id);
        if(!local) 
            return res.status(404).json({ error: 'Local de descarte com o id ' + req.params.id + ' nao encontrado' })
       
        res.json(local);
   }catch (error)
   {
       res.status(500).json({ error: error.message });    
   }
});

// Atualizar local
router.put('/locaisDescarte/:id', async (req, res) => {
    try
    {
        const local = await LocaisDescarte.findByPk(req.params.id);
        if(!local) 
            return res.status(404).json({ error: 'Local de descarte com o id ' + req.params.id + ' nao encontrado' })
        
        await local.update(req.body);
        
        res.json(local);
    }catch (error)
    {
        res.status(400).json({ error: error.message });
    }
});

// Deletar local por id
router.delete('/locaisDescarte/:id', async (req, res) => {
    try {
        const local = await LocaisDescarte.findByPk(req.params.id);
        if (!local)
            return res.status(404).json({error: 'Local de descarte com o id ' + req.params.id + ' nao encontrado'});

        await local.destroy();

        res.json({message: 'Local de descarte com o id ' + req.params.id + ' foi deletado com sucesso'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


// Buscar local por tipo_de_reciclagem
router.get('/locaisDescarte/tipo/:tipo_de_reciclagem', async (req, res) => {
    try {
        const locais = await LocaisDescarte.findAll({
            where: {
                tipo_de_reciclagem: req.params.tipo_de_reciclagem
            }
        });

        if (locais.length === 0)
            return res.status(404).json({error: 'Nenhum local de descarte com o tipo de reciclagem ' + req.params.tipo_de_reciclagem + ' encontrado'});

        res.json(locais);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


// Listar locais em ordem crescente baseada na distância
router.get('/locaisDescarte', async (req, res) => {
    const {latitude, longitude} = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({error: 'Latitude e longitude são necessários'});
    }

    try {
        const locais = await LocaisDescarte.findAll();
        const locaisWithDistance = locais.map(local => {
            const distance = Math.sqrt(
                Math.pow(local.latitude - latitude, 2) + Math.pow(local.longitude - longitude, 2)
            );
            return {...local.toJSON(), distance};
        });

        locaisWithDistance.sort((a, b) => a.distance - b.distance);

        res.json(locaisWithDistance);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Listar locais em ordem decrescente baseada na avaliação e filtrada por tipo de reciclagem
router.get('/locaisDescarte/:tipo_de_reciclagem', async (req, res) => {
    try {
        const locais = await LocaisDescarte.findAll({
            where: {
                tipo_de_reciclagem: req.params.tipo_de_reciclagem
            },
            order: [
                ['avaliacao', 'DESC']
            ]
        });

        if (locais.length === 0)
            return res.status(404).json({
                error: 'Nenhum local de descarte com o tipo de reciclagem ' + req.params.tipo_de_reciclagem + ' encontrado'
            });

        res.json(locais);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
