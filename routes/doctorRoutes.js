const express = require("express");
const { addDoctor, getDoctors } = require("../controllers/doctorController");

const router = express.Router();

router.get("/", getDoctors);
router.post("/add", addDoctor);

module.exports = router;
