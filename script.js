// ==========================================
// PORTFOLIO WEBSITE JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // CONTACT FORM
    // ==========================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Message:", message);

            alert("Thank you for contacting me! 😊");

            contactForm.reset();

        });

    }


    // ==========================================
    // LOAD PROJECTS FROM NODE.JS + MYSQL
    // ==========================================

    const projectsContainer =
        document.getElementById("projectsContainer");

    if (!projectsContainer) {
        console.error("projectsContainer not found!");
        return;
    }

    console.log("Loading projects...");

    fetch("http://localhost:5000/projects")

        .then((response) => {

            console.log("Backend response:", response);

            if (!response.ok) {
                throw new Error(
                    "Backend returned status " + response.status
                );
            }

            return response.json();

        })

        .then((projects) => {

            console.log("Projects received:", projects);

            // Remove "Loading projects..."
            projectsContainer.innerHTML = "";

            if (!Array.isArray(projects) || projects.length === 0) {

                projectsContainer.innerHTML = `
                    <p>No projects found in the database.</p>
                `;

                return;
            }

            // Create project cards
            projects.forEach((project) => {

                const card = document.createElement("div");

                card.className = "project-card";

                card.innerHTML = `
                    <h3>${project.title}</h3>

                    <p>
                        ${project.description}
                    </p>

                    <p>
                        <strong>Technologies:</strong>
                        ${project.technologies || "Not specified"}
                    </p>
                `;

                projectsContainer.appendChild(card);

            });

        })

        .catch((error) => {

            console.error(
                "ERROR: Could not load projects:",
                error
            );

            projectsContainer.innerHTML = `
                <div class="project-card">
                    <h3>Unable to Load Projects</h3>

                    <p>
                        Please make sure the Node.js backend
                        is running on port 5000.
                    </p>
                </div>
            `;

        });

});