'use strict';

module.exports = function(db, DataTypes) {
    var Post = db.define('Post', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        blogId: DataTypes.INTEGER,
        authorId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        draftTitle: DataTypes.STRING,
        draftBody: DataTypes.TEXT,
        isPublished: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        tableName: 'post',
    });

    return Post;
};
