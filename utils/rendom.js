const rendom = (contents) => {
    let rendomArr = []
    let numArr = []
    if (contents.length === 0) {
        return rendomArr
    }
    let max = contents.length > 20 ? 20 : contents.length
    // 获取推荐随机数
    while (numArr.length < max) {
        let index = Math.floor(Math.random() * contents.length); //随机取一个位置 
        if (!numArr.includes(index)) {
            numArr.push(index)
        }
    }
    numArr.forEach(v => {
        rendomArr.push(contents[v])
    })
    return rendomArr
}

export default rendom