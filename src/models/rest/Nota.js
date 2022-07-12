const nota = (sequelize, DataTypes) => {
    const Nota = sequelize.define(
      'notas',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nota: {
            type: DataTypes.NUMERIC,
        },
        peso: {
            type: DataTypes.STRING,
        },
        nome: {
            type: DataTypes.STRING,
            unique: true,
        }
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    Nota.sync();
    return Nota;
  };
  
  export default nota;
  