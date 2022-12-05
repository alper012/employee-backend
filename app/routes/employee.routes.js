module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  const employees = require("../controllers/employee.controller.js");
  const { authJwt } = require("../middlewares");

  var router = require("express").Router();

  router.post("/", [authJwt.verifyToken], employees.create);
  router.get("/", [authJwt.verifyToken], employees.findAll);
  router.get("/:id", [authJwt.verifyToken], employees.findOne);
  router.put("/:id", [authJwt.verifyToken], employees.update);
  router.delete("/:id", [authJwt.verifyToken], employees.delete);

  app.use("/api/employees", router);
};
