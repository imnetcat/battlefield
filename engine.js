$( () => {
  var player = new Player(5);
  for(n=0; n<player.infantryLQuantity; n++){
    $("body").append(player.infantry());
  }
  var enemy = new Enemy(5);
  for(n=0; n<enemy.infantryLQuantity; n++){
    $("body").append(enemy.infantry());
  }
  $("#turn").click( () => {
    II();
  });



  var zoomIntensity = 0.2;

var canvas = document.getElementById("map-zoom");
canvas.height = 900;
canvas.width = 1600;
var context = canvas.getContext("2d");
var width = 900;
var height = 300;
var img = new Image();
img.src = 'map-1-test.jpg';
var scale = 1;
var originx = 0;
var originy = 0;
var visibleWidth = width;
var visibleHeight = height;
var currentX = canvas.width/2;
var currentY = canvas.height/2;

img.onload = function() {
  _Drag();
}


function draw(){
  // Clear screen to white.
      context.fillStyle = "white";
      context.fillRect(originx,originy,1500/scale,1500/scale);
      // Draw the black square.
      context.drawImage(img, 0,0, 1800, 800, 0, 0, 1800, 800);
      // Clear screen to white.
}
// Draw loop at 60FPS.
setInterval(draw, 1000/60);

canvas.onmousewheel = function (event){
    event.preventDefault();
    // Get mouse offset.
    var mousex = event.clientX - canvas.offsetLeft;
    var mousey = event.clientY - canvas.offsetTop;
    // Normalize wheel to +1 or -1.
    var wheel = event.wheelDelta/120;

    // Compute zoom factor.
    var zoom = Math.exp(wheel*zoomIntensity);

    // Translate so the visible origin is at the context's origin.
    context.translate(originx, originy);

    // Compute the new visible origin. Originally the mouse is at a
    // distance mouse/scale from the corner, we want the point under
    // the mouse to remain in the same place after the zoom, but this
    // is at mouse/new_scale away from the corner. Therefore we need to
    // shift the origin (coordinates of the corner) to account for this.
    originx -= mousex/(scale*zoom) - mousex/scale;
    originy -= mousey/(scale*zoom) - mousey/scale;

    // Scale it (centered around the origin due to the trasnslate above).
    //console.log(zoom);
    context.scale(zoom, zoom);
    // Offset the visible origin to it's proper position.
    //console.log(originx);
    //console.log(originy);
    context.translate(-originx, -originy);

    // Update scale and others.
    scale *= zoom;
    visibleWidth = width / scale;
    visibleHeight = height / scale;
    console.log(scale);
  }

});

function _Drag() {
  _MouseEvents();

  setInterval(function() {
    _ResetCanvas();
    _DrawImage();
  }, 1000/30);
}
function _ResetCanvas() {
  context.fillStyle = '#fff';
  context.fillRect(0,0, canvas.width, canvas.height);
}
function _MouseEvents() {
  canvas.onmousedown = function(e) {

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;


    if (mouseX >= (currentX - star_img.width/2) &&
        mouseX <= (currentX + star_img.width/2) &&
        mouseY >= (currentY - star_img.height/2) &&
        mouseY <= (currentY + star_img.height/2)) {
      isDraggable = true;
      //currentX = mouseX;
      //currentY = mouseY;
    }
  };
  canvas.onmousemove = function(e) {

    if (isDraggable) {
      currentX = e.pageX - this.offsetLeft;
      currentY = e.pageY - this.offsetTop;
    }
  };
  canvas.onmouseup = function(e) {
    isDraggable = false;
  };
  canvas.onmouseout = function(e) {
    isDraggable = false;
  };
}
function _DrawImage() {
  context.drawImage(star_img, currentX-(star_img.width/2), currentY-(star_img.height/2));
}

function attack(attacked){
  var distance = attacked.find(".area").offset().left - $(".selected.infantryLight").find(".area").offset().left;
  if(Math.abs(distance) < $(".selected.infantryLight").find(".area").width()){
    var distance = attacked.find(".area").offset().top - $(".selected.infantryLight").find(".area").offset().top;
    if(Math.abs(distance) < $(".selected.infantryLight").find(".area").width()){
      for(n=0; n < $(".selected.infantryLight").length; n++){
        if($(".selected.infantryLight").length > 1){
          for(x=0; x < $(".infantryLight").length; x++){
            var hp_en = attacked.find(".hp div").width() - (damage.infantryL2infantryL * (  $(".infantryLight.selected:nth-child("+(x+1)+")").find(".hp div").width() / 50));
            var hp_pl = $(".infantryLight.selected:nth-child("+(x+1)+")").find(".hp div").width() - (damage.infantryL2infantryL / (2 * $(".selected.infantryLight").length)) * (  $(".infantryLight.selected:nth-child("+(x+1)+")").find(".hp div").width() / 50);
            $(".infantryLight.selected:nth-child("+(x+1)+")").find(".hp div").css({
              "width": hp_pl
            });
            if(hp_pl <= 0){$(".infantryLight.selected:nth-child("+(x+1)+")").remove()}
            attacked.find(".hp div").css({
              "width": hp_en
            });
            if(hp_en <= 0){attacked.remove()}
            console.log(hp_en);
          }
        }else{
          var hp_en = attacked.find(".hp div").width() - (damage.infantryL2infantryL * (  $(".infantryLight.selected").find(".hp div").width() / 50));
          var hp_pl = $(".selected.infantryLight").find(".hp div").width() - (damage.infantryL2infantryL / (2 * $(".selected.infantryLight").length)) * (  $(".selected.infantryLight").find(".hp div").width() / 50);
          $(".selected.infantryLight").find(".hp div").css({
            "width": hp_pl
          });
          if(hp_pl <= 0){$(".selected.infantryLight").remove()}
          attacked.find(".hp div").css({
            "width": hp_en
          });
          if(hp_en <= 0){attacked.remove()}
          console.log(hp_en);
        }
      }
    }
  }
}

function scale(){

}
function II(){
  console.log("II turn:)")
}
class Damage {
  constructor(){
    this.infantryL2infantryL = 10;
  }
}

class Player {

  constructor(infantryLQuantity) {
    this.infantryLQuantity = infantryLQuantity;
    this.maxW = $('body').width()-50;
    this.minW = 50;
    this.maxH = $('body').height()-50;
    this.minH = 50;
  }

  infantry(){
    return $("<div class='player infantryLight' style='left:" + Math.random() * (this.maxW - this.minW) + this.minW +"px; top: "+ Math.random() * (this.maxH - this.minH) + this.minH +"px'><div class='area'></div><div class='hp'><div></div></div></div>");
  }

}



class Enemy {

  constructor(infantryLQuantity) {
    this.infantryLQuantity = infantryLQuantity;
    this.maxW = $('body').width()-50;
    this.minW = 50;
    this.maxH = $('body').height()-50;
    this.minH = 50;
  }

  infantry(maxW, minW, maxH, minH){
    return $("<div class='enemy infantryLight' style='left:" + Math.random() * (this.maxW - this.minW) + this.minW +"px; top: "+ Math.random() * (this.maxH - this.minH) + this.minH +"px'><div class='area'></div><div class='hp'><div></div></div></div>");
  }

}
