# from . import Characters
from .Tokens import Token


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
        self.len = 0

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
        print(c)
