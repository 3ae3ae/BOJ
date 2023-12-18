#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

using edge = pair<int, int>;

struct testcase
{
  int aim;
  vector<int> time;
  vector<vector<int>> entrys;
  void setTestCase(int n, int k)
  {
    for (int i = 0; i < n; ++i)
    {
      int temp;
      cin >> temp;
      time.push_back(temp);
    }
    entrys.resize(time.size());
    for (int i = 0; i < k; ++i)
    {
      int src, dst;
      cin >> src >> dst;
      --src;
      --dst;
      entrys[dst].push_back(src);
    }
    cin >> aim;
    --aim;
  }
};

int dfs(testcase &c, vector<int> &dp, int target)
{
  if (dp[target] != -1)
    return dp[target];
  if (c.entrys[target].empty())
  {
    dp[target] = c.time[target];
    return dp[target];
  }
  int result = -1;
  for (auto e : c.entrys[target])
  {
    result = max(result, dfs(c, dp, e));
  }
  dp[target] = result + c.time[target];
  return dp[target];
}

int main()
{
  int t;
  cin >> t;
  vector<testcase> cases;
  cases.resize(t);
  for (int i = 0; i < t; ++i)
  {
    int n, k;
    cin >> n >> k;
    cases[i].setTestCase(n, k);
  }
  for (auto c : cases)
  {
    vector<int> dp;
    dp.resize(c.time.size(), -1);
    cout << dfs(c, dp, c.aim) << '\n';
  }
  return 0;
}