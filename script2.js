let audioElement

let shuffle=false
let shufflebtn=document.getElementById('shuffle')
shufflebtn.addEventListener('click',()=>{
    if(shuffle){
        shuffle=false
        shufflebtn.src='icons/shuffle.png'
    }
    else{
        shuffle=true
        shufflebtn.src='icons/shuffleon.png'
    }
})

let powerbtn=document.getElementById('powerbtn')

let csongIndex=0;
let psongIndex=0;

let mainPlay=document.getElementById('mainPlay')

let rewind=document.getElementById('rewind')

let skip=document.getElementById('skip')

let myProgressBar=document.getElementById('myProgressBar')

let play0=document.getElementById('btn0')
let play1=document.getElementById('btn1')
let play2=document.getElementById('btn2')
let play3=document.getElementById('btn3')

let gif=document.getElementById('gif')

let songInfo1=document.getElementById('currentlyplaying')

let songs = [
    {songName: "Kissik - Dsp", filePath: "songs/Kissik.mp3", coverPath: "covers/KissikCover.jpg"},
    {songName: "Peelings - Dsp", filePath: "songs/Peelings.mp3", coverPath: "covers/peelingsCover.jpg"},
    {songName: "Fear Song - Anirudh", filePath: "songs/Fear.mp3", coverPath: "covers/DevaraCover1.jpeg"},
    {songName: "Chuttamalle - Anirudh", filePath: "songs/Chuttamalle.mp3", coverPath: "covers/devaraCover.jpg"},
]

function nextSong(songIndex){
    if(songIndex==4){
        songIndex=0
    }
    if(audioElement!=undefined){
        audioElement.pause()
        audioElement.remove
    }
    csongIndex=songIndex
    audioElement=new Audio(songs[songIndex].filePath)
    audioElement.play()
    mainPlay.src='icons/pause-button.png'
    gif.style.opacity=1;
    songInfo1.innerHTML=songs[songIndex].songName
    audioElement.addEventListener('timeupdate',()=>{
        progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
        myProgressBar.value=progress
        if(audioElement.currentTime==audioElement.duration){
            audioElement.remove()
            if(shuffle){
                const numbers = [0,1,2,3];
                const nsongIndex = numbers[Math.floor(Math.random() * numbers.length)];
                //console.log(randomElement); // e.g., 30
                psongIndex=csongIndex
                nextSong(nsongIndex)

            }
            else{
                psongIndex=csongIndex
                nextSong(songIndex+1)
            }
        }
    })
}

mainPlay.addEventListener('click',()=>{
    if(audioElement==undefined){
        nextSong(0)
    }
    else if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        mainPlay.src='icons/pause-button.png';
        gif.style.opacity=1;
        songInfo1.innerHTML=songs[csongIndex].songName
    }
    else{
        audioElement.pause();
        mainPlay.src='icons/play-button.png';
        gif.style.opacity=0;
        songInfo1.innerHTML=''
    } 
    audioElement.addEventListener('timeupdate',()=>{
        progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
        myProgressBar.value=progress 
    })
})


myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

powerbtn.addEventListener('click',()=>{
    audioElement.pause()
    audioElement.remove()
    mainPlay.src='icons/play-button.png'
    gif.style.opacity=0;
    songInfo1.innerHTML=''
})

play0.addEventListener('click',()=>{
    let songIndex=parseInt(play0.getAttribute('value'))
    psongIndex=csongIndex
    nextSong(songIndex)
})

play1.addEventListener('click',()=>{
    let songIndex=parseInt(play1.getAttribute('value'))
    psongIndex=csongIndex
    nextSong(songIndex)
})

play2.addEventListener('click',()=>{
    let songIndex=parseInt(play2.getAttribute('value'))
    psongIndex=csongIndex
    nextSong(songIndex)
})

play3.addEventListener('click',()=>{
    let songIndex=parseInt(play3.getAttribute('value'))
    psongIndex=csongIndex
    nextSong(songIndex)
})

skip.addEventListener('click',()=>{
    if(shuffle){
        const numbers = [0,1,2,3];
        const nsongIndex = numbers[Math.floor(Math.random() * numbers.length)];
        //console.log(randomElement); // e.g., 30
        psongIndex=csongIndex
        nextSong(nsongIndex)

    }
    else{
        psongIndex=csongIndex
        nextSong(csongIndex+1)
    }
})

rewind.addEventListener('click',()=>{
    let psongIndex2=psongIndex
    psongIndex-=1
    if(psongIndex<0){
        psongIndex=3
    }
    nextSong(psongIndex2)
})

