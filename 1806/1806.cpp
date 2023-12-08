#include <iostream>
#include <vector>

using namespace std;

int main()
{
  ios_base::sync_with_stdio(false);
  cin.tie(0);
  long n, s;
  cin >> n >> s;
  vector<int> vec(n);
  for (auto &v : vec)
    cin >> v;
  int sum = vec[0];
  auto p1 = vec.begin();
  auto p2 = vec.begin();
  long a = n + 1;
  while (p1 != vec.end() && p2 != vec.end())
  {
    if (sum < s)
    {
      sum += *(++p2);
    }
    else
    {
      if (p1 == p2)
      {
        a = 1;
        break;
      }
      a = min(a, p2 - p1 + 1);
      sum -= (*p1++);
    }
  }
  if (a == n + 1)
    a = 0;
  cout << a;
  return 0;
}