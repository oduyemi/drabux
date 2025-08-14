// Quick API test script
const axios = require("axios");

const testCredentials = {
    email: "Olaitanismail87@gmail.com",
    password: "OlaitanIsmail@1987",
};

console.log("Testing API endpoint...");
console.log("URL:", "https://novunt.vercel.app/api/v1/auth/login");
console.log("Credentials:", { email: testCredentials.email, password: "[HIDDEN]" });

axios
    .post("https://novunt.vercel.app/api/v1/auth/login", testCredentials, {
        timeout: 15000,
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        console.log("✅ SUCCESS!");
        console.log("Status:", response.status);
        console.log("Response:", response.data);
    })
    .catch((error) => {
        console.log("❌ ERROR!");
        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Error Response:", error.response.data);
        } else if (error.request) {
            console.log("Network Error - No response received");
            console.log("Error:", error.message);
        } else {
            console.log("Error:", error.message);
        }
    });
