const input = `9ewfsdajlf93fsdaf90dfadf9
9`;

function solution(input: string): string {
  const [sentence, bomb] = input.split("\n");
  class dq {
    dq: string[];
    f: number;
    r: number;
    constructor(l: string[]) {
      this.dq = l;
      this.f = 0;
      this.r = this.dq.length;
    }
    peek() {
      return this.dq[this.f];
    }

    push(c: string) {
      if (this.f === 0) {
        this.dq.unshift(c);
        this.r++;
      } else {
        this.dq[--this.f] = c;
      }
    }
    pop() {
      return this.dq[this.f++];
    }
    len() {
      return this.r - this.f;
    }
  }
  class Stack {
    stack1: string[];
    stack2: dq;
    i: number;
    l: number[];
    bomb: string;

    constructor(bomb: string, sentence: string) {
      this.l = [];
      this.bomb = bomb;
      this.i = 0;
      this.stack1 = [];
      this.stack2 = new dq([...sentence]);
    }

    end() {
      return this.stack2.len() === 0;
    }

    push() {
      if (this.i === 0) {
        if (this.bomb.length === 1 && this.stack2.peek() === this.bomb)
          this.stack2.pop();
        else {
          if (this.stack2.peek() === bomb[this.i]) this.i++;
          this.stack1.push(this.stack2.pop()!);
        }
      } else {
        if (this.stack2.peek() === this.bomb[this.i]) this.i++;
        else if (this.stack2.peek() === bomb[0]) {
          this.l.push(this.i);
          this.i = 1;
        } else {
          this.l = [];
          this.i = 0;
        }
        this.stack1.push(this.stack2.pop()!);
        if (this.i === this.bomb.length) this.pop();
      }
    }

    pop() {
      this.i = 0;
      const b = this.bomb.length;
      let l = this.l.pop();
      for (let k = 0; k < b; k++) this.stack1.pop();
      if (l)
        for (; l > 0; l--) {
          this.stack2.push(this.stack1.pop()!);
        }
    }

    val() {
      if (this.stack1.length === 0) return "FRULA";
      else return this.stack1.join("");
    }
  }

  const s = new Stack(bomb, sentence);
  while (!s.end()) s.push();
  return s.val();
}

console.log(solution(input));
