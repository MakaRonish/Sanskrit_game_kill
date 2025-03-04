Question_Answer = {
    'Sun': 'सूर्यः',
    'Moon': 'चन्द्रः',
    'Water': 'जलम्',
    'Fire': 'अग्निः',
    'Earth': 'पृथिवी',
    'Sky': 'आकाशः',
    'Tree': 'वृक्षः',
    'Book': 'पुस्तकम्',
    'Friend': 'मित्रम्',
    'Love': 'प्रेम',
}
EngWord = ['Sun', 'Moon', 'Water', 'Fire', 'Earth', 'Sky', 'Tree', 'Book', 'Friend', 'Love']
SansWord = ['सूर्यः', 'चन्द्रः', 'जलम्', 'अग्निः', 'पृथिवी', 'आकाशः', 'वृक्षः', 'पुस्तकम्', 'मित्रम्', 'प्रेम']
let randomQ = []

const elements = [
    document.getElementById('q1'),
    document.getElementById('q2'),
    document.getElementById('q3'),
    document.getElementById('q4'),
    document.getElementById('q5')
];

for (let i = 1; i < 6; i++) {
    let ran = Math.floor(Math.random() * 10)
    randomQ.push(ran)

}
console.log(randomQ)
for (let i = 0; i < 5; i++) {
    elements[i].innerHTML = `<p>What is the meaning of ${EngWord[randomQ[i]]} in sanskrit</p>
    `
}

let final = []


function randomQuestion() {
    for (let i = 0; i < 5; i++) {
        let options = []
        options.push(randomQ[i])
        while (options.length != 3) {
            let ran = Math.floor(Math.random() * 10)
            if (!options.includes(ran)) {
                options.push(ran)
            }

        }
        final.push(options)
    }
}
randomQuestion()
console.log(final)

let butradio = [[], [], [], [], []]

for (let i = 0; i < final.length; i++) {
    for (let j = 0; j < final[i].length; j++) {
        let radioBut;
        if (j === 0) {
            radioBut = `<input type="radio" id="q${i}_option${j}" name="q${i}_option${j}" value="${SansWord[final[i][j]]}">
    <label for="q${i}">${SansWord[final[i][j]]}</label><br>`
        } else {
            radioBut = `<input type="radio" id="q${i}" name="q${i}_option${j}" value="${SansWord[final[i][j]]}">
    <label for="q${i}_option${j}">${SansWord[final[i][j]]}</label><br>`
        }
        butradio[i].push(radioBut)

    }

}

console.log(butradio)


for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
        elements[i].innerHTML += `${butradio[i][j]}`
    }
}

console.log(elements[1].innerHTML)


document.getElementById("quizForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let answers = {};
    let allAnswered = true;

    for (let i = 1; i <= 5; i++) {
        let selectedOption = document.querySelector(`input[name="q${i}"]:checked`);

        if (selectedOption) {
            answers[`q${i}`] = selectedOption.value;
        } else {
            allAnswered = false;
        }
    }

    if (!allAnswered) {
        document.getElementById("result").innerText = "Please answer all questions.";
    } else {
        document.getElementById("result").innerText = "Your answers: " + JSON.stringify(answers);
        console.log(answers);
    }
});










