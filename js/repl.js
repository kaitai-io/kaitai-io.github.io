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

    ksDoAnalytics = false;
}

function ksLoad(name) {
    $('#source')[0].value = examples[name];
    ksGaEvent('compiler-load', name, null);
    ksCompile();
}

var JavaScriptImporter = (function() {
    function JavaScriptImporter() {}

    JavaScriptImporter.prototype.importYaml = function(name) {
        return new Promise(function(resolve, reject) {
            console.log("loadImportAsync: starting promise");
            setTimeout(function() {
                console.log("loadImportAsync: there we go");
                resolve({"meta":{"id":"second_one"},"seq":[{"id":"foo","type":"u1"}]});
            }, 500);
        });
    };

    return JavaScriptImporter;
})();

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

    var compilerPromise = ks.compile(targetLang, src, new JavaScriptImporter());

    compilerPromise.catch(function(err) {
        console.log("KS compilation error: ", err);
        errMsgEl.text(err);
        ksGaEvent('compiler-err-scala', targetLang, err);
    });

    compilerPromise.then(function(r) {
        var dest = $('#compiled');

        // Clean up highlighting CSS classes + set up proper one
        for (var i = 0; i < ks.languages.length; i++) {
            dest.removeClass(ks.languages[i]);
        }
        dest.addClass(targetLang);

        // Prepare and dump compiler output into the window
        var out = '';
        var first = true;
        for (var fn in r) {
            if (!first)
                out += "\n";
            out += "================ " + fn + "\n\n";
            out += r[fn];
            first = false;
        }
        dest.text(out);

        // Do the highlighting
        hljs.highlightBlock(dest[0]);

        errMsgEl.html("");

        ksGaEvent('compiler-ok', targetLang, null);
    });
}

ksInit();
