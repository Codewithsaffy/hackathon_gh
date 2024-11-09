const selectElement = (selector: string): HTMLElement | null =>
  document.querySelector(selector);

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
            <input type="text" name="insName" value="${edu.insName}" required />
          </div>
          <div class="flex flex-col">
            <label for="degree">Degree</label>
            <input type="text" name="degree" value="${edu.degree}" required />
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
            <input type="text" name="skillName" value="${skill.skillName}" required />
          </div>
          <div class="flex flex-col">
            <label for="skillRate">Rating (1-10)</label>
            <input type="number" name="skillRate" value="${skill.skillRate}" min="1" max="10" required />
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
        </div>
      `;
    });
  }

  const summaryInput = selectElement("#summary") as HTMLTextAreaElement;
  if (summaryInput) summaryInput.value = data.summary;
};

window.addEventListener("load", () => {
  const savedData = localStorage.getItem(`resume_${getId()}`);
  if (savedData) {
    const data: ResumeData = JSON.parse(savedData);
    editFormData(data);
  } else {
    console.log("No resume data found in localStorage.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const editBtn = selectElement("#edit")!;
  const printBtn = selectElement("#print-btn")!;
  const imageInput = selectElement("#image") as HTMLInputElement;
  const profileImage = selectElement("#profileImage") as HTMLImageElement;
  const profileText = selectElement("#profileText") as HTMLElement;
  const shareBtn = selectElement("#share")!;

  editBtn?.addEventListener("click", () => {
    window.location.href = `generateResume.html?id=${getId()}`;
  });

  printBtn?.addEventListener("click", () => {
    window.print();
  });

  imageInput?.addEventListener("change", (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      profileText.style.display = "none";
      profileImage.src = imageUrl;
      profileImage.style.display = "block";
    }
  });

  shareBtn?.addEventListener("click", async () => {
    const resumeUrl = window.location.href;
    const shareData = { title: "My Resume", text: "Check out my resume!", url: resumeUrl };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Share successful");
      } catch (error) {
        console.error("Share failed", error);
      }
    } else {
      console.error("Sharing not supported");
    }
  });
});
