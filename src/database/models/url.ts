import { Model, DataTypes, Sequelize } from "sequelize";

export class Url extends Model {
  static associate(models: any) {
    // Define associations here
  }
}

export default (sequelize: Sequelize) => {
  Url.init(
    {
      urlId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      originalUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      clickCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
      },
    },
    {
      sequelize,
      modelName: "Url",
    }
  );

  return Url;
};
