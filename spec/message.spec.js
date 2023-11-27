const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


/*
  command.js
  Command {                     // a class
    this.commandType: "",       // a string that represents the type of command
    this.value: null            // a value related to the type of command
  }
*/

/* 
  Message {                    // a class
    this.name: "",             // a string that is the name of the message.
    this.commands: []          // an array of Command objects.
  }
*/



describe("Message class", function () {
    //// Test data to run the test
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);  // a Message object

    //// TEST 4
    test("throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect(function () { new Message(); }).toThrow(new Error('name required.'));
    });

    //// TEST 5 - The test confirms that the constructor in the Message class correctly sets the name property in a new message object.
    test("constructor sets name", function () {
        expect(message.name).toEqual("Test message with two commands");
    });

    //// TEST 6 - This test confirms that the commands property of a new message object contains the data passed in from the Message(name, commands) call.
    test("contains a commands array passed into the constructor as the 2nd argument", function () {
        expect(message.commands).toEqual([new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]);
    });

});
