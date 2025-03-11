window.addEventListener("scroll", function() {
    let footer = document.getElementById("footer");
    
    let scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    let scrollProgress = (window.scrollY / scrollTotal) * 100;

    footer.style.backgroundColor = `hsl(${scrollProgress}, 100%, 50%)`;
});
