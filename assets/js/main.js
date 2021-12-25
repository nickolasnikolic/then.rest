window.onload = () => {

// get reference to the stage
const soundStage = document.getElementById('soundStage');

soundStage.width = window.innerWidth;
soundStage.height = window.innerHeight;

const c = soundStage.getContext('2d');

// get center of the soundstage
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// create staff
class MusicStaff{
    constructor(context){
        this.context = context;
    }
    drawStaff(){
        // create circular interface
        this.context.strokeStyle = 'gray';
        this.context.lineWidth = 5;


        for(let staffLine = 1; staffLine < 6; staffLine++){
            this.context.beginPath();
            this.context.arc(centerX, centerY, (staffLine * 100), 0, (Math.PI * 2));
            this.context.stroke();
            this.context.closePath();
        }
    }
}

// create notes
class MusicalNote{
    constructor(pitch, startTime, duration){
        this.pitch = pitch;
        this.startTime = startTime;
        this.duration = duration;
    }
}

//create note display
class MusicalNoteDisplay{
    constructor(noteStartRadian, noteEndRadian, radius, centerX, centerY, noteThickness, context){
        this.noteStartRadian = noteStartRadian;
        this.noteEndRadian = noteEndRadian;
        this.radius = radius;
        this.centerX = centerX;
        this.centerY = centerY;
        this.noteThickness = noteThickness;
        this.context = context;
        this.colorHSL = 1;
        this.alpha = 1.0;
        this.rotate = 0.01;
    }

    display(){
        this.context.beginPath();
        this.context.strokeStyle = `hsla( ${this.colorHSL}, 100%, 50%, ${this.alpha} )`;
        c.lineCap = 'round';
        this.context.lineWidth = this.noteThickness;
        this.context.arc(this.centerX, this.centerY, this.radius, this.noteStartRadian += this.rotate, this.noteEndRadian += this.rotate);
        this.context.stroke();
        this.context.closePath();
    }
}



// upon click, set the note location and time of click, and length of time of click
let queNotes = [];
let displayNotes = [];
let clickTime;
window.addEventListener('mousedown', (e_down) => {
    //get time of click
    clickTime = new Date().getTime();
    
});

//get location of click and seive it into note slots
// firstly, we already have center of circles
// secondly, devide by the staff lines the larger distance click x or y from center x or y
//wait for mouseup
window.addEventListener('mouseup', (e_up) => {
    const distanceFromCenterX = centerX - e_up.clientX;
    const distanceFromCenterY = centerY - e_up.clientY;
    
    const maxDistance = Math.abs(Math.max(distanceFromCenterX,distanceFromCenterY));
    
    //pitch is one of 12 tones within the scale, this is arbitrary
    let pitch = 0;
    
    if(maxDistance <= 10) pitch = 40;
    if(maxDistance > 10 && maxDistance <= 20) pitch = 50;
    if(maxDistance > 20 && maxDistance <= 30) pitch = 60;
    if(maxDistance > 30 && maxDistance <= 40) pitch = 70;
    if(maxDistance > 40 && maxDistance <= 50) pitch = 80;
    if(maxDistance > 50 && maxDistance <= 60) pitch = 90;
    if(maxDistance > 60 && maxDistance <= 70) pitch = 100;
    if(maxDistance > 70) pitch = 110;
    
    let duration = Math.abs(clickTime - (new Date().getTime()));
    
    queNotes.push(new MusicalNote(pitch, clickTime, duration));
    displayNotes.push(new MusicalNoteDisplay(
        0, 
        (Math.PI / 180) * duration / 10, 
        maxDistance, 
        centerX, 
        centerY, 
        75, 
        c
        ));
    
    const aContext = new AudioContext();
    var o = aContext.createOscillator();
    var g = aContext.createGain();

    o.type = 'sine';
    o.frequency.setValueAtTime(pitch, aContext.currentTime);
    g.gain.value = 0.3;

    g.connect(aContext.destination);

    o.start();
    
    setTimeout(()=>{
        o.stop();
    },500);

});

// turn the interface
// upon return to level position, play the note for the duration remebered
let rotate = 1;
const radian = Math.PI / 180;
function animate(){
    c.clearRect(0,0, window.innerWidth, window.innerHeight);
    new MusicStaff(c).drawStaff();
    displayNotes.forEach((element, index, wholeArray) => {
        element.display();
        element.colorHSL+= 0.01;
        element.alpha -= 0.001;
        if(element.alpha < 0){
            delete element;
        }
    });
    requestAnimationFrame(animate);
}
animate();
};