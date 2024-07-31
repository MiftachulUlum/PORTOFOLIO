feather.replace();

$(document).scroll(function () {
  let y = $(this).scrollTop();
  if (y > 80) {
    $('.navbar').addClass('navbar-bg-scroll');
  } else {
    $('.navbar').removeClass('navbar-bg-scroll');
  }
});

function reveal() {
  let reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top - 30;
    let elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

reveal();
window.addEventListener("scroll", reveal);
window.addEventListener("resize", reveal);
loadTheme();
$(document).ready(function () {
  $('.theme-switcher').on('click', function () {
    switchTheme();
  });
});

initSearch();
initLanguage();

function initSearch() {
  const searchButton = document.getElementsByClassName("search-button");
  for (let i = 0; i < searchButton.length; i++) {
    searchButton[i].addEventListener('click', function () {
      openSearchBox();
    });
  }
  document.getElementById('searchModal').addEventListener('shown.bs.modal', function () {
    document.getElementById('searchInput').focus();
  });
  document.getElementById('searchInput').addEventListener('keyup', function (event) {

  });
}

function initLanguage() {
  const languageButton = document.getElementsByClassName("language-button");
  for (let i = 0; i < languageButton.length; i++) {
    languageButton[i].addEventListener('click', function () {
      openLanguageBox();
    });
  }
  document.getElementById('languageModal').addEventListener('shown.bs.modal', function () {

  });
}

