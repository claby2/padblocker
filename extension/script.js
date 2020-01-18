let blockCount = document.getElementById("blockCount");
let blockHour = document.getElementById("blockHour");
let blockTime = document.getElementById("blockTime");
let blockMoney = document.getElementById("blockMoney");
let blockWasted = document.getElementById("blockWasted");

setInterval(()=>{
    chrome.storage.local.get(['count'], function(item) {
        blockCount.innerText = item.count;
        let x = item.count;
        blockMoney.innerText = "$" + Math.ceil(x*0.0001*100)/100;
        // (j/10550560)*53
        console.log(item);
        chrome.storage.local.get(['time'], function(item) {
            blockHour.innerText = Math.round(x/((item.time)/60));
            blockTime.innerText = Math.round(item.time/60);
            blockWasted.innerText = Math.round((((2*11*item.time/60)/10550560)*53)*1000000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            console.log(item);
        });
    });
}, 100);