(function () {
  var currentPlayer = "player1";
  var alert = $("#alert");
  var background = $(".background");
  var playingCoin = $("#playingCoin");

  $(".column").on("click", function (e) {
    if (e.target === background) {
      return;
    } else {
      var col = $(e.currentTarget);
      var slotsInCol = col.children();
      for (var i = slotsInCol.length - 1; i >= 0; i--) {
        if (
          !slotsInCol.eq(i).hasClass("player1") &&
          !slotsInCol.eq(i).hasClass("player2")
        ) {
          slotsInCol.eq(i).addClass(currentPlayer);
          playingCoin.addClass("fall");
          break;
        }
      }
      console.log("i", i);
      if (i === -1) {
        return;
      }
      if (checkForVictory(slotsInCol)) {
        console.log("the winner player is: ", currentPlayer);
        alert.show();
        alert.addClass("victory");
        alert.html("the winner player is: " + currentPlayer);
        background.css("visibility", "visible");
        setTimeout(function () {
          alert.toggleClass("victory");
        }, 2000);
      } else {
        console.log("no winner");
      }
      var slotsInRow = $(".row" + i);
      if (checkForVictory(slotsInRow)) {
        console.log("the winner player is: ", currentPlayer);
        alert.html("the winner player is: " + currentPlayer);
        alert.show();
        alert.addClass("victory");
        background.css("visibility", "visible");
        setTimeout(function () {
          alert.toggleClass("victory");
        }, 2000);
      }

      var diagonal = [];
      var diagonal2 = [];
      var diagonal3 = [];
      var diagonal4 = [];
      var diagonal5 = [];
      var diagonal6 = [];
      var diagonal7 = [];
      var diagonal8 = [];
      var diagonal9 = [];
      var diagonal10 = [];
      var diagonal11 = [];
      var diagonal12 = [];

      for (var x = 0; x < slotsInRow.length; x++) {
        for (var y = 0; y < slotsInCol.length; y++) {
          if (x + y == 5) {
            diagonal.push(getSlotByCoord(x, y));
          } else if (x + y == 6) {
            diagonal2.push(getSlotByCoord(x, y));
          } else if (x + y == 7) {
            diagonal3.push(getSlotByCoord(x, y));
          } else if (x + y == 8) {
            diagonal4.push(getSlotByCoord(x, y));
          } else if (x + y == 4) {
            diagonal5.push(getSlotByCoord(x, y));
          } else if (x + y == 3) {
            diagonal6.push(getSlotByCoord(x, y));
          }
          if (x - y == 3) {
            diagonal7.push(getSlotByCoord(x, y));
          } else if (x - y == 2) {
            diagonal8.push(getSlotByCoord(x, y));
          } else if (x - y == 1) {
            diagonal9.push(getSlotByCoord(x, y));
          } else if (x - y == 0) {
            diagonal10.push(getSlotByCoord(x, y));
          } else if (x - y == -1) {
            diagonal11.push(getSlotByCoord(x, y));
          } else if (x - y == -2) {
            diagonal12.push(getSlotByCoord(x, y));
          }
        }
      }
      var bigArray = [
        diagonal,
        diagonal2,
        diagonal3,
        diagonal4,
        diagonal5,
        diagonal6,
        diagonal7,
        diagonal8,
        diagonal9,
        diagonal10,
        diagonal11,
        diagonal12,
      ];

      function checkForDiagVictory() {
        for (var z = 0; z < bigArray.length; z++) {
          var counter = 0;
          for (var q = 0; q < bigArray[z].length; q++) {
            if (bigArray[z][q].hasClass(currentPlayer)) {
              counter++;
              console.log("counter", counter);
            } else {
              counter = 0;
            }
            if (counter == 4) {
              console.log("the diag winner player is: ", currentPlayer);
              alert.html("the winner player is: " + currentPlayer);
              bigArray[z][q].addClass("big");
              bigArray[z][q - 1].addClass("big");
              bigArray[z][q - 2].addClass("big");
              bigArray[z][q - 3].addClass("big");
              alert.show();
              alert.addClass("victory");
              background.css("visibility", "visible");
            }
          }
        }
      }
      checkForDiagVictory();

      switchPlayer();

      $(window).on("mousemove", function (e) {
        var mousePosX = e.clientX;
        playingCoin.css("left", mousePosX);
      });
    }
  });

  function checkForVictory(slots) {
    var count = 0;
    for (var i = 0; i < slots.length; i++) {
      if (slots.eq(i).hasClass(currentPlayer)) {
        count++;
      } else {
        count = 0;
      }
      if (count == 4) {
        slots.eq(i).addClass("big");
        slots.eq(i - 1).addClass("big");
        slots.eq(i - 2).addClass("big");
        slots.eq(i - 3).addClass("big");

        return count == 4;
      }
    }
  }

  function switchPlayer() {
    if (currentPlayer === "player1") {
      currentPlayer = "player2";
      playingCoin.css("background-color", "yellow");
    } else {
      currentPlayer = "player1";
      playingCoin.css("background-color", "red");
    }
  }

  $("#clear").on("click", function () {
    function clear() {
      background.css("visibility", "hidden");
      alert.hide();
      $("#board").toggleClass("again");
      setTimeout(function () {
        $("#board").toggleClass("again");
      }, 3000);
      setTimeout(function () {
        var divs = $("div");
        for (var i = 0; i < divs.length; i++) {
          divs.eq(i).removeClass("player1 player2 big");
        }
      }, 500);
    }
    clear();
  });

  function getSlotByCoord(col, row) {
    return $(".column").eq(col).children().eq(row);
  }
})();
