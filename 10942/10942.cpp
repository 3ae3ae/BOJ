#include <iostream>
#include <vector>

using namespace std;

bool find(int src, int dst, vector<int> &v, vector<vector<int>> &dp)
{
  if (dp[src][dst] == 1)
    return true;
  if (dp[src][dst] == -1)
    return false;
  if (v[src] == v[dst])
  {
    dp[src][dst] = find(src + 1, dst - 1, v, dp) ? 1 : -1;
    return dp[src][dst] == 1 ? true : false;
  }
  else
  {
    dp[src][dst] = -1;
    return false;
  }
}

int main()
{
  cin.tie(0);
  cout.tie(0);
  ios_base::sync_with_stdio(false);
  int n;
  cin >> n;
  vector<int> v(n);
  for (auto &e : v)
    cin >> e;
  vector<vector<int>> dp(n, vector<int>(n, 0)); // 미확인 0, false -1, true 1
  for (int i = 0; i < n; ++i)
  {
    dp[i][i] = 1;
    if (i + 1 < n && v[i] == v[i + 1])
      dp[i][i + 1] = 1;
  }
  int m;
  cin >> m;
  vector<pair<int, int>> qst(m);
  for (auto &q : qst)
  {
    cin >> q.first;
    cin >> q.second;
  }
  for (auto &q : qst)
  {
    cout << (find(q.first - 1, q.second - 1, v, dp) ? 1 : 0) << '\n';
  }
  return 0;
}