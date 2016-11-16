meta:
  id: dbn
  endian: le
seq:
  - id: contents
    size: _io.size - 1
    type: dbn_contents
types:
  dbn_contents:
    seq:
      - id: records
        type: record
        repeat: eos
  record:
    seq:
      - id: status
        type: u1
      - id: len
        type: u2
      - id: id
        type: u4
      - id: body
        size: len - 2
        type: record_body
      - id: terminator
        size: 2
  record_body:
    seq:
      - id: id
        type: u4
      - id: fixed
        type: str
        size: 29
        encoding: cp866
      - id: field_indexes
        type: strz
        terminator: 64
        encoding: cp866
      - id: varlen_data
        type: varlen_data
        size-eos: true
  field_indexes:
    seq:
      - id: entries
        type: field_index
        repeat: eos
  varlen_data:
    seq:
      - id: data
        type: strz
        terminator: 64
        encoding: cp866
        repeat: eos
