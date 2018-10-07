'use strict';

module.exports = function(db, DataTypes) {
    var DraftPost = db.define('DraftPost', {
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
        tableName: 'draftPosts',
    });

    return DraftPost;
};
