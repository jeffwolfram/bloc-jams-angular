(function() {
     function SongPlayer() {
          var SongPlayer = {};
         
          
          
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
         SongPlayer.currentSong = null;
         
         /**
            @desc playing current audio file (buzz object)
            @type {object}
         */
         var playSong = function(song) {
             currentBuzzObject.play(); 
             song.playing = true;
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
         
              
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();