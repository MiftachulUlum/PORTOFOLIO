loadTheme();
document.addEventListener('DOMContentLoaded', function () {
  loadTheme();
});

function switchTheme() {
  var theme = localStorage.getItem('_UserPreferedScheme');
  if (theme) {
    if (theme == 'dark') {
      theme = 'light';
    } else {
      theme = 'dark';
    }
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    } else {
      theme = 'light';
    }
  }

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('_UserPreferedScheme', theme);

  if (theme == 'dark') {
    $('.nav-dark').removeClass('d-none');
    $('.nav-light').addClass('d-none');
  } else {
    $('.nav-dark').addClass('d-none');
    $('.nav-light').removeClass('d-none');
  }

  var themeSwitcher = document.querySelectorAll('.theme-switcher');
  themeSwitcher.forEach(function (themeSwitcher) {
    if (theme == 'dark') {
      themeSwitcher.children[0].innerHTML = '<i data-feather="sun" class="icon feather-16"></i>';
    } else {
      themeSwitcher.children[0].innerHTML = '<i data-feather="moon" class="icon feather-16"></i>';
    }
    feather.replace();
  });
}

function loadTheme() {
  var theme = localStorage.getItem('_UserPreferedScheme');
  if (theme) {
    if (theme == 'dark' || theme == 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      switchTheme();
    }
  } else {
    switchTheme();
  }

  var themeSwitcher = document.querySelectorAll('.theme-switcher');
  themeSwitcher.forEach(function (themeSwitcher) {
    if (theme == 'dark') {
      themeSwitcher.children[0].innerHTML = '<i data-feather="sun" class="icon feather-16"></i>';
    } else {
      themeSwitcher.children[0].innerHTML = '<i data-feather="moon" class="icon feather-16"></i>';
    }
    feather.replace();
  });

  if (theme == 'dark') {
    $('.nav-dark').removeClass('d-none');
    $('.nav-light').addClass('d-none');
  } else {
    $('.nav-dark').addClass('d-none');
    $('.nav-light').removeClass('d-none');
  }
}
