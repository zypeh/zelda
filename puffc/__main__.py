from scanner.scanner import Scanner
from scanner.Tokens import Token

if __name__ == "__main__":
    scanner = Scanner(inputText="1 happy new year")
    while True:
        token = scanner.scan()
        if token == Token.EOF:
            break
