const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const LocaisDescarte = sequelize.define('locais_descarte', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    tipo_de_reciclagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avaliacao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_cadastro: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

module.exports = LocaisDescarte;
