var items = document.getElementsByTagName('li');
var itemArray = Array.prototype.slice.call(items);

itemArray.forEach(function(element) {
    element.addEventListener('mouseover', function(event) {
        element.style.background = '#0091EA';
    });

    element.addEventListener('mouseleave', function(event) {
        element.style.background = '#000000';
    });

    element.addEventListener('click', function(event) {
        element.textContent = 'CCC';
    });
});