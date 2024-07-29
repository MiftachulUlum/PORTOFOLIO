/*!
 * API for fah.li
 * https://fah.li
 *
 * @license Copyright 2024, Muhammad Fahli Saputra
 * Spotify trademark is property of Spotify Ltd.
 * @author: Muhammad Fahli Saputra, saputra@fahli.net
 */

let spotify_state = "up";
let spotify_retry = 0;
let websocket_url = "wss://api.fah.li";
// determine the websocket url
if (window.location.hostname === "localhost" || window.location.hostname === "fahli.test" || window.location.hostname === "fahlisaputra.test") {
  websocket_url = "ws://localhost:3000";
} else {
  websocket_url = "wss://api.fah.li";
}
let socket = null;
startWebsocket();
function spotifyChangeAnimation(data) {
  const reveals = document.querySelectorAll(".spotify-animation");

  for(const reveal of reveals) {
    reveal.classList.remove("spotify-animation-right");
    reveal.classList.add("spotify-animation-left");
    reveal.classList.remove("active");
  }

  setTimeout(() => {
    $("#spotify-play").attr('data-url', data.song.url);
    $("#spotify-song-title").html(data.song.title);
    $("#spotify-artist-name").html(data.song.artist);
    $("#spotify-album-photo").attr('src', data.song.cover);
  }, 900);

  setTimeout(() => {
    for(const reveal of reveals) {
      reveal.classList.add("spotify-animation-right");
      reveal.classList.remove("spotify-animation-left");
      reveal.classList.add("active");
    }
  }, 1000);
}
function startWebsocket() {
  let ws = new WebSocket(websocket_url);
  socket = ws;
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setTimeout(() => {
      try {
        if (data.type === 'spotify') {
          if (data.isPlaying) {
            spotifyChangeAnimation(data);
            if (spotify_state === "up") {
              spotify_state = "down";
              $("#spotify-container").slideDown();
            }
          } else {
            if (spotify_state === "down") {
              spotify_state = "up";
              $("#spotify-container").slideUp();
            }
          }
        } else if (data.type === 'reaction') {
          showReaction(data.reaction);
        }
      } catch (e) {
      }
    }, 500);
  };
  ws.onopen = (event) => {
    spotify_retry = 0;
  };
  ws.onclose = (event) => {
    if (spotify_retry > 5) {
      $("#spotify-container").slideUp();
      return;
    }
    setTimeout(() => {
      spotify_retry++;
      startWebsocket();
    }, 5000);
  };
}

$("#spotify-play").click(function (e) {
  window.open($(this).attr('data-url'));
});

function showReaction(reaction) {
  if (reaction === 'like') {
    reaction = '👍';
  } else if (reaction === 'love') {
    reaction = '❤️';
  } else if (reaction === 'rocket') {
    reaction = '🚀';
  } else if (reaction === 'fire') {
    reaction = '🔥';
  } else if (reaction === 'wow') {
    reaction = '🤯';
  }
  var b = Math.floor((Math.random() * 100) + 1);
  var d = ["flowOne", "flowTwo", "flowThree"];
  var a = ["colOne", "colTwo", "colThree", "colFour", "colFive", "colSix"];
  var c = (Math.random() * (1.6 - 1.2) + 1.2).toFixed(1);
  $('<div class="heart part-' + b + " " + a[Math.floor((Math.random() * 6))] + '" style="font-size:' + Math.floor(Math.random() * (50 - 22) + 22) + 'px;"><span>' + reaction + '</span></div>').appendTo(".hearts").css({
    animation: "" + d[Math.floor((Math.random() * 3))] + " " + c + "s linear"
  });
  $(".part-" + b).show();
  setTimeout(function() {
    $(".part-" + b).remove()
  }, c * 900)
}


document.addEventListener('livewire:navigated', () => {
  $(".like-button").on("click", function() {
    const icon = $(this).data("icon");
    showReaction(icon);
    if (socket) {
      socket.send('react:' + icon);
    }
  });
});

function logout() {
  // ajax csrf
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    url: '/auth/logout',
    type: 'POST',
    success: function(result) {
      // refresh livewire navigate
      Livewire.navigate(window.location.href);
    }
  });
}
