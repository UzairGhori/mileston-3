interface ResumeData {
    name: string;
    age: number;
    dob: string;
    education: string;
    email: string;
    address: string;
    phone: string;
    skills: string[];
    objective: string;
    workExperience: string;
    image: string; // Field for image data
}

let skills: string[] = [];
let image: string = ''; // Variable to store image data
let isEditing: boolean = false;

document.addEventListener("DOMContentLoaded", () => {
    const addSkillButton = document.getElementById("add-skill-btn") as HTMLButtonElement;
    const generateResumeButton = document.getElementById("generateResume") as HTMLButtonElement;
    const imageUpload = document.getElementById("image-upload") as HTMLInputElement;

    addSkillButton.addEventListener("click", addSkill);
    generateResumeButton.addEventListener("click", generateResume);
    imageUpload.addEventListener("change", handleImageUpload);
});

function addSkill(): void {
    const skillInput = document.getElementById("skill-input") as HTMLInputElement;
    const skillValue = skillInput.value.trim();

    if (skillValue) {
        skills.push(skillValue);
        skillInput.value = '';
        renderSkills();
    } else {
        alert("Please enter a skill.");
    }
}

function renderSkills(): void {
    const skillsList = document.getElementById("skills-list") as HTMLElement;
    skillsList.innerHTML = '';

    skills.forEach((skill, index) => {
        const skillRow = document.createElement("div");
        skillRow.classList.add("skill-row");

        skillRow.innerHTML = `
            <span>${skill}</span>
            <button type="button" class="remove-skill-btn">Remove</button>
        `;

        const removeButton = skillRow.querySelector(".remove-skill-btn") as HTMLButtonElement;
        removeButton.addEventListener("click", () => {
            skills.splice(index, 1);
            renderSkills();
        });

        skillsList.appendChild(skillRow);
    });
}

function handleImageUpload(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            image = reader.result as string; // Store image data as base64
        };
        reader.readAsDataURL(file); // Convert file to base64
    }
}

function getFormData(): ResumeData {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const age = parseInt((document.getElementById("age") as HTMLInputElement).value, 10);
    const dob = (document.getElementById("dob") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLTextAreaElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const objective = (document.getElementById("objective") as HTMLTextAreaElement).value;
    const workExperience = (document.getElementById("work-experience") as HTMLTextAreaElement).value;

    return {
        name,
        age,
        dob,
        education,
        email,
        address,
        phone,
        skills,
        objective,
        workExperience,
        image, // Include image data
    };
}

function generateResume(): void {
    const data = getFormData();
    
    const resumeWindow = window.open("", "_blank");
    if (resumeWindow) {
        resumeWindow.document.write(`
            <html>
                <head>
                    <title>Generated Resume</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            padding: 20px;
                            background-color: #f8f9fa;
                            margin: 0;
                            color: #333;
                        }
                        .resume-container {
                            max-width: 800px;
                            margin: 20px auto;
                            background: #ffffff;
                            padding: 10px;
                            border-radius: 10px;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            display: flex;
                            flex-direction: column;
                        }
                        .left-section {
                            background: #00796b;
                            color: #ffffff;
                            padding: 20px;
                            text-align: center;
                            margin-bottom: 20px;
                            border-radius: 10px 10px 0 0;
                        }
                        .left-section h1 {
                            color: #ffffff;
                            font-size: 4rem;
                            font-family:'Times New Roman', Times, serif;
                            font-style: italic;
                            font-weight: bold;
                            margin-bottom: 10px;
                        }
                        .right-section {
                            padding: 20px;
                        }
                        .right-section h2 {
                            color: #00796b;
                            font-family:times, "Times New Roman",;
                            font-weight: bold;
                            font-style: italic;
                            border-bottom: 2px solid #ff9800;
                            padding-bottom: 5px;
                            margin-bottom: 10px;
                        }

                        .right-section p {
                        font-size: 18px;
                        font-style: italic;
                        
                        }

                        ul li {                            
                            padding: 0;
                            margin-top: 05px;
                        }
                        img {
                            border-radius: 50%;
                            width: 200px;
                            height: 200px;
                            object-fit: cover;
                        }
                        img:hover {
                            transform: scale(1.1);
                        }
                        .edit-btn {
                            background-color: #ff9800;
                            border: none;
                            padding: 10px 20px;
                            cursor: pointer;
                            font-size: 18px;
                            color: #ffffff;
                            border-radius: 5px;
                            margin-top: 20px;
                            transition: background-color 0.3s ease;
                        }
                        .edit-btn:hover {
                            background-color: #e67e22;
                        }
                        .input-field {
                            padding: 10px;
                            margin-bottom: 10px;
                            width: 100%;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="resume-container">
                        <div class="left-section">
                            <img src="${data.image}" alt="Profile Image" />
                            <h1 id="name">${data.name}</h1>
                        </div>
                        <div class="right-section">
                            <h2>Personal Info</h2>
                            <p><strong>Age:</strong> <span id="age">${data.age}</span></p>
                            <p><strong>Date of Birth:</strong> <span id="dob">${data.dob}</span></p>
                            <p><strong>Email:</strong> <span id="email">${data.email}</span></p>
                            <p><strong>Phone:</strong> <span id="phone">${data.phone}</span></p>
                            <p><strong>Address:</strong> <span id="address">${data.address}</span></p>
                            
                            <h2>Objective</h2>
                            <p id="objective">${data.objective}</p>
                            
                            <h2>Skills</h2>
                            <ul id="skills">
                                ${data.skills.map(skill => `<li>${skill}</li>`).join("")}
                            </ul>
                            
                            <h2>Work Experience</h2>
                            <p id="workExperience">${data.workExperience}</p>
                        </div>
                        <button class="edit-btn" onclick="toggleEdit()">Edit</button>
                    </div>
                    <script>
                        let isEditing = false;
                        function toggleEdit() {
                            isEditing = !isEditing;
                            const editButton = document.querySelector(".edit-btn");
                            
                            if (isEditing) {
                                editButton.textContent = "Save";
                                makeEditable();
                            } else {
                                editButton.textContent = "Edit";
                                saveChanges();
                            }
                        }

                        function makeEditable() {
                            const elements = ["name", "age", "dob", "email", "phone", "address", "objective", "workExperience"];
                            elements.forEach(id => {
                                const element = document.getElementById(id);
                                const input = document.createElement("input");
                                input.type = "text";
                                input.value = element.textContent;
                                input.id = id + "-input";
                                input.classList.add("input-field");
                                element.replaceWith(input);
                            });
                        }

                        function saveChanges() {
                            const elements = ["name", "age", "dob", "email", "phone", "address", "objective", "workExperience"];
                            elements.forEach(id => {
                                const input = document.getElementById(id + "-input");
                                const span = document.createElement("span");
                                span.textContent = input.value;
                                span.id = id;
                                span.style.fontSize = id === "name" ? "4rem" : ""; // Retain font size for h1
                                span.style.fontFamily = id === "name" ? "'Times New Roman', Times, serif" : ""; // Retain font family
                                span.style.fontWeight = id === "name" ? "bold" : ""; // Retain font weight
                                input.replaceWith(span);
                            });
                        }
                    </script>
                </body>
            </html>
        `);
        resumeWindow.document.close();
    }
}
