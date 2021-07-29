const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');
const particlearray = [];
let hue=0;
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

window.addEventListener('resize',function (){
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight; 
})

const m = {
    x:undefined,
    y:undefined,
}

canvas1.addEventListener('click', function(e){
    m.x = e.x;
    m.y = e.y;
    for(let i = 0 ; i < 5 ; i ++){
    particlearray.push(new Particle());
    }
})
 
canvas1.addEventListener('mousemove', function(e){
    m.x = e.x;
    m.y = e.y;
    for(let i = 0 ; i < 2 ; i ++){
        particlearray.push(new Particle());
        }
})

/*function drawc(){
 ctx.fillStyle = 'red';
 ctx.beginPath();
 ctx.arc( this.x, this.y,50,0,Math.PI*2);
 ctx.fill();
}*/
class Particle{
    constructor(){
       this.x = m.x ;
       this.y = m.y ;
     //   this.x = Math.random() * canvas1.width;
    //     this.y = Math.random() * canvas1.height;
        this.size = Math.random() * 30 +1 ;
        this.speedX =Math.random() * 3 - 1.5;
        this.speedY =Math.random() * 3 - 1.5;
        this.color = ctx.fillStyle = 'hsl(' + hue + ', 100%,50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
         if(this.size > 0.2)this.size -=0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc( this.x, this.y,this.size,0,Math.PI*2);
        ctx.fill();
       }
}

/* function cotrl(){
    for(let i=0;i<20;i++){
        particlearray.push(new Particle);
    }
}
cotrl();*/

function handleP(){
    for(let i=0;i<particlearray.length;i++){
        particlearray[i].update(); 
        particlearray[i].draw();
        for(j=i; j < particlearray.length ; j++){
            const dx = particlearray[i].x - particlearray[j].x;
            const dy = particlearray[i].y - particlearray[j].y;
            const dst = Math.sqrt(dx*dx + dy*dy);
            if(dst < 100){
                ctx.beginPath();
                ctx.lineWidth = particlearray[i].size/10;
                ctx.strokeStyle = particlearray[i].color ;
                ctx.moveTo(particlearray[i].x,particlearray[i].y);
                ctx.lineTo(particlearray[j].x,particlearray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particlearray[i].size<= 0.3){
            particlearray.splice(i,1);
            i--;
        }
    }
}

function animate(){
   ctx.clearRect(0,0,canvas1.width,canvas1.height);
   //ctx.fillStyle='rgba(0, 0, 0,0.3)'; 
    requestAnimationFrame(animate);
    handleP();
    hue +=2 ;
}
animate();