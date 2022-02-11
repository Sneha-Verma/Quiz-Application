const form=document.querySelector("#formbtn");
const username=document.querySelector('#username')
const savescorebtn=document.querySelector('#savescorebtn')
const finalscore=document.querySelector('#finalscore');
const mostRecentScore=localStorage.getItem('mostRecentScore')
const highscore=JSON.parse(localStorage.getItem("highscore")) || [];

finalscore.innerHTML=mostRecentScore

username.addEventListener("keyup",()=>{
    savescorebtn.disabled=!username.value
})
form.addEventListener("submit",e=>{
    e.preventDefault();

    const score={
        score:mostRecentScore,
        name:username.value
    };
    highscore.push(score);
    highscore.sort((a,b)=>{
        return b.score-a.score;
    })
    highscore.splice(5);

    localStorage.setItem("highscore",JSON.stringify(highscore));
    window.location.assign("/");
})