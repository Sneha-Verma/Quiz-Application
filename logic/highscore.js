const highscorelist=document.querySelector('#highscorelist');
const highscore=JSON.parse(localStorage.getItem("highscore")) || [];

highscorelist.innerHTML=highscore.map(score=>{
    return `<li class="high-score"> ${score.name} -${score.score}</li>`;
    
}).join("");
//console.log(highscore);