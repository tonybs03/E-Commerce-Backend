const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET ALL CATEGORIES
router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ONE CATEGORY BY ID
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!catData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE A CATEGORY BY POST REQUEST
router.post('/', async (req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE A CATEGORY BY PUT REQUEST BY ID
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCat) => {
      res.json(updatedCat);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// DELETE A CATEGORY BY DELETE REQUEST BY ID
router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!catData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
