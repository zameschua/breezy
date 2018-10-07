'use strict';

module.exports = function(db, DataTypes) {
    var BlogPost = db.define('BlogPost', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        blogId: DataTypes.INTEGER,
        authorId: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        tableName: 'blogPost',
    });

    return BlogPost;
};
