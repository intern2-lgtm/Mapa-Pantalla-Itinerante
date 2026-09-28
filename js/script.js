/* ==================================================
ELEMENTOS
================================================== */

const departments =
    document.querySelectorAll(".department");

const mapDepartment =
    document.getElementById("mapDepartment");

const departmentPhoto =
    document.getElementById("departmentPhoto");

const departmentPhotoImage =
    document.getElementById("previewPhoto");

const previousDepartmentButton =
    document.getElementById("previousDepartment");

const nextDepartmentButton =
    document.getElementById("nextDepartment");


/* ==================================================
CONFIGURACIÓN DE MAPAS
================================================== */

const departmentMaps = {

    "peten":
        "media/departments/peten.svg",

    "alta-verapaz":
        "media/departments/alta-verapaz.svg",

    "baja-verapaz":
        "media/departments/baja-verapaz.svg",

    "chimaltenango":
        "media/departments/chimaltenango.svg",

    "chiquimula":
        "media/departments/chiquimula.svg",

    "el-progreso":
        "media/departments/el-progreso.svg",

    "escuintla":
        "media/departments/escuintla.svg",

    "guatemala":
        "media/departments/guatemala.svg",

    "huehuetenango":
        "media/departments/huehuetenango.svg",

    "izabal":
        "media/departments/izabal.svg",

    "jalapa":
        "media/departments/jalapa.svg",

    "juliapa":
        "media/departments/jutiapa.svg",

    "quetzaltenango":
        "media/departments/quetzaltenango.svg",

    "quiche":
        "media/departments/quiche.svg",

    "retalhuleu":
        "media/departments/retalhuleu.svg",

    "sacatepequez":
        "media/departments/sacatepequez.svg",

    "san-marcos":
        "media/departments/san-marcos.svg",

    "santa-rosa":
        "media/departments/santa-rosa.svg",

    "solola":
        "media/departments/solola.svg",

    "suchitepequez":
        "media/departments/suchitepequez.svg",

    "totonicapan":
        "media/departments/totonicapan.svg",

    "zacapa":
        "media/departments/zacapa.svg"
};


/* ==================================================
ESTADO
================================================== */

/*
Alta Verapaz es el departamento inicial.

Orden actual:

0  Petén
1  Huehuetenango
2  Quiché
3  Alta Verapaz
*/

let active = 3;


/* ==================================================
RECUPERAR ÚLTIMO DEPARTAMENTO
================================================== */

/*
Si ya habíamos seleccionado un departamento
antes de entrar en una de sus páginas,
recuperamos esa posición al volver al index.
*/

const savedDepartment =
    sessionStorage.getItem("activeDepartment");

if (savedDepartment !== null) {

    const savedIndex =
        Number(savedDepartment);

    if (
        !Number.isNaN(savedIndex) &&
        savedIndex >= 0 &&
        savedIndex < departments.length
    ) {

        active = savedIndex;
    }
}


/* ==================================================
CARGAR MAPA DEL DEPARTAMENTO
================================================== */

function loadDepartmentMap(id) {

    const mapPath =
        departmentMaps[id];

    if (!mapPath) {

        mapDepartment.style.display =
            "none";

        mapDepartment.removeAttribute(
            "data"
        );

        return;
    }

    mapDepartment.style.display =
        "block";

    const separator =
        mapPath.includes("?")
            ? "&"
            : "?";

    mapDepartment.setAttribute(
        "data",
        mapPath +
        separator +
        "animation=" +
        Date.now()
    );
}


/* ==================================================
ACTUALIZAR CARRUSEL
================================================== */

function updateCarousel() {

    /* --------------------------------------
    GUARDAR DEPARTAMENTO ACTIVO
    -------------------------------------- */

    sessionStorage.setItem(
        "activeDepartment",
        active
    );


    /* --------------------------------------
    ACTUALIZAR POSICIONES
    -------------------------------------- */

    departments.forEach(
        (department, index) => {

            let position =
                index - active;

            const total =
                departments.length;


            /* --------------------------------------
            CARRUSEL CIRCULAR
            -------------------------------------- */

            if (
                position >
                total / 2
            ) {

                position -= total;
            }

            if (
                position <
                -total / 2
            ) {

                position += total;
            }


            /* --------------------------------------
            DISTANCIA
            -------------------------------------- */

            const distance =
                Math.abs(position);

            let opacity = 0;
            let scale = 0.7;


            /* --------------------------------------
            ACTIVO
            -------------------------------------- */

            if (distance === 0) {

                opacity = 1;
                scale = 1;
            }


            /* --------------------------------------
            UNO DE DISTANCIA
            -------------------------------------- */

            else if (distance === 1) {

                opacity = 0.55;
                scale = 0.86;
            }


            /* --------------------------------------
            DOS DE DISTANCIA
            -------------------------------------- */

            else if (distance === 2) {

                opacity = 0.2;
                scale = 0.74;
            }


            /* --------------------------------------
            VARIABLES CSS
            -------------------------------------- */

            department.style.setProperty(
                "--position",
                position
            );

            department.style.setProperty(
                "--opacity",
                opacity
            );

            department.style.setProperty(
                "--scale",
                scale
            );
        }
    );


    /* ==================================================
    DEPARTAMENTO ACTIVO
    ================================================== */

    const activeDepartment =
        departments[active];

    if (!activeDepartment) {
        return;
    }


    /* --------------------------------------
    MAPA
    -------------------------------------- */

    const departmentId =
        activeDepartment.dataset.id;

    loadDepartmentMap(
        departmentId
    );


    /* --------------------------------------
    FOTOGRAFÍA
    -------------------------------------- */

    const photo =
        activeDepartment.dataset.photo;

    if (photo) {

        departmentPhotoImage.src =
            photo;

        departmentPhoto.classList.add(
            "visible"
        );

    } else {

        departmentPhoto.classList.remove(
            "visible"
        );

        departmentPhotoImage.removeAttribute(
            "src"
        );
    }
}


/* ==================================================
SIGUIENTE DEPARTAMENTO
================================================== */

function nextDepartment() {

    active++;

    if (
        active >=
        departments.length
    ) {

        active = 0;
    }

    updateCarousel();
}


/* ==================================================
DEPARTAMENTO ANTERIOR
================================================== */

function previousDepartment() {

    active--;

    if (active < 0) {

        active =
            departments.length - 1;
    }

    updateCarousel();
}


/* ==================================================
FLECHA ANTERIOR
================================================== */

if (previousDepartmentButton) {

    previousDepartmentButton.addEventListener(
        "click",
        function () {

            previousDepartment();
        }
    );
}


/* ==================================================
FLECHA SIGUIENTE
================================================== */

if (nextDepartmentButton) {

    nextDepartmentButton.addEventListener(
        "click",
        function () {

            nextDepartment();
        }
    );
}


/* ==================================================
CLICK EN DEPARTAMENTOS
================================================== */

departments.forEach(
    (department, index) => {

        department.addEventListener(
            "click",
            function (event) {

                /* --------------------------------------
                DEPARTAMENTO SIN PÁGINA
                -------------------------------------- */

                if (
                    department.classList.contains(
                        "department-unavailable"
                    )
                ) {

                    event.preventDefault();

                    return;
                }


                /* --------------------------------------
                SI YA ESTÁ ACTIVO
                -------------------------------------- */

                if (
                    index === active
                ) {

                    return;
                }


                /* --------------------------------------
                EVITAR NAVEGACIÓN INMEDIATA
                -------------------------------------- */

                event.preventDefault();


                /* --------------------------------------
                CAMBIAR DEPARTAMENTO
                -------------------------------------- */

                active = index;

                updateCarousel();


                /* --------------------------------------
                ABRIR LA PÁGINA DEL DEPARTAMENTO
                -------------------------------------- */

                const href =
                    department.getAttribute("href");

                if (href) {

                    window.location.href =
                        href;
                }
            }
        );
    }
);


/* ==================================================
RUEDA DEL RATÓN
================================================== */

let wheelLocked = false;

window.addEventListener(
    "wheel",
    function (event) {

        event.preventDefault();

        if (wheelLocked) {
            return;
        }

        wheelLocked = true;


        if (
            event.deltaY > 0
        ) {

            nextDepartment();

        } else {

            previousDepartment();
        }


        setTimeout(
            function () {

                wheelLocked = false;

            },
            450
        );
    },
    {
        passive: false
    }
);


/* ==================================================
TECLADO
================================================== */

window.addEventListener(
    "keydown",
    function (event) {

        /* --------------------------------------
        SIGUIENTE
        -------------------------------------- */

        if (
            event.key === "ArrowDown" ||
            event.key === "ArrowRight"
        ) {

            event.preventDefault();

            nextDepartment();
        }


        /* --------------------------------------
        ANTERIOR
        -------------------------------------- */

        if (
            event.key === "ArrowUp" ||
            event.key === "ArrowLeft"
        ) {

            event.preventDefault();

            previousDepartment();
        }
    }
);


/* ==================================================
INICIO
================================================== */

updateCarousel();