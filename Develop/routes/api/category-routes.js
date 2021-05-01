const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [ Product]
  }).then((categories) => {
    res.json(categories)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
const params = req.params.id;

Category.findOne({
  where: {id:params},
  include: [ Product]
}).then((categories) => {
  res.json(categories)
})
})

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.params.category_name,
    include: [Product]
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const params = req.params.id;


  Category.update(
    {
      category_name: req.params.category_name
    },
    {
      where: {
        id: params
      }
    }
  ).then((categories) => {
    res.json(categories)
  })

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
