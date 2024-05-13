module.exports = (sequelize, DataTypes) => {
    console.log("Produto log");

    const Produto = sequelize.define(
      'produto',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        marca: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        qtd: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        custo: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorVenda: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },

      },
      { timestamps: false, freezeTableName: true }
    );
    Produto.associate = (models) => {
      Produto.belongsToMany(models.Venda, {
        through: 'produtoVenda',
        foreignKey: 'produtoId'
      });
    };
    return Produto;
  };
  