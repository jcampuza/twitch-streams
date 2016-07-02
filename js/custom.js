var channels = ["trick2g", "sodapoppin", "c9Sneaky", "voyboy", "supermetroidlol", "freecodecamp", "fate_twisted_na", "sdiana2na", "tsm_dyrus", "sirhcez", "swifty", "ipav999", "dekar173", "summit1g", "fitforgaming", "boxerpete"];

function getStream(channel) {
  var game, status, logo, name, desc, viewers, preview;
    $.getJSON("https://api.twitch.tv/kraken/streams/"+channel, function(data) {
      if (data.stream) {
        game = data.stream.game;
        viewers = data.stream.viewers + " viewers on";
        preview = data.stream.preview.medium;
        status = "online";
        desc = data.stream.channel.status;
      } else {
        game = "offline";
        status = "offline"
        viewers = "";
        preview = "http://s18.postimg.org/626nis1c9/rsz_1offlinetwitchbanner.png"
      } 
      $.getJSON("https://api.twitch.tv/kraken/channels/" + channel, function(data) {
        logo = data.logo; 
        name = data.display_name;
        desc = status === "online" ? desc : "offline";
        html = "<div class='col-md-4 col-sm-6 col-xs-12 stream-entry " + status + "'><a target='_blank' href='" + 
        data.url + "'><img class='img-responsive' style='width:100%' src='" +
        preview + "'>" + "</a><p class='truncate'><span>" + desc +  "</span><br>" +
        viewers + " <a target='_blank' href='" + data.url + "'>" + name + "</a>";
        if (status !== "offline") $(".streamers").prepend(html);
        if (status === "offline") $(".streamers").append(html);
      });
    }).fail(function() {
      alert("Channel: " + channel + " does not exist");
    })
}


function getStreams() {
  channels.forEach(function(channel) {
    getStream(channel);
  })
}

$("document").ready(function() {
  getStreams();
  
  $("button#all").click(function() {
    $(".online").css("display", "");
    $(".offline").css("display", "");
  });
  $("button#online").click(function() {
    $(".online").css("display", "");
    $(".offline").css("display", "none");
  });
  $("button#offline").click(function() {
    $(".online").css("display", "none");
    $(".offline").css("display", "");
  });
  $("#search").click(function() {
    var channel = $("input[type='text']").val();
    var contains = channels.filter(function(val) {return val === channel.toLowerCase()});
    console.log(contains)
    if (contains.length > 0) {
      return alert("Already displaying channel: " + channel);
    }
    getStream(channel);
    channels.push(channel);
  });
});