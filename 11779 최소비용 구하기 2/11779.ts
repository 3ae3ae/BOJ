import fs from 'fs';
const input = fs.readFileSync('./dev/stdin').toString().trim() as string;

function solution(input: string): string{
  class Heap <T> {
    h: T[];
    compare: (a:number, b:number) => boolean
    constructor(compare: (a:T, b:T) => boolean, h:T[] = []){
      this.h = [{} as T, ...h];
      this.compare = (a, b) => {
        if (this.h[a]!==undefined && this.h[b]!==undefined)
          return compare(this.h[a], this.h[b])
        else return false;
      }
    }

    size(){
      return this.h.length -1;
    }

    change(a:number, b:number){
      [this.h[a], this.h[b]] = [this.h[b], this.h[a]];
    }

    push(n: T){
      this.h.push(n);
      let c = this.h.length-1;
      let p = Math.floor(c/2);
      while (p!==0 && this.compare(c, p)){
        this.change(c, p);
        c = p;
        p = Math.floor(c/2);
      }
    }

    pop(){
      const val = this.h[1];
      if (this.h.length<=1){
        this.h = [{} as T] as T[];
        return val;
      }
      this.h[1] = this.h.pop()!;

      let [c, l, r] = [1, 2, 3];

      while (this.compare(l, c) || this.compare(r, c)){
        if (this.compare(r, l)){
          this.change(c, r);
          c = r;
        }else {
          this.change(c, l);
          c = l;
        }
        l = c*2;
        r = l+1;
      }
      return val;
    }


  }
  type node = [[number, number], number[]] // [[거리, 도시], [들른 도시]]

  const temp = input.split("\n");
  const graph = Array.from({length: Number(temp[0]) + 1}, ()=>[] as number[][]);
  const bus = temp.slice(2, -1).map(v=> v.split(" ").map(x=> Number(x)));
  for (const [src, dst, dis] of bus){
    graph[src].push([dis, dst]);
  }
  const [SRC, DST] = temp[temp.length-1].split(" ").map(x=> Number(x));
  const Dis = new Array(graph.length).fill(Infinity);
  Dis[SRC] = 0;

  const compare = (a:node, b:node):boolean => a[0][0] < b[0][0];
  const h = new Heap(compare, [[[0,SRC], [SRC]] as node]);

  let result:[number, number[]] = [0, [0]];
  while (h.size()){
    const [[dis, city], cities] = h.pop();
    if (dis>Dis[city]) continue;
    if (city===DST) {
      result = [dis, cities];
      break;
    }
    for (const [ndis, ncity] of graph[city]){
      if (ndis+dis < Dis[ncity]){
        Dis[ncity] = ndis+dis;
        h.push([[Dis[ncity], ncity], [...cities, ncity]]);
      }
    }
  }
  return [result[0], result[1].length, result[1].join(' ')].join('\n');
}

console.log(solution(input));