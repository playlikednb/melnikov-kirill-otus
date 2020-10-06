const socket = io();

if (window.Notification && Notification.permission !== "denied") {
  Notification.requestPermission((status) => {
    socket.on("message", (data) => {
      const notification = new Notification("My Perfect Notification", {
        body: data,
        icon: "/images/icon.png",
      });
      setTimeout(notification.close(), 3000);
    });
  });
}

window.addEventListener("load", function () {
  const pushButton = document.querySelector(".js-push-button");
  pushButton.addEventListener("click", function () {
    pushButton.disabled = true;
    pushButton.textContent = "Receiving Notifications...";
    socket.emit("getNotifications");
  });

  socket.on("notificationsDone", (data) => {
    pushButton.disabled = true;
    pushButton.textContent = "Get Some Cool Notifications!";
  });

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/service-worker.js').then(function() {
      return navigator.serviceWorker.ready;
    })
    .then(function(registration) {
      console.log(registration); // service worker is ready and working...
    });
    
    // navigator.serviceWorker.addEventListener('message', function(event) {
    //   console.log(event.data.message); // Hello World !
    // });
  }
});
