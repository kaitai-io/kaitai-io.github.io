function ksInit() {
    var ks = io.kaitai.struct.MainJs();
    var langs = '';

    for (var i = 0; i < ks.languages.length; i++) {
        var lang = ks.languages[i];
        langs += "<option value=\"" + lang + "\">" + lang + "</option>";
    }

    $('#target_lang').html(langs);

    // Set some nice default
    $('#target_lang')[0].value = 'java';
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

    if (r.length == 2) {
        dest.text("// ================ HEADER\n\n" + r[1] + "\n// ================ SOURCE\n\n" + r[0]);
    } else {
        dest.text(r[0]);
    }
    hljs.highlightBlock(dest[0]);

    errMsgEl.innerHTML = "";
}

ksInit();
