from enum import IntEnum


class Token(IntEnum):
    UNKNOWN = 0
    EOF = 1
    COMMENT = 2
    DOCCOMMENT = 3
    NUMERIC = 4
