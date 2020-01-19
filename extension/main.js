x = 0;
t = 0;

chrome.storage.local.set({'count': 0 }, function() {
    console.log('Settings saved');
});
chrome.storage.local.set({'time': 0}, function() {
    console.log('Settings saved')
})

/* Change ppi depending on screen PPI. */
let ppi = 227;
/* Set this variable to devicePixelRatio normally.
 * If you are using developer tools artifical resolution, set this to 1.
 */
let dpr = devicePixelRatio;
let height = document.body.getBoundingClientRect().height;

let ads = [...document.getElementsByTagName('iframe')].filter(e => 
    console.log(e.id) || 
    e.id.includes('google_ad')
);
console.log("ads: ", ads);

chrome.storage.local.get(['count'], function(item) {
    x = item.count;
});

let tmp = ads.length;

setInterval(() => {
    chrome.storage.local.set({'count': x + tmp }, function() {
        console.log('Settings saved');
    });
    chrome.storage.local.set({'time': t++}, function() {
        console.log('Settings saved')
    })
}, 1000);

let obs = new MutationObserver(muts => {
    // console.log("Added ", muts);
    muts.forEach(mut => {
        mut.addedNodes.forEach(el => {
            if(el.id && el.id.includes('google_ad')){
                ads.push(el);
                x++;
            }
        });
    });
});
obs.observe(document, { childList: true, subtree: true });
let cmb = 0;
setInterval(()=>{
	cmb = Math.min(18, cmb);
	console.log(cmb);
    fetch("http://localhost:5000/cm/input?top=" + (18 - 2*Math.floor(cmb/2 + 2.5/2)), { method: "POST" });
}, 1000);



let s = true;

document.addEventListener("mousewheel", () => {
    // document.body.parentElement.style.overflow = "auto";
	cmb = 0;
    for(let i = 0; i < ads.length; i++){
        let el = ads[i];
        let { x, y, height } = el.getBoundingClientRect();
		console.log(y);
        let cmTop = ((y * dpr * 2.54) / ppi);
        let cmBottom = (((y + height) * dpr * 2.54) / ppi);
        let cmLeft = ((x * dpr * 2.54) / ppi);
        // console.log(el, cmLeft, cmTop);
        if((9.25 * dpr) <= cmLeft && 
            (0 <= cmTop && cmTop <= (7.25 * dpr)) ||
            (0 <= cmBottom && cmBottom <= (7.25 * dpr)) 
        ){
            /* put what to do with the ads here */
            // console.log("AD");
			console.log(cmBottom);
            cmb = Math.max(cmb, Math.min(cmBottom, 18));
        }
    };
});
