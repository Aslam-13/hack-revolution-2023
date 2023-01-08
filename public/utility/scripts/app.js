
const header = document.querySelector("header")
const hamburger = document.querySelector(".hamburger")
const overlay = document.querySelector(".overlay")

const dropdown = document.querySelectorAll(".drop-down")

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
// ------------------------------------drop down open--------------------------------------------
dropdown.forEach(dropdownElement => {
    const select = dropdownElement.querySelector(".select")
    const caret = dropdownElement.querySelector(".caret")
    const menu = dropdownElement.querySelector(".menu")
    const options = dropdownElement.querySelectorAll(".menu li")
    const selected = dropdownElement.querySelector(".selected")    

    select.addEventListener("click", () => {
        // select.classList.toggle("select-clicked")
        caret.classList.toggle("caret-rotate")
        menu.classList.toggle("menu-open")
    })
    
    options.forEach(option => {
        option.addEventListener("click", () => {
            selected.innerText = option.innerText
            caret.classList.remove("caret-rotate")
            menu.classList.remove("menu-open")
    
            options.forEach(option => {
                option.classList.remove("active")
            })
    
            option.classList.add("active")
        })
    })
})