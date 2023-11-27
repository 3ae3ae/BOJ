#include <iostream>
#include <array>

using namespace std;

constexpr int INF = 99999999;

array<array<int, 16>, 16> graph;
array<array<int, 1 << 16>, 16> dp;

inline int min_(int a, int b)
{
  return a < b ? a : b;
}

int dfs(int src, int dst, int visited, int n)
{
  if (dp[src][visited] != INF)
  {
    return dp[src][visited];
  }

  if (visited == (1 << n) - 1)
  {
    if (graph[src][dst] == 0)
      dp[src][visited] = INF + 1;
    else
      dp[src][visited] = graph[src][dst];
    return dp[src][visited];
  }

  for (int i = 1; i < n; ++i)
  {
    if ((visited & (1 << i)) != 0 || graph[src][i] == 0)
      continue;
    dp[src][visited] = min_(dp[src][visited], (dfs(i, dst, visited | (1 << i), n) + graph[src][i]));
  }
  if (dp[src][visited] == INF)
    dp[src][visited] = INF + 1;
  return dp[src][visited];
}

int main()
{
  ios::sync_with_stdio(false);
  cin.tie(0);
  cout.tie(0);
  int n;
  cin >> n;
  for (int i = 0; i < n; ++i)
  {
    for (int j = 0; j < n; ++j)
    {
      cin >> graph[i][j];
    }
    dp[i].fill(INF);
  }
  cout << dfs(0, 0, 1, n);
  return 0;
}