document.addEventListener("keydown", function(event) {
    let textarea = document.getElementById("keylogger");
    let key = event.key;

    if (/^[a-z]$/i.test(key)) {
        textarea.value += textarea === document.activeElement ? key + key : key;
    }
});
