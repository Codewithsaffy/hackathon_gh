"use strict";
const selectElement = (selector) => document.querySelector(selector);
const getId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
};
const editFormData = (data) => {
    const firstNameInput = selectElement("#firstName");
    const lastNameInput = selectElement("#lastName");
    const emailInput = selectElement("#email");
    const phoneInput = selectElement("#phone");
    const jobTitleInput = selectElement("#jobTitle");
    const addressInput = selectElement("#address");
    if (firstNameInput)
        firstNameInput.value = data.personalDetails.firstName;
    if (lastNameInput)
        lastNameInput.value = data.personalDetails.lastName;
    if (emailInput)
        emailInput.value = data.personalDetails.email;
    if (phoneInput)
        phoneInput.value = data.personalDetails.phone;
    if (jobTitleInput)
        jobTitleInput.value = data.personalDetails.jobTitle;
    if (addressInput)
        addressInput.value = data.personalDetails.address;
    // Clear and populate education section
    const educationForm = selectElement("#education-box");
    if (educationForm) {
        educationForm.innerHTML = "";
        data.education.forEach((edu) => {
            const educationDiv = document.createElement("div");
            educationDiv.classList.add("flex", "gap-4");
            educationDiv.innerHTML = `
        <div class="flex flex-col">
          <label for="insName">Institute Name</label>
          <input type="text" name="insName" value="${edu.insName}" required />
        </div>
        <div class="flex flex-col">
          <label for="degree">Degree</label>
          <input type="text" name="degree" value="${edu.degree}" required />
        </div>
      `;
            educationForm.appendChild(educationDiv);
        });
    }
    // Clear and populate skills section
    const skillsForm = selectElement("#skills-box");
    if (skillsForm) {
        skillsForm.innerHTML = "";
        data.skills.forEach((skill) => {
            const skillDiv = document.createElement("div");
            skillDiv.classList.add("flex", "gap-4");
            skillDiv.innerHTML = `
        <div class="flex flex-col">
          <label for="skillName">Skill Name</label>
          <input type="text" name="skillName" value="${skill.skillName}" required />
        </div>
        <div class="flex flex-col">
          <label for="skillRate">Rating (1-10)</label>
          <input type="number" name="skillRate" value="${skill.skillRate}" min="1" max="10" required />
        </div>
      `;
            skillsForm.appendChild(skillDiv);
        });
    }
    // Clear and populate experience section
    const experienceForm = selectElement("#experience-box");
    if (experienceForm) {
        experienceForm.innerHTML = "";
        data.experience.forEach((exp) => {
            const experienceDiv = document.createElement("div");
            experienceDiv.classList.add("flex", "flex-col", "gap-4");
            experienceDiv.innerHTML = `
        <div class="flex gap-4">
          <div class="flex flex-col">
            <label for="positionTitle">Position Title</label>
            <input type="text" name="positionTitle" value="${exp.positionTitle}" required />
          </div>
          <div class="flex flex-col">
            <label for="companyName">Company Name</label>
            <input type="text" name="companyName" value="${exp.companyName}" required />
          </div>
        </div>
        <div class="flex gap-4">
          <div class="flex flex-col">
            <label for="city">City</label>
            <input type="text" name="city" value="${exp.city}" required />
          </div>
          <div class="flex flex-col">
            <label for="state">State</label>
            <input type="text" name="state" value="${exp.state}" required />
          </div>
        </div>
        <div class="flex flex-col">
          <label for="experience-summary">Summary</label>
          <textarea name="experience-summary" required>${exp.summary}</textarea>
        </div>
      `;
            experienceForm.appendChild(experienceDiv);
        });
    }
    const summaryInput = selectElement("#summary");
    if (summaryInput)
        summaryInput.value = data.summary;
};
