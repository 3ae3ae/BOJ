#include <iostream>
#include <vector>
#include <queue>
#include <set>
using namespace std;

using gem = pair<unsigned, unsigned>;
// gem.first = 무게, gem.second = 가치

struct cmp
{
  bool operator()(gem &a, gem &b)
  {
    return b.second > a.second;
  }
};

int main()
{
  int n, k;
  cin >> n >> k;
  priority_queue<gem, vector<gem>, cmp> gems;
  multiset<int> bags;

  for (int i = 0; i < n; ++i)
  {
    gem temp;
    cin >> temp.first >> temp.second;
    gems.push(temp);
  }
  for (int i = 0; i < k; ++i)
  {
    int t = 0;
    cin >> t;
    bags.insert(t);
  }

  unsigned long result = 0;

  while (!gems.empty())
  {
    gem g = gems.top();
    gems.pop();
    auto i = bags.lower_bound(g.first);
    if (i != bags.end())
    {
      result += g.second;
      bags.erase(i);
    }
  }
  cout << result;
  return 0;
}