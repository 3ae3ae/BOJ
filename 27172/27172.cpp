#include <iostream>
#include <vector>
#include <array>

using namespace std;

array<int, 1000001> table;

int main()
{
  int n;
  cin >> n;
  vector<int> vec(n);
  vector<int> score(n);

  for (int i = 0; i < n; ++i)
  {
    cin >> vec[i];
    table[vec[i]] = i + 1;
  }
  for (int i = 0; i < n; ++i)
  {
    auto v = vec[i];
    for (int j = 2; j * v <= 1000000; ++j)
    {
      if (table[v * j] != 0)
      {
        ++score[i];
        --score[table[v * j] - 1];
      }
    }
  }
  for (auto s : score)
  {
    cout << s << ' ';
  }
  return 0;
}