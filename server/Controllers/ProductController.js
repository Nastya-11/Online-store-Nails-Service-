const ErrorApi = require('../error/ErrorApi');
const {
  Brend,
  CountryMade,
  Category,
  FilterCategory,
  SubcategoryTitle,
  Subcategory,
  Product,
  Imgs,
  ProductCategoryFilter,
  Reviews,
  User,
} = require('../models/models');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

class ProductController {
  static AddBrend = async (req, resp, next) => {
    try {
      const { nameuk, nameru } = req.body;
      const res = await Brend.create({ nameuk, nameru });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static GetBrend = async (req, resp, next) => {
    try {
      const res = await Brend.findAll();
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static AddCountryMade = async (req, resp, next) => {
    try {
      const { nameuk, nameru } = req.body;
      const res = await CountryMade.create({ nameuk, nameru });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static GetCountryMade = async (req, resp, next) => {
    try {
      const res = await CountryMade.findAll();
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static AddCategory = async (req, resp, next) => {
    try {
      const { nameuk, nameru, svg } = req.body;
      const res = await Category.create({ nameuk, nameru, svg });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static GetCategories = async (req, resp, next) => {
    try {
      const res = await Category.findAll();
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static AddCategoryFilter = async (req, resp, next) => {
    try {
      let { nameuk, nameru, categoryId } = req.body;
      categoryId = parseInt(categoryId);
      const res = await FilterCategory.create({
        nameuk,
        nameru,
        categoryId: categoryId,
      });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static GetFilter = async (req, resp, next) => {
    try {
      const { categoryId } = req.query;
      const res = await FilterCategory.findAll({
        where: { categoryId: parseInt(categoryId) },
      });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static AddTitleSubcategory = async (req, resp, next) => {
    try {
      console.log(4232);
      const { nameuk, nameru, categoryId } = req.body;
      const res = await SubcategoryTitle.create({
        nameuk,
        nameru,
        categoryId: parseInt(categoryId),
      });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static GetTitleSubcategory = async (req, resp, next) => {
    try {
      const { categoryId } = req.query;
      const res = await SubcategoryTitle.findAll({
        where: { categoryId: parseInt(categoryId) },
      });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static AddSubcategory = async (req, resp, next) => {
    try {
      const { nameuk, nameru, categoryId, subcategoryTitleId } = req.body;
      const res = await Subcategory.create({
        nameuk,
        nameru,
        categoryId: parseInt(categoryId),
        subcategoryTitleId: parseInt(subcategoryTitleId),
      });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };

  static getSubcategory = async (req, resp, next) => {
    try {
      const { subcategoryTitleId } = req.query;
      const res = await Subcategory.findAll({
        where: { subcategoryTitleId: parseInt(subcategoryTitleId) },
      });
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };

  static AddProduct = async (req, resp, next) => {
    try {
      let {
        nameuk,
        nameru,
        descriptionuk,
        descriptionru,
        price,
        discount,
        priceWithDiscount,
        isAvaibility,
        isHit,
        isNovetly,
        cod,
        categoryId,
        subcategoryTitleId,
        subcategoryId,
        brendId,
        countryMadeId,
        filters,
      } = req.body;
      price = parseFloat(parseFloat(price).toFixed(2));
      discount = Math.round(parseFloat(discount));
      priceWithDiscount = parseFloat(parseFloat(priceWithDiscount).toFixed(2));
      isAvaibility = isAvaibility == true;
      isHit = isHit == true;
      isNovetly = isNovetly == true;
      categoryId = parseInt(categoryId);
      subcategoryTitleId = parseInt(subcategoryTitleId);
      subcategoryId = parseInt(subcategoryId);
      subcategoryTitleId = subcategoryTitleId == 0 ? null : subcategoryTitleId;
      subcategoryId = subcategoryId == 0 ? null : subcategoryId;
      brendId = parseInt(brendId);
      countryMadeId = parseInt(countryMadeId);
      filters = JSON.parse(req.body.filters);

      const product = await Product.create({
        nameuk,
        nameru,
        descriptionuk,
        descriptionru,
        price,
        discount,
        priceWithDiscount,
        timeDiscount: null,
        isAvaibility,
        isHit,
        isNovetly,
        cod,
        categoryId,
        subcategoryTitleId,
        subcategoryId,
        brendId,
        countryMadeId,
      });

      const { files } = req;

      if (!files) {
        return resp.status(400).json({ message: 'Файли не передані' });
      }

      const imageFiles = Object.keys(files)
        .filter((key) => key.startsWith('imgs['))
        .map((key) => files[key]);

      if (imageFiles.length === 0) {
        return resp.status(400).json({ message: 'Файли не передані' });
      }

      const savedImages = [];
      const uploadDir = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      for (const file of imageFiles) {
        try {
          const fileName = uuidv4() + path.extname(file.name);
          const filePath = path.join(uploadDir, fileName);

          await file.mv(filePath);

          await Imgs.create({ img: fileName, productId: product.id });
        } catch (error) {
          console.error(
            `Помилка збереження файлу ${file.name}: ${error.message}`
          );
        }
      }
      for (const filter of filters) {
        await ProductCategoryFilter.create({
          valueuk: filter.valueuk,
          valueru: filter.valueru,
          filterCategoryId: filter.id,
          productId: product.id,
        });
      }

      return resp.json({ product, images: savedImages });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static UpdateProduct = async (req, resp, next) => {
    try {
      let {
        id,
        nameuk,
        nameru,
        descriptionuk,
        descriptionru,
        price,
        discount,
        priceWithDiscount,
        isAvaibility,
        isHit,
        isNovetly,
        cod,
        categoryId,
        subcategoryTitleId,
        subcategoryId,
        brendId,
        countryMadeId,
        filters,
      } = req.body;
      if (!id) {
        return resp.status(400).json({ message: 'ID товару не вказано' });
      }

      // Чи існує товар
      const product = await Product.findByPk(id);
      if (!product) {
        return resp.status(404).json({ message: 'Товар не знайдено' });
      }

      price = parseFloat(parseFloat(price).toFixed(2));
      discount = Math.round(parseFloat(discount));
      priceWithDiscount = parseFloat(parseFloat(priceWithDiscount).toFixed(2));
      isAvaibility = isAvaibility == true;
      isHit = isHit == true;
      isNovetly = isNovetly == true;
      categoryId = parseInt(categoryId);
      subcategoryTitleId = parseInt(subcategoryTitleId);
      subcategoryId = parseInt(subcategoryId);
      brendId = parseInt(brendId);
      countryMadeId = parseInt(countryMadeId);
      filters = JSON.parse(req.body.filters);

      await product.update({
        nameuk,
        nameru,
        descriptionuk,
        descriptionru,
        price,
        discount,
        priceWithDiscount,
        isAvaibility,
        isHit,
        isNovetly,
        cod,
        categoryId,
        subcategoryTitleId,
        subcategoryId,
        brendId,
        countryMadeId,
      });

      // Фільтри
      for (const filter of filters) {
        if (filter.id) {
          await ProductCategoryFilter.update(
            {
              valueuk: filter.valueuk,
              valueru: filter.valueru,
              filterCategoryId: filter.filterCategoryId,
            },
            { where: { id: filter.id, productId: id } }
          );
        } 
        else {
          await ProductCategoryFilter.create({
            valueuk: filter.valueuk,
            valueru: filter.valueru,
            filterCategoryId: filter.filterCategoryId,
            productId: id,
          });
        }
      }

      return resp.json({ message: 'Товар успішно оновлено', product });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
  static async GetProduct(req, resp, next) {
    try {
      const { id } = req.query;

      if (!id) {
        return resp.status(400).json({ message: 'ID товару не вказано' });
      }

      const product = await Product.findOne({
        where: { id },
        include: [
          {
            model: Imgs,
            as: 'imgs',
            attributes: ['id', 'img'], 
            required: false,
          },
          {
            model: ProductCategoryFilter,
            as: 'productCategoryFilters',
            attributes: ['id', 'valueuk', 'valueru', 'filterCategoryId'],
            required: false,
          },
        ],
      });

      if (!product) {
        return resp.status(404).json({ message: 'Товар не знайдено' });
      }

      return resp.json(product);
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  }

  static async GetFilteredProducts(req, resp, next) {
    try {
      let {
        categoryId,
        subcategoryTitleId,
        subcategoryId,
        brendId,
        countryMadeId,
        filters,
        limit = 24,
        page = 1,
        minPrice,
        maxPrice,
        sort = 'new',
        lang = 'uk',
      } = req.query;

      const offset = (page - 1) * limit;
      const whereClause = {};

      categoryId = categoryId ? parseInt(categoryId) : null;
      subcategoryTitleId = subcategoryTitleId
        ? parseInt(subcategoryTitleId)
        : null;
      subcategoryId = subcategoryId ? parseInt(subcategoryId) : null;
      brendId = brendId ? parseInt(brendId) : null;
      countryMadeId = countryMadeId ? parseInt(countryMadeId) : null;
      limit = parseInt(limit);
      minPrice = parseInt(minPrice);
      maxPrice = parseInt(maxPrice);

      if (categoryId) whereClause.categoryId = categoryId;
      if (subcategoryTitleId)
        whereClause.subcategoryTitleId = subcategoryTitleId;
      if (subcategoryId) whereClause.subcategoryId = subcategoryId;
      if (brendId) whereClause.brendId = brendId;
      if (countryMadeId) whereClause.countryMadeId = countryMadeId;
      if (sort == 'novetly') whereClause.isNovetly = true;
      if (sort == 'hit') whereClause.isHit = true;
      if (sort === 'discount') {
        whereClause.discount = { [Op.gt]: 0 };
      }

      filters = filters ? JSON.parse(decodeURIComponent(filters)) : {};

      let filterConditions = [];
      for (const categoryId in filters) {
        if (Array.isArray(filters[categoryId])) {
          filterConditions.push({
            filterCategoryId: categoryId,
            valueuk: { [Op.in]: filters[categoryId] },
          });
        }
      }

      // Сортування товарів
      let order = [['createdAt', 'DESC']];
      if (sort === 'discount') order = [['discount', 'DESC']];
      if (sort === 'low-high') order = [['price', 'ASC']];
      if (sort === 'high-low') order = [['price', 'DESC']];
      if (sort === `name-asc-${lang}`)
        order = [[lang === 'ru' ? 'nameru' : 'nameuk', 'ASC']];
      if (sort === `name-desc-${lang}`)
        order = [[lang === 'ru' ? 'nameru' : 'nameuk', 'DESC']];

      const priceRange = await Product.findOne({
        attributes: [
          [
            Product.sequelize.fn('MIN', Product.sequelize.col('price')),
            'minPrice',
          ],
          [
            Product.sequelize.fn('MAX', Product.sequelize.col('price')),
            'maxPrice',
          ],
        ],
        where: whereClause,
      });

      const filtMinPrice = priceRange?.dataValues?.minPrice || 0;
      const filtMaxPrice = priceRange?.dataValues?.maxPrice || 0;

      if (minPrice) whereClause.priceWithDiscount = { [Op.gte]: minPrice };
      if (maxPrice)
        whereClause.priceWithDiscount = {
          ...whereClause.priceWithDiscount,
          [Op.lte]: maxPrice,
        };
        
      const allProducts = await Product.findAll({
        where: whereClause,
        include: [
          { model: Imgs, attributes: ['id', 'img'] },
          {
            model: ProductCategoryFilter,
            attributes: ['id', 'valueuk', 'valueru', 'filterCategoryId'],
            where: filterConditions.length
              ? { [Op.or]: filterConditions }
              : undefined,
            required: filterConditions.length > 0,
          },
        ],
        order,
      });

      const products = allProducts.slice(offset, offset + limit);
      const count = allProducts.length;

      // Отримання доступних фільтрів для категорії
      let filterCategories = [];
      if (categoryId) {
        filterCategories = await FilterCategory.findAll({
          where: { categoryId },
          attributes: ['id', 'nameuk', 'nameru'],
          include: [
            {
              model: ProductCategoryFilter,
              attributes: ['valueuk', 'valueru'],
            },
          ],
        });

        // Видалення дублікатів фільтрів
        filterCategories = filterCategories.map((category) => ({
          ...category.toJSON(),
          productCategoryFilters: Array.from(
            new Map(
              category.productCategoryFilters.map((item) => [
                item.valueuk + item.valueru,
                item,
              ])
            ).values()
          ),
        }));
      }

      return resp.json({
        products,
        count,
        filterCategories,
        minPrice: filtMinPrice,
        maxPrice: filtMaxPrice,
      });
    } catch (err) {
      console.error('Помилка отримання товарів:', err);
      return next(ErrorApi.badRequest(err.message));
    }
  }

  static async GetCategoriesWithSubcategories(req, resp, next) {
    try {
      const categories = await Category.findAll({
        attributes: ['id', 'nameuk', 'nameru', 'svg'],
        include: [
          {
            model: SubcategoryTitle,
            attributes: ['id', 'nameuk', 'nameru'],
            include: [
              {
                model: Subcategory,
                attributes: ['id', 'nameuk', 'nameru'],
              },
            ],
          },
        ],
      });

      return resp.json(categories);
    } catch (err) {
      console.error('Помилка отримання категорій:', err);
      return next(ErrorApi.badRequest(err));
    }
  }

  static async GetProductById(req, resp, next) {
    try {
      let { productId } = req.params;
      productId = parseInt(productId);

      if (!productId) {
        return next(ErrorApi.badRequest('Не вказано ID товару'));
      }

      // Отримання товару разом із категорією, фільтрами та зображеннями
      const product = await Product.findOne({
        where: { id: productId },
        include: [
          { model: Imgs, attributes: ['id', 'img'] }, 
          { model: Brend, attributes: ['id', 'nameuk', 'nameru'] }, 
          { model: CountryMade, attributes: ['id', 'nameuk', 'nameru'] },
          { model: Category, attributes: ['id', 'nameuk', 'nameru'] },
          { model: SubcategoryTitle },
          { model: Subcategory },
          {
            model: ProductCategoryFilter,
            attributes: ['id', 'valueuk', 'valueru', 'filterCategoryId'],
          },
        ],
      });

      if (!product) {
        return next(ErrorApi.notFound('Товар не знайдено'));
      }

      // Отримання доступних фільтрів для цієї категорії
      let filterCategories = await FilterCategory.findAll({
        where: { categoryId: product.categoryId },
        attributes: ['id', 'nameuk', 'nameru'],
        include: [
          {
            model: ProductCategoryFilter,
            attributes: ['valueuk', 'valueru'],
          },
        ],
      });

      // Видалення дублікатів значень фільтрів
      filterCategories = filterCategories.map((category) => ({
        ...category.toJSON(),
        productCategoryFilters: Array.from(
          new Map(
            category.productCategoryFilters.map((item) => [item.valueuk, item])
          ).values()
        ),
      }));

      const relatedProducts = await Product.findAll({
        where: {
          categoryId: product.categoryId,
          id: { [Op.ne]: productId },
        },
        include: [{ model: Imgs, attributes: ['id', 'img'] }],
        limit: 12,
        order: [['createdAt', 'DESC']],
      });

      const reviews = await Reviews.findAll({
        where: { productId },
        include: [{ model: User, attributes: ['id', 'name', 'surname'] }],
      });

      return resp.json({
        product,
        filterCategories,
        relatedProducts,
        reviews,
      });
    } catch (err) {
      console.error('Помилка отримання товару:', err);
      return next(ErrorApi.badRequest(err.message));
    }
  }

  static UpdateCategory = async (req, resp, next) => {
    try {
      const { id, nameuk, nameru, svg } = req.body;
      const res = await Category.update(
        { nameuk, nameru, svg },
        { where: { id } }
      );
      return resp.json({ res });
    } catch (err) {
      return next(ErrorApi.badRequest(err));
    }
  };
}

module.exports = ProductController;
