from enum import Enum


class Token(Enum):
    UNKNOWN = 0
    EOF = 1
    COMMENT = 2
    DOCCOMMENT = 3
