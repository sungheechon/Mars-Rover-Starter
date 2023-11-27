const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


/*
  Command {                     // a class
    this.commandType: "",       // a string that represents the type of command
    this.value: null            // a value related to the type of command
  }
*/



describe("Command class", function () {

  //// Test data to run the test
  let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
  let instantiationAttempt = function () { new Command(); };

  //// TEST 1
  test("throws error if command type is NOT passed into constructor as the first parameter", function () {
    expect(instantiationAttempt).toThrow(new Error('Command type required.'));
  });

  //// TEST 2 - This test checks that the constructor in the Command class correctly sets the commandType property in the new object.
  test("constructor sets command type", function () {
    expect(modeCommand.commandType).toEqual("MODE_CHANGE");
  });

  //// TEST 3 - This test checks that the constructor correctly sets the value property in the new object.
  test("constructor sets a value passed in as the 2nd argument", function () {
    expect(modeCommand.value).toEqual("LOW_POWER");
  });

});