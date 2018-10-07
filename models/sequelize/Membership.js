'use strict';

/**
 * Junction table between Users and Blog
 */
module.exports = function(db, DataTypes) {
    var Membership = db.define('Membership', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        blogId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        tableName: 'membership',
    });

    return Membership;
};
