module.exports = (sequelize, DataTypes) => {
    const ProdutoVenda = sequelize.define('produtoVenda', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      qtd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    }, { timestamps: false, freezeTableName: true });
  
    return ProdutoVenda;
  };
  