const { Router } = require("express");
const db = require("../database");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT ubicacion as id, ubicacion as label, COUNT(*) as value FROM jobs GROUP BY ubicacion HAVING COUNT(*) > 5"
    );
    res.json(results)

  } catch (error) {
    console.error("Error al consultar la BD", error);
    res.status(500).send(`Error 500: ${error.message}`);
  }
});

module.exports = router;
