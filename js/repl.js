// Generic analytics event registration function; should never fail -
// even if GA is disabled by AdBlock or failed to load anyhow.
function ksGaEvent(s1, s2, s3, s4 = 0) {
    if (window.ksDoAnalytics) {
        try {
//          console.debug("GA try: (", s1, "/", s2, "/", s3, "/", s4, ")");
            ga('send', 'event', s1, s2, s3, s4);
        } catch (err) {
            console.error("GA error: (", s1, "/", s2, "/", s3, "/", s4, "): ", err);
        }
    } else {
//      console.debug("GA ignoring: (", s1, "/", s2, "/", s3, "/", s4, ")");
    }
}

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

    // Set up some analytics
    $('#target_lang').change(function() {
        var targetLang = document.getElementById("target_lang").value;
        ksGaEvent('compiler-select-lang', targetLang, null);
    });

    // Set up examples list
    var exList = '';
    examples = {};
    $('.example').each(function(i, el) {
        var name = $(el).data('name');
        examples[name] = $(el).text();
        if (i > 0)
            exList += ", ";
        exList += "<span onclick=\"ksLoad('" + name + "')\">" + name + "</span>";
    });

    $('#examples').html(exList);

    ksLoad("DOS MZ", false);

    ksDoAnalytics = true;
}

function ksLoad(name) {
    $('#source')[0].value = examples[name];
    ksGaEvent('compiler-load', name, null);
    ksCompile();
}

function ksCompile() {
    var ks = io.kaitai.struct.MainJs();

    var errMsgEl = $("#err_msg");
    var targetLang = document.getElementById("target_lang").value;
    var srcYaml = document.getElementById("source").value;

    try {
        var src = YAML.parse(srcYaml);
    } catch (err) {
        console.log("YAML parsing error: ", err);
        errMsgEl.text(err);
        ksGaEvent('compiler-err-yaml', targetLang, err);
        return;
    }

    try {
        var r = ks.compile(targetLang, src);
    } catch (err) {
        console.log("KS compilation error: ", err);
        errMsgEl.text(err);
        ksGaEvent('compiler-err-scala', targetLang, err);
        return;
    }

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

    errMsgEl.html("");

    ksGaEvent('compiler-ok', targetLang, null);
}

ksInit();
