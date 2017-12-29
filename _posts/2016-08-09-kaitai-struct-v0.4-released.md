---
layout: default
title: Kaitai Struct v0.4 released
redirect_from: "/news/2016-08-09.html"
categories: news
extra_footer: |
  <script src="/js/scroller.js"></script>
---
<section class="news">
    <div class="container">
        <div class="row">
            <div class="col-lg-9">

                <h1>2016-08-09: Kaitai Struct v0.4 released</h1>

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
                    <li>Languages support:</li>
                    <ul>
            <li>New target language, fully supported: C# (modules should be usable all across the .NET platform, i.e. from C++/CLI, VB.NET, F#, etc.</li>
            <li>Preliminary support for C++ (with STL containers / IO implementation) — note that not all features are implemented.</li>
            <li>Existing support: Java, JavaScript, Python, Ruby.</li>
        </ul>
        <li>Data types:</li>
        <ul>
            <li>Floating point data types support (available as <code>f4</code> and <code>f8</code> for single and double precision IEEE754 floats)</li>
            <li>Separate data type for byte arrays (including support for literal byte arrays)</li>
        </ul>
        <li>Expressions language:</li>
        <ul>
            <li>Added new testing framework for expression translators</li>
            <li>Added <code>.first</code> and <code>.last</code> for arrays (getting first and last element of array)</li>
            <li>Added <code>.to_i</code> for strings (string -> int conversion)</li>
            <li>Support for accessing _io object (IO stream) to access current stream's size (<code>_io.size</code>)</li>
        </ul>
        <li>Processing: extended "xor" processing to support XORing with multi-byte keys</li>
        <li>Runtime libraries:</li>
        <ul>
            <li>Lots of cleanup - now all libraries try to follow the same strict standard (with method naming, parameters, order of methods, etc).</li>
            <li>JavaScript: implemented full streaming API (both signed & unsigned integer, ensuring fixed contents fields, approximated 64-bit integers, etc).</li>
        </ul>
                </ul>

            </div>

            <div class="col-lg-3" style="height: 434px">
                <div id="scroller" style="width: 100%; height: 284px">
                    <div id="pane1"></div>
                    <div id="pane2"></div>
                </div>
                <div class="well" style="text-align: center; width: 100%; background: #c7d4ab; margin-top: 11px">
                    <p><small>
                            0.4 released 2016-08-09
                    </small></p>
                    <p>
                        <a href="../index.html#download" class="btn btn-primary">Download <i class="fa fa-download"></i></a>
                    </p>
                    <p>
                        <a href="../repl/index.html" class="btn btn-success">Try in browser <i class="fa fa-gears"></i></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
