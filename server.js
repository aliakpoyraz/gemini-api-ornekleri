const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Proxy endpoint'i
app.post('/api/generate', async (req, res) => {
    try {
        console.log('Received request:', req.body);  

        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        console.log('Making API request to Gemini...');  
        
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY', 
            ///////////////////////////////// API KEY YUKARIDA BULUNAN LINKTEKI "API_KEY" YERINE YAZILMALIDIR ////////////////////////////
            
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        console.log('API Response status:', response.status);  

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);  
            return res.status(response.status).json({ 
                error: `API Error: ${errorData.error?.message || `HTTP error! status: ${response.status}`}` 
            });
        }

        const data = await response.json();
        console.log('API Response data:', data); 
        
        res.json(data);
    } catch (error) {
        console.error('Server Error:', error);  
        res.status(500).json({ 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Ana sayfa için route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);  
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 
