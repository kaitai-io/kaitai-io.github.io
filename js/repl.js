function ksInit() {
}

function ksCompile() {
    var errMsgEl = document.getElementById("err_msg")
    var targetLang = document.getElementById("target_lang").value;
    var srcYaml = document.getElementById("source").value;
    try {
        var src = YAML.parse(srcYaml);
    } catch (err) {
        console.log(err);
        errMsgEl.innerHTML = err;
        return;
    }
    var r = io.kaitai.struct.MainJs().compile(targetLang, src);

    var dest = $('#compiled');
    dest.removeClass('java');
    dest.removeClass('javascript');
    dest.removeClass('python');
    dest.removeClass('ruby');
    dest.addClass(targetLang);

    dest.text(r);
    hljs.highlightBlock(dest[0]);

    errMsgEl.innerHTML = "";
}
