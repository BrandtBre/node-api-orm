const funcionario = (sequelize, DataTypes) => {
    const Funcionario = sequelize.define(
      'funcionarios',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: DataTypes.STRING,
        },
        endereco: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        celular: {
          type: DataTypes.STRING,
          unique: true,
        }
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    Funcionario.sync();
    return Funcionario;
  };
  
  export default funcionario;
  