console.log('login script loaded');

const allBtnSHP = document.getElementById('btn-show-hide-pwd');
console.log(allBtnSHP)


const forElement = document.getElementById('password');
console.log(forElement)
if (forElement && forElement instanceof HTMLInputElement) {

    ["mousedown", "touchstart"].forEach((eventName) => {
        allBtnSHP.addEventListener(eventName, () => {
            forElement.setAttribute("type", "text");
        });
    });
    ["mouseup", "mouseleave", "touchend", "touchcancel"].forEach((eventName) => {
        allBtnSHP.addEventListener(eventName, (e) => {
            e.preventDefault();
            forElement.setAttribute("type", "password");
        })

    });
}