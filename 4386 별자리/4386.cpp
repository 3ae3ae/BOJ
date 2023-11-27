#include <iostream>
#include <vector>
#include <queue>
#include <cmath>
#include <memory>

using namespace std;

class star: public enable_shared_from_this<star> {
  public:
  double x, y;
  weak_ptr<star> parent;
  star(double x, double y): x(x), y(y) {}

  void set_parent(weak_ptr<star> w) {
    parent = w;
  }

  void union_(shared_ptr<star> star2){
    auto par1 = this->find();
    auto par2 = star2->find();
    auto p = par2.lock();
    p->parent = par1;
  }
  weak_ptr<star> find(){
    auto p = parent.lock();
    if (!p) throw out_of_range("없는 포인터");
    if (this == p.get()){
      return parent;
    } else {
      auto temp = p->find();
      parent = temp;
      return temp;
    }
  }
  bool operator==(star& star2){
    return this->x == star2.x && this->y == star2.y;
  }
};

struct dist {
  shared_ptr<star> star1;
  shared_ptr<star> star2;
  double value;
  dist(shared_ptr<star> star1, shared_ptr<star> star2): star1(star1), star2(star2) {
    value = sqrt(pow(star1->x - star2->x, 2) + pow(star1->y - star2->y, 2));
  }

  dist(const dist& d): star1(d.star1), star2(d.star2), value(d.value) {}
};

struct cmp {
  bool operator()(dist& dis1, dist& dis2){
    return dis1.value > dis2.value;
  }
};

int main(){
  int n;
  cin >> n;
  vector<shared_ptr<star>> stars;
  for (int i=0; i<n; ++i){
    double x, y;
    cin >> x >> y;
    stars.push_back(make_shared<star>(x,y));
    stars[i]->set_parent(stars[i]);
  }

  priority_queue<dist, vector<dist>, cmp> edges;
  for (int i=0; i<n; ++i){
    for (int j=i+1; j<n; ++j){
      edges.push(dist(stars[i], stars[j]));
    }
  }
  double result = 0;

  while(!edges.empty()){
    auto e = edges.top();
    edges.pop();
    if (e.star1->find().lock().get()!=e.star2->find().lock().get()){
      e.star1->union_(e.star2);
      result += e.value;
    }
  }
  cout << result;
  return 0;
}