meta:
  id: doomrl_wad
  endian: le
  application: DoomRL
  file-extension: wad
seq:
  - id: magic
    contents: [8, 'VDFILE02']
  - id: version
    type: u4
  - id: num_files
    type: u4
  - id: files
    size: 146
    type: file_entry
    repeat: expr
    repeat-expr: num_files
types:
  file_entry:
    seq:
      - id: size
        type: u4
      - id: offset
        type: u4
      - id: dirname
        size: 0x41
        type: str40
      - id: filename
        size: 0x41
        type: str40
      - id: flags
        type: u4
      - id: filetype
        type: u4
        enum: filetype
    instances:
      body:
        io: _root._io
        pos: offset
        size: size
      body_compressed:
        io: _root._io
        pos: offset
        size: size
        process: zlib
        if: flags == 1
    enums:
      filetype:
        1: raw
        2: help
        3: xml
        4: ascii
        5: lua
        6: music
        7: sound
        8: image
        9: font
  str40:
    seq:
      - id: len
        type: u1
      - id: value
        type: str
        size: len
        encoding: UTF-8
