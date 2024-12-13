const express = require('express');
const path = require('path');
const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Render homepage with BMI form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle form submission and BMI calculation
app.post('/calculate', (req, res) => {
    const { weight, height, age, gender } = req.body;

    // Validation: Ensure weight and height are positive numbers
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        return res.send('<h1>Error: Please enter valid positive numbers for weight and height.</h1>');
    }

    // BMI calculation
    const bmi = weight / (height * height);
    let category = '';

    // Categorize BMI
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    // Health tips based on BMI category
    let healthTips = '';
    if (category === 'Underweight') {
        healthTips = 'Try to consume a balanced diet to reach a healthy weight.';
    } else if (category === 'Normal weight') {
        healthTips = 'Maintain your current diet and exercise regime to stay healthy.';
    } else if (category === 'Overweight') {
        healthTips = 'Consider a balanced diet and regular exercise to lose weight.';
    } else {
        healthTips = 'Consult a doctor for personalized weight loss recommendations.';
    }

    // Render the result page with BMI details
    res.send(`
        <h1>Your BMI: ${bmi.toFixed(2)}</h1>
        <p>Category: ${category}</p>
        <p>Health Tips: ${healthTips}</p>
        <a href="/">Go back</a>
    `);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
