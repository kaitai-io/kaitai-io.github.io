---
layout: default
title: Try it
permalink: /repl/
extra_footer: |
  <script type="text/javascript" src="/js/yaml.js"></script>
  <script type="text/javascript" src="/js/kaitai-struct-compiler-fastopt.js"></script>
  <script type="text/javascript" src="/js/repl.js"></script>
---
<link rel="stylesheet" href="{{ site.baseurl }}/styles/ks.css" type="text/css">
<link rel="stylesheet" href="{{ site.baseurl }}/styles/highlight/railscasts.css" type="text/css">

<div class="container">
    <div class="row">
        <div class="col-md-5"><h2>Kaitai Struct YAML</h2></div>
        <div class="col-md-7"><h2><select id="target_lang"></select></h2></div>
    </div>
    <div class="row">
        <div class="col-md-5"><textarea id="source" rows="30" style="width: 100%"></textarea></div>
        <div class="col-md-7">
            <pre><code class="java" id="compiled"></code></pre>
        </div>
    </div>

    <div style="background: red; color: white" id="err_msg"></div>
    <p><button class="btn btn-default" id="compile" onclick="ksCompile()">Compile!</button></p>
    <p>or try loading some examples: <span id="examples"></span></p>

    <div style="display: none">
        <div class="example" data-name="DOS MZ">{% capture my_include %}{% include dos_mz.ksy %}{% endcapture %}{{ my_include | xml_escape }}</div>
        <div class="example" data-name="Doom .wad (simple)">{% capture my_include %}{% include doom_wad_simple.ksy %}{% endcapture %}{{ my_include | xml_escape }}</div>
        <div class="example" data-name="Doom .wad">{% capture my_include %}{% include doom_wad.ksy %}{% endcapture %}{{ my_include | xml_escape }}</div>
        <div class="example" data-name="IPv4 packet">{% capture my_include %}{% include ipv4_packet.ksy %}{% endcapture %}{{ my_include | xml_escape }}</div>
        <div class="example" data-name="GIF image">{% capture my_include %}{% include gif.ksy %}{% endcapture %}{{ my_include | xml_escape }}</div>
        <div class="example" data-name="ZIP archive">{% capture my_include %}{% include zip.ksy %}{% endcapture %}{{ my_include | xml_escape }}</div>
    </div>
</div>
