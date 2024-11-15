const selectElement = (selector: string): HTMLElement | null => document.querySelector(selector);

const getId = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
};

interface Education {
  insName: string;
  degree: string;
}

interface Skill {
  skillName: string;
  skillRate: number;
}

interface Experience {
  positionTitle: string;
  companyName: string;
  city: string;
  state: string;
  summary: string;
}

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  address: string;
}

interface ResumeData {
  personalDetails: PersonalDetails;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  summary: string;
}

const editFormData = (data: ResumeData): void => {
  const firstNameInput = selectElement("#firstName") as HTMLInputElement;
  const lastNameInput = selectElement("#lastName") as HTMLInputElement;
  const emailInput = selectElement("#email") as HTMLInputElement;
  const phoneInput = selectElement("#phone") as HTMLInputElement;
  const jobTitleInput = selectElement("#jobTitle") as HTMLInputElement;
  const addressInput = selectElement("#address") as HTMLInputElement;

  if (firstNameInput) firstNameInput.value = data.personalDetails.firstName;
  if (lastNameInput) lastNameInput.value = data.personalDetails.lastName;
  if (emailInput) emailInput.value = data.personalDetails.email;
  if (phoneInput) phoneInput.value = data.personalDetails.phone;
  if (jobTitleInput) jobTitleInput.value = data.personalDetails.jobTitle;
  if (addressInput) addressInput.value = data.personalDetails.address;

  const educationForm = selectElement("#education-box");
  if (educationForm) {
    educationForm.innerHTML = "";
    data.education.forEach((edu) => {
      educationForm.innerHTML += `
        <div class="flex gap-4">
          <div class="flex flex-col">
            <label for="insName">Institute Name</label>
            <input type="text" name="insName" value="${edu.insName}" placeholder="Institution Name" required />
          </div>
          <div class="flex flex-col">
            <label for="degree">Degree</label>
            <input type="text" name="degree" value="${edu.degree}" placeholder="Degree" required />
          </div>
        </div>
      `;
    });
  }

  const skillsForm = selectElement("#skills-box");
  if (skillsForm) {
    skillsForm.innerHTML = "";
    data.skills.forEach((skill) => {
      skillsForm.innerHTML += `
        <div class="flex gap-4">
          <div class="flex flex-col">
            <label for="skillName">Skill Name</label>
            <input type="text" name="skillName" value="${skill.skillName}" placeholder="Skill Name" required />
          </div>
          <div class="flex flex-col">
            <label for="skillRate">Rating (1-10)</label>
            <input type="number" name="skillRate" value="${skill.skillRate}" placeholder="Skill Rate (1-10)" min="1" max="10" required />
          </div>
        </div>
      `;
    });
  }

  const experienceForm = selectElement("#experience-box");
  if (experienceForm) {
    experienceForm.innerHTML = "";
    data.experience.forEach((exp) => {
      experienceForm.innerHTML += `
        <div class="flex flex-col gap-4">
          <div class="flex gap-4">
            <div class="flex flex-col">
              <label for="positionTitle">Position Title</label>
              <input type="text" name="positionTitle" value="${exp.positionTitle}" placeholder="Position Title" required />
            </div>
            <div class="flex flex-col">
              <label for="companyName">Company Name</label>
              <input type="text" name="companyName" value="${exp.companyName}" placeholder="Company Name" required />
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex flex-col">
              <label for="city">City</label>
              <input type="text" name="city" value="${exp.city}" placeholder="City" required />
            </div>
            <div class="flex flex-col">
              <label for="state">State</label>
              <input type="text" name="state" value="${exp.state}" placeholder="State" required />
            </div>
          </div>
          <div class="flex flex-col">
            <label for="experience-summary">Summary of Responsibilities</label>
            <textarea name="experience-summary" placeholder="Describe your key responsibilities and achievements..." required>${exp.summary}</textarea>
          </div>
        </div>
      `;
    });
  }

  const summaryInput = selectElement("#summary") as HTMLTextAreaElement;
  if (summaryInput) summaryInput.value = data.summary;
};

window.addEventListener("load", () => {
  const resumeDataString = localStorage.getItem(`resume_${getId()}`);
  if (resumeDataString) {
    const data: ResumeData = JSON.parse(resumeDataString);
    editFormData(data);

    document.getElementById("name")!.textContent = `${data.personalDetails.firstName} ${data.personalDetails.lastName}`;
    document.getElementById("jobtitle")!.textContent = data.personalDetails.jobTitle;
    document.getElementById("address")!.textContent = data.personalDetails.address;
    document.querySelector("#email span")!.textContent = data.personalDetails.email;
    document.getElementById("summary")!.textContent = data.summary;

    const experienceContainer = document.getElementById("experienceContainer")!;
    data.experience.forEach((exp) => {
      const expDiv = document.createElement("div");
      expDiv.classList.add("experience");
      expDiv.innerHTML = `
        <h3>${exp.positionTitle}</h3>
        <p>${exp.companyName}, ${exp.city}, ${exp.state}</p>
        <p>${exp.summary}</p>
      `;
      experienceContainer.appendChild(expDiv);
    });

    const educationContainer = document.getElementById("educationContainer")!;
    data.education.forEach((edu) => {
      const eduDiv = document.createElement("div");
      eduDiv.classList.add("education");
      eduDiv.innerHTML = `
        <h3>${edu.degree}</h3>
        <p>${edu.insName}</p>
      `;
      educationContainer.appendChild(eduDiv);
    });

    const skillsContainer = document.getElementById("skillsContainer")!;
    data.skills.forEach((skill) => {
      const skillDiv = document.createElement("div");
      skillDiv.classList.add("skill-bar");
      skillDiv.innerHTML = `
        <span>${skill.skillName}</span>
        <div class="progress">
          <span style="width: ${skill.skillRate * 10}%"></span>
        </div>
      `;
      skillsContainer.appendChild(skillDiv);
    });
  } else {
    console.error("No resume data found in localStorage.");
  }
});

document.getElementById("edit")!.addEventListener("click", () => {
  window.location.href = `generateResume.html?id=${getId()}`;
});

document.getElementById("print-btn")!.addEventListener("click", () => {
  window.print();
});

const imageInput = document.getElementById("image") as HTMLInputElement;
const profileImage = document.getElementById("profileImage") as HTMLImageElement;
const profileText = document.getElementById("profileText") as HTMLElement;

imageInput.addEventListener("change", (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    profileText.style.display = "none";
    profileImage.src = imageUrl;
    profileImage.style.display = "block";
  }
});

const shareBtn = document.getElementById("share")!;
shareBtn.addEventListener("click", async () => {
  const resumeUrl = window.location.href;
  const shareData = {
    title: "My Resume",
    text: "Check out my resume!",
    url: resumeUrl,
  };

  try {
    await navigator.share(shareData);
  } catch (error) {
    console.error("Share failed", error);
  }
});
