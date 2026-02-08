

export const capitalizeEachWord = (str) => {

    if(!str) return ""

    let words = str.split(" ")

    let capitalize = words.map(word=>(
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ))

    return capitalize.join(" ")

}


export const capitalizeFirstChar = (word) => {
    if(!word) return ""
    
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}