document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("fetchData"); // Correct ID

    if (button) {
        button.addEventListener("click", async () => {
            console.log("Button clicked!"); // Debugging log

            const teamName = document.getElementById("teamInput").value;
            if (!teamName) {
                alert("Please enter a team name.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/teams?name=${teamName}`);
                const data = await response.json();

                const teamInfoDiv = document.getElementById("teamInfo");
                if (data.response && data.response.length > 0) {
                    const team = data.response[0].team;
                    teamInfoDiv.innerHTML = `
                        <h2>${team.name} (${team.code})</h2>
                        <p>Country: ${team.country}</p>
                        <p>Founded: ${team.founded}</p>
                        <img src="${team.logo}" alt="${team.name} Logo" width="100">
                    `;
                } else {
                    teamInfoDiv.innerHTML = `<p>Team not found!</p>`;
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });
    } else {
        console.error("Button not found!");
    }
});
