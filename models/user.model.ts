    import { DataTypes, Model } from 'sequelize';
    import sequelize from '../config/sequelize'; // Import the Sequelize instance
    import { IUser } from '../utils/Iuser';



    class User extends Model<IUser> implements IUser {
    public password!: string;
    public id!: number;
    public username!: string;
    public email!: string;
    }

    User.init(
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true, // Add default timestamps

    }
    );

    export default User;
