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

}

// turn the interface
// upon click, set the note location and time of click, and length of time of click
// upon return to level position, play the note for the duration remebered

};