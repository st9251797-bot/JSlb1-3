"use strict";

class PersonalInfo {
    constructor(name, age, email, phone) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.phone = phone;
    }

    get info() {
        return {
            name: this.name,
            age: this.age,
            email: this.email,
            phone: this.phone
        };
    }

    set info({ name, age, email, phone }) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.phone = phone;
    }
}

class Experience {
    constructor(jobTitle, company, years) {
        this.jobTitle = jobTitle;
        this.company = company;
        this.years = years;
    }

    get info() {
        return {
            jobTitle: this.jobTitle,
            company: this.company,
            years: this.years
        };
    }

    set info({ jobTitle, company, years }) {
        this.jobTitle = jobTitle;
        this.company = company;
        this.years = years;
    }
}

class Education {
    constructor(degree, institution, year) {
        this.degree = degree;
        this.institution = institution;
        this.year = year;
    }

    get info() {
        return {
            degree: this.degree,
            institution: this.institution,
            year: this.year
        };
    }

    set info({ degree, institution, year }) {
        this.degree = degree;
        this.institution = institution;
        this.year = year;
    }
}

class Skills {
    constructor(skillsList) {
        this.skillsList = skillsList;
    }

    get info() {
        return this.skillsList;
    }

    set info(skillsList) {
        this.skillsList = skillsList;
    }
}

class Resume {
    constructor() {
        this.personalInfo = null;
        this.experiences = [];
        this.educations = [];
        this.skills = null;
    }

    addPersonalInfo(info) {
        this.personalInfo = new PersonalInfo(info.name, info.age, info.email, info.phone);
    }

    addExperience(exp) {
        this.experiences.push(new Experience(exp.jobTitle, exp.company, exp.years));
    }

    addEducation(edu) {
        this.educations.push(new Education(edu.degree, edu.institution, edu.year));
    }

    setSkills(skills) {
        this.skills = new Skills(skills);
    }

    display() {
        let html = '<h2>Резюме</h2>';
        if (this.personalInfo) {
            html += `<h3>Особисті дані</h3>
                     <p>Ім'я: ${this.personalInfo.name}</p>
                     <p>Вік: ${this.personalInfo.age}</p>
                     <p>Email: ${this.personalInfo.email}</p>
                     <p>Телефон: ${this.personalInfo.phone}</p>`;
        }
        if (this.experiences.length > 0) {
            html += '<h3>Досвід роботи</h3>';
            this.experiences.forEach(exp => {
                html += `<p>${exp.jobTitle} у ${exp.company} (${exp.years} років)</p>`;
            });
        }
        if (this.educations.length > 0) {
            html += '<h3>Освіта</h3>';
            this.educations.forEach(edu => {
                html += `<p>${edu.degree} від ${edu.institution} (${edu.year})</p>`;
            });
        }
        if (this.skills) {
            html += '<h3>Навички</h3><p>' + this.skills.info.join(', ') + '</p>';
        }
        return html;
    }

    saveToStorage() {
        const data = {
            personalInfo: this.personalInfo ? this.personalInfo.info : null,
            experiences: this.experiences.map(exp => exp.info),
            educations: this.educations.map(edu => edu.info),
            skills: this.skills ? this.skills.info : null
        };
        localStorage.setItem('resume', JSON.stringify(data));
        alert('Резюме збережено!');
    }

    loadFromStorage() {
        const data = JSON.parse(localStorage.getItem('resume'));
        if (data) {
            if (data.personalInfo) this.addPersonalInfo(data.personalInfo);
            data.experiences.forEach(exp => this.addExperience(exp));
            data.educations.forEach(edu => this.addEducation(edu));
            if (data.skills) this.setSkills(data.skills);
            alert('Резюме завантажено!');
        } else {
            alert('Немає збереженого резюме.');
        }
    }
}

function inputPersonalInfo() {
    const name = prompt('Введіть ім\'я:');
    if (!name || name.trim() === '') {
        alert('Ім\'я не може бути порожнім!');
        return null;
    }
    const ageStr = prompt('Введіть вік:');
    const age = parseInt(ageStr);
    if (isNaN(age) || age <= 0) {
        alert('Некоректний вік!');
        return null;
    }
    const email = prompt('Введіть email:');
    if (!email || !email.includes('@')) {
        alert('Некоректний email!');
        return null;
    }
    const phone = prompt('Введіть телефон:');
    return { name, age, email, phone };
}

function inputExperience() {
    const jobTitle = prompt('Введіть посаду:');
    if (!jobTitle || jobTitle.trim() === '') {
        alert('Посада не може бути порожньою!');
        return null;
    }
    const company = prompt('Введіть компанію:');
    if (!company || company.trim() === '') {
        alert('Компанія не може бути порожньою!');
        return null;
    }
    const yearsStr = prompt('Введіть кількість років:');
    const years = parseInt(yearsStr);
    if (isNaN(years) || years < 0) {
        alert('Некоректна кількість років!');
        return null;
    }
    return { jobTitle, company, years };
}

function inputEducation() {
    const degree = prompt('Введіть ступінь освіти:');
    if (!degree || degree.trim() === '') {
        alert('Ступінь не може бути порожнім!');
        return null;
    }
    const institution = prompt('Введіть навчальний заклад:');
    if (!institution || institution.trim() === '') {
        alert('Заклад не може бути порожнім!');
        return null;
    }
    const yearStr = prompt('Введіть рік закінчення:');
    const year = parseInt(yearStr);
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        alert('Некоректний рік!');
        return null;
    }
    return { degree, institution, year };
}

function inputSkills() {
    const skillsStr = prompt('Введіть навички через кому:');
    return skillsStr ? skillsStr.split(',').map(s => s.trim()).filter(s => s) : [];
}

const resume = new Resume();
const output = document.getElementById('resumeOutput');

document.getElementById('inputData').addEventListener('click', () => {
    const personal = inputPersonalInfo();
    if (personal) resume.addPersonalInfo(personal);

    let addMore = true;
    while (addMore) {
        const exp = inputExperience();
        if (exp) resume.addExperience(exp);
        addMore = confirm('Додати ще досвід роботи?');
    }

    addMore = true;
    while (addMore) {
        const edu = inputEducation();
        if (edu) resume.addEducation(edu);
        addMore = confirm('Додати ще освіту?');
    }

    const skills = inputSkills();
    resume.setSkills(skills);
});

document.getElementById('generateResume').addEventListener('click', () => {
    output.innerHTML = resume.display();
    output.style.display = 'block';
});

document.getElementById('editResume').addEventListener('click', () => {
    resume.personalInfo = null;
    resume.experiences = [];
    resume.educations = [];
    resume.skills = null;
    output.style.display = 'none';
    alert('Дані очищено. Введіть нові дані.');
});

document.getElementById('saveResume').addEventListener('click', () => {
    resume.saveToStorage();
});

document.getElementById('loadResume').addEventListener('click', () => {
    resume.loadFromStorage();
    output.innerHTML = resume.display();
    output.style.display = 'block';
});