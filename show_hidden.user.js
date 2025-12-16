// ==UserScript==
// @name         Hidden Bandcamp Tracks
// @namespace    https://github.com/7x11x13/hidden-bandcamp-tracks
// @version      1.4
// @description  Shows how many hidden tracks an album on Bandcamp has
// @author       7x11x13
// @match        https://*.bandcamp.com/*
// @icon         https://github.com/7x11x13/hidden-bandcamp-tracks/blob/main/icons/ghost-128.png?raw=true
// @updateURL    https://raw.githubusercontent.com/7x11x13/hidden-bandcamp-tracks/main/show_hidden.user.js
// @downloadURL  https://raw.githubusercontent.com/7x11x13/hidden-bandcamp-tracks/main/show_hidden.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const num_tracks_regex = /(\d+) track album/;
    // make sure we are on an album page
    if (document.querySelector("meta[property='twitter:site']") == null) return;
    if (document.querySelector("meta[property='twitter:site']").content != "@bandcamp") return;
    if (document.querySelector("meta[property='og:type']") == null) return;
    if (document.querySelector("meta[property='og:type']").content != "album") return;
    const desc = document.querySelector("meta[property='og:description']").content;
    const num_tracks = parseInt(desc.match(num_tracks_regex)[1]);
    const track_numbers = [];
    for (const track_num of document.querySelectorAll(".track_number")) {
        track_numbers.push(parseInt(track_num.textContent.slice(0, -1)));
    }
    const num_visible_tracks = Math.max(0, ...track_numbers);
    const num_hidden_tracks = num_tracks - num_visible_tracks;
    const title = document.querySelector("#name-section");
    const hidden_text = document.createElement("span");
    hidden_text.style = "color:slategray";
    if (num_hidden_tracks === 1) {
        hidden_text.textContent = `(1 hidden track)`;
    } else {
        hidden_text.textContent = `(${num_hidden_tracks} hidden tracks)`;
    }
    title.appendChild(hidden_text);
})();