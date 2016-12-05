(function() {
    function LandingCrtl(){
        this.heroTitle = "Turn the Music Up!";
    }
    
    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCrtl);
})();