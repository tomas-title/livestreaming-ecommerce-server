const Vendor = require("../models/venor");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

//Load validation
const validateLoginInput = require("../validation/vendor/login");
const validateRegisterInput = require("../validation/vendor/register");
const HttpException = require("../utils/HttpException.utils");

//register
const register = async (req, res) => {
  const { errors, errorMsg, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    throw new HttpException(400, errorMsg);
  }
  await Vendor.findOne({ email: req.body.email }).then((vendor) => {
    if (vendor) {
      errors.email = "e-mail já existe";
      throw new HttpException(400, "e-mail já existe");
    }

    const newVendor = new Vendor({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      cpf: req.body.cpf,
      store: req.body.store,
      cnpj: req.body.cnpf,
      address: req.body.address,
      number: req.body.number,
      neighborhood: req.body.neighborhood,
      complement: req.body.complement,
      estado: req.body.estado,
      city: req.body.city,
      password: req.body.password,
      role: req.body.role,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newVendor.password, salt, (err, hash) => {
        // if (err) throw err;
        newVendor.password = hash;
        newVendor
          .save()
          .then((vendor) =>
            res.send({
              status: 200,
              message: "success",
              email: newVendor.email,
              userName: newVendor.name,
              role: newVendor.role,
            })
          )
          .catch((err) => console.log(err));
      });
    });
  });
};

//login
const login = async (req, res) => {
  const { errors, errorMsg, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    throw new HttpException(400, errorMsg);
  }
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  await Vendor.findOne({ email, role }).then((vendor) => {
    if (!vendor) {
      if (role === 0) {
        errors.email = "Vendedor não encontrado";
      } else {
        errors.email = "Usuário não encontrado";
      }
      throw new HttpException(400, errors.email);
    }

    // Check Password
    bcrypt.compare(password, vendor.password).then((isMatch) => {
      if (isMatch) {
        // Vendor Matched
        const payload = {
          id: vendor.id,
          name: vendor.name,
          role: vendor.role,
          email: vendor.email,
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              status: 200,
              success: true,
              email: vendor.email,
              userName: vendor.name,
              role: vendor.role,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.json({ status: 400, message: "Senha é incorreta" });
      }
    });
  });
};

module.exports = {
  login,
  register,
};
