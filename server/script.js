function inputCm(num){
    return fetch('http://localhost:5000/cm/input?top=' + num, { method: "POST"})
    .then(res => res.text())
    .then(info =>{
        console.log(info)
    })
}

inputCm(4);