meta:
  id: doom_wad
  endian: le
  file-extension: wad
  application: id Tech 1
seq:
  - id: magic
    type: str
    size: 4
    encoding: ASCII
  - id: index_qty
    type: s4
  - id: index_offset
    type: s4
instances:
  index:
    pos: index_offset
    type: index_entry
    repeat: expr
    repeat-expr: index_qty
types:
  index_entry:
    seq:
      - id: offset
        type: s4
      - id: size
        type: s4
      - id: name
        type: str
        size: 8
        encoding: ASCII
    instances:
      contents:
        io: _root._io
        pos: offset
        size: size