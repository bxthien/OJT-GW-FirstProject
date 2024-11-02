document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json') // Make sure your path is correct
    .then(response => response.json())
    .then(data => {
      const profilesContainer = document.getElementById('profiles');
      profilesContainer.innerHTML = ''; // Clear current content

      data.forEach((member, index) => {
        const profileDiv = document.createElement('div');
        profileDiv.className = 'profile';
        
        // Gender icon
        const genderIcon = member.age_gender.includes('Male') 
          ? '<span class="gender-icon" data-i18n="maleIcon">♂️</span>' 
          : '<span class="gender-icon" data-i18n="femaleIcon">♀️</span>';

        profileDiv.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="profile-image">
            <h3 data-i18n="memberName${index}" class="profile-name">${member.name}</h3>
            <p class="age-gender" data-i18n="ageGender${index}">${member.age_gender} ${genderIcon}</p>
            <p class="hometown" data-i18n="hometown${index}">Hometown: ${member.hometown}</p>
            <p class="bio" data-i18n="bio${index}">"${member.desc}"</p>
            <div class="social-icons">
            <a href="#"><i class="fab fa-linkedin"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
      </div>
        `;

        profilesContainer.appendChild(profileDiv);
      });

      // Call the translation function after loading profiles
      updateUI(currentLanguage); // Assume currentLanguage is defined elsewhere
    })
    .catch(error => console.error('Error fetching data:', error));
});


document.addEventListener("DOMContentLoaded", function () {

     const darkModeToggle = document.getElementById("darkModeToggle");

  darkModeToggle.innerHTML = `
         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/>
                </svg>
    `;

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkModeToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"/>
                </svg>
            `;
    } else {
      darkModeToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/>
                </svg>
                
            `;
    }
  });

    const languageSelect = document.getElementById("languageSelect");
  
    // Set initial background flag
    setFlagBackground(languageSelect);
  
    // Event listener to change language
    languageSelect.addEventListener("change", function() {
      const selectedLang = languageSelect.value;
      setFlagBackground(languageSelect);
      changeLanguage(selectedLang);
    });
  
    // Function to set the background flag image based on selected language
    function setFlagBackground(selectElement) {
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      const flagUrl = selectedOption.getAttribute("data-flag");
  
  
      selectElement.style.backgroundImage = `url('${flagUrl}')`;
      selectElement.style.backgroundSize = "17px";
      selectElement.style.backgroundRepeat = "no-repeat";
      selectElement.style.backgroundPosition = "5px center";
    }
});  

const translations = {
    en: {
        teamTitle: "The Vipers Team Profile",
       teamDescription: "Below are the profiles of the members of the Vipers Team.",
       maleIcon: "♂️",
       femaleIcon: "♀️",
       memberName0: "Tất Chương",
       ageGender0: "Age: 22, Male",
       hometown0: "Hometown: Da Nang",
       bio0: "The best way to predict the future is to create it.",
       memberName1: "Quốc Trung",
       ageGender1: "Age: 21, Male",
       hometown1: "Hometown: Ha Tinh",
       bio1: "The only way to do great work is to love what you do.",
       memberName2: "Hoàng Hảo",
       ageGender2: "Age: 21, Female",
       hometown2: "Hometown: Da Nang",
       bio2: "Don’t watch the clock; do what it does. Keep going.",
       memberName3: "Vũ Nguyễn",
       ageGender3: "Age: 18, Male",
       hometown3: "Hometown: Da Nang",
       bio3: "The only limit to our realization of tomorrow will be our doubts of today.",
       memberName4: "Ngân Trương",
       ageGender4: "Age: 22, Female",
       hometown4: "Hometown: Da Nang",
       bio4: "The only limit to our realization of tomorrow will be our doubts of today.",
       memberName5: "Thắng Trương",
       ageGender5: "Age: 21, Male",
       hometown5: "Hometown: Quang Nam",
       bio5: "The secret to getting ahead is getting started.",
       memberName6: "Duy Trần",
       ageGender6: "Age: 21, Male",
       hometown6: "Hometown: Kon Tum",
       bio6: "In the middle of every difficulty lies opportunity."   
    },
    vie: {
        teamTitle: "Hồ sơ đội Vipers",
        teamDescription: "Dưới đây là hồ sơ của các thành viên Vipers Team.",
        maleIcon: "♂️",
        femaleIcon: "♀️",
        memberName0: "Tất Chương",
        ageGender0: "22 tuổi, Nam",
        hometown0: "Quê quán: Đà Nẵng",
        bio0: "Cách tốt nhất để dự đoán tương lai là tạo ra nó",
        memberName1: "Quốc Trung",
        ageGender1: "21 tuổi, Nam",
        hometown1: "Quê quán: Hà Tĩnh",
        bio1: "Cách duy nhất để làm một công việc tuyệt vời là yêu điều bạn làm.",
        memberName2: "Hoàng Hảo",
        ageGender2: "21 tuổi, Nữ",
        hometown2: "Quê quán: Đà Nẵng",
        bio2: "Đừng nhìn đồng hồ, hãy làm như nó: Luôn tiến lên.",
        memberName3: "Vũ Nguyễn",
        ageGender3: "18 tuổi, Nam",
        hometown3: "Quê quán: Đà Nẵng",
        bio3: "Giới hạn duy nhất đối với sự hiện thực hóa của ngày mai là những nghi ngờ của chúng ta hôm nay.",
        memberName4: "Ngân Trương",
        ageGender4: "22 tuổi, Nữ",
        hometown4: "Quê quán: Đà Nẵng",
        bio4: "Không quan trọng bạn đi chậm đến mức nào, miễn là bạn không dừng lại.",
        memberName5: "Thắng Trương",
        ageGender5: "21 tuổi, Nam",
        hometown5: "Quê quán: Quảng Nam",
        bio5: "Bí mật của việc tiến lên phía trước luôn là bắt đầu.",
        memberName6: "Duy Trần",
        ageGender6: "21 tuổi, Nam",
        hometown6: "Quê quán: Kon Tum",
        bio6: "Giữa những khó khăn là những cơ hội"

    },
  };
  
  document.getElementById("languageSelect").addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    updateUI(selectedLanguage);
  });
  
  function updateUI(language) {
    const elements = document.querySelectorAll("[data-i18n], [data-i18n-placeholder]");
    
    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n") || element.getAttribute("data-i18n-placeholder");
      if (translations[language][key]) {
        if (element.hasAttribute("placeholder")) {
          // Update the placeholder for input fields
          element.placeholder = translations[language][key];
        } else {
          // Update the text content for other elements
          element.textContent = translations[language][key];
        }
      }
    });
  }
  