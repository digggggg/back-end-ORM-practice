const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    res.status(200).json(tagData)
  } catch (err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    })
    if (!tagData){
      res.status(404).json({message: 'No tag found with that ID!'})
    }
    res.status(200).json(tagData)
  } catch (err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(tagData)
  } catch (err){
    res.status(500).json(err)
}
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body,
      {
        where: {id: id.params.id}
      })
      if (!tagData){
        res.status(404).json({message: 'No tag found with that id!'})
      } 
  } catch (err){  
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {id: req.params.id}
    })
    if (!tagData)[
      res.status(404).json({message: 'No tag found with that id!'})
    ]
  } catch (err){
    res.status(500).json(err)
  }
});

module.exports = router;
