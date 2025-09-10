// --- Game Variables ---
const codeInput = document.getElementById("code-input");
const runBtn = document.getElementById("run-btn");
const output = document.getElementById("output");
const taskText = document.getElementById("task-text");
const robot = document.getElementById("robot");
const pointsDisplay = document.getElementById("points");

let level = 0;
let totalPoints = 0;

// --- Levels Data ---
const levels = [
    { lang:"JS", task:'Print your name "Omkar"', answer:"Omkar", points:10 },
    { lang:"JS", task:"Add 2 + 3", answer:5, points:15 },
    { lang:"Python", task:'Print 10 * 2', answer:20, points:20 },
    { lang:"HTML", task:"Change background to #ffcc00", answer:"#ffcc00", points:25 },
    { lang:"CSS", task:"Make text red", answer:"red", points:20 }
];

// --- Update UI for Current Level ---
function updateLevelUI() {
    if(level >= levels.length){
        taskText.innerText = "🎉 You completed all levels!";
        codeInput.disabled = true;
        runBtn.disabled = true;
        return;
    }
    const current = levels[level];
    taskText.innerText = `Level ${level+1} (${current.lang}): ${current.task}`;
    codeInput.value = "";
    output.innerText = "";
}

// --- Animate Robot ---
function animateRobot() {
    const movePercent = 50 + (level * 15);
    robot.style.left = `${movePercent}%`;
}

// --- Validate Code ---
function validateCode(code) {
    const current = levels[level];
    let correct = false;
    try {
        let result;

        if(current.lang === "JS"){
            result = eval(code);
            if(result === current.answer) correct = true;
        }
        else if(current.lang === "Python"){
            // Simulated Python: only basic arithmetic or print
            if(code.includes("*") || code.includes("+") || code.includes("-") || code.includes("/")){
                result = eval(code.replace("print",""));
                if(result === current.answer) correct = true;
            }
        }
        else if(current.lang === "HTML"){
            // Expect user writes code like: document.body.style.background = "#ffcc00";
            const bgMatch = code.match(/#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/);
            if(bgMatch && bgMatch[0] === current.answer){
                document.body.style.background = current.answer;
                correct = true;
            }
        }
        else if(current.lang === "CSS"){
            // Simulate changing color
            if(code.includes(current.answer)){
                correct = true;
                document.getElementById("task-text").style.color = current.answer;
            }
        }

        return { correct, result };
    } catch(err) {
        return { correct:false, error: err.message };
    }
}

// --- Run Button Event ---
runBtn.addEventListener("click", ()=>{
    const code = codeInput.value;
    const validation = validateCode(code);
    if(validation.correct){
        output.innerText = `✅ Correct! You earned ${levels[level].points} points.`;
        totalPoints += levels[level].points;
        pointsDisplay.innerText = `Points: ${totalPoints}`;
        animateRobot();
        level++;
        setTimeout(updateLevelUI, 1000);
    } else {
        output.innerText = validation.error ? `❌ Error: ${validation.error}` : "❌ Try Again!";
    }
});

// --- Initialize ---
updateLevelUI();
pointsDisplay.innerText = `Points: ${totalPoints}`;
