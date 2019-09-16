---
layout: default
title: Try it
extra_footer: |
  <script src="/js/scroller.js"></script>
---
<div class="jumbotron">
  <div class="container">
    <div class="col-sm-3" style="height: 434px">
      <center><img src="/img/kaitai_16x_dark.png" width="256" height="256" alt="[Kaitai logo]" /></center>
      <div class="well" style="text-align: center; width: 100%; margin-top: 72px">
        <p><small>
          0.8 <a href="news/2018/02/05/kaitai-struct-v0.8-released.html">released 2018-02-05</a>
          </small>
        </p>
        <a href="#download" class="btn btn-primary">Download <i class="fa fa-download"></i></a>
      </div>
    </div>
    <div class="col-sm-9">
      <h1>Kaitai Struct</h1>
      <p>A new way to develop parsers for binary structures.</p>
      <div class="row">
        <div class="col-sm-6">
          <div class="media">
            <div class="media-left"><i class="fa fa-fw fa-3x fa-sitemap"></i></div>
            <div class="media-body">
              <p><strong>Declarative</strong>: describe the very structure of the data, not how you read or write it</p>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="media">
            <div class="media-left"><i class="fa fa-fw fa-3x fa-language"></i></div>
            <div class="media-body">
              <p><strong>Language-neutral</strong>: write once, use in all supported languages:</p>
              <div class="row">
                <div class="col-sm-6">
                  <ul>
                    <li>C++/STL</li>
                    <li>C#</li>
                    <li>Go (*)</li>
                    <li>Java</li>
                    <li>JavaScript</li>
                  </ul>
                </div>
                <div class="col-sm-6">
                  <ul>
                    <li>Lua</li>
                    <li>Perl</li>
                    <li>PHP</li>
                    <li>Python</li>
                    <li>Ruby</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <div class="media">
            <div class="media-left"><i class="fa fa-fw fa-3x fa-battery-full"></i></div>
            <div class="media-body">
              <p><strong>Packed with tools and samples:</strong> includes <a href="https://github.com/kaitai-io/kaitai_struct_compiler">a compiler</a>, <a href="https://ide.kaitai.io/">an IDE</a>, a <a href="https://github.com/kaitai-io/kaitai_struct_visualizer/">visualizer</a> and <a href="//formats.kaitai.io">massive library of popular formats</a></p>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="media">
            <div class="media-left"><i class="fa fa-fw fa-3x fa-code-fork"></i></div>
            <div class="media-body">
              <p><strong>Free & open source:</strong> feel free to use, modify and join the project</p>
<p style="font-size: 14px; font-style: italic; margin-left: 35px">(*) entry-level support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<section id="what-is-it">
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <p>Reading and writing binary formats is hard, especially if
          it's interchange format that should work across multitude of
          platforms and languages.
        </p>
        <p>Have you ever found yourself writing repetitive,
          error-prone and hard-to-debug code that reads binary data structures
          from file / network stream and somehow represents them in memory for
          easier access?
        </p>
        <p>Kaitai Struct tries to make this job easier — you only have to
          describe binary format once and then everybody can use it from their
          programming languages — cross-language, cross-platform.
        </p>
        <h1>What is Kaitai Struct?</h1>
        <p>Kaitai Struct is a declarative language used to describe various
          binary data structures, laid out in files or in memory: i.e. binary
          file formats, network stream packet formats, etc.
        </p>
        <p>The main idea is that a particular format is described in Kaitai
          Struct language (<code>.ksy</code> file) and then can be compiled with
          <code>ksc</code> into source files in one of the supported programming
          languages. These modules will include a generated code for a parser
          that can read described data structure from a file / stream and give
          access to it in a nice, easy-to-comprehend API.
        </p>
        <h2 id="using-ks-in-your-project">Using KS in your project</h2>
        <p>Typically, using formats described in KS in your project, involves the
          following steps:
        </p>
        <ul>
          <li>Describe the format — i.e. create a <code>.ksy</code> file</li>
          <li>Use visualizer to debug the format and ensure that it parses data properly</li>
          <li>Compile <code>.ksy</code> file into target language source file and include
            that file into your project
          </li>
          <li>Add KS runtime library for your particular language into your
            project (don’t worry, it’s small and it’s there mostly to ensure
            readability of generated code)
          </li>
          <li>Use generated class(es) to parse your binary file / stream and
            access its components
          </li>
        </ul>
        <p>Check out <a href="http://doc.kaitai.io/">documentation</a> for more information.</p>
      </div>
      <div class="col-sm-4">
        <pre><code class="yaml">meta:
  id: tcp_segment
  endian: be
seq:
  - id: src_port
    type: u2
  - id: dst_port
    type: u2
  - id: seq_num
    type: u4
  - id: ack_num
    type: u4</code></pre>
        <p style="text-align: center"><i class="fa fa-3x fa-arrow-down"></i></p>
        <pre><code class="java">public class TcpSegment extends KaitaiStruct {
    // ...
    private void _read() throws IOException {
        this.srcPort = _io.readU2be();
        this.dstPort = _io.readU2be();
        this.seqNum = _io.readU4be();
        this.ackNum = _io.readU4be();
    }
    // ...</code></pre>
      </div>
    </div>
  </div>
</section>
<section id="quick-start">
  <div class="container">
  <h1>Quick start</h1>
  <p>Consider this simple <code>.ksy</code> format description file that
    describes header of a GIF file (a popular web image format):
  </p>
  <div class="row">
    <div class="col-sm-4">
      <pre><code class="yaml">meta:
  id: gif
  file-extension: gif
  endian: le
seq:
  - id: header
    type: header
  - id: logical_screen
    type: logical_screen
types:
  header:
    seq:
      - id: magic
        contents: 'GIF'
      - id: version
        size: 3
  logical_screen:
    seq:
      - id: image_width
        type: u2
      - id: image_height
        type: u2
      - id: flags
        type: u1
      - id: bg_color_index
        type: u1
      - id: pixel_aspect_ratio
        type: u1</code></pre>
    </div>
    <div class="col-sm-8">
      <p>It declares that GIF file usually has <code>.gif</code> extension and uses
        little-endian integer encoding. The file itself starts with two
        blocks: first comes <code>header</code> and then comes <code>logical_screen</code>:
      </p>
      <ul>
        <li>“Header” consists of “magic” string of 3 bytes (“GIF”) that
          identifies that it’s a GIF file starting and then there are 3 more
          bytes that identify format version (<code>87a</code> or <code>89a</code>).
        </li>
        <li>
          “Logical screen descriptor” is a block of integers:
          <ul>
            <li><code>image_width</code> and <code>image_height</code> are 2-byte unsigned ints</li>
            <li><code>flags</code>, <code>bg_color_index</code> and <code>pixel_aspect_ratio</code> take 1-byte
              unsigned int each
            </li>
          </ul>
        </li>
      </ul>
      <p>This <code>.ksy</code> file can be compiled it
        into <code>gif.cpp</code> / <code>Gif.cs</code>
        / <code>Gif.java</code> / <code>Gif.js</code> / <code>Gif.pm</code>
        / <code>Gif.php</code> / <code>gif.py</code> / <code>gif.rb</code> and
        then one can instantly load .gif file and access, for example, it’s
        width and height.
      </p>
      <ul class="nav nav-pills" role="tablist">
        <li role="presentation"><a href="#example-cpp-stl" role="tab" data-toggle="tab">C++/STL</a></li>
        <li role="presentation"><a href="#example-csharp" role="tab" data-toggle="tab">C#</a></li>
        <li role="presentation" class="active"><a href="#example-java" role="tab" data-toggle="tab">Java</a></li>
        <li role="presentation"><a href="#example-javascript" role="tab" data-toggle="tab">JavaScript</a></li>
        <li role="presentation"><a href="#example-perl" role="tab" data-toggle="tab">Perl</a></li>
        <li role="presentation"><a href="#example-php" role="tab" data-toggle="tab">PHP</a></li>
        <li role="presentation"><a href="#example-python" role="tab" data-toggle="tab">Python</a></li>
        <li role="presentation"><a href="#example-ruby" role="tab" data-toggle="tab">Ruby</a></li>
      </ul>
      <div class="tab-content" style="margin-top: 6px">
        <div role="tabpanel" class="tab-pane" id="example-cpp-stl">
          <pre><code class="cpp">std::ifstream ifs("path/to/some.gif", std::ifstream::binary);
kaitai::kstream ks(&ifs);
gif_t g = gif_t(&ks);

std::cout &lt;&lt; "width = " &lt;&lt; g.logical_screen()-&gt;image_width() &lt;&lt; std::endl;
std::cout &lt;&lt; "height = " &lt;&lt; g.logical_screen()-&gt;image_height() &lt;&lt; std::endl;</code></pre>
        </div>
        <div role="tabpanel" class="tab-pane" id="example-csharp">
          <pre><code class="cs">Gif g = Gif.FromFile("path/to/some.gif");

Console.WriteLine("width = " + g.LogicalScreen.ImageWidth);
Console.WriteLine("height = " + g.LogicalScreen.ImageHeight);</code></pre>
        </div>
        <div role="tabpanel" class="tab-pane active" id="example-java">
          <pre><code class="java">Gif g = Gif.fromFile("path/to/some.gif");

System.out.println("width = " + g.logicalScreen().imageWidth());
System.out.println("height = " + g.logicalScreen().imageHeight());</code></pre>
        </div>
        <div role="tabpanel" class="tab-pane" id="example-javascript">
          <pre><code class="javascript">var g = new Gif(new KaitaiStream(someArrayBuffer));

console.log("width = " + g.logicalScreen().imageWidth());
console.log("height = " + g.logicalScreen().imageHeight());</code></pre>
        </div>
        <div role="tabpanel" class="tab-pane" id="example-perl">
          <pre><code class="perl">my $g = Gif-&gt;from_file("path/to/some.gif");

print("width = ", $g-&gt;logical_screen()-&gt;image_width(), "\n");
print("height = ", $g-&gt;logical_screen()-&gt;image_height(), "\n");</code></pre>
        </div>
        <div role="tabpanel" class="tab-pane" id="example-php">
          <pre><code class="php">$g = Gif::fromFile("path/to/some.gif");

print("width = " . $g-&gt;logicalScreen()-&gt;imageWidth() . "\n");
print("height = " . $g-&gt;logicalScreen()-&gt;imageHeight() . "\n");</code></pre>
        </div>
        <div role="tabpanel" class="tab-pane" id="example-python">
          <pre><code class="python">g = Gif.from_file("path/to/some.gif")

print "width = %d" % (g.logical_screen.image_width)
print "height = %d" % (g.logical_screen.image_height)</code></pre>
        </div>
        <div role="tabpanel" class="tab-pane" id="example-ruby">
          <pre><code class="ruby">g = Gif.from_file("path/to/some.gif")

puts "width = #{g.logical_screen.image_width}"
puts "height = #{g.logical_screen.image_height}"</code></pre>
        </div>
        Of course, this example shows only very limited subset of what Kaitai
        Struct can do. Please refer to <a href="http://doc.kaitai.io/">documentation</a> for more
        insights.
      </div>
    </div>
  </div>
</div>
</section>
<section id="download">
  <div class="container">
    <h1>Downloading and installing</h1>
    <ul class="nav nav-pills" role="tablist">
      <li role="presentation" class="active"><a href="#download-linux-deb" role="tab" data-toggle="tab">Linux .deb</a></li>
      <li role="presentation"><a href="#download-mac-homebrew" role="tab" data-toggle="tab">Mac OS X - Homebrew</a></li>
      <li role="presentation"><a href="#download-windows" role="tab" data-toggle="tab">Windows</a></li>
      <li role="presentation"><a href="#download-universal" role="tab" data-toggle="tab">Universal .zip</a></li>
      <li role="presentation"><a href="#download-source" role="tab" data-toggle="tab">Source</a></li>
    </ul>
    <div class="tab-content" style="margin-top: 20px; min-height: 300px">
      <div role="tabpanel" class="tab-pane active" id="download-linux-deb">
        <div class="row">
          <div class="col-sm-9">
            <p>There is an official .deb repository
              available for Debian / Ubuntu-based
              distributions. Just add it and install a package:
            </p>
            <pre># Import GPG key, if you never used any BinTray repos before
sudo apt-key adv --keyserver hkp://pool.sks-keyservers.net --recv 379CE192D401AB61

# Add stable repository
echo "deb https://dl.bintray.com/kaitai-io/debian jessie main" | sudo tee /etc/apt/sources.list.d/kaitai.list
# ... or unstable repository
echo "deb https://dl.bintray.com/kaitai-io/debian_unstable jessie main" | sudo tee /etc/apt/sources.list.d/kaitai.list

sudo apt-get update
sudo apt-get install kaitai-struct-compiler</pre>
          </div>
          <div class="col-sm-3">
            <h4>Requirements</h4>
            <ul>
              <li>.deb-based Linux distribution (Debian, Ubuntu, etc)</li>
            </ul>
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="download-mac-homebrew">
        <div class="row">
          <div class="col-sm-9">
            <p>There is a formula now available within Homebrew that you can use to install kaitai-struct-compiler:</p>
            <pre>brew install kaitai-struct-compiler</pre>
          </div>
          <div class="col-sm-3">
            <h4>Requirements</h4>
            <ul>
              <li>Mac OS X</li>
              <li><a href="https://brew.sh">Homebrew</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="download-windows">
        <div class="row">
          <div class="col-sm-9">
            <p>Windows versions are avalable as MSI format installer. If you want a portable version that requires no installation, download our universal .zip build instead.</p>
            <p><a class="btn btn-success" href="https://dl.bintray.com/kaitai-io/universal/0.8/kaitai-struct-compiler-0.8.msi"><i class="fa fa-download"></i> Download</a> — stable v0.8, 7.0 MiB</p>
            <p><a class="btn btn-default" href="https://ci.appveyor.com/project/GreyCat/kaitai-struct/build/artifacts"><i class="fa fa-download"></i> Download</a> — latest development (unstable) build</p>
          </div>
          <div class="col-sm-3">
            <h4>Requirements</h4>
            <ul>
              <li>Windows</li>
              <li>a working <a href="http://java.com/download/">Java Runtime Environment</a> installation</li>
            </ul>
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="download-universal">
        <div class="row">
          <div class="col-sm-9">
            <p>"Universal" builds are downloadable as
              a .zip file that includes all the required
              .jar files bundled and launcher scripts
              for Linux / Mac OS X / Windows systems. No
              installation required, one can just unpack
              and run it.
            </p>
            <p><a class="btn btn-success" href="https://dl.bintray.com/kaitai-io/universal/0.8/kaitai-struct-compiler-0.8.zip"><i class="fa fa-download"></i> Download</a> — stable v0.8, 6.8 MiB</p>
            <p><a class="btn btn-default" href="https://bintray.com/kaitai-io/universal_unstable/kaitai-struct-compiler/_latestVersion"><i class="fa fa-download"></i> Download</a> — latest development (unstable) build — <a href="https://bintray.com/kaitai-io/universal_unstable/kaitai-struct-compiler/_latestVersion"><img src="https://api.bintray.com/packages/kaitai-io/universal_unstable/kaitai-struct-compiler/images/download.svg" /></a></p>
          </div>
          <div class="col-sm-3">
            <h4>Requirements</h4>
            <ul>
              <li>Linux / Mac OS X / Windows system</li>
              <li>a working <a href="http://java.com/download/">Java Runtime Environment</a> installation</li>
            </ul>
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="download-source">
        <div class="row">
          <div class="col-sm-9">
            <p>If you prefer to build your tools from source, or just want to see how KS works, the easiest way to check out whole project is to download main (umbrella) project repository that already includes all other parts as sub-modules. Use:</p>
            <pre>git clone --recursive https://github.com/kaitai-io/kaitai_struct.git</pre>
            <p>Note the <code>--recursive</code> option.</p>
            <p>Alternatively, one can check out individual sub-projects that consitute Kaitai Struct suite. See <a href="https://github.com/kaitai-io/kaitai_struct">GitHub project page</a> for details.</p>
          </div>
          <div class="col-sm-3">
            <h4>Requirements</h4>
            <ul>
              <li><a href="https://git-scm.com/">git</a></li>
              <li><a href="http://java.com/download/">Java Runtime Environment</a></li>
              <li><a href="http://www.scala-sbt.org/">sbt</a></li>
              <li>POSIX shell for test automation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <h2>Licensing</h2>
    <p>Kaitai Struct is free and open-source software, licensed under the
      following terms:
    </p>
    <ul>
      <li><a href="https://github.com/kaitai-io/kaitai_struct_compiler">Compiler</a> and <a href="https://github.com/kaitai-io/kaitai_struct_visualizer">visualizer</a> — GPLv3+</li>
      <li>
        Runtime libraries:
        <ul>
          <li>C++/STL — MIT</li>
          <li>C# — MIT</li>
          <li>Java — MIT</li>
          <li>JavaScript — Apache v2</li>
          <li>Lua — MIT</li>
          <li>Perl — MIT</li>
          <li>PHP — MIT</li>
          <li>Python — MIT</li>
          <li>Ruby — MIT</li>
        </ul>
      </li>
    </ul>
  </div>
</section>

<section id="format-gallery">
    <div class="container">
        <h1>Built with Kaitai Struct</h1>

        <div class="row">
            <div class="col-sm-6">
                <p>
                    We maintain a
                    growing <a href="https://github.com/kaitai-io/kaitai_struct_formats">free
                    / open source repository</a> of file formats
                    and protocols specifications. Visit our format
                    gallery to view the showcase of that
                    repository with documentation, block diagrams
                    and ready-made parser libraries in all
                    supported target languages.
                </p>
                <p>
                    <a href="http://formats.kaitai.io/" class="btn btn-success">Format Gallery &gt;&gt;</a>
                </p>
            </div>
            <div class="col-sm-6">
                <p>Kaitai Struct is used in the following open source projects:</p>
                <ul>
                    <li><a href="https://codisec.com/veles/">Veles</a> — binary data visualization and analysis tool</li>
                    <li><a href="https://mitmproxy.org/">mitmproxy</a> — an interactive man-in-the-middle traffic inspection and modification tool</li>
                    <li><a href="https://www.kismetwireless.net/">Kismet</a> — wireless network detector, sniffer, and intrusion detection system</li>
                    <li><a href="https://github.com/Deep-Symmetry/beat-link-trigger">Beat Link Trigger</a> — music performer app to trigger events based on Pioneer CDJs output</li>
                </ul>
                <p>
                    If your project also uses Kaitai Struct, please drop us a line :)
                </p>
            </div>
        </div>
    </div>
</section>
