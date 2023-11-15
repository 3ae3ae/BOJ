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
      if (this.h.length<=2){
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

  const temp = input.split("\n");
  const t = Number(temp[0])
  const [SRC, DST] = temp[temp.length-1].split(" ").map(x=>Number(x));
  const graph = Array.from({length: t + 1}, ()=>[] as number[][]);
  const edge = temp.slice(2).map(v=> v.split(" ").map(x=> Number(x)));
  for (const [src, dst, dis] of edge){
    graph[src].push([dis, dst]);
  }
  const Dis = new Array(graph.length).fill(Infinity);
  Dis[SRC] = 0;

  const compare = (a:[number, number], b:[number, number]):boolean => a[0] < b[0];
  const h = new Heap<[number, number]>(compare, [[0, SRC]]);

  while (h.size()){
    const [dis, node] = h.pop();
    if (node === DST) return dis.toString();
    if (dis>Dis[node]) continue;
    for (const [ndis, nnode] of graph[node]){
      if (ndis+dis < Dis[nnode]){
        Dis[nnode] = ndis+dis;
        h.push([Dis[nnode], nnode]);
      }
    }

  }
  return 'abc'
}

console.log(solution(input));