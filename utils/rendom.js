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

    let clientWidth = document.body.clientWidth
    if (clientWidth < 375) {
        return rendomArr.slice(0, 5)
    } else if (clientWidth < 768) {
        return rendomArr.slice(0, 7)
    } else if (clientWidth < 1024) {
        return rendomArr.slice(0, 14)
    } else {
        return rendomArr
    }
}

export default rendom