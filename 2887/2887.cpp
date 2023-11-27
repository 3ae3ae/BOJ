#include <iostream>
#include <vector>
#include <queue>
#include <array>
#include <memory>
#include <cmath>
#include <algorithm>

using namespace std;

class planet;

using sptr = shared_ptr<planet>;
using wptr = weak_ptr<planet>;

class planet : public enable_shared_from_this<planet>
{
public:
  int x, y, z;
  wptr parent;
  planet(int x, int y, int z) : x(x), y(y), z(z) {}
  void set_parent(const wptr &p)
  {
    parent = p;
  }
  wptr find()
  {
    sptr par = parent.lock();
    if (par == nullptr)
      throw domain_error(nullptr);
    if (par->parent.lock().get() == par.get())
    {
      return parent;
    }
    else
    {
      auto temp = par->find();
      parent = temp;
      return temp;
    }
  }
  void union_(sptr &other)
  {
    other->find().lock()->set_parent(find());
  }
};

struct edge
{
  sptr src;
  sptr dst;
  int distance;
  edge(const sptr &src, const sptr &dst) : src(src), dst(dst)
  {
    auto m = abs(src->x - dst->x);
    if (m > abs(src->y - dst->y))
      m = abs(src->y - dst->y);
    if (m > abs(src->z - dst->z))
      m = abs(src->z - dst->z);
    distance = m;
  }
};

struct minEdge
{
  bool operator()(edge &a, edge &b)
  {
    if (b.distance < a.distance)
      return true;
    else
      return false;
  }
};
template <char x>
bool cmp(sptr &a, sptr &b)
{
  if (x == 'x')
    return b->x < a->x;
  if (x == 'y')
    return b->y < a->y;
  if (x == 'z')
    return b->z < a->z;
}

int main()
{
  cin.tie(0);
  cout.tie(0);
  ios::sync_with_stdio(false);
  int n;
  cin >> n;
  vector<sptr> planets;
  vector<sptr> xyz;
  priority_queue<edge, vector<edge>, minEdge> h;
  planets.reserve(n);
  for (int i = 0; i < n; ++i)
  {
    planets.push_back(make_shared<planet>(0, 0, 0));
    cin >> planets[i]->x >> planets[i]->y >> planets[i]->z;
    xyz.emplace_back(planets[i]);
    planets[i]->set_parent(planets[i]);
  }

  sort(xyz.begin(), xyz.end(), cmp<'x'>);
  for (int i = 1; i < n; ++i)
    h.emplace(edge(xyz[i - 1], xyz[i]));
  sort(xyz.begin(), xyz.end(), cmp<'y'>);
  for (int i = 1; i < n; ++i)
    h.emplace(edge(xyz[i - 1], xyz[i]));
  sort(xyz.begin(), xyz.end(), cmp<'z'>);
  for (int i = 1; i < n; ++i)
    h.emplace(edge(xyz[i - 1], xyz[i]));

  int result = 0;
  while (!h.empty())
  {
    auto e = h.top();
    h.pop();
    if (e.src->find().lock().get() != e.dst->find().lock().get())
    {
      e.src->union_(e.dst);
      result += e.distance;
    }
  }
  cout << result;
  return 0;
}