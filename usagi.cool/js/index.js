if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('selectstart', function (e) {
    e.preventDefault();
});

document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
        document.querySelector('.loading').style.display = 'none';
        document.body.style.overflow = 'scroll';
    }
};
