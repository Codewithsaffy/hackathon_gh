"use strict";

// Button and container elements
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;
const backBtn = document.getElementById("back-btn") as HTMLButtonElement;
const crousalBox = document.getElementById("crausel-box") as HTMLDivElement;

const addEducationBtn = document.getElementById(
  "add-education-btn"
) as HTMLButtonElement;
const educationBox = document.getElementById("education-box") as HTMLDivElement;

const addSkillBtn = document.getElementById(
  "add-skill-btn"
) as HTMLButtonElement;
const skillsBox = document.getElementById("skills-box") as HTMLDivElement;

const addExperienceBtn = document.getElementById(
  "add-experience-btn"
) as HTMLButtonElement;
const experienceBox = document.getElementById(
  "experience-box"
) as HTMLDivElement;

let count = 0;

// Update navigation buttons for carousel based on count
const updateButtonsVisibility = () => {
  backBtn.style.display = count === 0 ? "none" : "block";
  nextBtn.style.display = count === 4 ? "none" : "block";
};
updateButtonsVisibility();

// Carousel navigation handlers
nextBtn.addEventListener("click", () => {
  console.log("next");
  console.log(crousalBox);
  if (count < 4) {
    count++;
    crousalBox.style.transform = `translateX(-${count * 100}%)`;
    console.log("nex");
    updateButtonsVisibility();
  }
});

backBtn.addEventListener("click", () => {
  if (count > 0) {
    count--;
    crousalBox.style.transform = `translateX(-${count * 100}%)`;
    updateButtonsVisibility();
  }
});

// Generic function to handle item creation (education, skill, experience)
const createItem = (
  htmlContent: string,
  container: HTMLElement,
  removeClass: string
) => {
  const div = document.createElement("div");
  div.classList.add("flex", "flex-col", "mt-4", "gap-4");
  div.innerHTML = htmlContent;

  container.appendChild(div);

  const removeBtn = div.querySelector(`.${removeClass}`) as HTMLButtonElement;
  removeBtn.addEventListener("click", () => {
    div.remove();
  });
};

// Education item creation
addEducationBtn.addEventListener("click", () => {
  const educationHTML = `
    <div class="flex gap-4">
      <div class="flex flex-col">
        <label for="insName">Institute Name</label>
        <input type="text" name="insName" />
      </div>
      <div class="flex flex-col">
        <label for="degree">Degree</label>
        <input type="text" name="degree" />
      </div>
    </div>
    <button class="remove-education-btn remove-btn  mt-2">Remove</button>
  `;
  createItem(educationHTML, educationBox, "remove-education-btn");
});

// Skill item creation
addSkillBtn.addEventListener("click", () => {
  const skillHTML = `
    <div class="flex gap-4">
      <div class="flex flex-col">
        <label for="skillName">Skill Name</label>
        <input type="text" name="skillName" />
      </div>
      <div class="flex flex-col">
        <label for="skillRate">Rate</label>
        <input type="number" name="skillRate" min="1" max="5" />
      </div>
    </div>
    <button class="remove-skill-btn remove-btn  mt-2">Remove</button>
  `;
  createItem(skillHTML, skillsBox, "remove-skill-btn");
});

// Experience item creation
addExperienceBtn.addEventListener("click", () => {
  const experienceHTML = `
    <div class="flex gap-4">
      <div class="flex flex-col">
        <label for="positionTitle">Position Title</label>
        <input type="text" name="positionTitle" />
      </div>
      <div class="flex flex-col">
        <label for="companyName">Company Name</label>
        <input type="text" name="companyName" />
      </div>
    </div>
    <div class="flex gap-4">
      <div class="flex flex-col">
        <label for="city">City</label>
        <input type="text" name="city" />
      </div>
      <div class="flex flex-col">
        <label for="state">State</label>
        <input type="text" name="state" />
      </div>
    </div>
    <div class="flex flex-col">
      <label for="summary">Summary</label>
      <textarea name="summary" rows="4"></textarea>
    </div>
    <button class="remove-experience-btn remove-btn  mt-2">Remove</button>
  `;
  createItem(experienceHTML, experienceBox, "remove-experience-btn");
});