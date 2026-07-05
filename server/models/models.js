const { DataTypes } = require('sequelize'); // Імпортуємо DataTypes
const sequelize = require('../db'); // Імпортуємо ваш екземпляр sequelize

const Brend = sequelize.define('brend', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameuk: { type: DataTypes.STRING, allowNull: false, unique: true },
  nameru: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const CountryMade = sequelize.define('countryMade', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameuk: { type: DataTypes.STRING, allowNull: false, unique: true },
  nameru: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameuk: { type: DataTypes.STRING, allowNull: false, unique: true },
  nameru: { type: DataTypes.STRING, allowNull: false, unique: true },
  svg: { type: DataTypes.TEXT, allowNull: false },
});

const FilterCategory = sequelize.define('filterCategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameuk: { type: DataTypes.STRING, allowNull: false },
  nameru: { type: DataTypes.STRING, allowNull: false },
});

Category.hasMany(FilterCategory);
FilterCategory.belongsTo(Category);

const SubcategoryTitle = sequelize.define('subcategoryTitle', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameuk: { type: DataTypes.STRING, allowNull: false },
  nameru: { type: DataTypes.STRING, allowNull: false },
});

Category.hasMany(SubcategoryTitle);
SubcategoryTitle.belongsTo(Category);

const Subcategory = sequelize.define('subcategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameuk: { type: DataTypes.STRING, allowNull: false },
  nameru: { type: DataTypes.STRING, allowNull: false },
});

Category.hasMany(Subcategory);
Subcategory.belongsTo(Category);
SubcategoryTitle.hasMany(Subcategory);
Subcategory.belongsTo(SubcategoryTitle);

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nameuk: { type: DataTypes.STRING, allowNull: false },
  nameru: { type: DataTypes.STRING, allowNull: false },
  descriptionuk: { type: DataTypes.TEXT, allowNull: false },
  descriptionru: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  discount: { type: DataTypes.FLOAT, allowNull: false },
  priceWithDiscount: { type: DataTypes.FLOAT, allowNull: false },
  timeDiscount: { type: DataTypes.DATE, allowNull: true },
  isAvaibility: { type: DataTypes.BOOLEAN, allowNull: false },
  isHit: { type: DataTypes.BOOLEAN, allowNull: false },
  isNovetly: { type: DataTypes.BOOLEAN, allowNull: false },
  cod: { type: DataTypes.STRING, allowNull: false },
});

Category.hasMany(Product);
Product.belongsTo(Category);

SubcategoryTitle.hasMany(Product);
Product.belongsTo(SubcategoryTitle);
Subcategory.hasMany(Product);
Product.belongsTo(Subcategory);

Brend.hasMany(Product);
Product.belongsTo(Brend);

CountryMade.hasMany(Product);
Product.belongsTo(CountryMade);

const Imgs = sequelize.define('imgs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  img: { type: DataTypes.STRING, allowNull: false },
});

Product.hasMany(Imgs);
Imgs.belongsTo(Product);

const ProductCategoryFilter = sequelize.define('productCategoryFilter', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  valueuk: { type: DataTypes.STRING, allowNull: false },
  valueru: { type: DataTypes.STRING, allowNull: false },
});

FilterCategory.hasMany(ProductCategoryFilter);
ProductCategoryFilter.belongsTo(FilterCategory);

Product.hasMany(ProductCategoryFilter);
ProductCategoryFilter.belongsTo(Product);

const User = sequelize.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: true },
  surname: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: true },
  isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  personalDiscount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}); //добавити сюди накопичувальну знижку

const Reviews = sequelize.define('reviews', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  valueForMoneyRating: { type: DataTypes.INTEGER, allowNull: false },
  overallQualityRating: { type: DataTypes.INTEGER, allowNull: false },
  nameUser: { type: DataTypes.STRING, allowNull: true },
  surnameUser: { type: DataTypes.STRING, allowNull: true },
});

User.hasMany(Reviews);
Reviews.belongsTo(User);
Product.hasMany(Reviews);
Reviews.belongsTo(Product);

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  count: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

Product.hasMany(Basket, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});
Basket.belongsTo(Product, { foreignKey: { allowNull: false } });
User.hasMany(Basket, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Basket.belongsTo(User, { foreignKey: { allowNull: false } });

const Like = sequelize.define('like', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  productId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

Product.hasMany(Like, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});
Like.belongsTo(Product, { foreignKey: { allowNull: false } });

User.hasMany(Like, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Like.belongsTo(User, { foreignKey: { allowNull: false } });

module.exports = {
  User,
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
  Basket,
  Like,
};
