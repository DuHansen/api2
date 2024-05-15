// arquivo postagem.js
const database = require('../config/database');
const User = require('./usuario');

class Postagem {
    constructor() {
        this.model = database.db.define('postagems', {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            conteudo: {
                type: database.db.Sequelize.STRING,
                allowNull: false
            },
            autorID: {
                type: database.db.Sequelize.INTEGER,
                allowNull: false,
                references: {         
                    model: User, 
                    key: 'id'          
                }
                
            }
        });

        this.model.belongsTo(User, { foreignKey: 'autorID', as: 'autor' });
        
    }
}

module.exports = new Postagem().model;  // exporta a instância do modelo

