#include <iostream>
#include <vector>
#include <cmath>
#include <array>

using namespace std;
using DP = array<array<vector<int>, 1001>, 1001>;
int N, L;
vector<array<int, 2>> events;
DP dp;
// dp[x][y] = [1, 1,2,3]'

int getDist1(int p1, int p2)
{
  if (p1 == 0)
    return events[p2][0] + events[p2][1] - 2;
  return abs(events[p1][0] - events[p2][0]) + abs(events[p1][1] - events[p2][1]);
}

int getDist2(int p1, int p2)
{
  if (p1 == 0)
    return N * 2 - events[p2][0] - events[p2][1];
  return abs(events[p1][0] - events[p2][0]) + abs(events[p1][1] - events[p2][1]);
}

vector<int> &getDp(int x, int y)
{
  if (dp[x][y][0] != -1)
    return dp[x][y];
  int nxt = max(x, y) + 1;
  int a = getDp(nxt, y)[0] + getDist1(x, nxt);
  int b = getDp(x, nxt)[0] + getDist2(y, nxt);
  if (a < b)
  {
    dp[x][y][0] = a;
    dp[x][y].push_back(1);
    dp[x][y].push_back(nxt);
    dp[x][y].push_back(y);
  }
  else
  {
    dp[x][y][0] = b;
    dp[x][y].push_back(2);
    dp[x][y].push_back(x);
    dp[x][y].push_back(nxt);
  }
  return dp[x][y];
}

int main()
{
  ios_base::sync_with_stdio(0);
  cin.tie(0);
  cin >> N >> L;
  events.push_back({0, 0});
  for (int i = 0; i < L; ++i)
  {
    int t1, t2;
    cin >> t1 >> t2;
    events.push_back({t1, t2});
  }

  for (int x = 0; x < L + 1; ++x)
  {
    for (int y = 0; y < L + 1; ++y)
    {
      dp[x][y] = vector<int>(1, -1);
    }
  }

  for (int i = 0; i < L; ++i)
  {
    dp[L][i][0] = 0;
    dp[i][L][0] = 0;
  }
  auto result = getDp(0, 0);
  cout << result[0] << '\n';
  while (result.size() != 1)
  {
    cout << result[1] << '\n';
    result = getDp(result[2], result[3]);
  }
  return 0;
}