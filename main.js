import inquirer from 'inquirer';
import cp from 'child_process';
import nodegit from 'nodegit';
import path from 'path';


function showMenu(elements) {
  console.warn(elements);
  inquirer.prompt([{
    type: 'checkbox',
    message: 'New/edited files',
    name: 'file',
    choices: elements.map( (line, i) => {
      return { name: line.path() + ' (' + line.status() + ')', id: i }
    }),
    validate: function(answer) {
      if (answer.length < 1) {
        return "You must choose at least one topping.";
      }
      return true;
    }
  }], function(answers) {
    console.log(JSON.stringify(answers, null, "  "));
  });
}



nodegit.Repository.open(path.resolve(__dirname, "./.git"))
.then(function(repo) {
  repo.getStatus().then(showMenu);
});

console.log('sefsfe');
