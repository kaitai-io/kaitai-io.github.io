meta:
  id: transport_sign
  endian: le
seq:
  - id: num_lines
    type: u4
  - id: lines
    repeat: expr
    repeat-expr: num_lines
    type: line
types:
  line:
    seq:
      - id: line_num
        type: u4
      - id: line_num_len
        type: u1
      - id: line_num_str
        type: str
        encoding: iso8859-1
        size: line_num_len
      - id: dest_len
        type: u1
      - id: code1
        type: u4
      - id: dest
        type: str
        encoding: iso8859-1
        size: dest_len
      - id: gps_lat
        type: f8
      - id: gps_lon
        type: f8
      - id: timestamp
        type: u4
