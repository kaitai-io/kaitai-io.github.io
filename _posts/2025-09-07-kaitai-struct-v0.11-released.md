---
layout: default
title: Kaitai Struct v0.11 released
categories: news
---
<section class="news">
    <div class="container">
        <div class="row">
            <div class="col-lg-9" markdown="1">

# 2025-09-07: Kaitai Struct v0.11 released

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

This release finally brings **serialization** support for Java and Python! It adds decent support for Rust, thanks to [Oleh Dolhov](https://github.com/Agile86) and [Vitaly Reshetyuk](https://github.com/revitalyr). Many fixes to the import functionality were added, so if something related to imports didn't work before, try it now. It also brings numerous improvements to the Web IDE, in particular the ability to show a partial object tree up if a parsing error occurs, which greatly facilitates reverse engineering and debugging (see the previous [blog post](https://kaitai.io/news/2024/02/21/web-ide-improvements.html) for more details).

Many of the improvements in this version were supported [by the NLnet Foundation](https://nlnet.nl/project/Kaitai-Rust/).

This is the last version of Kaitai Struct to support Python 2.7 and Ruby 1.9.3 - 2.3. Future versions will require at least Python 3.4 (or possibly even higher, see [#821](https://github.com/kaitai-io/kaitai_struct/issues/821)) and Ruby 2.4.

## Release highlights

* New target languages:
  * Rust
* New compilation options:
  * `-w`/`--read-write`: **serialization** support, currently only for Java and Python (see [Serialization guide](https://doc.kaitai.io/serialization.html))
    * implies `--no-auto-read`, so `_read()` must always be called manually to parse from a stream
    * new method `_check()` performs consistency checks - must be called on each object after the last change to its `seq` fields or `instances`, otherwise `_write()` will throw a `ConsistencyNotCheckedError`
    * new method `_write()`
    * new methods `_invalidate{Inst}()` (Java) / `_invalidate_{inst}()` (Python) for each value instance `inst` allow invalidating (forgetting) the cached value so that the instance can obtain a new value
  * `--zero-copy-substream {true|false}` (default is `true`): zero-copy substreams, currently only for Java and Ruby ([#44](https://github.com/kaitai-io/kaitai_struct/issues/44))
    * this removes `_raw_*` fields from the generated code - if you need them, use `--zero-copy-substream false`
* New KSY language features:
  * `valid/in-enum: true` validates that the parsed value is defined in the enum specified by the `enum` key
  * `type: strz` in combination with `encoding: UTF-16{BE,LE}` or `encoding: UTF-32{BE,LE}` now properly terminates the string on a 2-byte or 4-byte null character ([#187](https://github.com/kaitai-io/kaitai_struct/issues/187))
  * `to-string` in a type definition can be used to provide a concise human-readable string representation of the object ([#732](https://github.com/kaitai-io/kaitai_struct/issues/732))
    * it will be used to override the standard method for converting an object to a string, which is typically called `toString()` (or similar), `__str__()` in Python, `to_s` in Ruby, `Display` trait in Rust
    * displayed in the console visualizer (`ksv`), but not yet in the Web IDE, which still uses the [`-webide-representation` key](https://github.com/kaitai-io/kaitai_struct_webide/wiki/Features#webide-representation) for this purpose
* KSY language changes:
  * `valid` now applies to each individual element, not to the whole array as before; this also fixes a 0.9 regression, which prevented the use of `contents` with repetition ([#1117](https://github.com/kaitai-io/kaitai_struct/issues/1117))
  * `bytes.to_s(encoding)` now requires the `encoding` argument to be a string literal ([#1051](https://github.com/kaitai-io/kaitai_struct/issues/1051))
* Expression language:
  * Add initial support for f-strings `f"foo={foo}"`: only strings and integers can be interpolated, formatting options are not yet supported ([#1073](https://github.com/kaitai-io/kaitai_struct/issues/1073))
  * Improve error messages when the number or types of method arguments don't match ([compiler#269](https://github.com/kaitai-io/kaitai_struct_compiler/pull/269))
* General compilation improvements:
  * Add warnings about the use of aliases and non-canonical spellings of popular encodings in the `encoding` key, warn against using unknown encodings ([#393](https://github.com/kaitai-io/kaitai_struct/issues/393))
    * a known issue is that reported YAML paths are incorrect in some situations, see [#1227](https://github.com/kaitai-io/kaitai_struct/issues/1227)
  * Sort instances, types, enums, enum entries and switch cases in the generated code ([5f561e1](https://github.com/kaitai-io/kaitai_struct_compiler/commit/5f561e194f40cf40942615bb5c63a2edfbd348ec))
  * Pass `_root` and `_parent` in recursive invocations of the top-level type in the same .ksy spec ([#1089](https://github.com/kaitai-io/kaitai_struct/issues/1089))
  * Fix `_root` and `_parent` incorrectly passed to imported nested types ([compiler#283](https://github.com/kaitai-io/kaitai_struct_compiler/pull/283))
  * Fix that unused nested types (i.e. unreachable from the top-level type) were not taken into account when deriving the `_parent` type ([#961](https://github.com/kaitai-io/kaitai_struct/issues/961))
  * Fix missing runtime validation of parse instances with `contents` ([#1011](https://github.com/kaitai-io/kaitai_struct/issues/1011))
  * Fix missing compile-time checks of top-level parameters ([#1086](https://github.com/kaitai-io/kaitai_struct/issues/1086))
  * Fix sporadic import failures caused by race conditions in the compiler, which typically manifested as `error: unable to find type ...` for one of the imported types ([#951](https://github.com/kaitai-io/kaitai_struct/issues/951))
  * Fix `meta/ks-opaque-types: true` when using imports ([#295](https://github.com/kaitai-io/kaitai_struct/issues/295))
  * Fix duplicate warnings when using imports ([compiler#267](https://github.com/kaitai-io/kaitai_struct_compiler/pull/267))
  * `--ksc-json-output`: preserve input .ksy paths in output JSON keys exactly without slash normalization ([#507](https://github.com/kaitai-io/kaitai_struct/issues/507))
* Runtime API changes:
  * Add `ValidationNotInEnumError` exception, which is thrown if the `valid/in-enum: true` validation fails
  * Add `bytesTerminateMulti` and `readBytesTermMulti` methods needed for `type: strz` + `encoding: UTF-16`/`UTF-32` support to all runtime libraries ([#187](https://github.com/kaitai-io/kaitai_struct/issues/187))
  * C++ runtime library: add Win32 API-based encoding option ([cpp_stl#61](https://github.com/kaitai-io/kaitai_struct_cpp_stl_runtime/pull/61))
  * C++ runtime library: fix syntax error in C++20 mode ([cpp_stl#68](https://github.com/kaitai-io/kaitai_struct_cpp_stl_runtime/pull/68))
  * C++ runtime library: fix violations of strict aliasing rules ([cpp_stl#73](https://github.com/kaitai-io/kaitai_struct_cpp_stl_runtime/pull/73))
  * C#: target `netstandard2.0` ([csharp@7b1ac6d](https://github.com/kaitai-io/kaitai_struct_csharp_runtime/commit/7b1ac6dffc8056522d1d0532eb416df6646ab28f)) - fixes `KaitaiStruct.Runtime.CSharp v0.10.0 contains indirect vulnerable references` ([csharp#20](https://github.com/kaitai-io/kaitai_struct_csharp_runtime/issues/20))
  * Go: require Go 1.23 or higher ([61b70ac](https://github.com/kaitai-io/kaitai_struct_go_runtime/commit/61b70ac582ce8249397fc4b339c7becdfc54b672))
  * Java, Python: new method `_fetchInstances()` (Java) / `_fetch_instances()` can be used to recursively fetch all parse instances so that the input stream can be closed; this is especially useful with serialization when reading from one file and writing to another
  * Java, Python: all runtime library methods that deal with byte-aligned types now include a call to `align_to_byte()` / `alignToByte()`, which ensures proper alignment to a byte boundary after using bit-sized integers (`type: bX`), instead of the compiler often inserting them incorrectly ([#1070](https://github.com/kaitai-io/kaitai_struct/issues/1070))
  * Java: declare all arrays as `List` instead of `ArrayList` - this is a potentially breaking change ([#1116](https://github.com/kaitai-io/kaitai_struct/issues/1116))
  * JavaScript: all generated modules now export an **object** that encapsulates the class constructor function instead of the constructor function itself - **this is a breaking change!** ([#1074](https://github.com/kaitai-io/kaitai_struct/issues/1074))
    * this enables support for circular/out-of-order imports
  * JavaScript: port the runtime library to TypeScript ([javascript#25](https://github.com/kaitai-io/kaitai_struct_javascript_runtime/pull/25))
  * JavaScript: make byte array literals use `Uint8Array`, not `number[]` ([ec064e3](https://github.com/kaitai-io/kaitai_struct_compiler/commit/ec064e3930e03f74df50359dc89836e778a48b2d))
  * Lua: fix Lua 5.4 compatibility of `encoding: UTF-8` ([lua#12](https://github.com/kaitai-io/kaitai_struct_lua_runtime/issues/12))
  * Python: make all parsing exceptions inherit from `KaitaiStructError` instead of raising generic exceptions ([python#80](https://github.com/kaitai-io/kaitai_struct_python_runtime/pull/80))
* Notable improvements:
  * Generate import statements also for imported nested types, not just for imported top-level types as before ([#703](https://github.com/kaitai-io/kaitai_struct/issues/703))
  * Generate import statements also for imported enums ([#651](https://github.com/kaitai-io/kaitai_struct/issues/651))
  * Fix all known cases of missing parentheses when translating user expressions ([compiler#277](https://github.com/kaitai-io/kaitai_struct_compiler/pull/277))
  * Go: implement type casting `.as<>` ([f65fd5b](https://github.com/kaitai-io/kaitai_struct_compiler/commit/f65fd5b4a89ed4c3ae9f9bae39038a425d1ef40d))
  * Go: prevent runtime library methods from returning successfully on partial reads ([92f8048](https://github.com/kaitai-io/kaitai_struct_go_runtime/commit/92f804818f4e5ee9cbf171950bdbade6d720ce09))
  * C++11: fix array subscript (indexing) translated into invalid C++ code ([#1038](https://github.com/kaitai-io/kaitai_struct/issues/1038))
  * Graphviz: implement all missing features that prevented the compilation of many specifications in the format gallery ([#698](https://github.com/kaitai-io/kaitai_struct/issues/698))
  * Graphviz: display `valid` and `contents` ([bfdd54a](https://github.com/kaitai-io/kaitai_struct_compiler/commit/bfdd54aedd59bd287c06bd1d77367a2d5d273ee7))
  * C#: fix translation of `enum_val.to_i` ([#802](https://github.com/kaitai-io/kaitai_struct/issues/802))
  * Python: `enum_val.to_i` now works even if `enum_val` represents a value not defined in the enum ([#815](https://github.com/kaitai-io/kaitai_struct/issues/815))
  * Ruby: fix `bytes.to_s(encoding)` so that it always returns UTF-8 strings ([be695f5](https://github.com/kaitai-io/kaitai_struct_compiler/commit/be695f548712337777d97862d111317f64144a89))
  * Java: fix bytes subscript (indexing) operator so that it produces unsigned byte values ([43d044a](https://github.com/kaitai-io/kaitai_struct_compiler/commit/43d044a563ffcbc3af2c578a8fa8d53161b9c8b8))
* Web IDE improvements:
  * **Display a partial object tree** up to the field where the parsing error occurred, mark incomplete and invalid fields with icons (see [blog post](https://kaitai.io/news/2024/02/21/web-ide-improvements.html))
  * Fix the error `TypeError: {ImportedType} is not a constructor` when loading a .ksy specification with imports for the first time since loading the Web IDE, support circular imports ([webide#169](https://github.com/kaitai-io/kaitai_struct_webide/pull/169))
  * Replace the existing YAML parser used for parsing .ksy specifications with [js-yaml](https://github.com/nodeca/js-yaml) - this fixes a number of problems in YAML parsing with the old parser, for example:
    * an expression starting with a hex literal `0x..` is no longer incorrectly parsed as a constant (e.g. `pos: 0x1 + offset` is not interpreted as `pos: 0x1ffe`)
    * binary notation `0b...` is no longer parsed as `0`
    * duplicate keys are rejected instead of silently overwriting each other (see [webide#165](https://github.com/kaitai-io/kaitai_struct_webide/issues/165) for more details)
  * Fix a number of issues (open "Errors" pane doesn't disappear when the error has already been fixed, hex dump interval is not highlighted when an object tree node is selected, changes to the set of opened nodes are not persisted) that occurred in a certain combination of saved open object tree nodes, .ksy spec and input file ([webide#162](https://github.com/kaitai-io/kaitai_struct_webide/pull/162))
  * Fix `-webide-representation` on imported types ([webide#163](https://github.com/kaitai-io/kaitai_struct_webide/pull/163))
  * Improve error message when importing non-existent/unavailable .ksy specs ([webide#161](https://github.com/kaitai-io/kaitai_struct_webide/pull/161))
  * Fix accessibility issues ([webide#184](https://github.com/kaitai-io/kaitai_struct_webide/pull/184))
  * Show `_unnamed*` fields created by omitting `id` in `seq` fields ([#1064](https://github.com/kaitai-io/kaitai_struct/issues/1064))
* Packaging / infrastructure improvements:
  * Update compiler dependencies ([compiler#230](https://github.com/kaitai-io/kaitai_struct_compiler/pull/230))
  * [npm package `kaitai-struct-compiler`](https://www.npmjs.com/package/kaitai-struct-compiler) now returns the compiler object itself instead of a constructor function (called `KaitaiStructCompiler`). This is a **breaking change**, so make sure to adapt your code: replace `(new KaitaiStructCompiler()).compile(...)` with `KaitaiStructCompiler.compile(...)` ([compiler#222](https://github.com/kaitai-io/kaitai_struct_compiler/pull/222))
  * [ksy_schema](https://github.com/kaitai-io/ksy_schema) (official JSON Schema for .ksy files): add all missing keys, allow only canonical encoding names in the `encoding` key
  * Console [visualizer](https://github.com/kaitai-io/kaitai_struct_visualizer) - commands `ksv`, `ksdump`
    * fix Ruby 3 compatibility on Windows ([visualizer#48](https://github.com/kaitai-io/kaitai_struct_visualizer/issues/48))
    * support forward slashes in input .ksy paths on Windows ([visualizer#52](https://github.com/kaitai-io/kaitai_struct_visualizer/issues/52))
    * `ksdump`: include `_unnamed*` fields created by omitting `id` in `seq` fields ([#1064](https://github.com/kaitai-io/kaitai_struct/issues/1064))
    * publish a new version 0.11 [to RubyGems](https://rubygems.org/gems/kaitai-struct-visualizer) (last published version was 0.7)

</div>

            <div class="col-lg-3">
                <center><img src="/img/kaitai_16x_dark.png" width="256" height="256" /></center>
                <div class="well" style="text-align: center; width: 100%; background: #c7d4ab; margin-top: 11px">
                    <p><small>
                            0.11 released 2025-09-07
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
