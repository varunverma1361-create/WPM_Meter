
export const paragraphs = [
    "The quick brown fox jumps over the lazy dog. This sentence uses every letter in the English alphabet at least once. Typing practice helps build muscle memory in your fingers. Try to keep a steady rhythm and focus on hitting the right keys without looking down at your hands."
,
    "Technology continues to change how people communicate across the globe. From simple text messages to complex video conferences, digital tools make information instantly accessible. However, developing strong foundational typing skills remains essential for productivity in modern office environments and everyday communication."
,
    "Albert Einstein, born in 1879, revolutionized theoretical physics with his groundbreaking papers on relativity. Despite facing early academic skepticism, his profound intellectual curiosity reshaped our fundamental understanding of space, time, and gravity. In his later years, he actively advocated for international peace and nuclear disarmament."
]

export const getRandomParagraph = ()=>{
    const chosenIndex = Math.floor(Math.random()*paragraphs.length);
    return paragraphs[chosenIndex]
}