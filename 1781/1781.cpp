#include <iostream>
#include <array>
#include <vector>
#include <queue>

using namespace std;

array<vector<int>, 200001> table;

int main()
{
  ios_base::sync_with_stdio(0);
  cin.tie(0);

  priority_queue<int> maxHeap;

  int n;
  cin >> n;
  for (int i = 0; i < n; ++i)
  {
    int deadline, ramen;
    cin >> deadline >> ramen;
    table[deadline].push_back(ramen);
  }
  int result = 0;
  for (int i = n; i > 0; --i)
  {
    for (auto t : table[i])
      maxHeap.push(t);
    if (maxHeap.size() == 0)
      continue;
    result += [](priority_queue<int> &maxHeap)
    {int temp = maxHeap.top();
    maxHeap.pop();
    return temp; }(maxHeap);
  }
  cout << result;
}