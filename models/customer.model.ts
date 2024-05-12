import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize'; // Import the Sequelize instance
import { ICustomer } from '../utils/icustomer';



class Customer extends Model<ICustomer> implements ICustomer {
public phone!: string;
public id!: number;
public message!: string;
public status!: boolean;
}

Customer.init(
{
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    phone: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    message: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},
{
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
    timestamps: true, // Add default timestamps

}
);

export default Customer;
