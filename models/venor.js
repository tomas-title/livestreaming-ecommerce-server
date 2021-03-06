const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  avata: { type: Schema.Types.String },
  name: {
    type: Schema.Types.String,
  },
  surname: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  cpf: {
    type: Schema.Types.String,
  },
  store: {
    type: Schema.Types.String,
  },
  cnpj: {
    type: Schema.Types.String,
  },
  social: {
    type: Schema.Types.String,
  },
  address: {
    type: Schema.Types.String,
  },
  number: {
    type: Schema.Types.Number,
  },
  complement: {
    type: Schema.Types.String,
  },
  neighborhood: {
    type: Schema.Types.String,
  },
  estado: {
    type: Schema.Types.String,
  },
  city: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  role: {
    type: Schema.Types.Number,
    required: true,
  },
  isCpf: {
    type: Schema.Types.Number,
  },
  resteredDate: {
    type: Schema.Types.Date,
  },
});

module.exports = Vendors = mongoose.model("vendors", VendorSchema);
