const Command = require('./command.js');
const Message = require('./message.js');


class Rover {
   // Write code here!
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }


   createResultObj(msgCmds) {    //// Create a rover command result object. Create a roverStatus object if "STATUS_CHECK"
      let msgCmdType = msgCmds["commandType"];
      let resultObj = { completed: true };

      if (msgCmdType === "MOVE") {
         if (this.mode === "LOW_POWER") {
            resultObj.completed = false;
         } else if (this.mode === "NORMAL") {
            this.position = msgCmds["value"];
         }

      } else if (msgCmdType === "MODE_CHANGE") {
         this.mode = msgCmds["value"];

      } else if (msgCmdType === "STATUS_CHECK") {
         resultObj.roverStatus = {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
         };
      }
      return resultObj;
   }


   createMsgCmdArray(cmds) {  //// Create a new array to store commands with status.
  
      let allCommands = [];

      while (cmds.length > 0) {
         let msgCmdsResult = this.createResultObj(cmds[0]);
         allCommands.push(msgCmdsResult);
         cmds.shift();
      }

      return allCommands;
   }


   receiveMessage(message) {
      let nameMsgObj = message.name;
      let msgCmds = this.createMsgCmdArray(message.commands);

      let results = {
         message: nameMsgObj,
         results: msgCmds
      };

      return results;
   }
}

module.exports = Rover;