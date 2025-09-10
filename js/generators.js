// Blockly Code Generators
Blockly.JavaScript['move_forward'] = function() {
  return 'moveForward();\n';
};
Blockly.JavaScript['turn_left'] = function() {
  return 'turnLeft();\n';
};
Blockly.JavaScript['turn_right'] = function() {
  return 'turnRight();\n';
};
Blockly.JavaScript['repeat'] = function(block) {
  var times = block.getFieldValue('times');
  var branch = Blockly.JavaScript.statementToCode(block, 'do');
  return 'for (let i = 0; i < ' + times + '; i++) {\n' + branch + '}\n';
};
