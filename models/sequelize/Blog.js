'use strict';

module.exports = function(db, DataTypes) {
    var Blog = db.define('Blog', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        tableName: 'blog',
    });

    return Blog;
};
