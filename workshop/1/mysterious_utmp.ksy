meta:
  id: mysterious_utmp
  endian: be
seq:
  - id: records
    type: record
    repeat: eos
types:
  record:
    seq:
      - id: user
        type: str
        encoding: UTF-8
        size: 64
      - id: id
        type: str
        encoding: UTF-8
        size: 14
      - id: line
        type: str
        encoding: UTF-8
        size: 48
      - id: pid
        type: u4
      - id: ut_type
        type: u1
        enum: entry_type
      - id: tv
        type: timeval
      - id: exit
        type: u4
      - id: ipv4
        type: u1
        repeat: expr
        repeat-expr: 4
  timeval:
    seq:
      - id: sec
        type: s4
        doc: Seconds
      - id: usec
        type: s4
        doc: Microseconds
enums:
  entry_type:
    0: empty
    1: run_lvl
    2: boot_time
    3: new_time
    4: old_time
    5: init_process
    6: login_process
    7: user_process
    8: dead_process
    9: accounting
