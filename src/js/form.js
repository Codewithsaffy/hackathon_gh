"use strict";
const form = document.querySelector("form");
const educationForm = document.getElementById("education-box");
const skillsForm = document.getElementById("skills-box");
const experienceForm = document.getElementById("experience-box");
const summaryTextArea = document.getElementById("summary");
const getInputValue = (selector) => {
  const input = document.querySelector(selector);
  return input ? input.value.trim() : "";
};
const getTextAreaValue = (selector) => {
  const textarea = document.querySelector(selector);
  return textarea ? textarea.value.trim() : "";
};
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s()+-]{7,15}$/;
  return phoneRegex.test(phone);
};
const collectEducationData = () => {
  return Array.from(educationForm.querySelectorAll(".flex.gap-4")).map(
    (item) => ({
      insName: item.querySelector('[name="insName"]').value.trim(),
      degree: item.querySelector('[name="degree"]').value.trim(),
    })
  );
};
const collectSkillData = () => {
  return Array.from(skillsForm.querySelectorAll(".flex.gap-4")).map((item) => ({
    skillName: item.querySelector('[name="skillName"]').value.trim(),
    skillRate: parseInt(
      item.querySelector('[name="skillRate"]').value.trim(),
      10
    ),
  }));
};
const collectExperienceData = () => {
  return Array.from(
    experienceForm.querySelectorAll(".flex.flex-col.gap-4")
  ).map((item) => ({
    positionTitle: item.querySelector('[name="positionTitle"]').value.trim(),
    companyName: item.querySelector('[name="companyName"]').value.trim(),
    city: item.querySelector('[name="city"]').value.trim(),
    state: item.querySelector('[name="state"]').value.trim(),
    summary: item.querySelector('[name="experience-summary"]').value.trim(),
  }));
};
function generateUniqueId() {
  const timestamp = Date.now().toString(36); // Convert timestamp to base-36
  const randomNum = Math.random().toString(36).substring(2); // Random base-36 number
  return timestamp + randomNum; // Combine the two for a unique ID
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const personalDetails = {
    firstName: getInputValue("#firstName"),
    lastName: getInputValue("#lastName"),
    email: getInputValue("#email"),
    phone: getInputValue("#phone"),
    jobTitle: getInputValue("#jobTitle"),
    address: getInputValue("#address"),
  };
  const educationItems = collectEducationData();
  const skillItems = collectSkillData();
  const experienceItems = collectExperienceData();
  const summary = getTextAreaValue("#summary");
  const errors = [];
  if (!personalDetails.firstName) errors.push("First name is required.");
  if (!personalDetails.lastName) errors.push("Last name is required.");
  if (!personalDetails.email || !isValidEmail(personalDetails.email))
    errors.push("A valid email is required.");
  if (!personalDetails.phone || !isValidPhone(personalDetails.phone))
    errors.push("A valid phone number is required.");
  if (!personalDetails.jobTitle) errors.push("Job title is required.");
  if (!personalDetails.address) errors.push("Address is required.");
  if (educationItems.length === 0)
    errors.push("At least one education entry is required.");
  educationItems.forEach((item, index) => {
    if (!item.insName)
      errors.push(
        `Institution name is required for education entry ${index + 1}.`
      );
    if (!item.degree)
      errors.push(`Degree is required for education entry ${index + 1}.`);
  });
  if (skillItems.length === 0)
    errors.push("At least one skill entry is required.");
  skillItems.forEach((item, index) => {
    if (!item.skillName)
      errors.push(`Skill name is required for skill entry ${index + 1}.`);
    if (isNaN(item.skillRate) || item.skillRate < 1 || item.skillRate > 10)
      errors.push(
        `Skill rate must be between 1 and 10 for skill entry ${index + 1}.`
      );
  });
  if (experienceItems.length === 0)
    errors.push("At least one experience entry is required.");
  experienceItems.forEach((item, index) => {
    if (!item.positionTitle)
      errors.push(
        `Position title is required for experience entry ${index + 1}.`
      );
    if (!item.companyName)
      errors.push(
        `Company name is required for experience entry ${index + 1}.`
      );
    if (!item.city)
      errors.push(`City is required for experience entry ${index + 1}.`);
    if (!item.state)
      errors.push(`State is required for experience entry ${index + 1}.`);
    if (!item.summary)
      errors.push(
        `Experience summary is required for experience entry ${index + 1}.`
      );
  });
  if (!summary) errors.push("Summary is required.");
  if (errors.length > 0) {
    alert("Please fix the following errors:\n" + errors.join("\n"));
    return;
  }
  const formData = {
    personalDetails,
    education: educationItems,
    skills: skillItems,
    experience: experienceItems,
    summary,
  };
  // const uid = generateUniqueId();
  console.log("Form Data:", formData);
  localStorage.setItem("form", JSON.stringify(formData));
  window.location.href = "/pages/resume.html";
});
