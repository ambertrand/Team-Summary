const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const questions = require("./lib/questions");
const render = require("./lib/htmlRenderer");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let employeeArray = [];

// Function to render team to team.html
let displayTeam = () => {
    let addTeam = render(employeeArray);
    fs.writeFile(outputPath, addTeam, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Successfully added your team!")
        }
    })
}



// Function prompts questions to user
function userQuestions() {
    return inquirer.prompt(questions)
    .then(function(answers) {
        let newEmployee;
        if(answers.employeeRole === "Manager") {
            newEmployee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            employeeArray.push(newEmployee);
        }
        if(answers.employeeRole === "Engineer") {
            newEmployee = new Engineer(answers.name, answers.id, answers.email, answers.userName);
            employeeArray.push(newEmployee);
        }
        if(answers.employeeRole === "Intern") {
            newEmployee = new Intern(answers.name, answers.id, answers.email, answers.school);
            employeeArray.push(newEmployee);
        }
        if(answers.continue) {
            return userQuestions();
        }
        displayTeam();
    })
}

userQuestions();