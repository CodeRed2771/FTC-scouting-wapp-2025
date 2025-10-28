// Parent navigation 
var parentPages = Array.from(document.getElementsByClassName("page"));
var currentParentPage = "home";


function hideParentPages() {
    parentPages.forEach(element => {
        element.style.display = "none";
    });
}

function showParentPage(name) {
    hideParentPages();
    parentPages.forEach(element => {
        if (element.classList.contains(name)) {
            element.style.display = "flex";
        }
    });
}

function hideParentPage(name) {
    parentPages.forEach(element => {
        if (element.classList.contains(name)) {
            element.style.display = "none";
        }
    });
}

// matchScout ///////////////////////////////////////////////////////

var scoutingPages = Array.from(document.getElementsByClassName("scouting-page"));
var currentPage = "preMatch";
var currentPageIndex = 0;

function hideAllPages() {
    scoutingPages.forEach(element => {
        element.style.display = "none";
    });
}

function showPage(idOrNumber) {
    try {
        hideAllPages();
        var elm;
        switch (typeof idOrNumber) {
            case "string":
                elm = document.getElementById(idOrNumber);
                break;
            case "number":
                elm = scoutingPages[idOrNumber];
                break;
            default:
        }
        elm.style.display = "flex";
        currentPage = idOrNumber;
        currentPageIndex = scoutingPages.indexOf(elm);
    }catch{}
}

function hidePage(idOrNumber) {
    switch (typeof idOrNumber) {
        case "string":
            document.getElementById(idOrNumber).style.display = "none";
            break;
        case "number":
            scoutingPages[idOrNumber].style.display = "none";
            break;
        default:
    }
}

function pageNav(inc) {
    currentPageIndex += inc;
    if (currentPageIndex > scoutingPages.length - 1) {
        currentPageIndex = scoutingPages.length - 1;
    }
    if (currentPageIndex < 0) {
        currentPageIndex = 0;  
        showParentPage("home"); 
    }
    showPage(currentPageIndex);
}

document.body.addEventListener("keydown",function(event){
    if (event.key == "ArrowRight") {
       pageNav(1); 
    }
    if (event.key == "ArrowLeft") {
       pageNav(-1); 
    }
})

////////////////////////////////////////////////////////////////

// Init function
hideParentPages();
hideAllPages();
showParentPage(currentParentPage);
showPage(currentPage);
