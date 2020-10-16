---
layout: default
title: Kaitai Struct v0.6 released
redirect_from: "/news/2017-02-04.html"
categories: news
extra_footer: |
  <script src="/js/scroller.js"></script>
---
<section class="news">
    <div class="container">
        <div class="row">
            <div class="col-lg-9">

                <h1>2017-02-04: Kaitai Struct v0.6 released</h1>

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

                <p>Note that this release is dedicated
                to <a href="https://fosdem.org/2017/">FOSDEM 2017
                conference</a>. If you happen to be there, don't
                miss <a href="https://fosdem.org/2017/schedule/event/om_kaitai/">a
                talk on Kaitai Struct</a> on Sunday, February, 5th
                in room K.3.401 (Open Media devroom). Even if you
                aren't at FOSDEM in person, you can still view the
                real-time video broadcast.</p>

                <h2>Release highlights</h2>

<ul>
<li>Unaligned bit parsing support
<ul>
<li>Use <code>type: b12</code> to parse 12 bits as integer from a stream (obviously, one can use <code>b1</code>, <code>b2</code>, <code>b3</code>, etc)</li>
<li><code>b1</code> is parsed as a boolean value</li>
<li>If several <code>bXX</code> are chained in a sequence, can be used to parse bit masks/fields</li>
<li>Using of regular types (i.e. <code>u1</code>, <code>s4</code>, <code>str</code>, etc) starts parsing normally, aligning to next byte</li>
</ul>
<li>More meta information, documentation and non-standard keys usage:
<ul>
<li><code>doc</code> for docstrings is allowed on type level</li>
<li><code>meta</code> can now include:
<ul>
<li><code>title</code> (to give proper full title for type)</li>
<li><code>license</code> (to specify work licensing)</li>
<li><code>ks-version</code> (to specify minimal version of Kaitai Struct compiler that must be used to process a .ksy - i.e. <code>0.6</code>)</li>
<li><code>ks-debug</code> (to enforce generation of classes as if <code>--debug</code> mode was specified in command line)</li>
</ul>
</li>
<li><code>meta</code> is non-global now, but can be used on multiple levels and inherited from closest one</li>
<li>Non-(yet)-standard keys can be used everywhere now using <code>-key</code> syntax: for example, Web IDE uses <code>-webide-representation</code> key which is ignored by the compiler, but useful for clearer debugging</li>
</ul>
</li>
<li>Enums are proper first-class citizens now: <code>enum: XXX</code> specifications are not just strings, but proper references to declared enums, thus they're checked for validity, can reference upper level nested enums from lower levels, etc - this fixes majority of existing enum namespacing problems in JavaScript, Python, PHP and Perl</li>
<li><code>id</code> in <code>seq</code> elements in now optional: it can be useful for quick exploration mapping (one can always assign identifiers later), or for unused ("reserved for later use") attributes - such attributes would be assigned numbered IDs automatically</li>
<li>Allow value instances to use <code>if</code> and <code>enum</code></li>
<li>Proper support for "opaque" external types: one can use an undeclared data type, it's expected to be declared in some other .ksy file and it will be properly imported/included in current file</li>
<li>Expression language:
<ul>
<li>Support for integer literals with underscores for readability: one can use stuff like <code>123_456_789</code> or <code>0b0101_0011</code> now</li>
<li><code>to_s</code> method for integer types to convert them to strings</li>
</ul>
</li>
<li>Language-specific improvements:</li>
<ul>
<li>C++: clearly separated "null" (no result, for example, due to failed <code>if</code> condition) and "not yet calculated" results - introduced <code>_is_null_XXX()</code> method for check for true null result in generated API</li>
<li>JavaScript: generated enums can be queried for both ID => name and name => ID</li>
<li>PHP: dropped type generation for now due to nullable types - one day they might return strictly for PHP 7.1+</li>
<li>GraphViz: major compatibility fixes, diagram readability improvements, support for switch types</li>
</ul>
</li>
<li>Runtime API changes:
<ul>
<li><code>ensure_fixed_contents</code> no longer requires both expected byte array and its length, only array is required</li>
<li>Java: all methods no longer use checked exceptions, i.e. <code>IOException</code></li>
</ul>
</li>
<li>Bugfixes:
<ul>
<li>Type derivation of parent types when using switched <code>type</code>, array types, and type combining on switching / ternary operators</li>
<li>Multiple translator fixes: type derivation, parenthesis generation</li>
<li>Assorted code generation bugfixes in C++, Python, Ruby</li>
</ul>
</li>
<li>Refactorings and optimizations:
<ul>
<li>Type derivation engine</li>
<li>Parse instances use more optimal order of conditionals / debug / IO management applications</li>
<li>Improved error messages</li>
</ul>
</li>
</ul>

            </div>

            <div class="col-lg-3" style="height: 434px">
                <div id="scroller" style="width: 100%; height: 284px">
                    <div id="pane1"></div>
                    <div id="pane2"></div>
                </div>
                <div class="well" style="text-align: center; width: 100%; background: #c7d4ab; margin-top: 11px">
                    <p><small>
                            0.6 released 2017-02-04
                    </small></p>
                    <p>
                        <a href="/#download" class="btn btn-primary">Download <i class="fa fa-download"></i></a>
                    </p>
                    <p>
                        <a href="../repl/index.html" class="btn btn-success">Try in browser <i class="fa fa-gears"></i></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
