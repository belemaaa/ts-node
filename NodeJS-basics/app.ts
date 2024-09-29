let courseName: string = "typescript with node js"
console.log(courseName)

let printNumbers = (start: number, end: number) : void => {
    let temp: string = ''; 
    if (start < end){
        for (let i: number = start; i <= end; i++){
            temp += `${i} `
        }
        console.log(temp)
    }
    else{
        console.log("invalid numbers")
    }
}

printNumbers(19, 10)