/* =========================================================
   LAMMAH — WEBSITE INTERACTION
========================================================= */


/* =========================================================
   VARIABLES
========================================================= */

const introScreen =
  document.getElementById("introScreen");

const mainSite =
  document.getElementById("mainSite");

const languageBtn =
  document.getElementById("languageBtn");

const navLinks =
  document.querySelectorAll(
    "#mainNav a[data-page]"
  );


/* =========================================================
   PAGE CONTENT
========================================================= */

const pages = [
  "overview",
  "sensors",
  "station",
  "drone",
  "ai",
  "analytics",
  "alerts",
  "journey",
  "sustainability"
];


/* =========================================================
   ENTER WEBSITE
========================================================= */

function enterSite() {

  introScreen.classList.add("hide");

  mainSite.classList.remove("site-hidden");

  mainSite.classList.add("site-visible");

  showPage("overview");
}


/* =========================================================
   SHOW PAGE
========================================================= */

function showPage(pageName) {

  if (!pages.includes(pageName)) {
    pageName = "overview";
  }


  /* Hide all pages */

  pages.forEach(page => {

    const section =
      document.getElementById(
        `page-${page}`
      );

    if (section) {

      section.classList.remove(
        "active-page"
      );
    }

  });


  /* Show selected page */

  const selectedPage =
    document.getElementById(
      `page-${pageName}`
    );

  if (selectedPage) {

    selectedPage.classList.add(
      "active-page"
    );
  }


  /* Update navbar */

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (
      link.dataset.page === pageName
    ) {

      link.classList.add("active");

    }

  });


  /* Update browser URL */

  history.replaceState(
    null,
    "",
    `#${pageName}`
  );


  /* Start page from top */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   NAVIGATION CLICKS
========================================================= */

navLinks.forEach(link => {

  link.addEventListener(
    "click",
    function(event) {

      event.preventDefault();

      const page =
        this.dataset.page;

      showPage(page);

    }
  );

});


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

let currentLanguage = "en";


/*
   The website is currently designed primarily
   in English.

   The Arabic version below replaces the main
   navigation and key interface text.
*/


const translations = {

  en: {

    languageButton: "العربية",

    nav: {

      overview: "Overview",

      sensors: "Ground Sensors",

      station: "Solar Station",

      drone: "Aerial Response",

      ai: "Edge AI",

      analytics: "Analytics",

      alerts: "Alerts",

      journey: "Data Journey"

    }

  },


  ar: {

    languageButton: "English",

    nav: {

      overview: "نظرة عامة",

      sensors: "المستشعرات الأرضية",

      station: "محطة الطاقة الشمسية",

      drone: "الاستجابة الجوية",

      ai: "الذكاء الاصطناعي",

      analytics: "التحليلات",

      alerts: "التنبيهات",

      journey: "رحلة البيانات"

    }

  }

};


/* =========================================================
   CHANGE LANGUAGE
========================================================= */

languageBtn.addEventListener(
  "click",
  function() {

    currentLanguage =
      currentLanguage === "en"
        ? "ar"
        : "en";


    applyLanguage();

  }
);


/* =========================================================
   APPLY LANGUAGE
========================================================= */

function applyLanguage() {

  const language =
    translations[currentLanguage];


  /* HTML direction */

  if (currentLanguage === "ar") {

    document.documentElement.lang =
      "ar";

    document.documentElement.dir =
      "rtl";

  } else {

    document.documentElement.lang =
      "en";

    document.documentElement.dir =
      "ltr";

  }


  /* Language button */

  languageBtn.textContent =
    language.languageButton;


  /* Navigation */

  const navigationMap = {

    overview: 0,

    sensors: 1,

    station: 2,

    drone: 3,

    ai: 4,

    analytics: 5,

    alerts: 6,

    journey: 7

  };


  Object.keys(navigationMap)
    .forEach(key => {

      const index =
        navigationMap[key];

      if (navLinks[index]) {

        navLinks[index].textContent =
          language.nav[key];

      }

    });


  /*
    Direction adjustments.

    Most content remains in English because
    English is the primary version of the
    website. The navigation switches instantly.
  */

}


/* =========================================================
   LOAD PAGE FROM URL
========================================================= */

function loadPageFromHash() {

  const hash =
    window.location.hash
      .replace("#", "");

  if (
    hash &&
    pages.includes(hash)
  ) {

    showPage(hash);

  } else {

    showPage("overview");

  }

}


/* =========================================================
   BROWSER BACK / FORWARD
========================================================= */

window.addEventListener(
  "popstate",
  function() {

    loadPageFromHash();

  }
);


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    /*
      The intro screen stays visible
      until the user presses Explore LAMMAH.
    */

    if (
      window.location.hash &&
      pages.includes(
        window.location.hash.replace("#", "")
      )
    ) {

      /*
        We still keep the intro screen
        because it is part of the identity
        of the website.
      */

      showPage(
        window.location.hash
          .replace("#", "")
      );

    } else {

      showPage("overview");

    }

  }
);


/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
  "keydown",
  function(event) {

    /*
      Pressing Escape returns to Overview.
    */

    if (event.key === "Escape") {

      showPage("overview");

    }

  }
);