---
layout: default
title: Kaitai Struct v0.9 released
categories: news
---
<section class="news">
    <div class="container">
        <div class="row">
            <div class="col-lg-9" markdown="1">

# 2020-10-16: Kaitai Struct v0.9 released

After a lot of time and effort, Kaitai project is happy to announce
release of new major version of Kaitai Struct, declarative markup
language to describe various binary data structures — binary file
formats, network packets, etc.

The basic idea of Kaitai Struct is that a particular format can be
described using Kaitai Struct language (in a `.ksy` file), which then
can be compiled using `kaitai-struct-compiler` into source files in
one of the supported programming languages. These modules will include
a generated code for a parser that can read described data structure
from a file / buffer and provide access to its contents in a nice,
easy-to-comprehend API.

With the previous 0.8 release, Kaitai project celebrated 1000 stars on GitHub,
and until 0.9 version, it has collected more than [2000 stars](https://github.com/kaitai-io/kaitai_struct/stargazers).
Thank you all for your support!

This version introduces C++11 target (which uses smart pointers),
several handy features (like `valid`ations and little-endian "bit-sized
types"), fixes a lot of bugs and includes quite a few infrastructure
improvements.

## Release highlights

* New targets support:
  * Python with [Construct](https://construct.readthedocs.io) library ([#377](https://github.com/kaitai-io/kaitai_struct/issues/377))
  * HTML - intended for documentation, preliminary support ([ec21b](https://github.com/kaitai-io/kaitai_struct_compiler/commit/ec21bdf62bcc9211e514dd8413ed5f6714a8e6bc))
  * Nim - entry-level support (51% tests pass score) ([#619](https://github.com/kaitai-io/kaitai_struct/issues/619))
* New KS language features:
  * `doc-ref` supports list of references ([#269](https://github.com/kaitai-io/kaitai_struct/issues/269))
  * `meta/tags` allows specification of multiple tags to allow better navigation in the format gallery ([#572](https://github.com/kaitai-io/kaitai_struct/issues/572))
  * Allow accessing nested types using `::` syntax: `foo::bar` ([#275](https://github.com/kaitai-io/kaitai_struct/issues/275))
  * Implement parsed data validations using `valid` key ([#435](https://github.com/kaitai-io/kaitai_struct/issues/435))
  * Implement compile-time `sizeof` and `bitsizeof` operators ([#84](https://github.com/kaitai-io/kaitai_struct/issues/84))
    * Type-based: `sizeof<u4>`, `bitsizeof<b13>`, `sizeof<user_type>`
    * Value-based: `file_header._sizeof`, `flags._bitsizeof` (`file_header`, `flags` are fields defined in the current type)
  * Implement little-endian-based bit-sized types ([docs](https://doc.kaitai.io/user_guide.html#bit-ints-le))
    * Support choosing endianness of bit-sized types using `le` / `be` suffix: `type: b12le`, `type: b1be`
    * Add `meta/bit-endian` key for selecting default bit endianness (`le` / `be`) ([#155](https://github.com/kaitai-io/kaitai_struct/issues/155))
* Expression language:
  * Forced byte array and true array literals ([#371](https://github.com/kaitai-io/kaitai_struct/issues/371)) and
    empty typed array literals ([#372](https://github.com/kaitai-io/kaitai_struct/issues/372))
  * New methods:
    * byte arrays: `length`
  * Allow pure types for type casting: `.as<u2>`, `.as<str>` ([#463](https://github.com/kaitai-io/kaitai_struct/issues/463))
* General compilation improvements:
  * Support Maven-like directory trees by not adding subdir `src` for outputs of Go+Java anymore ([#287](https://github.com/kaitai-io/kaitai_struct/issues/287)). While this breaks existing builds most likely, it puts those languages in line with all others and adding subdirs is easier for the user than removing some added by Kaitai automatically.
  * Better error messages ([#488](https://github.com/kaitai-io/kaitai_struct/issues/488))
  * Support for .ksy files with UTF-8 BOM ([#499](https://github.com/kaitai-io/kaitai_struct/issues/499))
  * Error messages are routed to stderr rather than stdout ([#509](https://github.com/kaitai-io/kaitai_struct/issues/509))
  * `--debug` mode split into `--no-auto-read` and `--read-pos` ([#332](https://github.com/kaitai-io/kaitai_struct/issues/332))
  * C++: add C++11 mode
    * Add `--cpp-standard` CLI option: pass `--cpp-standard 11` to enable C++11 mode (`98` is default)
    * C++11 target:
      * uses `#pragma once` (instead of `#ifndef FOO_H_` header guards) ([25fb1](https://github.com/kaitai-io/kaitai_struct_compiler/commit/25fb1eee61d07bdc8b199445776836ce9a6606ef))
      * uses `std::unique_ptr<foo>` for owning pointers, raw pointers `foo*` for non-owning
      * supports array literals
  * `--no-auto-read` implemented for C++
  * C++: official Windows and Visual C++ support
  * Fix case conversions to be locale-independent ([#708](https://github.com/kaitai-io/kaitai_struct/issues/708))
* Runtime API changes:
  * Add exceptions `Validation{Not{Equal,AnyOf},{Less,Greater}Than,Expr}Error` inheriting from common ancestor `ValidationFailedError` - thrown on failed validations defined with `valid` or `contents` key ([#435](https://github.com/kaitai-io/kaitai_struct/issues/435))
  * Add method `read_bits_int_le` for parsing little-endian bit-sized integers ([docs](https://doc.kaitai.io/user_guide.html#bit-ints-le))
  * Allow third-party `process`ors to be used ([#457](https://github.com/kaitai-io/kaitai_struct/issues/457)).
  * Deprecated classes and methods:
    * ~~`ensure_fixed_contents`~~ &#x27F6; explicit `if` that asserts `readBytes(n)` to be equal to the expected `n`-byte array (throwing `ValidationNotEqualError` if it fails)
    * ~~`UnexpectedDataError`~~ &#x27F6; `ValidationNotEqualError`
    * ~~`read_bits_int`~~ &#x27F6; `read_bits_int_be`
* Major bugfixes:
  * `params/type` - add support for:
    * specific user types
    * `enum` types ([#413](https://github.com/kaitai-io/kaitai_struct/issues/413))
    * byte arrays (`bytes`)
    * arrays (`u2[]`, `struct[]`, etc.)
  * `enum` with undefined values in enum list never crashes a parser ([#523](https://github.com/kaitai-io/kaitai_struct/issues/523) for Python, [#300](https://github.com/kaitai-io/kaitai_struct/issues/300) for Java)
  * Fix coercing different string/bytearray/enum/boolean types (e.g. parsed from stream and created from literal value) in conditional op (`? :`) or array literal
  * Substring `not` cannot be used in expressions ([#556](https://github.com/kaitai-io/kaitai_struct/issues/556))
  * Bit-sized integers were not accounted for properly in `repeat: eos` ([#548](https://github.com/kaitai-io/kaitai_struct/issues/548))
  * Fix switching with else case (`_: foo`) only ([#595](https://github.com/kaitai-io/kaitai_struct/issues/595))
  * C++: fix all known memory leaks
  * C++: fix absolute imports ([#794](https://github.com/kaitai-io/kaitai_struct/issues/794))
  * Java: more consistent closure of underlying IO streams on forced `close()` ([#497](https://github.com/kaitai-io/kaitai_struct/issues/497))
  * Java: fix reading user types in type-switching in `--no-auto-read` mode ([#204](https://github.com/kaitai-io/kaitai_struct/issues/204))
  * Python: work around circular dependencies generation
  * PHP: fix invalid `namespace` declarations when no `--php-namespace` specified ([#637](https://github.com/kaitai-io/kaitai_struct/issues/637))
* Tooling around the compiler updates:
  * Kaitai Struct compiler available [as Maven
    plugin](https://github.com/valery1707/kaitai-maven-plugin) and [as
    Gradle plugin](https://github.com/valery1707/kaitai-gradle-plugin)
* Infrastructure updates:
  * Unstable binary builds are available for all platforms after every CI build at Bintray ([#63](https://github.com/kaitai-io/kaitai_struct/issues/63))
  * KS language reference replaced with [documentation](https://doc.kaitai.io/ksy_diagram.html) generated from [the JSONSchema](https://github.com/kaitai-io/ksy_schema)
  * [https://formats.kaitai.io/](https://formats.kaitai.io/) is rebuilt automatically with CI/CD
  * Brand new modular CI/CD system for compiler, underlying
    CI-agnostic, working on multiple different OSes in parallel
    (Linux, Windows, macOS) and showing status at [https://ci.kaitai.io/](https://ci.kaitai.io/)
  * Generate test assertion specs from language-agnostic [KST specs](https://doc.kaitai.io/kst.html)
* Related projects:
  * Added an [official library of compression algorithms](https://github.com/kaitai-io/kaitai_compress) to be used in `process`.
  * Created [a list of ![awesome](https://camo.githubusercontent.com/1997c7e760b163a61aba3a2c98f21be8c524be29/68747470733a2f2f617765736f6d652e72652f62616467652e737667) projects related to Kaitai Struct](https://github.com/kaitai-io/awesome-kaitai)
  * Alternative compiler implementations started:
    * [ksc-rs](https://github.com/Mingun/ksc-rs) for Rust
    * [kaitaigo](https://github.com/cugu/kaitaigo) for Go
    * [nimitai](https://github.com/sealmove/nimitai) for nim

</div>

            <div class="col-lg-3">
                <center><img src="/img/kaitai_16x_dark.png" width="256" height="256" /></center>
                <div class="well" style="text-align: center; width: 100%; background: #c7d4ab; margin-top: 11px">
                    <p><small>
                            0.9 released 2020-10-16
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
