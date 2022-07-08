---
layout: default
title: Kaitai Struct v0.10 released
categories: news
---
<section class="news">
    <div class="container">
        <div class="row">
            <div class="col-lg-9" markdown="1">

# 2022-07-08: Kaitai Struct v0.10 released

Kaitai project is happy to announce release of new major version of
Kaitai Struct, declarative markup language to describe various binary
data structures — binary file formats, network stream packets, etc.

The basic idea of Kaitai Struct is that a particular format can be
described using Kaitai Struct language (in a `.ksy` file), which then
can be compiled using `kaitai-struct-compiler` into source files in
one of the supported programming languages. These modules will include
a generated code for a parser that can read described data structure
from a file / stream and provide access to its contents in a nice,
easy-to-comprehend API.

This release celebrates reaching [3000
stars](https://github.com/kaitai-io/kaitai_struct/stargazers) on
GitHub. It doesn't bring new language features, but improves a number
of existing aspects to provide a better experience when using Kaitai
Struct in your projects.

## Release highlights

* General compilation improvements:
  * Prevent referring to non-existent enum members as <code>my_enum::<del>unknown_member</del></code> ([8dcd1be](https://github.com/kaitai-io/kaitai_struct_compiler/commit/8dcd1be8ee2dd87b7637a2d01b0bf65e1c2e932f))
  * Prevent duplicate member names in enum definition ([1cbaff9](https://github.com/kaitai-io/kaitai_struct_compiler/commit/1cbaff9be2a1fd6b9b2196e46be7c96ac4f87290)) — they're incompatible with the concept of enum in all target languages
  * Ensure that IDs of `params` are unique and don't collide with `seq` fields or `instances` within a type ([#923](https://github.com/kaitai-io/kaitai_struct/issues/923))
  * Allow whitespace in type invocation: even `type: ' nested :: type ( 1 + 2 , data ) '` now works ([#792](https://github.com/kaitai-io/kaitai_struct/issues/792))
  * Add style warnings reporting non-standard names for size fields (should use `len_` + subject) and repeat count fields (should use `num_` + subject) — see [style guide](https://doc.kaitai.io/ksy_style_guide.html#attr-id)
    * they are only recommendations and don't prevent compilation
    * only available in the command-line `kaitai-struct-compiler` on the JVM platform (not in the Web IDE or in the JavaScript build [at npm](https://www.npmjs.com/package/kaitai-struct-compiler))
  * Add the ability to report multiple problems at once instead of stopping after the first error — used for "type validation" errors and style warnings for now (only on JVM compiler builds, not JS builds)
  * Improve readability of problems listed in the compiler output
  * Force UTF-8 as output encoding in generated files (don't rely on system defaults)
  * `--ksc-json-output`: add `warnings` at the same level as `errors`, don't use octal escapes (e.g. "~~`\274`~~" &#x27F6; "`\u00bc`") in string values (invalid in JSON)
  * Use SnakeYAML (the YAML parser used by JVM compiler builds) ~~1.25~~ &#x27F6; 1.28, which no longer contains the DoS vulnerability allowing a "billion laughs" attack ([50f80d7](https://github.com/kaitai-io/kaitai_struct_compiler/commit/50f80d7eca36983ca0b7f354d12656ec62e639eb))
* Runtime API changes:
  * C++: `kstream::to_string` now works for all integer types up to 64 bits (not just `int` as before), has better performance and portability ([cpp_stl#50](https://github.com/kaitai-io/kaitai_struct_cpp_stl_runtime/pull/50))
  * Go: `ReadBitsInt{Be,Le}` now accept the number of bits as ~~`uint8`~~ &#x27F6; `int` ([go@a5c5c1e](https://github.com/kaitai-io/kaitai_struct_go_runtime/commit/a5c5c1e1a7b653b2b569eaf67f27bfa4acf5df2d))
  * Java: `readBytesTerm`, `processXor` now accept a single byte value as ~~`int`~~ &#x27F6; `byte`
  * JavaScript: update UMD envelopes to support Web Workers and modules (in the runtime library, generated parsers and JS compiler builds)
  * JavaScript: `readBitsInt{Be,Le}` now throw ~~`Error`~~ &#x27F6; `RangeError` when trying to read more than 32 bits
  * Lua: add [zzlib](https://github.com/zerkman/zzlib) as a submodule to support `process: zlib`
  * Python: validation errors now extend ~~`BaseException`~~ &#x27F6; `Exception` for easier catching ([python#53](https://github.com/kaitai-io/kaitai_struct_python_runtime/pull/53))
  * Python: add `API_VERSION` tuple used by generated modules to check their compatibility with the runtime library ([python#49](https://github.com/kaitai-io/kaitai_struct_python_runtime/pull/49))
* Notable improvements:
  * Make methods `read_bits_int_{be,le}` for reading [bit integers](https://doc.kaitai.io/user_guide.html#_bit_sized_integers) reliable (fix all bugs) and faster ([#949](https://github.com/kaitai-io/kaitai_struct/issues/949))
  * No longer preallocating arrays to the capacity of `repeat-expr` entries, which could cause excessive memory allocations in invalid files ([f5fe28e](https://github.com/kaitai-io/kaitai_struct_compiler/commit/f5fe28e90ab43a3f6c707b2abe3e14de130ff13e))
  * Fix `valid` (and `contents`) on unnamed `seq` fields (for `contents`, this was a 0.9 regression: [#825](https://github.com/kaitai-io/kaitai_struct/issues/825))
  * Construct: add support for enums
  * Go: implement `encoding: UTF-16{BE,LE}`
  * Go, Lua: implement `valid/expr` ([#435](https://github.com/kaitai-io/kaitai_struct/issues/435))
  * Java: fix broken parse `instances` on Java 7 and 8 when using prebuilt `io.kaitai:kaitai-struct-runtime:0.9` [from Maven Central](https://search.maven.org/artifact/io.kaitai/kaitai-struct-runtime/0.9/jar) ([java#34](https://github.com/kaitai-io/kaitai_struct_java_runtime/issues/34))
  * Java: fix `terminator` values from `0x80` to `0xff` ([java#35](https://github.com/kaitai-io/kaitai_struct_java_runtime/issues/35))
  * Lua: map 1-bit `type: b1` to boolean to match Kaitai Struct design (see [docs](https://doc.kaitai.io/user_guide.html#_basic_data_types))
  * Lua: fix undecided calculated endianness incorrectly treated as big-endian
  * Lua: implement `process: zlib` (see [Installation](https://github.com/kaitai-io/kaitai_struct_lua_runtime#installation) section of Lua runtime for how to enable `zlib` support)
  * Nim: fix `encoding: ASCII` on Windows ([#960](https://github.com/kaitai-io/kaitai_struct/issues/960))
  * Perl: fix array literals, implement all byte array operations, `substring` and `str.to_i(2)` methods
  * PHP: support PHP 8 ([php#8](https://github.com/kaitai-io/kaitai_struct_php_runtime/issues/8))
  * Python: generated parsers no longer import `pkg_resources`, which caused performance and usability issues ([#804](https://github.com/kaitai-io/kaitai_struct/issues/804)) — the runtime library API version check now compares tuples instead
  * Python: `read_bytes` checks if a large read request (8 MiB or more) can be satisfied, even before any bytes are read ([python#61](https://github.com/kaitai-io/kaitai_struct_python_runtime/issues/61))
  * Ruby: validation error messages now display byte arrays as hex dumps, similar to Java ([ruby#4](https://github.com/kaitai-io/kaitai_struct_ruby_runtime/issues/4))
  * (Java — already in 0.9), Lua, PHP: fix translation of unsigned 64-bit integer literals — i.e. from `2**63 = 0x8000_0000_0000_0000` to `2**64 - 1 = 0xffff_ffff_ffff_ffff` ([fd7f308](https://github.com/kaitai-io/kaitai_struct_compiler/commit/fd7f308c67e8eacee98a647bbbbfb2792505bc64), Lua: [#837](https://github.com/kaitai-io/kaitai_struct/issues/837))
    * these languages don't have actual 64-bit unsigned integers, but they do have 64-bit *signed* integers, so the result will be negative, but all 64 bits of precision will be preserved
  * Fix translation of integer `-2**63 = -0x8000_0000_0000_0000` ([e33828a](https://github.com/kaitai-io/kaitai_struct_compiler/commit/e33828a6d2dd7f41ed246f0bf80a3097d8f5c95e))
* Generated code style improvements:
  * Go: change header comment to match Go conventions for generated sources ([#847](https://github.com/kaitai-io/kaitai_struct/issues/847))
  * Lua: fix broken indentation after a `repeat: until` field
  * Python: simpler `return` statements in instance getters
* Infrastructure updates:
  * Bintray was sunset on 2021-05-02: move stable compiler artifacts to GitHub Releases [in the kaitai_struct_compiler repo](https://github.com/kaitai-io/kaitai_struct_compiler/releases)
  * [Web IDE](https://ide.kaitai.io/): improve error reporting (no more useless stack traces)
  * <https://formats.kaitai.io/>: add pointers to runtime installation ([#571](https://github.com/kaitai-io/kaitai_struct/issues/571))
  * <https://ci.kaitai.io/>: group columns by language for better usability ([#823](https://github.com/kaitai-io/kaitai_struct/issues/823))

</div>

            <div class="col-lg-3">
                <center><img src="/img/kaitai_16x_dark.png" width="256" height="256" /></center>
                <div class="well" style="text-align: center; width: 100%; background: #c7d4ab; margin-top: 11px">
                    <p><small>
                            0.10 released 2022-07-08
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
