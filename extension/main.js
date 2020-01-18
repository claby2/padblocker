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

let obs = new MutationObserver(muts => {
    // console.log("Added ", muts);
    muts.forEach(mut => {
        mut.addedNodes.forEach(el => {
            if(el.id.includes('google_ad')){
                ads.push(el);
            }
        });
    });
});
obs.observe(document, { childList: true, subtree: true });

document.addEventListener("mousewheel", () => {
    // document.body.parentElement.style.overflow = "auto";
    ads.forEach(el => {
        let { x, y } = el.getBoundingClientRect();
        let cmTop = ((y * dpr * 2.54) / ppi);
        let cmBottom = (((y + height) * dpr * 2.54) / ppi);
        let cmLeft = ((x * dpr * 2.54) / ppi);
        // console.log(el, cmLeft, cmTop);
        if((9.25 * dpr) <= cmLeft && 
            (0 <= cmTop && cmTop <= (7.25 * dpr)) ||
            (0 <= cmBottom && cmBottom <= (7.25 * dpr)) 
        ){
            /* put what to do with the ads here */
            console.log("AD");
        }
    });
});
