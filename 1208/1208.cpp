#include <iostream>
#include <vector>
#include <map>

using namespace std;

map<int, long long> m;

long long result = 0;

void calcLeftSum(const vector<int> &v)
{
  const int l = v.size();
  const int bitMax = 1 << l;
  for (int count = 0; count < bitMax; ++count)
  {
    int r = 0;
    int i = 0;
    for (unsigned j = count; j > 0; j = j >> 1)
    {
      if ((j & 1) == 1)
        r += v[i];
      ++i;
    }
    m.find(r) == m.end() ? (m[r] = 1) : (++m[r]);
  }
}

void calcRightSum(const vector<int> &v, int sum)
{
  const int l = v.size();
  const int bitMax = 1 << l;
  for (int count = 0; count < bitMax; ++count)
  {
    int r = 0;
    int i = 0;
    for (unsigned j = count; j > 0; j = j >> 1)
    {
      if ((j & 1) == 1)
        r += v[i];
      ++i;
    }
    if (m.find(sum - r) == m.end())
    {
      continue;
    }
    else
    {
      result += m[sum - r];
    }
  }
  if (sum == 0)
    --result;
}

int main()
{
  cin.tie(0), cout.tie(0), ios_base::sync_with_stdio(false);
  int n, s;
  cin >> n >> s;
  vector<int> vec(n);
  for (auto &v : vec)
    cin >> v;
  calcLeftSum(vector<int>(vec.begin(), vec.begin() + vec.size() / 2));
  calcRightSum(vector<int>(vec.begin() + vec.size() / 2, vec.end()), s);
  cout << result;
  return 0;
}