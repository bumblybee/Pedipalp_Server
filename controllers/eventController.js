const { crudControllers } = require("./crud/crudControllers");
const { Event, Spider } = require("../db");
const { Op, Sequelize } = require("sequelize");

module.exports = {
  ...crudControllers(Event, [["id", "ASC"]], [["id", "ASC"]], [["id", "ASC"]]),

  async getEvent(req, res) {
    const { id } = req.params;

    const record = await Event.findOne({
      where: { [Op.and]: [{ id }, { isDeleted: false }] },
      order: [["date", "DESC"]],
      include: Spider,
    });

    res.status(200).json({ data: record });
  },

  async getSpiderEvents(req, res) {
    const { id: spiderId } = req.params;

    const records = await Event.findAll({
      where: { [Op.and]: [{ spiderId }, { isDeleted: false }] },
      order: [["date", "DESC"]],
    });

    res.status(200).json({ data: records });
  },

  async createEvent(req, res) {
    const record = await Event.create(req.body, {
      returning: true,
      plain: true,
    });

    res.status(200).json({ data: record });
  },

  async updateEvent(req, res) {
    const id = req.params.id;
    const { id: userId } = req.token.data;

    if (!userId) throw new CustomError("user.unauthorized", "UserError", 401);

    const record = await Event.update(req.body, {
      where: { id },
      returning: true,
      plain: true,
    });

    res.status(201).json({ data: record[1] });
  },

  async deleteEvent(req, res) {
    const id = req.params.id;
    const { id: userId } = req.token.data;

    if (!userId) throw new CustomError("user.unauthorized", "UserError", 401);

    const record = await Event.update(
      { isDeleted: true },
      {
        include: [
          {
            model: Spider,
            as: "spider",
            required: true,
            where: { "$spider.userId$": userId },
          },
        ],
        where: { id },
        returning: true,
        plain: true,
      }
    );

    res.status(200).json({ data: record[1] });
  },
};
