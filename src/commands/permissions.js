// permissions.js

// Import necessary modules
const { Permissions } = require('discord.js');

// Function to check user permissions
const checkPermissions = (user, requiredPermissions) => {
  if (!user) {
    throw new Error('User not found');
  }

  const userPermissions = user.permissions.toArray();

  for (const permission of requiredPermissions) {
    if (!userPermissions.includes(permission)) {
      return false;
    }
  }

  return true;
};

module.exports = {
  checkPermissions,
};