window.onload = () => {

// get reference to the stage
const soundStage = document.getElementById('soundStage');

soundStage.width = window.innerWidth;
soundStage.height = window.innerHeight;

const c = soundStage.getContext('2d');

// create circular interface
c.strokeStyle = 'gray';
c.lineWidth = 5;
// get center of the soundstage
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

for(let staffLine = 1; staffLine < 6; staffLine++){
    c.beginPath();
    c.arc(centerX, centerY, (staffLine * 80), 0, (Math.PI * 2));
    c.stroke();
    c.closePath();
}

// create notes
class MusicalNote{
    constructor(pitch, startTime, duration){
        this.pitch = pitch;
        this.startTime = startTime;
        this.duration = duration;
    }
}

// turn the interface

// upon click, set the note location and time of click, and length of time of click
let queNotes = [];
window.addEventListener('mousedown', (e_down) => {
    //get time of click
    let startTime = new Date().getTime();

    //get location of click and seive it into note slots
    // firstly, we already have center of circles
    // secondly, devide by the staff lines the larger distance click x or y from center x or y
    //wait for mouseup
    window.addEventListener('mouseup', (e_up) => {
        const distanceFromCenterX = centerX - e_down.clientX;
        const distanceFromCenterY = centerY - e_down.clientY;

        const maxDistance = Math.max(distanceFromCenterX,distanceFromCenterY);

        //pitch is one of 12 tones within the scale, this is arbitrary
        const pitch = maxDistance / 12;

        let duration = Math.abs(startTime - (new Date().getTime()));
        queNotes.push(new MusicalNote(pitch, startTime, duration)); //todo pitch is placeholder
        console.log(queNotes);
    });
});

// upon return to level position, play the note for the duration remebered

};