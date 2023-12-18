#include <iostream>
#include <set>
#include <vector>
#include <cmath>

using namespace std;

int main()
{
  int n;
  cin >> n;
  vector<int> v(n);
  for (auto &ve : v)
    cin >> ve;
  set<int> s;
  for (auto vi = v.rbegin(); vi != v.rend(); ++vi)
  {
    s.insert(s.begin(), *vi);
  }
  pair<int, int> result;
  long long sum = 9999999999999;
  for (auto se : s)
  {
    int mse = -se;
    auto i = s.lower_bound(mse);
    auto k = i;
    if (i == s.end())
    {
      --k;
      if (*k == se)
        --k;
    }
    else if (i == s.begin())
    {
      if (se == *i)
        ++k;
    }
    else if (se == *i)
    {
      auto j = i;
      auto l = i;
      ++j, --l;
      if (abs(se + *j) < abs(se + *l))
        k = j;
      else
        k = l;
    }
    else
    {
      auto j = i;
      --j;
      if (abs(se + *j) < abs(se + *i))
        k = j;
      else
        k = i;
      if (*j == se)
        k = i;
    }
    if (abs(se + *k) < sum)
    {
      sum = abs(se + *k);
      result.first = se;
      result.second = *k;
    }
  }
  cout << result.first << ' ' << result.second;
  return 0;
}