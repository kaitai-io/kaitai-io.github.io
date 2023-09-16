---
layout: default
title: Kaitai Struct v0.7 released
redirect_from: "/news/2017-03-22.html"
categories: news
extra_footer: |
  <script src="/js/scroller.js"></script>
---
<section class="news">
    <div class="container">
        <div class="row">
            <div class="col-lg-9">

                <h1>2017-03-22: Kaitai Struct v0.7 released</h1>

                <p>
                    Kaitai project is happy to announce release of new major
                    version of Kaitai Struct, declarative markup language to
                    describe various binary data structures — binary file
                    formats, network stream packets, etc.
                </p>

                <p>
                    The basic idea of Kaitai Struct is that a
                    particular format can be described using
                    Kaitai Struct language (in a <code>.ksy</code>
                    file), which then can be compiled
                    using <code>ksc</code> into source files in
                    one of the supported programming
                    languages. These modules will include a
                    generated code for a parser that can read
                    described data structure from a file / stream
                    and provide access to its contents in a nice,
                    easy-to-comprehend API.
                </p>

                <h2>Release highlights</h2>

<ul>
<li>New ksy features:
<ul>
<li>Type importing system: <code>meta/imports</code> can be used to import other types as first-class citizens in current compilation unit; &quot;opaque types&quot; are now disabled by default (see below)</li>
<li>Byte-terminated notation (<code>terminator</code>, <code>include</code> and <code>consume</code>) can be now used not only for strings, but also for any byte types and user types</li>
<li><code>pad-right</code> to remove declare excess right padding (usually with 0s)</li>
<li>User types can now use <code>parent: expression</code> to enforce a specific parent for an object, or <code>parent: false</code> to disable parenting at all (and, subsequently, remove it from parent type inferring process)</li>
<li>Type inferring: value instances are now allowed to use <code>_parent</code></li>
<li><code>doc-ref</code> to add references to external documentation for types / attributes</li>
</ul></li>
<li>Improved compilation process:
<ul>
<li>Compilation is now clearly separated in 3 phases: YAML parsing, precompilation, compilation. Phases 1 and 2 are language-agnostic and &quot;precompilation&quot; now does all possible sanity checks preliminary, making sure that language-specific &quot;compilation&quot; doesn't have to deal with invalid data.</li>
<li>Improved compilation results reporting: now all error messages reported by compiler have file / code location and proper user-readable text. Added more than 50 tests for erroneous input files. Exceptions thrown directly are considered a compiler bug from now on.</li>
<li>Generated code now checks for runtime library version compatibility and fails to compile / run with non-compliant runtime</li>
</ul></li>
<li>Command-line compiler options:
<ul>
<li><code>--opaque-types=true</code> to enable opaque types (disabled by default, i.e. using unknown type would be treated as error)</li>
<li><code>--verbose</code> now allows fine-tuned verbose logging for various compiler's subsystems; using <code>--verbose=all</code> exposes a lot of internal logic.</li>
<li><code>--ksc-json-output</code> to dump compilation results in machine-readable JSON format (simplifies ksc integration in other tools, like visualizers)</li>
</ul></li>
<li>Console visualizer: faster loading, automatic handling of imports (no more need to specify all .ksy files manually on invocation)</li>
<li>Expression language:
<ul>
<li>Two string types: single quotes (verbatim), double quotes (interpolating with escape characters)</li>
<li>New type casting operator: <code>.as&lt;foo&gt;</code></li>
<li>New methods:
<ul>
<li>arrays: <code>size</code></li>
<li>booleans: <code>to_i</code></li>
<li>byte arrays: <code>to_s(encoding)</code></li>
<li>enums: <code>to_i</code></li>
<li>strings: <code>reverse</code></li>
</ul></li>
</ul></li>
<li>Runtime API changes:
<ul>
<li>All bytearray to string functions are named <code>bytes_to_str</code> in all languages</li>
<li>Added <code>read_bytes_term</code> (akin to what <code>read_str_term</code> did previously to strings)</li>
<li>Removed <code>read_str_*</code> methods, they are to be replaced now with combination of <code>read_bytes_*</code> + <code>bytes_to_str</code></li>
<li>Added <code>bytes_strip_right</code> and <code>bytes_terminate</code></li>
<li>Perl module now uses <code>IO::KaitaiStruct</code> package name (instead of <code>Kaitai</code>)</li>
</ul></li>
<li>Major bugfixes:
<ul>
<li>Recursive top-level types</li>
<li>Unaligned bits reading with enums on top of bit-level integers</li>
<li><code>repeat-until</code> handling with substreams</li>
</ul></li>
</ul>

            </div>

            <div class="col-lg-3" style="height: 434px">
                <div id="scroller" style="width: 100%; height: 284px">
                    <div id="pane1"></div>
                    <div id="pane2"></div>
                </div>
                <div class="well" style="text-align: center; width: 100%; background: #c7d4ab; margin-top: 11px">
                    <p><small>
                            0.7 released 2017-03-22
                    </small></p>
                    <p>
                        <a href="/#download" class="btn btn-primary">Download <i class="fa fa-download"></i></a>
                    </p>
                    <p>
                        <a href="https://ide.kaitai.io/" class="btn btn-success">Try it in Web IDE <i class="fa fa-gears"></i></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
