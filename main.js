var log = function (msg) {
    var debug = document.querySelector(".debug");
    debug.insertAdjacentHTML('beforeend', `${Date.now()} - ${msg}<br/>`);
};

window.onpopstate = history.onpushstate = function (e) {
    log(`back or fwd button was clicked, hash is now ${location.hash}`);
    displayContent();
};

window.onload = function () {
    log('window.onload (this should only happen once)');
    var hash = location.hash;
    if (hash) {
        displayContent(hash);
    }
};

var displayContent = function () {
    var hash = location.hash;
    log(`displayContent ${hash}`);

    // remove active from all links
    var tabs = document.querySelectorAll(`[href^='#']`);
    tabs.forEach(t => {
        t.classList.remove("active");
    });

    var tabClicked = document.querySelector(`[href='${hash}']`);
    tabClicked.classList.add("active");

    // show/hide appropriate content
    var tabContents = document.querySelectorAll(".content >div");
    tabContents.forEach(tc => {
        tc.classList.remove("active");
    });

    var tabContentToDisplay = document.querySelector(`[data-tab-id='${hash}']`);
    tabContentToDisplay.classList.add("active");
};

var tabClick = function (tab) {
    var href = tab.href; // #red
    log(`pushState to ${href}`);
    history.pushState(null, null, href);
    displayContent(href);
};