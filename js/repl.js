function ksInit() {
    var ks = io.kaitai.struct.MainJs();
    var langs = '';

    for (var i = 0; i < ks.languages.length; i++) {
        var lang = ks.languages[i];
        langs += "<option value=\"" + lang + "\">" + lang + "</option>";
    }

    $('#target_lang').html(langs);
}

function ksCompile() {
    var ks = io.kaitai.struct.MainJs();

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
    var r = ks.compile(targetLang, src);

    var dest = $('#compiled');
    for (var i = 0; i < ks.languages.length; i++) {
        dest.removeClass(ks.languages[i]);
    }
    dest.addClass(targetLang);

    dest.text(r);
    hljs.highlightBlock(dest[0]);

    errMsgEl.innerHTML = "";
}

ksInit();
