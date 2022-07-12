const produto = (sequelize, DataTypes) => {
    const Produto = sequelize.define(
      'produtos',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: DataTypes.STRING,
          unique: true,
        },
        codigo: {
            type: DataTypes.STRING,
            unique: true,
        },
        preco: {
            type: DataTypes.NUMERIC,
        },
        tipo: {
          type: DataTypes.STRING,
        }
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    Produto.sync();
    return Produto;
  };
  
  export default produto;
  