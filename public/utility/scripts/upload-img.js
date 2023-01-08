const fileName = document.querySelector(".up-file-name")
const cancleBtn = document.querySelector("#cancle-btn")
const defaultBtn = document.querySelector("#default-btn")
const customBtn = document.querySelector("#custom-btn")
const img = document.querySelector(".up-image img")
const wrapper = document.querySelector(".wrapper")

function defaultBtnActive(){
    defaultBtn.click()
}

defaultBtn.addEventListener("change" ,() => {
    console.log(defaultBtn.value)
    const file = defaultBtn.files[0]
    console.log(file)
    if(file){
        const reader = new FileReader()
        reader.onload = function(){
            const result = reader.result
            img.src = result
            img.style.display = "block"
            wrapper.classList.add("active")
        }
        cancleBtn.addEventListener("click", () => {
            img.src= ""
            img.style.display = ""
            wrapper.classList.remove("active")
        })
        reader.readAsDataURL(file)
    }
    if(defaultBtn.value){
        let valueStored = defaultBtn.value
        fileName.textContent = valueStored.slice(12,valueStored.length)
    }
})