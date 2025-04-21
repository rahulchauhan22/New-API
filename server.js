const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Load dataset into memory
let careerData = [];

fs.createReadStream(path.join(__dirname, 'data', 'jobss_cleaned.csv'))
  .pipe(csv())
  .on('data', (row) => {
    careerData.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });


  //  takes student inputs and returns career recommendations based on your dataset

  function getRecommendations(studentInput) {
    // Implement your logic to process studentInput and return recommendations
    // For example, filter jobData based on matching skills or education level
    return jobData.filter(job => {
      // Simple example: check if the job requires a skill the student has
      return studentInput.skills.some(skill => job.requiredSkills.includes(skill));
    });
  }
  
//   handle incoming requests and return recommendations.

  app.post('/recommendations', (req, res) => {
    const studentInput = req.body;
    const recommendations = getRecommendations(studentInput);
    res.json(recommendations);
  });
  
// Implement error handling to manage unexpected situations, such as missing data or invalid inputs. This ensures your API remains robust and user-friendly.

  app.post('/recommendations', (req, res) => {
    try {
      const studentInput = req.body;
      if (!studentInput.skills || !Array.isArray(studentInput.skills)) {
        return res.status(400).json({ error: 'Invalid input: skills are required.' });
      }
      const recommendations = getRecommendations(studentInput);
      res.json(recommendations);
    } catch (error) {
      console.error('Error processing recommendations:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  

// Define routes here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
