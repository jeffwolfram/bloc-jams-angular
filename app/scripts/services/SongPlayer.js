(function() {
    //injected fixture into Songplayer
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
         //using var below to store the album info
         var currentAlbum = Fixtures.getAlbum(); 
          
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
          var currentBuzzObject = null;
         
         
          //set a song
           /**
            * @function setSong
            * @desc Stops currently playing song and loads new audio file as currentBuzzObject
            * @param {Object} song
            */
          var setSong = function(song) {
              
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
        };
         
         //get index of the song
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };
         
         
         SongPlayer.currentSong = null;
         
         /**
            @desc playing current audio file (buzz object)
            @type {object}
         */
         var playSong = function(song) {
             currentBuzzObject.play(); 
             song.playing = true;
         };
         
           var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };
         
         
          //play 
        SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) { 
                setSong(song);
                playSong(song);
             
             } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                playSong(song);
                }
             } 
              
        };
          
          //pause 
          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
                currentBuzzObject.pause();
                song.playing = false;
          };
         
         //Go to previous song
         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
             //check to see if song is zero and if so set to one, if not play previous song
             if(currentSongIndex < 0){
                stopSong(song);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };
         //function to advance to next song with arrow on Player bar
         SongPlayer.next = function(){
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
             //check to see if song is last song and if so stop playing. 
             if(currentSongIndex > currentAlbum.songs.length -1){
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             } else{
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };
      
              
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();