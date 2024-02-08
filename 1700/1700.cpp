#include <iostream>
#include <vector>
#include <list>
#include <array>
#include <set>

using namespace std;

using setIter = set<int>::iterator;

array<list<int>, 101> pos;

set<int> multitap;

setIter getFarther(setIter &A, setIter &B)
{
  auto a = pos[*A].begin();
  auto b = pos[*B].begin();
  auto aEnd = pos[*A].end();
  auto bEnd = pos[*B].end();
  while (a != aEnd && b != bEnd)
  {
    if ((*a) < (*b))
      return B;
    else if ((*a) > (*b))
      return A;
    ++a;
    ++b;
  }
  if (a == aEnd && b == bEnd)
    return A;
  else if (a == aEnd)
    return A;
  else
    return B;
}

int main()
{
  ios_base::sync_with_stdio(0);
  cin.tie(0);
  int n, k;
  cin >> n >> k;
  vector<int> order;
  order.reserve(k);
  for (int i = 0; i < k; ++i)
  {
    int temp;
    cin >> temp;
    order.push_back(temp);
    pos[temp].push_back(i);
  }
  int result = 0;
  for (int i = 0; i < k; ++i)
  {
    int target = order[i];
    if (multitap.size() < n)
    {
      multitap.insert(target);
      pos[target].pop_front();
      continue;
    }
    if (multitap.find(target) != multitap.end())
    {
      pos[target].pop_front();
      continue;
    }
    auto fire = multitap.begin();
    for (auto t = multitap.begin(); t != multitap.end(); ++t)
    {
      fire = getFarther(fire, t);
    }
    multitap.erase(fire);
    multitap.insert(target);
    pos[target].pop_front();

    ++result;
  }
  cout << result;
}