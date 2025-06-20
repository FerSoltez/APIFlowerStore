import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';

interface ProductsAttributes {
  id: number;
  name: string;
  price: number;
  image: string;
  discount: number;
  quantity: string;
  description: string;
  stock: number;
  status: string;
}

class ProductModel extends Model<ProductsAttributes> implements ProductsAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public image!: string;
  public discount!: number;
  public quantity!: string;
  public description!: string;
  public stock!: number;
  public status!: string;
}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'Products',
    tableName: 'Products',
    timestamps: false
  }
);

export default ProductModel;
