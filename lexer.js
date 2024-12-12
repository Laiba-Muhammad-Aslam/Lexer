class Lexer {
    constructor(inputCode) {
      this.input = inputCode;
      this.position = 0;
      this.line = 1;
      this.tokens = [];
    }
  
    // Regular expressions for different token types in VoltX
    static patterns = {
      'KEYWORD': /\b(if|elif|else|switch|case|default|while|for|break|continue|return|class|extends|implements|pub|priv|protected|static|constructor|this|super|let|const|fn|async|await|yield|imp|exp|try|catch|throw|finally|new| print)\b/,
      'DATA_TYPE': /\b(int|float|double|char|bool|string)\b/,
      'ABSTRACT_DATA_TYPE': /\b(List|Array|Dictionaries)\b/,
      'IDENTIFIER': /\b[a-zA-Z_][a-zA-Z0-9_]*\b/,
      'OPERATOR': /\+|-|\*|\/|\/\/|%|==|!=|>|<|>=|<=|&&|\|\||!|&|\||\^|~|<<|>>|=|\+=|-=|\/=|%=|&=|\|=|\^=|<<=|>>=/,
      'LITERAL': /\b\d+\b|\b\d+\.\d+\b/,
      'STRING_LITERAL': /"[^"]*"|'[^']*'/,
      'BOOLEAN_LITERAL': /\b(true|false)\b/,
      'SYMBOL': /[{}()\[\],;:]/
    };
  
    skipWhitespace() {
      while (this.position < this.input.length) {
        let char = this.input[this.position];
        if (char === "\n") {
          this.line++;
        }
        if (!/\s/.test(char)) {
          break;
        }
        this.position++;
      }
    }
  
    tokenizeUsingPatterns() {
      let matched = false;
  
      for (let [tokenType, pattern] of Object.entries(Lexer.patterns)) {
        let regex = new RegExp(pattern);
        let match = this.input.slice(this.position).match(regex);
  
        if (match && match.index === 0) {
          this.tokens.push({
            type: tokenType,
            value: match[0],
            line: this.line
          });
          this.position += match[0].length;
          matched = true;
          break;
        }
      }
      return matched;
    }
  
    tokenize() {
      while (this.position < this.input.length) {
        this.skipWhitespace();
  
        if (this.position >= this.input.length) {
          break;
        }
  
        if (!this.tokenizeUsingPatterns()) {
          throw new Error(`Unexpected character: '${this.input[this.position]}' on line ${this.line}`);
        }
      }
  
      return this.tokens;
    }
  }
  
  // DOM handling
  document.getElementById('tokenizeButton').addEventListener('click', () => {
    const codeInput = document.getElementById('codeInput').value;
    const outputElement = document.getElementById('output');
    
    try {
      const lexer = new Lexer(codeInput);
      const tokens = lexer.tokenize();
  
      let tokenOutput = '';
      tokens.forEach(token => {
        tokenOutput += `Class Part: ${token.type}, Value Part: ${token.value}, Line#: ${token.line}\n`;
      });
  
      outputElement.innerHTML = `<strong>Tokens:</strong>\n${tokenOutput}\n<strong>Total Tokens: ${tokens.length}</strong>`;
      outputElement.classList.remove('error');
    } catch (error) {
      outputElement.innerHTML = `Error: ${error.message}`;
      outputElement.classList.add('error');
    }
  });

/* TEST CODE
  pub class xyz(a,b){
    let id = 789;
     fn printName(name){
          print(name);
    }
    }

  */