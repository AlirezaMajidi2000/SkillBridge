const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
menu.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open")),
);
const io = new IntersectionObserver(
    (items) =>
        items.forEach((item) => {
            if (item.isIntersecting) {
                item.target.classList.add("visible");
                io.unobserve(item.target);
            }
        }),
    { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
//////////////////////////////////////////////////////////////////////////////


// اسلایدر هدر

let images = [
    'assets/image/zagro-hub.jpg',
    'assets/image/person_1.jpg',
    'assets/image/person_2.jpg',
    'assets/image/image4.jpg',
    'assets/image/image5.jpg'
];

let header = document.querySelector('.hero');
let slideIndex = 0;
// let boxTitle = document.querySelector('.box_title')
// let boxText = document.querySelector('.box_text')
// let counter = document.querySelector('.counter')


function showSlides() {
    header.style.backgroundImage = `url("${images[slideIndex]}")`;

    // boxText.classList.remove('animate');
    // void boxText.offsetWidth;
    // boxText.classList.add('animate');

    // boxTitle.classList.remove('animate');
    // void boxTitle.offsetWidth;
    // boxTitle.classList.add('animate');

    // counter.textContent = slideIndex + 1 +' / 5';
}

function plusSlides(n) {
    slideIndex = slideIndex + n;

    if (slideIndex >= images.length) {
        slideIndex = 0;
    }

    if (slideIndex < 0) {
        slideIndex = images.length - 1;
    }

    showSlides();
}

showSlides();

// اسلایدر هدر

// اسلایدر قسمت مقصد دیدار 

const chipsBtnOne = document.querySelector('.chips-btn-one')
const chipsBtnTwo = document.querySelector('.chips-btn-two')
const chipsBtnThree = document.querySelector('.chips-btn-three')

const imageOne = document.querySelector('.image-one')
const imageTwo = document.querySelector('.image-two')
const imageThree = document.querySelector('.image-three')


chipsBtnOne.addEventListener('click', function(){
    imageOne.classList.remove('hidden')
    imageOne.classList.add('show')

    imageTwo.classList.remove('show')
    imageTwo.classList.add('hidden')

    imageThree.classList.remove('show')
    imageThree.classList.add('hidden')
})


chipsBtnTwo.addEventListener('click', function(){
    imageTwo.classList.remove('hidden')
    imageTwo.classList.add('show')

    imageOne.classList.remove('show')
    imageOne.classList.add('hidden')

    imageThree.classList.remove('show')
    imageThree.classList.add('hidden')
})


chipsBtnThree.addEventListener('click', function(){
    imageThree.classList.remove('hidden')
    imageThree.classList.add('show')

    imageOne.classList.remove('show')
    imageOne.classList.add('hidden')

    imageTwo.classList.remove('show')
    imageTwo.classList.add('hidden')
})

// اسلایدر قسمت مقصد دیدار 
