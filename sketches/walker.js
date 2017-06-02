bl = false;

function setup() 
{
    
    createCanvas(400,400);
    background(51);
    strokeWeight(2);
    stroke(255);

    walker = new Walker();
    
}

function draw() 
{
    walker.display();
    walker.step();
}

var Walker = function()
{
    this.x = width/2;
    this.y = height/2;
    
    this.step = function() {
        var r = random(1);
        if(mouseX > this.x){this.x++;}
        else if(mouseX < this.x){this.x--;}
        if(mouseY > this.y){this.y++;}
        else if(mouseY < this.y){this.y--;}
    }
    
    this.display = function(){
        point(this.x, this.y);
    }
    this.montecarlo = function(){
        while (true) {
            var r1 = random(1);     // Pick a random value.
            var probability = r1;   //Assign a probability.
            var r2 = random(1);     //Pick a second random value.
            if (r2 < probability) { //Does it qualify? If so, we’re done!
                return r1;
            }
        }
    }
}




