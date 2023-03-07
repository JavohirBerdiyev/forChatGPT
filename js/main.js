let teacher = [];
let score = [];

fetch("http://164.92.193.48:7060/api/team")
  .then((response) => response.json())
  .then((data) => {
    // Iterate over the data and create the HTML for each slide
    teacher = data.body;
    const slides = teacher.map((item) => {
      return `
        <div class="slide">
          <div class="team-one" onclick="teacherModalOpen(${item.id})">
          <div class="team-item">
            <div class="image-blog">
              <img class="image" src="https://api.msodiqschool.uz/uploads/${item.link}.jpg"
                alt="jamo" width="350" height="500" />
            </div>
          </div>
        </div>
        </div>
      `;
    });

    // Append the slides to the slick container
    const slickContainer = document.querySelector("#teachers");
    slickContainer.innerHTML = slides.join("");

    // Initialize Slick JS
    $(document).ready(function () {
      $(".autoplay").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 800,
            settings: {
              dots: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    });
  })
  .catch((error) => console.error(error));

fetch("http://164.92.193.48:7060/api/news")
  .then((response) => response.json())
  .then((json) => {
    score = json.body.filter((item) => {
      return item.types == "tsc";
    });


    const slides = score.map((item) => {
      return `
          <div class="score-item">
          <div class="score-image-box">
          <img class="score-image"
            src="	https://api.msodiqschool.uz/uploads/${item.link}.jpg" alt="#">
        </div>
        <h4 class="score-title">${item.heading}</h4>
        <p class="score-text">${item.about}</p>
        <a class="score-link" href="#">Learn more</a>
        </div>
      `;
    });

    // Append the slides to the slick container
    const slickContainer = document.querySelector("#score");
    slickContainer.innerHTML = slides.join("");

    // Initialize Slick JS
    $(document).ready(function () {
      $('#score').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        adaptiveHeight: true,
        slidesToScroll: 1,
        cssEase: 'linear',
        responsive: [
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
    });

  });


  fetch("http://164.92.193.48:7060/api/about")
  .then((response) => response.json())
  .then((json) => {
    console.log(json.body);



    // const slides = score.map((item) => {
    //   return `
    //       <div class="score-item">
    //       <div class="score-image-box">
    //       <img class="score-image"
    //         src="	https://api.msodiqschool.uz/uploads/${item.link}.jpg" alt="#">
    //     </div>
    //     <h4 class="score-title">${item.heading}</h4>
    //     <p class="score-text">${item.about}</p>
    //     <a class="score-link" href="#">Learn more</a>
    //     </div>
    //   `;
    // });

    // Append the slides to the slick container
    document.querySelector("#aboutText").innerHTML = `
      <h3 class="about-title">
        ${json.body[0].title}
      </h3>
      <p class="about-text">
        ${json.body[0].body}
      </p>
    `;
    document.querySelector("#youtube-modal").innerHTML = `
        <iframe id="youtube-player" width="560" height="315" src="${json.body[0].link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; encrypted-media" allowfullscreen></iframe>
    `;
    // slickContainer.innerHTML = slides.join("");

  });




// Get the modal
var teachers = document.getElementById("teachers");
var scores = document.getElementById("score");
var new1 = document.getElementById("new");
var teach = document.getElementsByClassName("slteach");
var scoreList = document.getElementsByClassName("slscore");
var teacherModal = document.getElementById("teachermodal");

function teacherModalOpen(id) {
  let items = teacher.filter((item) => item.id == id);
  let content = document.createElement("div");
  content.className = "content";
  content.innerHTML = `
  <div class="close" onclick="closeModal()"><i class='bx bx-x'></i></div>
      <div class="content">
        <img class="modal-img" src="https://api.msodiqschool.uz/uploads/${items[0].link}.jpg" alt="img">
        <h2 class="modal-title">${items[0].name}</h2>
        <p class="modal-text">${items[0].about}</p>
      </div>
  `;
  teacherModal.appendChild(content);
  teacherModal.style.display = "block";
}

function closeModal() {
  teacherModal.style.display = "none";
  teacherModal.innerHTML = "";
}

function renderScore(score) {
  score.forEach((item) => {
    let devOne = document.createElement("div");
    devOne.className = "score-item";
    devOne.innerHTML = `
    <div class="score-image-box">
      <img class="score-image"
        src="	https://api.msodiqschool.uz/uploads/${item.link}.jpg" alt="#">
    </div>
    <h4 class="score-title">${item.heading}</h4>
    <p class="score-text">${item.about}</p>
    <a class="score-link" href="#">Learn more</a>
    `;
    scores.appendChild(devOne);
  });
}

renderScore(teacher);




var modal = document.getElementById("openMenu");
var btn = document.getElementById("menuBtn");
var span = document.getElementById("nclose");
btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


const openModalBtn = document.getElementById('open-modalYoutube');
const modalYoutube = document.getElementById('youtube-modal');
const player = document.getElementById('youtube-player');

let playerState;

function onYouTubeIframeAPIReady() {
  playerState = YT.PlayerState.UNSTARTED;
}

openModalBtn.addEventListener('click', function() {
  modalYoutube.classList.add('show');
  if (playerState !== YT.PlayerState.PLAYING) {
    playerState = YT.PlayerState.PLAYING;
    player.src += "&autoplay=1";
  }
});

modalYoutube.addEventListener('click', function(e) {
  if (e.target === modalYoutube) {
    modalYoutube.classList.remove('show');
    if (playerState === YT.PlayerState.PLAYING) {
      playerState = YT.PlayerState.PAUSED;
      player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  }
});

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function modalCloseLink() {
  modal.style.display = "none";
}