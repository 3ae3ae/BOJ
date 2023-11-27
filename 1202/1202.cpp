#include <iostream>
#include <vector>
#include <algorithm>
#include <deque>

using namespace std;

bool cmp(pair<int, int> &a, pair<int, int> &b)
{
  auto A = a.second / static_cast<double>(a.first);
  auto B = b.second / static_cast<double>(b.first);
  return A > B;
}

int main()
{
  int n, k;
  cin >> n >> k;
  vector<pair<int, int>> gem(n);
  deque<int> bag(k);

  for (int i = 0; i < n; ++i)
  {
    cin >> gem[i].first >> gem[i].second;
  }
  for (int i = 0; i < k; ++k)
  {
    cin >> bag[i];
  }
  sort(gem.begin(), gem.end(), cmp);
  sort(bag.begin(), bag.end());
  int l = min(gem.size(), bag.size());
  for (int i = 0; i < l; ++i)
  {
  }
}