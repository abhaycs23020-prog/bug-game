// Define Custom Blocks
Blockly.defineBlocksWithJsonArray([
  {
    "type": "move_forward",
    "message0": "move forward",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160
  },
  {
    "type": "turn_left",
    "message0": "turn left",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210
  },
  {
    "type": "turn_right",
    "message0": "turn right",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210
  },
  {
    "type": "repeat",
    "message0": "repeat %1 times %2 %3",
    "args0": [
      {"type": "field_number", "name": "times", "value": 2, "min": 1},
      {"type": "input_dummy"},
      {"type": "input_statement", "name": "do"}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120
  }
]);
