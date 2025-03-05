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
            radioBut = `<div id='q${i}_option${j}'><input type="radio" id="q${i}_option${j}" name="q${i}" value="c">
    <label for="q${i}">${SansWord[final[i][j]]}</label></div>`
        } else {
            radioBut = `<div id='q${i}_option${j}'><input type="radio" id="q${i}_option${j}" name="q${i}" value="w">
    <label for="q${i}_option${j}">${SansWord[final[i][j]]}</label></div>`
        }
        butradio[i].push(radioBut)

    }

}




for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
        elements[i].innerHTML += `${butradio[i][j]}`
    }
}


let Ans = []
let eleid = []
let Score = 0
let ele = []
const form = document.getElementById('quizForm');
form.addEventListener("submit", (target) => {
    target.preventDefault();
    Ans = []
    eleid = []
    Score = 0
    ele = []
    const InputTag = document.getElementsByTagName('input');
    for (let i = 0; i < InputTag.length; i++) {
        if (InputTag[i].checked) {
            Ans.push(InputTag[i].value)
            eleid.push(InputTag[i].id)
        }
    }
    Ans.forEach((e) => {

        if (e === 'c') {
            Score += 1
        }
    })

    console.log(Ans)
    console.log(Score)
    console.log(eleid)
    for (let i = 0; i < eleid.length; i++) {
        ele.push(document.getElementById(eleid[i]))
    }
    console.log(ele)

    for (let i = 0; i < Ans.length; i++) {
        if (Ans[i] === 'c') {
            ele[i].style.backgroundColor = 'green'

        } else {
            ele[i].style.backgroundColor = 'red'

        }
    }




})













