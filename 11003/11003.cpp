#include <iostream>
#include <queue>
#include <vector>

using namespace std;

using A = pair<int, int>; // {Ai, i}

struct cmp
{
  bool operator()(A a, A b)
  {
    return a.first > b.first;
  }
};

priority_queue<A, vector<A>, cmp> pq;

int main()
{
  ios_base::sync_with_stdio(false);
  cin.tie(0);
  int n, l;
  cin >> n >> l;
  for (int i = 0; i < n; ++i)
  {
    int temp;
    cin >> temp;
    pq.emplace(temp, i);
    while (pq.top().second < i - l + 1)
      pq.pop();
    cout << pq.top().first << ' ';
  }
  return 0;
}