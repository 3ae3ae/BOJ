#include <iostream>
#include <vector>

using namespace std;

int main()
{
  int n, k;
  cin >> n >> k;
  vector<pair<int, int>> gem(n);
  vector<int> bag(k);

  for (int i = 0; i < n; ++i)
  {
    cin >> gem[i].first >> gem[i].second;
  }
  for (int i = 0; i < k; ++k)
  {
    cin >> bag[i];
  }
}