
var damage = new Damage();
setInterval( () => { $(".selected").fadeTo(250, 0.5).fadeTo(500, 1.0) }, 1000);

$( () => {
  $("body").dblclick(function(ev) {
    $(".selected").css({
      left: ev.pageX,
      top: ev.pageY
    });
    $(".selected").off("click.remove");
    $(".selected").removeClass("selected");
  });
  $(".player").click(function() {
    $(this).addClass("selected");
    $(".selected").on('click.remove', function() {
      $(this).off("click.remove");
      $(this).removeClass("selected");
    });
  });
  $(".enemy").click(function() {
    if($(".player.selected").length){
      attack($(this));
    }
  });
});
