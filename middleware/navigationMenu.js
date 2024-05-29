const AreaModel = require("../models/Area.model");

//[GET]/
module.exports.index =async (req, res, next) => {
    const areas = await AreaModel.getAllAreas();

    res.locals.areas = areas;

    next();
};