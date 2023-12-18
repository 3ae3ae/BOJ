#include <iostream>

using namespace std;

constexpr int N = 4000001;
constexpr int L = 283147;
int l = 0;
bool pr[N];
int prs[L];

constexpr void calcPr()
{
  for (int i = 0; i < N; ++i)
    pr[i] = true;
  for (int i = 2; i < N; ++i)
  {
    if (!pr[i])
      continue;
    prs[l++] = i;
    for (int j = 2; i * j < N; ++j)
    {
      pr[i * j] = false;
    }
  }
  pr[0] = false;
  pr[1] = false;
}

int main()
{
  calcPr();
  int n;
  cin >> n;
  int i = 0, j = 0, result = 0;
  int sum = 2;
  while (i != L && j != L + 1)
  {
    if (sum == n)
    {
      ++result;
      sum -= prs[i++];
    }
    else if (sum > n)
    {
      sum -= prs[i++];
    }
    else
    {
      sum += prs[++j];
    }
  }
  cout << result;
  return 0;
}