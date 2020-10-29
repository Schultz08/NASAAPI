//Key ?api_key=lgsUjZaOxV6jkXPJCVb76f0HmrhX63Vh8qVAjjOF
//date https://api.nasa.gov/EPIC/api/natural/date/2019-05-30?api_key=DEMO_KEY 
const apiKey = "?api_key=lgsUjZaOxV6jkXPJCVb76f0HmrhX63Vh8qVAjjOF"
const baseUrl = "https://api.nasa.gov/EPIC/api/natural/"
const baseArchiveUrl = "https://epic.gsfc.nasa.gov/archive/natural/"
//"https://api.nasa.gov/EPIC/archive/natural/"
let url;

const section = document.querySelector("section");
const dateSearch = document.querySelector(".dateSearch");
const dateForm = document.querySelector("form");
setFormMax()

dateForm.addEventListener("submit", getPlanet);



function createModal(picUrl, picTitle) {


    //modal gets class= modal fade id=podModal tabindex = -1 aria-labelledby=modalTitle aria-hidden=true
    let modal = document.createElement("div");

    //modalDialog gets class = modal-dialog and child modalContent
    let modalDialog = document.createElement("div");

    //modalContent gets class = modal-content and childs header, body, footer
    let modalContent = document.createElement("div");

    //modalHeader gets class = modal-header child h5 then button
    let modalHeader = document.createElement("div");
    //h5 gets class = modal-title, id = "modalTitle and textcontent = picTitle?"
    let modalTitle = document.createElement("h5");//
    //button type = button class = close data-dismiss = modal aria-label = Close
    let modalButton = document.createElement("button");//
    //modalButton.HTMLtext(span) span get aria-hidden = true and html text &time;
    let modalSpan = document.createElement("span");//

    //body gets class = modal-body and child modalPod
    let modalBody = document.createElement("div");
    //src = picUrl
    let modalPod = document.createElement("img");

    // //footer gets class modal-footer and child modalClose
    // let modalFooter = document.createElement("div");
    // //close gets type = button class = btn btn-secondary data-dismiss=model inntertext close
    // let modalClose = document.createElement("button");


    //modal
    modal.classList.add("modal");
    modal.classList.add("fade");
    modal.setAttribute("id", "podModal");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "modalTitle");
    modal.setAttribute("aria-hidden", "true");
    //modalDialog
    modalDialog.classList.add("modal-dialog");
    modalDialog.classList.add("modal-dialog-centered");
    //modalContent
    modalContent.classList.add("modal-content");

    //ModelHeader/child attributes
    modalSpan.setAttribute("aria-hidden", "true");
    modalSpan.innerText = "X";

    modalButton.classList.add("close");
    modalButton.setAttribute("data-dismiss", "modal");
    modalButton.setAttribute("aria-label", "Close");

    modalTitle.classList.add("modal-title");
    modalTitle.setAttribute("id", "modalTitle");
    modalTitle.innerText = picTitle;

    modalHeader.classList.add("modal-header");

    //body attributes
    modalPod.src = picUrl;
    modalBody.classList.add("modal-body");

    //footer attributes
    // modalClose.classList.add("btn");
    // modalClose.classList.add("btn-secondary");
    // modalClose.innerText = "Close";
    // modalFooter.classList.add("modal-footer");

    //append section
    //1. modalClose => modalFooter
    //modalFooter.appendChild(modalClose);
    //2. modalPod => modalBody 
    modalBody.appendChild(modalPod);
    //3. modalDpan => modalButton
    modalButton.appendChild(modalSpan);
    //4. modalTitle => modalHeader
    modalHeader.appendChild(modalTitle);
    //5. modalButton => modalHeader
    modalHeader.appendChild(modalButton);
    //6. modalHeader => modalContent
    modalContent.appendChild(modalHeader);
    //7. modalBody => modalContent
    modalContent.appendChild(modalBody);
    //8. modalFooter => modalContent
    // modalContent.appendChild(modalFooter);
    //9. modalContent => modalDialog
    modalDialog.appendChild(modalContent);
    //10 modalDialog => model
    modal.appendChild(modalDialog);

    section.appendChild(modal);
}



if (section.childNodes.length < 2) {

    fetch("https://api.nasa.gov/planetary/apod?api_key=lgsUjZaOxV6jkXPJCVb76f0HmrhX63Vh8qVAjjOF")
        .then(response => response.json())
        .then(data => { console.log(data); picOfTheDay(data) })

    function picOfTheDay(pic) {
        let podDiv = document.createElement("div");
        let podDivInner = document.createElement("div");
        let podTitle = document.createElement("h5");
        let podImg = document.createElement("img");
        let podDescrip = document.createElement("p");
        let podWrap = document.createElement("div");

        podImg.src = pic.url;
        podDescrip.innerText = pic.explanation;
        podTitle.innerText = pic.title;

        podWrap.classList.add("podWrap");
        podDiv.classList.add("media");
        podImg.classList.add("podImg");
        podImg.classList.add("mr-3");
        podDivInner.classList.add("media-body");
        podTitle.classList.add("mt-0");
        podImg.setAttribute("type", "button");
        podImg.setAttribute("data-toggle", "modal");
        podImg.setAttribute("data-target", "#podModal");


        podDivInner.appendChild(podTitle);
        podDivInner.appendChild(podDescrip);
        podDiv.appendChild(podImg);
        podDiv.appendChild(podDivInner);
        podWrap.appendChild(podDiv)
        section.appendChild(podWrap);

        createModal(pic.url, pic.title);
    }
}


function getPlanet(e) {
    e.preventDefault();

    while (section.childNodes.length > 3) {
        section.removeChild(section.childNodes[3])
    }
    if (!dateSearch.value) {
        url = baseUrl + "images" + apiKey;
    }
    else {
        url = baseUrl + "date/" + dateSearch.value + apiKey;
    }


    fetch(url)
        .then(response => response.json())
        .then(json => planetDisplay(json))
}

function planetDisplay(json) {
    //error handle here
    let carousel = document.createElement("div");
    let carouselInner = document.createElement("div");
    let carouselPrev = document.createElement("a");
    let spanIconPrev = document.createElement("span");
    let spanPrev = document.createElement("span");
    let carouselNext = document.createElement("a");
    let spanIconNext = document.createElement("span");
    let spanNext = document.createElement("span");
    let wrapDiv = document.createElement("div");

    let urlDate = getUrlDate(json[0].date);
    wrapDiv.classList.add("wrapDiv");
    carousel.setAttribute("id", "planetSlideShow");
    carousel.classList.add("carousel");
    carousel.classList.add("slide");
    carousel.classList.add("carousel-fade");
    carousel.setAttribute("data-ride", "carousel");

    carouselInner.classList.add("carousel-inner");

    carouselNext.classList.add("carousel-control-next");
    carouselNext.setAttribute("href", "#planetSlideShow");
    carouselNext.setAttribute("role", "button");
    carouselNext.setAttribute("data-slide", "next");
    spanIconNext.classList.add("carousel-control-next-icon");
    spanIconNext.setAttribute("aria-hidden", "true");
    spanNext.classList.add("sr-only");
    spanNext.innerText = "Next";

    carouselPrev.classList.add("carousel-control-prev");
    carouselPrev.setAttribute("href", "#planetSlideShow");
    carouselPrev.setAttribute("role", "button");
    carouselPrev.setAttribute("data-slide", "prev");
    spanIconPrev.classList.add("carousel-control-prev-icon");
    spanIconPrev.setAttribute("aria-hidden", "true");
    spanPrev.classList.add("sr-only");
    spanPrev.innerText = "Previous";

    //create slide for each image
    for (let data of json) {
        let carouselItem = document.createElement("div");
        let carouselImg = document.createElement("img");

        carouselItem.classList.add("carousel-item");
        carouselItem.setAttribute("data-interval", "2000");

        if (data.identifier == json[0].identifier) {
            carouselItem.classList.add("active");
        }

        let carouselImgUrl = baseArchiveUrl + urlDate + "/png/" + data.image + ".png" + apiKey;

        console.log(carouselImgUrl);
        carouselImg.src = carouselImgUrl;
        carouselImg.classList.add("d-block");
        carouselImg.classList.add("w-100");

        carouselItem.appendChild(carouselImg);
        carouselInner.appendChild(carouselItem);

        console.log(carouselImgUrl);
    }

    carouselPrev.appendChild(spanIconPrev);
    carouselPrev.appendChild(spanPrev);

    carouselNext.appendChild(spanIconNext);
    carouselNext.appendChild(spanNext);

    carousel.appendChild(carouselInner);
    carousel.appendChild(carouselPrev);
    carousel.appendChild(carouselNext);
    wrapDiv.appendChild(carousel);

    section.appendChild(wrapDiv);

}

function getUrlDate(jsonDate) {

    let dateSlice = jsonDate.slice(0, jsonDate.lastIndexOf(" "));
    while (dateSlice.includes("-")) {
        dateSlice = dateSlice.replace("-", "/");
    }

    return dateSlice
}
function setFormMax() {
    let today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    dateSearch.setAttribute("max", today)
}

