var skills = [];
var image = ''; // Variable to store image data
var isEditing = false;
document.addEventListener("DOMContentLoaded", function () {
    var addSkillButton = document.getElementById("add-skill-btn");
    var generateResumeButton = document.getElementById("generateResume");
    var imageUpload = document.getElementById("image-upload");
    addSkillButton.addEventListener("click", addSkill);
    generateResumeButton.addEventListener("click", generateResume);
    imageUpload.addEventListener("change", handleImageUpload);
});
function addSkill() {
    var skillInput = document.getElementById("skill-input");
    var skillValue = skillInput.value.trim();
    if (skillValue) {
        skills.push(skillValue);
        skillInput.value = '';
        renderSkills();
    }
    else {
        alert("Please enter a skill.");
    }
}
function renderSkills() {
    var skillsList = document.getElementById("skills-list");
    skillsList.innerHTML = '';
    skills.forEach(function (skill, index) {
        var skillRow = document.createElement("div");
        skillRow.classList.add("skill-row");
        skillRow.innerHTML = "\n            <span>".concat(skill, "</span>\n            <button type=\"button\" class=\"remove-skill-btn\">Remove</button>\n        ");
        var removeButton = skillRow.querySelector(".remove-skill-btn");
        removeButton.addEventListener("click", function () {
            skills.splice(index, 1);
            renderSkills();
        });
        skillsList.appendChild(skillRow);
    });
}
function handleImageUpload(event) {
    var fileInput = event.target;
    var file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
        var reader_1 = new FileReader();
        reader_1.onloadend = function () {
            image = reader_1.result; // Store image data as base64
        };
        reader_1.readAsDataURL(file); // Convert file to base64
    }
}
function getFormData() {
    var name = document.getElementById("name").value;
    var age = parseInt(document.getElementById("age").value, 10);
    var dob = document.getElementById("dob").value;
    var education = document.getElementById("education").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    var objective = document.getElementById("objective").value;
    var workExperience = document.getElementById("work-experience").value;
    return {
        name: name,
        age: age,
        dob: dob,
        education: education,
        email: email,
        address: address,
        phone: phone,
        skills: skills,
        objective: objective,
        workExperience: workExperience,
        image: image,
    };
}
function generateResume() {
    var data = getFormData();
    var resumeWindow = window.open("", "_blank");
    if (resumeWindow) {
        resumeWindow.document.write("\n            <html>\n                <head>\n                    <title>Generated Resume</title>\n                    <style>\n                        body {\n                            font-family: Arial, sans-serif;\n                            line-height: 1.6;\n                            padding: 20px;\n                            background-color: #f8f9fa;\n                            margin: 0;\n                            color: #333;\n                        }\n                        .resume-container {\n                            max-width: 800px;\n                            margin: 20px auto;\n                            background: #ffffff;\n                            padding: 10px;\n                            border-radius: 10px;\n                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n                            display: flex;\n                            flex-direction: column;\n                        }\n                        .left-section {\n                            background: #00796b;\n                            color: #ffffff;\n                            padding: 20px;\n                            text-align: center;\n                            margin-bottom: 20px;\n                            border-radius: 10px 10px 0 0;\n                        }\n                        .left-section h1 {\n                            color: #ffffff;\n                            font-size: 4rem;\n                            font-family:'Times New Roman', Times, serif;\n                            font-style: italic;\n                            font-weight: bold;\n                            margin-bottom: 10px;\n                        }\n                        .right-section {\n                            padding: 20px;\n                        }\n                        .right-section h2 {\n                            color: #00796b;\n                            font-family:times, \"Times New Roman\",;\n                            font-weight: bold;\n                            font-style: italic;\n                            border-bottom: 2px solid #ff9800;\n                            padding-bottom: 5px;\n                            margin-bottom: 10px;\n                        }\n\n                        .right-section p {\n                        font-size: 18px;\n                        font-style: italic;\n                        \n                        }\n\n                        ul li {                            \n                            padding: 0;\n                            margin-top: 05px;\n                        }\n                        img {\n                            border-radius: 50%;\n                            width: 200px;\n                            height: 200px;\n                            object-fit: cover;\n                        }\n                        img:hover {\n                            transform: scale(1.1);\n                        }\n                        .edit-btn {\n                            background-color: #ff9800;\n                            border: none;\n                            padding: 10px 20px;\n                            cursor: pointer;\n                            font-size: 18px;\n                            color: #ffffff;\n                            border-radius: 5px;\n                            margin-top: 20px;\n                            transition: background-color 0.3s ease;\n                        }\n                        .edit-btn:hover {\n                            background-color: #e67e22;\n                        }\n                        .input-field {\n                            padding: 10px;\n                            margin-bottom: 10px;\n                            width: 100%;\n                            border: 1px solid #ccc;\n                            border-radius: 5px;\n                        }\n                    </style>\n                </head>\n                <body>\n                    <div class=\"resume-container\">\n                        <div class=\"left-section\">\n                            <img src=\"".concat(data.image, "\" alt=\"Profile Image\" />\n                            <h1 id=\"name\">").concat(data.name, "</h1>\n                        </div>\n                        <div class=\"right-section\">\n                            <h2>Personal Info</h2>\n                            <p><strong>Age:</strong> <span id=\"age\">").concat(data.age, "</span></p>\n                            <p><strong>Date of Birth:</strong> <span id=\"dob\">").concat(data.dob, "</span></p>\n                            <p><strong>Email:</strong> <span id=\"email\">").concat(data.email, "</span></p>\n                            <p><strong>Phone:</strong> <span id=\"phone\">").concat(data.phone, "</span></p>\n                            <p><strong>Address:</strong> <span id=\"address\">").concat(data.address, "</span></p>\n                            \n                            <h2>Objective</h2>\n                            <p id=\"objective\">").concat(data.objective, "</p>\n                            \n                            <h2>Skills</h2>\n                            <ul id=\"skills\">\n                                ").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "\n                            </ul>\n                            \n                            <h2>Work Experience</h2>\n                            <p id=\"workExperience\">").concat(data.workExperience, "</p>\n                        </div>\n                        <button class=\"edit-btn\" onclick=\"toggleEdit()\">Edit</button>\n                    </div>\n                    <script>\n                        let isEditing = false;\n                        function toggleEdit() {\n                            isEditing = !isEditing;\n                            const editButton = document.querySelector(\".edit-btn\");\n                            \n                            if (isEditing) {\n                                editButton.textContent = \"Save\";\n                                makeEditable();\n                            } else {\n                                editButton.textContent = \"Edit\";\n                                saveChanges();\n                            }\n                        }\n\n                        function makeEditable() {\n                            const elements = [\"name\", \"age\", \"dob\", \"email\", \"phone\", \"address\", \"objective\", \"workExperience\"];\n                            elements.forEach(id => {\n                                const element = document.getElementById(id);\n                                const input = document.createElement(\"input\");\n                                input.type = \"text\";\n                                input.value = element.textContent;\n                                input.id = id + \"-input\";\n                                input.classList.add(\"input-field\");\n                                element.replaceWith(input);\n                            });\n                        }\n\n                        function saveChanges() {\n                            const elements = [\"name\", \"age\", \"dob\", \"email\", \"phone\", \"address\", \"objective\", \"workExperience\"];\n                            elements.forEach(id => {\n                                const input = document.getElementById(id + \"-input\");\n                                const span = document.createElement(\"span\");\n                                span.textContent = input.value;\n                                span.id = id;\n                                span.style.fontSize = id === \"name\" ? \"4rem\" : \"\"; // Retain font size for h1\n                                span.style.fontFamily = id === \"name\" ? \"'Times New Roman', Times, serif\" : \"\"; // Retain font family\n                                span.style.fontWeight = id === \"name\" ? \"bold\" : \"\"; // Retain font weight\n                                input.replaceWith(span);\n                            });\n                        }\n                    </script>\n                </body>\n            </html>\n        "));
        resumeWindow.document.close();
    }
}
