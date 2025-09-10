// Blockly Workspace Setup
var workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox')
});

// Run code
function runCode() {
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  try {
    eval(code);
    checkWin();
  } catch (e) {
    alert("Error: " + e.message);
  }
}
