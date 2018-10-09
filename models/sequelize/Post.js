'use strict';

module.exports = function(db, DataTypes) {
    var Post = db.define('Post', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        blogId: {
          type: DataTypes.INTEGER,
          allowNull: true, // TODO: Change to false later after creating the blog flow
        },
        authorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          defaultValue: "",
        },
        body: {
          type: DataTypes.TEXT,
          defaultValue: "",
          allowNull: false,
        },
        htmlBody: {
          type: DataTypes.TEXT,
          defaultValue: "",
          allowNull: false,
        },
        draftTitle: {
          type: DataTypes.STRING,
          defaultValue: "",
          allowNull: false,
        },
        draftBody:  {
          type: DataTypes.TEXT,
          defaultValue: "",
          allowNull: false,
        },
        draftHtmlBody:  {
          type: DataTypes.TEXT,
          defaultValue: "",
          allowNull: false,
        },
        isPublished: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        viewCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        tableName: 'post',
    });

    return Post;
};
