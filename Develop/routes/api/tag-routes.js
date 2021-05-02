const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{model:Product, through: ProductTag}]
  }).then(tags => {
    res.json(tags)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data;
  const params = req.params.id;
  Tag.findOne({
    where: {id: params},
    include:[{model:Product, through: ProductTag}]
  }).then(tags => {
    res.json(tags)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tags =>{
    res.json(tags)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const params = req.params.id;
  Tag.update(
    {
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: [params]
    }
  }
  ).then(tags => {
    if (!tags) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tags)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const params = req.params.id;
  Tag.destroy({
    where:{
      id: params
    }
  }).then(tags => {
    if (!tags) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tags)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

module.exports = router;
