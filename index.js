import {postGetter} from "./src/getter.js"

const root = document.getElementById("root")

const imagesNav = document.createElement("div")
imagesNav.style.width = "100%"
imagesNav.style.heigth = "fit-content"
imagesNav.style.borderRadius = "15%"
imagesNav.style.border = "solid 1px dotted"
imagesNav.style.backgroundColor = "lightgray"

const image = document.createElement("img")
image.style.width = "100%"

const postNumber = document.createElement("span")
postNumber.innerHTML = "post 0/0"

const arrowL = document.createElement("button")
arrowL.innerHTML = "<--"
arrowL.classList = "off"
arrowL.style.borderRadius = "50%"

const arrowR = document.createElement("button")
arrowR.innerHTML = "-->"
arrowR.classList = "off"
arrowR.style.borderRadius = "50%"

const input = document.createElement("input")
input.placeholder = "tags"
input.type = "text"

const textQNT = document.createElement("span")
textQNT.innerHTML = "QNT of posts (default: 10): "

const postsQNT = document.createElement("input")
postsQNT.placeholder = "QNT of posts"
postsQNT.value = 10
postsQNT.style.borderTop = "0"
postsQNT.style.borderLeft = "0"
postsQNT.style.borderRight = "0"
postsQNT.style.borderRadius = "6px"
postsQNT.style.width = "30px"


const get = document.createElement("button")
get.innerHTML = "GET POSTS"

const cleanButton = document.createElement("button")
cleanButton.innerHTML = "clean posts"


const postsArray = []
let pos = 0
class Post {
    constructor(url, tagsUsed) {
        this.url = url
        this.tags = tagsUsed
    }
}

const defineArrows = () => {
    if (pos == 0) {
        arrowL.classList = "off"
    } else {
        arrowL.classList = "on"
    }
    if (pos == postsArray.length -1) {
        arrowR.classList = "off"
    } else {
        arrowR.classList = "on"
    }
}
const updateList = (goTo) => {
    if (goTo == -1 && pos !== 0) {
        pos--
    }
    if (goTo == 1 && pos < postsArray.length -1) {
        pos++
    }
    postsArray.map((post, i) => {
        if (i == pos) {
            image.src = post.url
        }
    })
    postNumber.innerHTML = `post ${pos+1}/${postsArray.length}`
    defineArrows()
}

arrowL.addEventListener("click", () => {
    updateList(-1)
})
arrowR.addEventListener("click", () => {
    updateList(1)
})




get.addEventListener("click", async () => {
    let tags = input.value
    tags.replaceAll(" ", "+")
    console.log(`tags: ${tags}`)
    
    const posts = await postGetter(tags, postsQNT.value)
    for (const postN in posts.posts) {
        const postURL = posts.posts[postN].file.url
        postsArray.push(new Post(postURL, tags))
    }

    updateList(0)
    
})

root.appendChild(input)
root.appendChild(get)
root.appendChild(document.createElement("br"))
root.appendChild(textQNT)
root.appendChild(postsQNT)
root.appendChild(document.createElement("br"))
root.appendChild(arrowL)
root.appendChild(arrowR)
root.appendChild(postNumber)
root.appendChild(imagesNav)
imagesNav.appendChild(image)
