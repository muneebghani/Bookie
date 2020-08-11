const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
  id: String,
  name: String
});

const RoleModel = model("roles", RoleSchema);

module.exports = { RoleSchema, RoleModel };
