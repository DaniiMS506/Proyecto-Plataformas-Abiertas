// Paso 1: Obtener elementos del DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 20000; // Cambiar a 20 segundos

nextDom.onclick = function () {
    showSlider('next');
    restartAutoNextTimer(); // Reiniciar el temporizador automático
}

prevDom.onclick = function () {
    showSlider('prev');
    restartAutoNextTimer(); // Reiniciar el temporizador automático
}

let runTimeOut;
let runNextAuto;

// Función para mostrar el slider según el tipo (next o prev)
function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    restartAutoNextTimer(); // Reiniciar el temporizador automático

}

// Función para reiniciar el temporizador automático
function restartAutoNextTimer() {
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click(); // Hacer clic en el botón next automáticamente
    }, timeAutoNext);
}

// Iniciar el cambio automático de imágenes al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    restartAutoNextTimer(); // Iniciar el temporizador automático al cargar la página
});



/************************************ Scroll Reveal/Animations ************************************/
ScrollReveal({
    /*reset: true,*/
    distance: '80px',
    duration: 1800,
    delay: 5
});

ScrollReveal().reveal('.navbar, .carousel, .header', { origin: 'top' });
ScrollReveal().reveal('.recent-sales, .card', { origin: 'bottom' });
ScrollReveal().reveal('.arrows, .table, .footer', { origin: 'left' });
ScrollReveal().reveal('.thumbnail', { origin: 'right' });



/************************************ Read More ************************************/

// Declaración de textos
const rm1 = 'Las Nike Air Mag son unas zapatillas icónicas que fueron diseñadas originalmente para la película "Volver al Futuro II". Estas zapatillas cuentan con un diseño futurista y son conocidas por su característica de autoajuste. Fueron lanzadas al mercado en ediciones limitadas, lo que las convierte en un objeto de deseo para los coleccionistas siendo unas zapatillas muy exclusivas.';
const rm2 = 'Las Air Jordan 1 Louis Vuitton son una colaboración exclusiva entre Nike y Louis Vuitton. Estas zapatillas combinan el icónico diseño de las Air Jordan 1 con la elegancia y lujo de Louis Vuitton. Con materiales de alta calidad y detalles únicos, son muy deseadas por coleccionistas y amantes de la moda.';
const rm3 = 'Las Air Jordan 1 son unas zapatillas icónicas lanzadas en 1985, diseñadas para Michael Jordan. Con su estilo clásico y versátil, revolucionaron el calzado deportivo y se convirtieron en un símbolo de la cultura sneaker. Son altamente valoradas por coleccionistas y aficionados del baloncesto.';
const rm4 = 'Las Nike Air Force 1 son unas zapatillas legendarias lanzadas en 1982. Con su diseño clásico y la revolucionaria tecnología Air, se convirtieron en un icono tanto en el deporte como en la moda urbana. Son muy populares y apreciadas por coleccionistas y aficionados a las zapatillas.';

// Función para mostrar SweetAlert
function readmore(texto) {
    let titleText = '';
    switch (texto) {
        case 'rm1':
            titleText = rm1;
            break;
        case 'rm2':
            titleText = rm2;
            break;
        case 'rm3':
            titleText = rm3;
            break;
        case 'rm4':
            titleText = rm4;
            break;
        default:
            titleText = 'Carousel creado por K. Daniel';
            break;
    }

    Swal.fire({
        title: titleText,
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
        `
        },
        hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
        `
        }
    });
};