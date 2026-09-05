// wwwroot/fullscreen.js

function enterFullScreen() {
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;

    const requestFullscreen = gameContainer.requestFullscreen 
        || gameContainer.mozRequestFullScreen 
        || gameContainer.webkitRequestFullscreen 
        || gameContainer.msRequestFullscreen;

    if (requestFullscreen) {
        requestFullscreen.call(gameContainer).catch(error => {
            console.error('Failed to enter fullscreen:', error);
        });
    }
}

function exitFullScreen() {
    // Check if fullscreen is currently active before attempting to exit
    if (!document.fullscreenElement && 
        !document.mozFullScreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {
        return;
    }

    const exitFullscreen = document.exitFullscreen 
        || document.mozCancelFullScreen 
        || document.webkitExitFullscreen 
        || document.msExitFullscreen;

    if (exitFullscreen) {
        exitFullscreen.call(document).catch(error => {
            console.error('Failed to exit fullscreen:', error);
        });
    }
}
