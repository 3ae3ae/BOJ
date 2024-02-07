#include <iostream>
#include <vector>
#include <set>

using namespace std;
bool promising(int diff, int a, int b)
{

  if (a != b && a + diff != b && a - diff != b)
    return true;
  else
    return false;
}
int dfs(vector<int> &v, int n = 0)
{
  int sum = 0;
  int end = v.size();
  if (n == end)
    return 1;
  for (int i = 0; i < end; ++i)
  {
    bool t = true;
    for (int j = 0; j < n; ++j)
      t = t && promising(n - j, v[j], i);
    if (t)
    {
      v[n] = i;
      sum += dfs(v, n + 1);
    }
  }
  return sum;
}

int main()
{
  int n;
  cin >> n;
  vector<int> v(n, -1);
  cout << dfs(v);
  return 0;
}