"use strict";

// Navigation
var nav = {};

try {
    nav.btn = document.querySelector(".nav__btn");
    nav.links = document.querySelector(".nav");

    // When DOM loaded hidden nav (Mobile version)
    document.addEventListener("DOMContentLoaded", function () {
        nav.btn.classList.add("nav__btn--hidden");
        nav.links.classList.add("nav--hidden");
    });

    nav.btn.addEventListener("click", function (evt) {
        evt.preventDefault();
        nav.btn.classList.toggle("nav__btn--hidden");
        nav.links.classList.toggle("nav--hidden");


    });
} catch (err){}
