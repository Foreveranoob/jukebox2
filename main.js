$(document).ready(function() {

  document.body.onkeyup = function(e){
      if(e.keyCode == 32 &&  e.target.nodeName != 'INPUT'  ){
        startPlaying()
      }
  }

  $('#play-button').on('click', e => {
    startPlaying();
  });

  $('#song-form').on('submit', e => {
      event.preventDefault();
      let newSong = $('#song-form input').val();
      let newSongName = $('#song-name input').val();
      songList.push($('#song-form input').val());
      nameList.push($('#song-name input').val());
      $('#song-form').trigger("reset");
      $('#song-name').trigger("reset");
      $('#song-queue').append(`<li class='foo-bar'>${newSongName}:<span class="hover-notes">${newSong}</span></li>`);
     });

     function applyRepeat(){
     $( ".glyphicon-repeat" ).on( "click", function( event ) {
         event.preventDefault();
          let currentTarget = $(event.target);
          currentTarget.closest('.song-row').appendTo('#song-queue');
          currentTarget.closest('.glyphs').remove();
          let playedSongName = $('#song-queue').find('#playedsong-name').text();
          let playedSongNotes = $('#song-queue').find('#playedsong-notes').text();
          console.log(songList);
          console.log(nameList);
          console.log("1 1 1 1 1 1 1 1");
          nameList.push(playedSongName);
          songList.push(playedSongNotes);console.log(songList);
          console.log(nameList);
          console.log("2 2 2 2 2 2 2 2");
          $('#song-queue').find('.song-row').addClass("foo-bar");
          $('#song-queue').find('.song-row').removeClass("song-row");
          $('#song-queue').find('#playedsong-notes').addClass("hover-notes");
          $('#song-queue').find('#playedsong-notes').removeAttr('id');
          $('#song-queue').find('#playedsong-name').removeAttr('id');
     });
   };

     function applyDelete(){
     $( ".glyphicon-trash" ).on( "click", function( event ) {
         event.preventDefault();
          let currentTarget = $(event.target);
          console.log(currentTarget);
          console.log(currentTarget.closest('.song-row'));
          currentTarget.closest('.song-row').remove();
     });
   };

function startPlaying(){
 $('#play-button').slideUp(1000);
 $('#currentSong').text(`Currently Playing:${nameList[0]}`)
 playSong(parseSong(songList[0]), 600, onComplete);
 $( "#song-queue li" ).first().remove();
}



function onComplete(){
    let playedSong = songList[0];
    let playedSongName = nameList[0];
    $( "#song-queue li" ).first().remove();
    $('#played-songs').append(`
      <li class="song-row"><span id="playedsong-name">${playedSongName}</span>:
      <span id="playedsong-notes">${playedSong}</span>
      <span class="glyphs"><a href'#' class='glyphicon glyphicon-trash'></a>
      <a href'#' class='glyphicon glyphicon-repeat'></a></span></li>`
    );
    songList.shift();
    nameList.shift();
    applyDelete();
    applyRepeat();
    if ($('#song-queue li').length == 0){
      $('#play-button').slideDown(1000);
      $('#currentSong').text(`Enter a song to play!`);
      playSong(parseSong(songList[0]), 600, onComplete);
      $('#currentSong').text(`Currently Playing:${nameList[0]}`);
    } else {
      playSong(parseSong(songList[0]), 600, onComplete);
      $('#currentSong').text(`Currently Playing:${nameList[0]}`);

    }
  };
});

//$(document).ready --END--
