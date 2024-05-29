import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { Roles, UserArea } from "../types/user";
import sequelize from "../config/squelize-config";

class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<number>;
  declare fullName: string | null;
  declare ruc: string | null;
  declare email: string;
  declare password: string | undefined;
  declare area: UserArea;
  declare hasAccess: boolean | null;
  declare verified: boolean;
  declare role: Roles;
}

UserModel.init(
  {
    id: {
      type: new DataTypes.INTEGER.UNSIGNED(),
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    ruc: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    password: { type: new DataTypes.STRING(200), allowNull: false },
    area: { type: new DataTypes.STRING(200), allowNull: false },
    hasAccess: { type: new DataTypes.STRING(200), allowNull: false },
    verified: { type: new DataTypes.STRING(200), allowNull: false },
    role: { type: new DataTypes.STRING(200) },
  },
  {
    sequelize,
    tableName: "user",
  }
);

export default UserModel;
