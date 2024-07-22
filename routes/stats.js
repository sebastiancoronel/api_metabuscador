const { Router } = require("express");
const db = require("../database"); // Asegúrate de que este archivo exporta un pool de promesas

const router = Router();

router.get("/", async (req, res) => {
  try {
    // Consulta para salarios
    const salaryQuery = `
      SELECT 
        MIN(salario) AS min_salary, 
        MAX(salario) AS max_salary
      FROM jobs
      WHERE salario IS NOT NULL AND salario > 9999;
    `;

    // Consulta para la ubicación más frecuente
    const locationQuery = `
      SELECT 
        ubicacion AS most_frequent_location, 
        COUNT(*) AS max_count
      FROM jobs
      GROUP BY ubicacion
      ORDER BY max_count DESC
      LIMIT 1;
    `;

    // Ejecutar ambas consultas
    const [salaryResults] = await db.query(salaryQuery);
    const [locationResults] = await db.query(locationQuery);

    // Combinar los resultados
    const response = {
      min_salary: salaryResults[0].min_salary,
      max_salary: salaryResults[0].max_salary,
      most_frequent_location: locationResults[0].most_frequent_location,
      max_count: locationResults[0].max_count,
    };

    res.json(response);
  } catch (err) {
    console.error("Error al consultar la BD", err);
    res.status(500).send(`Error 500: ${err.message}`);
  }
});

module.exports = router;
