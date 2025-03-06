async function askGPT() {
    const apiKey = "DEIN_OPENAI_API_KEY";  // Hier deinen OpenAI API Key einfügen!
    const prompt = "Der Benutzer beschreibt seinen Alltag. Bestimme sein Aktivitätslevel: Sitzend, leicht aktiv, moderat aktiv, sehr aktiv, extrem aktiv.";

    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            prompt: prompt,
            max_tokens: 50
        })
    });

    const data = await response.json();
    const activityLevel = data.choices[0].text.trim();
    document.getElementById("activityResult").innerText = "Erkanntes Aktivitätslevel: " + activityLevel;
}

function calculateCalories() {
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let activity = document.getElementById("activityResult").innerText.split(": ")[1];

    if (!age || !weight || !height || !activity) {
        alert("Bitte alle Felder ausfüllen und GPT für das Aktivitätslevel nutzen!");
        return;
    }

    // Mifflin-St Jeor Formel
    let bmr;
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Aktivitätsfaktor bestimmen
    let activityMultiplier = {
        "Sitzend": 1.2,
        "Leicht aktiv": 1.375,
        "Moderat aktiv": 1.55,
        "Sehr aktiv": 1.725,
        "Extrem aktiv": 1.9
    }[activity] || 1.2;

    let tdee = Math.round(bmr * activityMultiplier);
    document.getElementById("result").innerText = `Dein täglicher Kalorienbedarf: ${tdee} kcal`;
}
