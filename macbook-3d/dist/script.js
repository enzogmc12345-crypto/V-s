document.addEventListener('DOMContentLoaded', function () {
    (function effects() {
      const xDim = window.innerWidth;
      const yDim = window.innerHeight;
      var xPos;
      var yPos;
      var page = 1;

      // MONITOR DIMENSIONS
      let SceneTridiv = document.querySelector("#tridiv");
      SceneTridiv.style.width = xDim + 'px';
      SceneTridiv.style.height = yDim + 'px';

      // SCENES
      var scene1 = document.querySelector(".scene_1");

      // EDITION EFFECTS
      var effectStyle = document.head.appendChild(document.createElement("style"));

      // MOVE CURSOR
      document.addEventListener('mousemove', (o) => {
          // CURSOR DETAILS
          let cursorTridiv = document.querySelector("#tridiv");
          let cursor = document.querySelector(".cursor");
          let icon = document.querySelector(".cursor span");
          let afterCursor = "";
          let cartesianStyle = "";

          // CARTESIAN POINT
          xPos = o.pageX;
          yPos = o.pageY;
          let xScene = 351;
          let yScene = 15;

          // EFFECT SCENE
          // SCENE 1
          scene1.style.transform = `rotateX(${xScene - yPos / 80}deg) rotateY(${yScene + xPos / 80}deg)`;
          cartesianStyle = `.scene_1 {transform: rotateX(${xScene - yPos / 80}deg) rotateY(${yScene + xPos / 80}deg); -webkit-transform:rotateX(${xScene - yPos / 80}deg) rotateY(${yScene + xPos / 80}deg); -moz-transform:rotateX(${xScene - yPos / 80}deg) rotateY(${yScene + xPos / 80}deg); -ms-transform:rotateX(${xScene - yPos / 80}deg) rotateY(${yScene + xPos / 80}deg);}`;

          // EFFECT MOUSE CURSOR
          if (xPos - 50 <= xDim * 0.30 || yPos <= 80) {
              cursor.style.opacity = '0';
              cursorTridiv.style.cursor = "default";
          } else {
              if (xPos <= xDim * 1.30 / 2) {
                  icon.innerText = '<';
                  afterCursor = ".cursor::after {content: 'voltar';}";
              } else {
                  icon.innerText = '>';
                  afterCursor = ".cursor::after {content: 'próximo';}";
              }
              cursorTridiv.style.cursor = "pointer";
              cursor.style.opacity = '1';
              cursor.style.left = xPos + 10 + 'px';
              cursor.style.top = yPos + 10 + 'px';
          }

          // RESULT
          effectStyle.innerHTML = afterCursor + cartesianStyle;
      });
  }());
});