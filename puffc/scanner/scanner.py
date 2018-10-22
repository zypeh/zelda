# from . import Characters
from .Tokens import Token
from .Characters import Character, isNumber


class Scanner:
    # TODO: Add line and col information
    """
    Scanner scan the text from the beginning, indexed by self.pos.
    The scanner uses the self.pos for position informantion
    """

    def __init__(self, filepath=None, inputText=None):
        """
        Initialize a scanner instance
        """
        self.filepath = filepath
        self.inputText = inputText
        self.pos = 0
        self.len = len(inputText)

    def setText(self, inputText: str) -> None:
        """
        Set the inputText of the Scanner instance
        """
        self.inputText = inputText
        self.len = len(inputText)

    def scan(self) -> Token:
        """
        Scan the src and returning the enum token
        """
        if self.pos >= self.len:
            return Token.EOF

        c = ord(self.inputText[self.pos])

        if isNumber(c):
            token = self.scanNumber()
            return token

        self.pos += 1

    def scanNumber(self) -> Token:
        """
        Scan the number and returning the enum token
        """
        isFloat = False

        while self.pos < self.len:
            self.pos += 1
            c = ord(self.inputText[self.pos])

            if c == Character.DOT:
                if not isFloat:
                    isFloat = True
                else:
                    assert f"Error parsing decimal number at [{self.pos}]"

            if c == Character._ and not isNumber(ord(self.inputText[self.pos + 1])):
                assert f"Error parsing underscore at [{self.pos}]"

            if not isNumber(c) and c != Character._:
                # self.pos -= 1
                break

        print(f"<numeric literal isFloat: {isFloat}>")
        return Token.NUMERIC
        # print(c)
