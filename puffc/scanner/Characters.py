from enum import IntEnum


class Character(IntEnum):
    NULL_CHARACTER = 0
    MAX_ASCII_CHARACTER = 0x7f

    LINE_FEED = 0x0a  # \n
    CARRIAGE_RETURN = 0x0d  # \r
    LINE_SEPARATOR = 0x2028
    PARAGRAPH_SEPARATOR = 0x2029
    NEXT_LINE = 0x0085

    # Unicode 3.0 space characters
    SPACE = 0x0020  # " "
    NON_BREAKING_SPACE = 0x00a0
    EN_QUAD = 0x2000
    EM_QUAD = 0x2001
    EN_SPACE = 0x2002
    EM_SPACE = 0x2003
    THREE_PER_EM_SPACE = 0x2004
    FOUR_PER_EM_SPACE = 0x2005
    SIX_PER_EM_SPACE = 0x2006
    FIGURE_SPACE = 0x2007
    PUNCTUATION_SPACE = 0x2008
    THIN_SPACE = 0x2009
    HAIR_SPACE = 0x200a
    ZERO_WIDTH_SPACE = 0x200b
    NARROW_NO_BREAK_SPACE = 0x202f
    IDEOGRAPHIC_SPACE = 0x3000
    MATHEMATICAL_SPACE = 0x205f
    OGHAM = 0x1680

    _ = 0x5f
    DOLLAR = 0x24

    _0 = 0x30
    _1 = 0x31
    _2 = 0x32
    _3 = 0x33
    _4 = 0x34
    _5 = 0x35
    _6 = 0x36
    _7 = 0x37
    _8 = 0x38
    _9 = 0x39

    a = 0x61
    b = 0x62
    c = 0x63
    d = 0x64
    e = 0x65
    f = 0x66
    g = 0x67
    h = 0x68
    i = 0x69
    j = 0x6a
    k = 0x6b
    l = 0x6c
    m = 0x6d
    n = 0x6e
    o = 0x6f
    p = 0x70
    q = 0x71
    r = 0x72
    s = 0x73
    t = 0x74
    u = 0x75
    v = 0x76
    w = 0x77
    x = 0x78
    y = 0x79
    z = 0x7a

    A = 0x41
    B = 0x42
    C = 0x43
    D = 0x44
    E = 0x45
    F = 0x46
    G = 0x47
    H = 0x48
    I = 0x49
    J = 0x4a
    K = 0x4b
    L = 0x4c
    M = 0x4d
    N = 0x4e
    O = 0x4f
    P = 0x50
    Q = 0x51
    R = 0x52
    S = 0x53
    T = 0x54
    U = 0x55
    V = 0x56
    W = 0x57
    X = 0x58
    Y = 0x59
    Z = 0x5a

    AMPERSAND = 0x26  # &
    ASTERISK = 0x2a  # *
    AT = 0x40  # @
    BACKSLASH = 0x5c  # \
    BACKTICK = 0x60  # `
    BAR = 0x7c  # |
    CARET = 0x5e  # ^
    CLOSE_BRACE = 0x7d  # }
    CLOSE_BRACKET = 0x5d  # ]
    CLOSE_PAREN = 0x29  # )
    COLON = 0x3a  # :
    COMMA = 0x2c
    DOT = 0x2e  # .
    DOUBLE_QUOTE = 0x22  # "
    EQUALS = 0x3d  # =
    EXCLAMATION = 0x21  # !
    GREATER_THAN = 0x3e  # >
    HASH = 0x23
    LESS_THAN = 0x3c  # <
    MINUS = 0x2d  # -
    OPEN_BRACE = 0x7b  # {
    OPEN_BRACKET = 0x5b  # [
    OPEN_PAREN = 0x28  # (
    PERCENT = 0x25  # %
    PLUS = 0x2b  # +
    QUESTION = 0x3f  # ?
    SEMICOLON = 0x3b  # ;
    SINGLE_QUOTE = 0x27  # '
    SLASH = 0x2f  # /
    TILDE = 0x7e  # ~

    BACKSPACE = 0x08  # \b
    FORM_FEED = 0x0c  # \f
    BYTE_ORDER_MARK = 0xfeff
    TAB = 0x09  # \t
    VERTICAL_TAB = 0x0b  # \v


def isNumber(num) -> bool:
    return num >= Character._0 and num <= Character._9
