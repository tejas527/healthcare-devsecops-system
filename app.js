const express = require('express');
const app = express();

// SECURITY RULE 2 & 3: No Hardcoded Secrets & Use Environment Variables
// Instead of const dbPassword = "mySecretPassword123", we pull it from the environment.
const dbPassword = process.env.DB_PASSWORD; 

if (!dbPassword) {
    console.warn("SECURITY WARNING: DB_PASSWORD is not set. Database connection will fail.");
}

// Basic Homepage
app.get('/', (req, res) => {
    res.send('<h1>Patient Portal: Secure Connection Established</h1>');
});

// SECURITY RULE 1: Input Validation
// Example: A doctor searches for a patient ID. We MUST validate this to prevent SQL Injection.
app.get('/patient/:id', (req, res) => {
    const patientId = req.params.id;

    // Strict Validation: The ID must be exactly 6 digits. No letters, no symbols.
    const isValidId = /^\d{6}$/.test(patientId);

    if (!isValidId) {
        // Reject the request immediately if it looks suspicious
        return res.status(400).send('<h1>Security Error: Invalid Patient ID Format. Must be 6 digits.</h1>');
    }

    // If it passes validation, proceed
    res.send(`<h1>Accessing secure records for Patient ID: ${patientId}</h1>`);
});

// Use Environment Variable for the Port, default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Healthcare Secure App listening on port ${PORT}`));
