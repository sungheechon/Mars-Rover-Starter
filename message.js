

/* 
  Message {                    // a class
    this.name: "",             // a string that is the name of the message.
    this.commands: []          // an array of Command objects.
  }
*/


class Message {
   // Write code here!
   constructor(name, commands = []) {
      this.name = name;
      if (!name) {
        throw Error("name required.");
      }
      this.commands = commands;
    }
}

module.exports = Message;