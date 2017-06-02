var leftBuffer;
var rightBuffer;

function setup() {
    // 800 x 400 (double width to make room for each "sub-canvas")
    atomCanvas = createCanvas(1160, 500);
    atomCanvas.parent( document.getElementById('can') );    // Create both of your off-screen graphics buffers
    leftBuffer = createGraphics(1160, 500);
    rightBuffer = createGraphics(1160, 500);

    /*   ATOM Clock   */
    a = 30;
    b = 100;
    maxLength = 250;
    normalStroke = 2;
    inc1 = 25      //starting pos
    inc2 = 120      //starting pos
    inc3 = 205      //starting pos
    /*================================================*/

    /*   Circle   */
    theta2 = 1;
    /*================================================*/

}

function draw() {
    background(51);
    stroke(255);
    strokeWeight(2);
    noFill();

    // Draw on your buffers however you like
    drawLeftBuffer();
    drawRightBuffer();
    // Paint the off-screen buffers onto the main canvas
    image(leftBuffer, 0, 0);
    image(rightBuffer, 1160, 0);
}

function drawLeftBuffer() {
    push();
    translate(1160/4, 250);
    push();
    DrawFullThing();
    pop();
    Clock();
    pop();
}

function drawRightBuffer() {
    push();
    translate(1160/4 *3, 250);
    rotate( radians(theta2++) );
    Circular(2);
    pop();
}

function Circular(gen){
    ellipse(0, 0, 150, 150);
    ellipse(0, 0, 300, 300);

    ellipse(75, 0, 150, 150);
    ellipse(0, 75, 150, 150);
    ellipse(0, -75, 150, 150);
    ellipse(-75, 0, 150, 150);


    ellipse(cos(radians(45 ))*75, sin(radians( 45))*75, 150, 150);
    ellipse(cos(radians(135))*75, sin(radians(135))*75, 150, 150);
    ellipse(cos(radians(225))*75, sin(radians(225))*75, 150, 150);
    ellipse(cos(radians(315))*75, sin(radians(315))*75, 150, 150);

    if(gen > 2) return;

    push();
    translate(75, 0);
    Circular(gen+1);
    pop();
    push();
    translate(0, 75);
    Circular(gen+1);
    pop();
    push();
    translate(-75, 0);
    Circular(gen+1);
    pop();
    push();
    translate(0, -75);
    Circular(gen+1);
    pop();

    push();
    translate(cos(radians(45))*75, sin(radians(45))*75);
    Circular(gen+1);
    pop();
    push();
    translate(cos(radians(135))*75, sin(radians(135))*75);
    Circular(gen+1);
    pop();
    push();
    translate(cos(radians(225))*75, sin(radians(225))*75);
    Circular(gen+1);
    pop();
    push();
    translate(cos(radians(315))*75, sin(radians(315))*75);
    Circular(gen+1);
    pop();

}

function Clock(){
    seconds  = radians((360/60)*second() - 90);
    secondsX = cos(seconds)*100;
    secondsY = sin(seconds)*100;
    line(0, 0, secondsX, secondsY);

    minutes  = radians((360/60)*minute() -90 + seconds );
    minutesX = cos(minutes)*70;
    minutesY = sin(minutes)*70;
    line(0, 0, minutesX, minutesY);

    hours  = radians((360/12)*hour() -90 + minutes);
    hoursX = cos(hours)*50;
    hoursY = sin(hours)*50;
    line(0, 0, hoursX, hoursY);

    DrawClockFrame();
}
function DrawClockFrame(){
    var radius = 150
    noFill();
    ellipse(0, 0, 300, 300);
    for(var i = 1; i <= 12; i++){
        rotate( radians(30) );
        line(0, 150, 0, i%3 == 0 ? 130:140 );
    }
}
function DrawFullThing(){
    ellipse(0, 0, 20, 20);
    fill(255);

    rotate( radians(90) );
    inc1 = DrawAtom(inc1);
    rotate( radians(120) );
    inc2 = DrawAtom(inc2);
    rotate( radians(300) );
    inc3 = DrawAtom(inc3);
}
function DrawAtom(increment){
    var curStrokeW = 0;
    var strokeIncrement = 0.02;

    for(theta = increment; theta < maxLength+increment; theta++){
        strokeWeight(curStrokeW);
        radius = EllipseRadius(a, b, radians(theta));
        xPos = Math.cos((theta/180)*Math.PI)*radius;
        yPos = Math.sin((theta/180)*Math.PI)*radius;
        point(xPos, yPos);
        curStrokeW += strokeIncrement;
    }
    increment += 10;        //speed
    increment %= 360;
    return increment;
}
function EllipseRadius(a, b, theta_radians){
    //with "horizontal" semi-axis a and "vertical" semi-axis b is
    r = (a*b)/sqrt( sq(a, 2) * sq(sin(theta_radians), 2) + sq(b, 2) * sq(cos(theta_radians), 2) );
    return r;
}
