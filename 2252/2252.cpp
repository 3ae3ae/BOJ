#include <iostream>
#include <queue>
#include <memory>
#include <vector>
#include <set>

using namespace std;
class student
{
public:
  set<int> before;
  set<int> after;
  static int nnum;
  int num;
  student() : num(nnum++) {}
};
int student::nnum = 0;
int main()
{
  ios_base::sync_with_stdio(false);
  cin.tie(0);
  int n, m;
  cin >> n >> m;
  vector<student> students(n + 1);
  for (int i = 0; i < m; ++i)
  {
    int a, b;
    cin >> a >> b;
    students[a].after.insert(b);
    students[b].before.insert(a);
  }
  queue<student> q;
  for (auto &s : students)
  {
    if (s.before.empty())
      q.push(s);
  }
  q.pop();
  while (!q.empty())
  {
    auto t = q.front();
    q.pop();
    cout << t.num << ' ';
    for (auto s : t.after)
    {
      students[s].before.erase(t.num);
      if (students[s].before.empty())
        q.push(students[s]);
    }
  }
  return 0;
}