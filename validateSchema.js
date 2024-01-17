const Schemas = require("./services/validations");
const _ = require("lodash");

const validateUser = (req, res, next) => {
  const route = req.baseUrl + req.route.path;
  const schema = _.get(Schemas, route);
  if (schema) {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
    next();
  }

  next();
};

module.exports = validateUser;
