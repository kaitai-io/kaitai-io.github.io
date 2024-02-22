---
layout: default
title: Web IDE improvements
categories: news
---

<section class="news">
<div class="container" markdown="1">

# 2024-02-21: Web IDE improvements

The Web IDE at <https://ide.kaitai.io/devel/> has recently seen a number of improvements! They address a few common issues and imperfections of the Web IDE you may have encountered.

These improvements were made thanks to the financial support from the [NLnet Foundation](https://nlnet.nl/).

## Partial object tree in case of an error

The new feature we're most excited about is the ability to show partial results in the object tree even if the parsing failed (as suggested in [#156](https://github.com/kaitai-io/kaitai_struct_webide/issues/156)). Previously, a parsing error caused that only the error message was shown, while the object tree still displayed the last successful parsing. This meant you were left with the little information contained in the error text when trying to figure out what caused the problem. Considering the complexity of binary formats, this is often impossible &mdash; for efficient debugging you need as much context as possible, which includes the values of all fields parsed before the error occurred.

That's exactly what this feature gives you. On top of that, it uses several icons to indicate which fields are incomplete, which helps you pinpoint the exact location of the error. Hover over the icons for more information on what each icon indicates.

The following screenshots show what it looks like in action. In the first example below, the parsing was interrupted by an EOF error, as stated in the "Errors" pane at the bottom. The object tree displays all fields up to the source of the EOF error. We can see two types of icons: the yellow warning triangle and a red circle with an exclamation mark. The yellow warning triangle warns us that even though the object has some content, its parsing was interrupted due to an error, so some fields may be missing. The red circle with an exclamation mark indicates a field that has no value, because its parsing failed. Therefore, it is usually the source of the parsing error.

![Screenshot of the Web IDE object tree with partial results until an EOF error occurred](/img/webide-partial-tree-eof-error.png){: width="784" height="616" class="img-responsive"}

In the second example below, we can see a new icon: a cross mark. It indicates a failed field validation. The field was parsed fine, but the parsed value violates the field's `contents` or `valid` constraint as defined in the .ksy specification (see sections [4.3](https://doc.kaitai.io/user_guide.html#magic) and [4.4](https://doc.kaitai.io/user_guide.html#valid-values) in the User Guide for explanation of these keys). Therefore, a validation error was thrown and no more fields were parsed.

We can also notice the same circle with an exclamation mark icon as before, but this time in blue. Blue icons only appear for instances and indicate that this instance was not invoked from the .ksy specification itself, but was first invoked explicitly by the Web IDE when displaying the object tree and this invocation raised an error.

You can display the full error message in the "Errors" pane by selecting a field with a cross mark or any blue icon.

![Screenshot of the Web IDE object tree with partial results up to a validation error](/img/webide-partial-tree-valid.png){: width="977" height="604" class="img-responsive"}

## Other improvements

This was perhaps the most visible change, but not the only one!

Other improvements include:

- Fix the error `TypeError: {ImportedType} is not a constructor` when loading a .ksy specification with imports for the first time since loading the Web IDE, support circular imports ([#169](https://github.com/kaitai-io/kaitai_struct_webide/pull/169))
- Replace the existing YAML parser used for parsing .ksy specifications with [js-yaml](https://github.com/nodeca/js-yaml) &mdash; this fixes a number of problems in YAML parsing with the old parser, for example an expression starting with a hex literal `0x..` is no longer incorrectly parsed as a constant (e.g. `pos: 0x1 + offset` is not interpreted as `pos: 0x1ffe`), binary notation `0b..` is no longer parsed as `0` and duplicate keys are rejected instead of silently overwriting each other (see [#165](https://github.com/kaitai-io/kaitai_struct_webide/issues/165) for more details)
- Fix a number of issues (open "Errors" pane doesn't disappear when the error has already been fixed, hex dump interval is not highlighted when an object tree node is selected, changes to the set of opened nodes are not persisted) that occurred in a certain combination of saved open object tree nodes, .ksy spec and input file ([#162](https://github.com/kaitai-io/kaitai_struct_webide/pull/162))
- Fix `-webide-representation` on imported types ([#163](https://github.com/kaitai-io/kaitai_struct_webide/pull/163))
- Improve error message when importing non-existent/unavailable .ksy specs ([#161](https://github.com/kaitai-io/kaitai_struct_webide/pull/161))

## Final word

Head over to <https://ide.kaitai.io/devel/> and try it out for yourself!

If you find any issues, please report them to the Web IDE [issue tracker](https://github.com/kaitai-io/kaitai_struct_webide/issues) so we can fix them in the future.

</div>
</section>
