
window.onload = (e) => { 

   // Registering Service Worker
if ('serviceWorker' in navigator) {
    //navigator.serviceWorker.register('sw.js');
   
   navigator.serviceWorker.register("sw.js").then(registration => {
      console.log("success!");
      if (registration.installing) {
           registration.installing.postMessage("Howdy from your installing page.");
      }
   }, err => {
      console.error("Installing the worker failed!", err);
   });
    
}

// Detects if device is on iOS 
const isIos = () => {
   const userAgent = window.navigator.userAgent.toLowerCase();
   console.log(userAgent);
   return /iphone|ipad|ipod/.test( userAgent );
 }
 // Detects if device is in standalone mode
 const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
 console.log(isInStandaloneMode);
 // Checks if should display install popup notification:
 if (isIos() && !isInStandaloneMode()) {
   //this.setState({ showInstallMessage: true });
   //alert('hurray');
   addToHomescreen();
   //console.log(showInstallMessage);
 }

} //window.onload