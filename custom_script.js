//navbar auto collapse
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});

//modal functionality
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

//fade in functionality
$(window).scroll(function() {
  var scrollTop = $(this).scrollTop();

  $('.soundtrackSection').css({
    opacity: function() {
      var elementHeight = $(this).height();
      return 0.75 * (1 - (elementHeight - scrollTop) / elementHeight);
    }
  });
});


// mp3 player functionality
const song = document.querySelector('#song'); // audio object

const songTitle = document.querySelector('.song-title'); // element where track title appears
const progressBar = document.querySelector('#progress-bar'); // element where progress bar appears
let pPause = document.querySelector('#play-pause'); // element where play and pause image appears

songIndex = 1;
songs = ['./assets/audio/Under_the_sea_lofi.mp3', './assets/audio/the_lucky_one.mp3', './assets/audio/GetOverIt.mp3', './assets/audio/SoulfulStrutFutureFunk.mp3', './assets/audio/M8sW8s808s.mp3', './assets/audio/scandalous.mp3', './assets/audio/JustKilledAnOldFriendButMakeItLofiHipHop.mp3', './assets/audio/finalproject.mp3', './assets/audio/CarFreestyle.mp3', './assets/audio/VIBE_CA$H.mp3', './assets/audio/yoshi.mp3', './assets/audio/Squoad.mp3', './assets/audio/its_you.mp3', './assets/audio/heat_lightning.mp3']
// songTitles = ["Final Project", "just_killed_an_old_friend_but_make_it_lofi_hip_hop", "M8s, W8s, 808s", "The Lucky One", "Soulful Strut // Future Funk", "Squad", "VIBE CA$H", "Yoshi", "Car Freestyle (Instrumental)", "Get Over It", "Heat Lightning (Instrumental)", "It's You", "Scandalous (with LoloPop13)"]; // object storing track titles
songTitles = ["Under the Sea (lofi cover)", "The Lucky One (prod. Nick Froelich)", "Get Over It", "Soulful Strut // Future Funk", "M8s, W8s, 808s (prod. Stu)", "Scandalous (with LoloPop13)", "just_killed_an_old_friend_but_make_it_lofi_hip_hop", "Final Project", "Car Freestyle (Instrumental)", "VIBE CA$H", "Yoshi", "Squad", "It's You", "Heat Lightning (Instrumental)"]
// function where pp (play-pause) element changes based on playing boolean value - if play button clicked, change pp.src to pause button and call song.play() and vice versa.
let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
        thumbnail = document.querySelector('#thumbnail');

        pPause.src = "./assets/icons/pauseWhite.png"

        song.play();
        playing = false;
    } else {
        pPause.src = "./assets/icons/playWhite.png"

        song.pause();
        playing = true;
    }
}

// automatically play the next song at the end of the audio object's duration
song.addEventListener('ended', function(){
    nextSong();
});

// function where songIndex is incremented, song/thumbnail image/background image/song artist/song title changes to next index value, and playPause() runs to play next track
function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// function where songIndex is decremented, song/thumbnail image/background image/song artist/song title changes to previous index value, and playPause() runs to play previous track
function previousSong() {
  if (song.currentTime > 2) {
    song.currentTime = 0;
    updateProgressValue();
  }
  else{
    songIndex--;
    if (songIndex < 0) {
        songIndex = (songs.length - 1);
    };
    song.src = songs[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
  }
}

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

// convert song.currentTime and song.duration into MM:SS format
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed when slider thumb is dragged without auto-playing audio
function changeProgressBar() {
    song.currentTime = progressBar.value;
};

// if specific song is selected from playlist above
function playSong(songNumber) {
    songIndex = songNumber;
    song.src = songs[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}
