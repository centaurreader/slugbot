var getList = require("../api/getList.js");

function getUsernameById(id, callback) {
  getList(function (list) {
    var filteredList = list.members.filter(function (member) {
      return member.id === id;
    });
    if (filteredList.length > 0) {
      callback(filteredList[0].name);
    }
  });
}

module.exports = {
  getUsernameById: getUsernameById
};