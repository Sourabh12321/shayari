const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const app=express()
const axios = require('axios');
const cors = require("cors");
const path=require('path')
require('dotenv').config();
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);
app.use(express.static(path.join(__dirname,'../frontend/index.html')));


app.use(express.json());
app.use(cors());


app.post('/shayari', async (req, res) => {
    let keyword = req.query.keyword;

    try {
        const runPrompt = async () => {
            const prompt = `Write a Shayari on ${keyword} in hindi`;
            console.log(prompt)
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                 max_tokens: 1500,
                temperature: 0.5,
            });
            const generatedShayari = response.data.choices[0].text;

            return generatedShayari
        };

        const shayari = await runPrompt(); // Wait for the shayari generation to complete
        res.json({ shayari }); // Send the shayari as a JSON response
    }
    catch (err) {
        res.send(err);
    }

});

app.listen(5000, () => {
    console.log(`Server is running on port 4000`);
});