const { Router } = require("express");
const db = require("../database");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT titulo as role, salario as salary FROM jobs WHERE salario IS NOT null AND salario > 1000 LIMIT 200"
    );
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error 500: ${error.message}`);
  }
});

module.exports = router;
