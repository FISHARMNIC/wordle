var wordLength = 5
var wordTries = 6

var boxSize = 70
var separation = 3

var currentLetter = 0

var enteredWord = []
var boundary = 1

var default_fill_rgb = "rgb(251,252,255)"
var default_stroke_rgb = "rgb(222,225,223)"

var right_spot_rgb = "rgb(121,184,81)"
var wrong_spot_rgb = "rgb(243,194,56)"
var not_used_rgb = "rgb(165,175,196)"

//----------------------------------------------------------------
var letter_5_words = [
    "HOUSE",
    "MOUSE",
    "THEIR",
    "WHICH",
    "FLIES",
    "WINGS",
    "FILES",
    "HELLO",
    "WORLD",
    "SMILE",
    "FLEAS",
    "EMPTY",
    "FIXED",
    "FRUIT",
    "HEAVY",
    "HENCE",
]
var wordle_word = letter_5_words[Math.round(Math.random() * (letter_5_words.length-1))]
//----------------------------------------------------------------


;(function prepare() {
    var gCount = 0
    document.write(`<div style="width: ${wordLength * boxSize}px;height: ${wordTries * boxSize}px; margin:0 auto">`)
    for (i = 0; i < wordTries; i++) {
        for(n = 0; n  < wordLength; n++) {
            document.write(`
                <div style="width: ${boxSize}px; height: ${boxSize}px; float: left;">
                    <svg>
                    <rect id="rectID${gCount}" class="box" x="${separation}" y="${separation}" width="${boxSize - (separation * 2)}" height="${boxSize - (separation * 2)}" rx="5"/>
                    <text id="textID${gCount++}" x="${boxSize/2 - (10 + separation)}" y="${boxSize/2 + (10 + separation)}" fill="rgb(57,62,77)" font-family="Arial, Helvetica, sans-serif" font-size="${boxSize/2}"></text>
                    </svg>    
                </div>
            `)
        //gCount++
        }
    }
    document.write(`</div>`)
})()

function keyEntered(letter) {
    console.log("ok")
    document.getElementById("textID" + currentLetter++).innerHTML = letter
    enteredWord.push(letter)
}

function wordEntered() {
    console.log(enteredWord.join(""))
    var base = boundary - 1
    enteredWord.forEach((letter,index) => {
        if(wordle_word[index] == letter) {
            document.getElementById("rectID" + (base + index)).style.fill = right_spot_rgb
        } else if(wordle_word.includes(letter)) {
            document.getElementById("rectID" + (base + index)).style.fill = wrong_spot_rgb
        } else {
         document.getElementById("rectID" + (base + index)).style.fill = not_used_rgb
        }
    })
    if(enteredWord.join("") == wordle_word) {
        alert("You win!")
        location.reload()
    }
}

window.onkeydown = function(e) {
    var key = e.key.toUpperCase()
    if(key.length == 1) {
        if(enteredWord.length < wordLength) {
        keyEntered(key)
        }
    } else if (key == "ENTER") {
        if(enteredWord.length == wordLength) {
            wordEntered()
            enteredWord = []
            boundary += wordLength
            //currentLetter
        } 
        //else {
        //     window.alert("Not long enough!")
        // }
    } else if (key == "BACKSPACE") {
        if(currentLetter < boundary) {currentLetter = boundary}
        document.getElementById("textID" + --currentLetter).innerHTML = ""
        enteredWord.pop()
    }
    console.log(enteredWord)
}