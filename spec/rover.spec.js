const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function () {

  //// TEST 7
  test("constructor sets position and default values for mode and generatorWatts", function () {
    //// Test data to run the test
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });


  // TEST 8
  test("response returned by receiveMessage contains the name of the message", function () {
    //// Test data to run the test
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual("Test message with two commands");
  });


  // TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    //// Test data to run the test
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    expect(response.results).toHaveLength(2);
  });


  // TEST 10 - For the STATUS_CHECK command, receiveMessage(message).results includes a roverStatus object describing the current state of the rover object — mode, generatorWatts, and position. The test should check each of these for accuracy.
  test("responds correctly to the status check command", function () {
    //// Test data to run the test
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    //// TEST 10.1 - Check 2nd element (message.commands[1]).commandType, STATUS_CHECK is and object or not
    expect(response.results[1].roverStatus).toBeInstanceOf(Object);
    //// TEST 10.2 - Check if the roverStatus object has describing the current state of the rover object.
    expect(response.results[1].roverStatus).toEqual({ mode: "LOW_POWER", generatorWatts: 110, position: 98382 });
  });


  // TEST 11
  test("responds correctly to the mode change command", function () {
    //// Test data to run the test
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    
    //// TEST 11.1 - The test should check the completed property.
    expect(response.results[0].completed).toEqual(true);
    //// TEST 11.2 - The test should check the rover mode for accuracy.
    expect(response.results[1].roverStatus.mode).toEqual("LOW_POWER");
  });
  

  // TEST 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    //// Test data to run the test
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12000), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    //// TEST 12.1 - The test should check the completed property.
    expect(response.results[1].completed).toEqual(false);
    //// TEST 12.2 - The test should confirm that the rover’s position did not change.
    
    expect(response.results[2].roverStatus.position).toEqual(98382);
    // expect(response.results[1].roverStatus.position).toEqual(12000);
  });
  

  // TEST 13 - A MOVE command will update the rover’s position with the position value in the command.
  test("responds with the position for the move command", function () {
    //// Test data to run the test
    let commands = [new Command('MOVE', 12000), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);

    // expect(response.results[1].roverStatus.mode).toEqual("LOW_POWER");
    expect(response.results[1].roverStatus.position).toEqual(12000);
  });

});
