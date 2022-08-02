const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', "stock", "category_id"]
      }]
    })
    
    res.status(200).json(categoryData)
  } catch (err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {

  try {
    const categoryData = await Category.findByPk(req.params.id, {
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', "stock", "category_id"]
      }]
    })
    if (!categoryData){
      res.status(404).json({message: 'No category found with that ID!'})
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({category_name: req.body.category_name})
    res.status(200).json(categoryData)
  } catch (err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, 
      {
        where: {id: req.params.id}
    })
    res.status(200).json(categoryData)
  } catch (err){
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy( 
      {
      where: {id: req.params.id}
    })
    if (!categoryData){
      res.status(404).json({message: 'No category found with that ID!'})
      return;
    }
    res.status(200).json(categoryData)
  } catch (err){
    res.status(500).json(err)
  }
});

module.exports = router;
