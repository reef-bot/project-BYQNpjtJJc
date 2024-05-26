// File: src/core/database.js

const { Sequelize, DataTypes } = require('sequelize');

// Connect to the database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Define the User model
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  warnings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

// Define the Warning model
const Warning = sequelize.define('Warning', {
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define the Report model
const Report = sequelize.define('Report', {
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define the Permission model
const Permission = sequelize.define('Permission', {
  level: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Define the BotActivity model
const BotActivity = sequelize.define('BotActivity', {
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Define the Message model
const Message = sequelize.define('Message', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Set up the relationships between models
User.hasMany(Warning);
User.hasMany(Report);
User.hasOne(Permission);
User.hasMany(BotActivity);
Message.belongsTo(User);

// Sync the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = {
  User,
  Warning,
  Report,
  Permission,
  BotActivity,
  Message
};