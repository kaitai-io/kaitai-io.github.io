$(document).ready(function() {
    function genOne() {
        var x = Math.floor(Math.random() * 256);
        var s = x.toString(16).toUpperCase();
        return x < 0x10 ? "0" + s : s;
    }

    function genRow(n) {
        var s = "<div>";
        for (var i = 0; i < n; i++) {
            if (Math.random() < 0.1) {
                s += "<span>"
                s += genOne();
                s += "</span>"
                s += " ";                
            } else {
                s += genOne();
                s += " ";
            }
        }
        s += "</div>";
        return s;
    }

    function genPane() {
        var s = "<div>";
        for (var i = 0; i < 20; i++) {
            s += genRow(12);
            s += " ";
        }
        s += "</div>";
        return s;        
    }

    var pane1 = $('#pane1');
    var pane2 = $('#pane2');
    
    pane1.html(genPane());
    pane2.html(genPane());

    var spans1 = $('span', pane1);
    var spans2 = $('span', pane2);

    var h = pane1.height();
    var pos = 0;

    function animate() {
        if (pos < -h) {
            pane1[0].style.top = "" + (2 * h + pos) + "px";
        } else {
            pane1[0].style.top = "" + pos + "px";
        }
        pane2[0].style.top = "" + (h + pos) + "px";
        pos--;
        if (pos < -2*h) {
            pos = 0;
        }

        if (Math.random() < 0.05)
            triggerFx();
    }

    function triggerFx() {
        var spans = (Math.random() < 0.5) ? spans1 : spans2;
        var span = spans[Math.floor(Math.random() * spans.length)];
        $(span).addClass('fx');
        console.log(span);
    }

    animate();
    setInterval(animate, 60);
});
