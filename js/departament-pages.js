/* ==================================================
FUNCIONES PARA LAS PÁGINAS DEPARTAMENTALES
La fotografía ocupa todo el mapa y la máscara
recorta la imagen con la forma del departamento.
================================================== */
/* ==================================================
ELEMENTOS
================================================== */
const cards =
document.querySelectorAll(".event-card");
const events =
document.querySelector(".events");
const eventDetails =
document.querySelector(".event-details");
const detailsBackButton =
document.querySelector(".event-details-back");
const wrapper =
document.querySelector(".map-wrapper");
const locationsLayer =
document.querySelector(".locations-layer");
const photosLayer =
document.querySelector(".location-photos");
/* ==================================================
DETALLES
================================================== */
if (eventDetails) {
const directorRow =
    eventDetails.querySelector(
        '[data-detail-row="director"]'
    );

const countryRow =
    eventDetails.querySelector(
        '[data-detail-row="country"]'
    );


if (
    directorRow &&
    countryRow &&
    !eventDetails.querySelector(".detail-credits")
) {

    const credits =
        document.createElement("div");

    credits.className =
        "detail-credits";

    directorRow.before(credits);

    credits.append(
        directorRow,
        countryRow
    );

}
}
/* ==================================================
SISTEMA DE MAPA
================================================== */
const MAP_WIDTH =
559.31;
const MAP_HEIGHT =
385.53;
/* ==================================================
ESTADO
================================================== */
let activeLocation =
null;
let activeCard =
null;
/* ==================================================
CREAR FOTOGRAFÍAS
================================================== */
function createPhotos() {
if (!photosLayer) {

    return;
}


photosLayer.innerHTML = "";


cards.forEach(
    (card) => {

        const locationId =
            card.dataset.location;

        const photoSrc =
            card.dataset.photo;


        if (
            !locationId ||
            !photoSrc
        ) {

            return;
        }


        createPhotoElement(
            {
                id: locationId,
                src: photoSrc
            }
        );

    }
);
}
/* ==================================================
CREAR ELEMENTO DE FOTOGRAFÍA
================================================== */
function createPhotoElement(
photo
) {
const image =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "image"
    );


image.classList.add(
    "location-photo"
);


image.dataset.location =
    photo.id;


image.setAttribute(
    "href",
    photo.src
);


image.setAttribute(
    "x",
    "0"
);


image.setAttribute(
    "y",
    "0"
);


image.setAttribute(
    "width",
    MAP_WIDTH
);


image.setAttribute(
    "height",
    MAP_HEIGHT
);


image.setAttribute(
    "preserveAspectRatio",
    "none"
);


photosLayer.appendChild(
    image
);
}
/* ==================================================
BUSCAR TARJETA
================================================== */
function getCard(
locationId
) {
let foundCard =
    null;


cards.forEach(
    (card) => {

        if (
            card.dataset.location ===
            locationId
        ) {

            foundCard =
                card;

        }

    }
);


return foundCard;
}
/* ==================================================
BUSCAR FOTOGRAFÍA
================================================== */
function getPhoto(
locationId
) {
if (!photosLayer) {

    return null;
}


return photosLayer.querySelector(
    `.location-photo[data-location="${locationId}"]`
);
}
/* ==================================================
ACTIVAR UBICACIÓN
================================================== */
function activateLocation(
locationId,
openDetails = false
) {
const card =
    getCard(locationId);


if (!card) {

    return;
}


activeLocation =
    locationId;


activeCard =
    card;


/* ==============================================
   ESTADO DEL MAPA
============================================== */

if (locationsLayer) {

    locationsLayer.classList.add(
        "has-active"
    );

}


if (wrapper) {

    wrapper.classList.add(
        "has-active"
    );

}


/* ==============================================
   TARJETAS
============================================== */

cards.forEach(
    (otherCard) => {

        otherCard.classList.toggle(
            "active",
            otherCard === card
        );

    }
);


/* ==============================================
   FOTOGRAFÍA
============================================== */

showPhoto(
    locationId
);


/* ==============================================
   DETALLES
============================================== */

if (openDetails) {

    showDetails(
        card
    );

}
}
/* ==================================================
MOSTRAR FOTOGRAFÍA
================================================== */
function showPhoto(
locationId
) {
if (!photosLayer) {

    return;
}


photosLayer
    .querySelectorAll(
        ".location-photo"
    )
    .forEach(
        (photo) => {

            photo.classList.toggle(

                "visible",

                photo.dataset.location ===
                locationId

            );

        }
    );
}
/* ==================================================
RESETEAR MAPA
================================================== */
function resetMap() {
activeLocation =
    null;

activeCard =
    null;


/* ==============================================
   FOTOGRAFÍAS
============================================== */

if (photosLayer) {

    photosLayer
        .querySelectorAll(
            ".location-photo"
        )
        .forEach(
            (photo) => {

                photo.classList.remove(
                    "visible"
                );

            }
        );

}


/* ==============================================
   ESTADO
============================================== */

if (locationsLayer) {

    locationsLayer.classList.remove(
        "has-active"
    );

}


if (wrapper) {

    wrapper.classList.remove(
        "has-active"
    );

}


/* ==============================================
   TARJETAS
============================================== */

cards.forEach(
    (card) => {

        card.classList.remove(
            "active"
        );

    }
);
}
/* ==================================================
MOSTRAR DETALLES
================================================== */
function showDetails(
card
) {
if (!events) {

    return;
}


activeCard =
    card;


events.classList.add(
    "is-showing-details"
);


/* ==============================================
   TARJETA ACTIVA
============================================== */

cards.forEach(
    (otherCard) => {

        otherCard.classList.toggle(
            "active",
            otherCard === card
        );

    }
);


/* ==============================================
   CAMPOS
============================================== */

const detailFields = [

    "host",
    "language",
    "film",
    "director",
    "country"

];


detailFields.forEach(
    (field) => {

        const value =
            card.dataset[field] ||
            "";


        const target =
            eventDetails.querySelector(
                `[data-detail="${field}"]`
            );


        const row =
            eventDetails.querySelector(
                `[data-detail-row="${field}"]`
            );


        if (
            !target ||
            !row
        ) {

            return;
        }


        target.innerHTML =
            value.replace(
                /\|/g,
                "<br>"
            );


        if (
            value.trim() === ""
        ) {

            row.hidden =
                true;

        } else {

            row.hidden =
                false;

        }

    }
);


/* ==============================================
   ACCESIBILIDAD
============================================== */

eventDetails?.setAttribute(
    "aria-hidden",
    "false"
);


/* ==============================================
   SCROLL
============================================== */

card.scrollIntoView({

    behavior:
        "smooth",

    block:
        "nearest"

});
}
/* ==================================================
OCULTAR DETALLES
================================================== */
function hideDetails() {
if (!events) {

    return;
}


events.classList.remove(
    "is-showing-details"
);


eventDetails?.setAttribute(
    "aria-hidden",
    "true"
);


resetMap();
}
/* ==================================================
EVENTOS DE LAS TARJETAS
================================================== */
cards.forEach(
(card) => {
    const locationId =
        card.dataset.location;


    /* ==========================================
       HOVER
    ========================================== */

    card.addEventListener(
        "mouseenter",
        () => {

            if (!locationId) {

                return;
            }


            activateLocation(
                locationId
            );

        }
    );


    /* ==========================================
       SALIR
    ========================================== */

    card.addEventListener(
        "mouseleave",
        () => {

            if (
                events?.classList.contains(
                    "is-showing-details"
                )
            ) {

                return;
            }


            resetMap();

        }
    );


    /* ==========================================
       CLICK
    ========================================== */

    card.addEventListener(
        "click",
        () => {

            if (locationId) {

                activateLocation(
                    locationId,
                    true
                );

            } else {

                showDetails(
                    card
                );

            }

        }
    );

}
);
/* ==================================================
BOTÓN VOLVER
================================================== */
if (detailsBackButton) {
detailsBackButton.addEventListener(
    "click",
    () => {

        hideDetails();

    }
);
}
/* ==================================================
ESCAPE
================================================== */
document.addEventListener(
"keydown",
(event) => {
    if (
        event.key === "Escape" &&
        events &&
        events.classList.contains(
            "is-showing-details"
        )
    ) {

        hideDetails();

    }

}
);
/* ==================================================
INICIALIZACIÓN
================================================== */
function initMap() {
createPhotos();

resetMap();
}
/* ==================================================
INICIAR
================================================== */
if (
document.readyState ===
"loading"
) {
document.addEventListener(
    "DOMContentLoaded",
    initMap
);
} else {
initMap();
}