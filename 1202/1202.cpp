#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
#include <list>

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
  priority_queue<int, vector<int>, greater<int>> temps;
  list<int> bags;

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
    temps.push(t);
  }
  for (int i = 0; i < k; ++i)
  {
    int t = temps.top();
    temps.pop();
    bags.push_back(t);
  }
  unsigned long result = 0;

  while (!gems.empty())
  {
    gem g = gems.top();
    gems.pop();
    auto i = lower_bound(bags.begin(), bags.end(), g.first);
    if (i != bags.end())
    {
      result += g.second;
      bags.erase(i);
    }
  }
  cout << result;
  return 0;
}