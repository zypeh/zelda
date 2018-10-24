from scanner.scanner import Scanner
from scanner.Tokens import Token

if __name__ == "__main__":
    scanner = Scanner(inputText="123 1.23 1_000_000 1.0_01")
    while True:
        token = scanner.scan()
        if token == Token.EOF:
            break
