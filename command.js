/*
  Command {                     // a class
    this.commandType: "",       // a string that represents the type of command
    this.value: null            // a value related to the type of command
  }
*/


class Command {
   constructor(commandType, value) {
     this.commandType = commandType;
     if (!commandType) {
       throw Error("Command type required.");
     }
     this.value = value;
   }
 
 }
 
 module.exports = Command;