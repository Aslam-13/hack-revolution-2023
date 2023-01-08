
const header = document.querySelector("header")
const hamburger = document.querySelector(".hamburger")
const overlay = document.querySelector(".overlay")
console.log("active")

window.addEventListener("scroll",() => {
    header.classList.toggle("scrolled",window.pageYOffset > 0)
})



// ------------------------------------hamburger open & close------------------------------------

hamburger.addEventListener("click",() => {
    document.body.classList.toggle("open")
})

overlay.addEventListener("click",() => {
    document.body.classList.toggle("open")
})

