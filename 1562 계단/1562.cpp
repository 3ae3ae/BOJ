#include <iostream>
#include <array>

// stairs[len][e][contains] = 길이 len 끝 숫자 e로부터 시작하는 수열들의 수의 합

using namespace std;

using stairType = array<array<array<int, 1 << 10>, 10>, 101>;

constexpr int mod = 1000000000;

stairType stairs;
constexpr void initStairs(stairType &stairs)
{
  for (auto &a : stairs)
    for (auto &b : a)
      for (auto &c : b)
        c = -1;
}

constexpr int sumFrom(int len, int end, int contains, int limit, stairType &stairs)
{
  if (stairs[len][end][contains] != -1)
    return stairs[len][end][contains];
  if (len == limit)
  {
    return contains == (1 << 10) - 1 ? 1 : 0;
  }
  long long result = 0;
  if (stairs[len][end][contains] != -1)
    cout << stairs[len][end][contains];
  if (end > 0)
    result += sumFrom(len + 1, end - 1, contains | (1 << (end - 1)), limit, stairs);
  if (end < 9)
    result += sumFrom(len + 1, end + 1, contains | (1 << (end + 1)), limit, stairs);
  stairs[len][end][contains] = result % mod;
  return result % mod;
}

int main()
{
  initStairs(stairs);

  int n;
  cin >> n;
  for (int i = 1; i < 10; ++i)
  {
    sumFrom(1, i, 1 << i, 100, stairs);
  }
  int result;
  for (int i = 1; i < 10; ++i)
  {
    result += sumFrom(1, i, 1 << i, n, stairs);
    result %= mod;
  }
  cout << result;
  return 0;
}