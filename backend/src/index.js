const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "your_full_name_ddmmyyyy"; 
    const email = "your_college_email@example.com";
    const roll_number = "ABCD123";
    
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercase = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

    
    const file_valid = file_b64 ? true : false;
    const file_mime_type = "image/png"; 
    const file_size_kb = file_b64 ? Math.floor(Buffer.from(file_b64, 'base64').length / 1024) : 0;

  
    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});


app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
