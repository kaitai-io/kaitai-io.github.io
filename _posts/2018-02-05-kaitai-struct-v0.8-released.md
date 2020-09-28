---
layout: default
title: Kaitai Struct v0.8 released
categories: news
---
<section class="news">
    <div class="container">
        <div class="row">
            <div class="col-lg-9" markdown="1">
# 2018-02-05: Kaitai Struct v0.8 released

After a long period of silence, Kaitai project is happy to announce
release of new major version of Kaitai Struct, declarative markup
language to describe various binary data structures — binary file
formats, network stream packets, etc.

The basic idea of Kaitai Struct is that a particular format can be
described using Kaitai Struct language (in a `.ksy` file), which then
can be compiled using `kaitai-struct-compiler` into source files in
one of the supported programming languages. These modules will include
a generated code for a parser that can read described data structure
from a file / stream and provide access to its contents in a nice,
easy-to-comprehend API.

This release celebrates 1000 stars achieved by [Kaitai Struct at
GitHub](https://github.com/kaitai-io/kaitai_struct/), and sports a
brand new logo designed by [Verneri
Kontto](https://twitter.com/vervalkon). Thanks for all our users, and
many thanks to Verneri for designing it!

Also, with this release we're happy to announce collaboration between
Kaitai Struct and [Construct](https://construct.readthedocs.io/),
Python declarative parser/builder.

## Release highlights

* New target languages:
  * Lua (96% tests pass score)
  * initial support for Go (15% tests pass score)
* New ksy features:
  * Switchable default endianness: `meta/endian` can now contain a
    switch-like structure (with `switch-on` and `cases`), akin to
    switchable types
    ([docs](//doc.kaitai.io/user_guide.html#calc-endian)).
  * Parametric user-defined types: one can use `type: my_type(arg1,
    arg2, arg3)` to pass arguments into user type
    ([docs](//doc.kaitai.io/user_guide.html#param-types)).
  * Custom processing types: one can use `process:
    my_process_name(arg1, arg2, arg3)` to invoke custom processing
    routine, implemented in imperative language
    ([docs](//doc.kaitai.io/user_guide.html#custom-process)).
  * In repetitions, index of current repetition can be accessed using
    `_index` in expressions
    ([docs](//doc.kaitai.io/user_guide.html#repeat-index)).
  * Verbose enums: now one can specify documentation and other useful
    information relevant to enums using verbose enum declaration
    format
    ([docs](//doc.kaitai.io/user_guide.html#verbose-enums)).
  * `meta/xref` key can be used for adding cross-references of a
    format specifications (like relevant RFC entries, Wikidata
    entries, ISO / IEEE / JIS / DIN / GOST standard numbers, PRONOM
    identifiers, etc).
* General compilation improvements:
  * Imports/includes for all languages are now managed properly, no
    duplicate / unnecessary imports should be added
  * Python: basic docstring support
  * More strict ksy precompile checks (less likely to accept ksy that
    will result in non-compilable code), better error messages
* CLI options:
  * Python target now allows to specify package with `--python-package`
  * Java target now allows custom KaitaiStream implementations and
    thus allows to specify default implementation for `fromFile(...)`
    using `--java-from-file-class`.
* Expression language:
  * New methods:
    * floats: `to_i`
    * arrays: `min`, `max`
  * Added byte array comparison
* Packaging / infrastructure improvements:
  * ksc is now available as
    [npm package](https://www.npmjs.com/package/kaitai-struct-compiler/),
    which became a build dependency of a
    [web IDE](https://ide.kaitai.io/)
* Runtime API changes:
  * C++: now requires `KS_STR_ENCODING_ICONV` or
    `KS_STR_ENCODING_NONE` to be defined to know how to handle string
    encodings
  * Java: `KaitaiStream` is now an interface, and there are two
    distinct classes which implement it:
    * `ByteBufferKaitaiStream` provides KaitaiStream backed
      `ByteBuffer` (and thus using memory-mapped files)
    * `RandomAccessFileKaitaiStream` provides KaitaiStream backed by
      `RandomAccessFile` (and thus uses normal OS read calls, as it
      was done in older KaitaiStruct circa v0.5)
  * JavaScript: Error classes became subclasses of `KaitaiStream` and
    were renamed in the following way: `KaitaiUnexpectedDataError` ->
    `KaitaiStream`.`UnexpectedDataError`.
* Major bugfixes:
  * C++: adjusted to made compatible with OS X and Windows MSVC builds
  * Fixed broken generation of byte array literals with high 8-bit set
    in some targets
  * Fixed float literals parsing, fixed larger integer keys YAML parsing
  * Fixed inconsistency of debug mode vs non-debug mode behavior for
    `repeat-*`
  * Fixed chain of relative imports bug: now all relative imports work
    always relative to the file being processed, not to current
    compiler's dir
  * Many problems with switching: invalid common type inferring,
    invalid code being generated, added failsafe `if`-based
    implementations for languages which do not support switching over
    all possible types.
  * Fixed most memory leaks in C++ (only exception-related leaks are
    left now)
</div>

            <div class="col-lg-3">
                <center><img src="/img/kaitai_16x_dark.png" width="256" height="256" /></center>
                <div class="well" style="text-align: center; width: 100%; background: #c7d4ab; margin-top: 11px">
                    <p><small>
                            0.8 released 2018-02-05
                    </small></p>
                    <p>
                        <a href="/index.html#download" class="btn btn-primary">Download <i class="fa fa-download"></i></a>
                    </p>
                    <p>
                        <a href="https://ide.kaitai.io/" class="btn btn-success">Try it in Web IDE <i class="fa fa-gears"></i></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
