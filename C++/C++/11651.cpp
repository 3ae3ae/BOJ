#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

using std::cout;
using std::cin;
using std::vector;

struct p {
	int x, y;
	p(const int x, const int y) : x(x), y(y) {}
};

int main() {
	int n;
	cin >> n;
	std::string result("");
	vector<p> dots;
	for (int i = 0; i < n; ++i) {
		int t1, t2;
		cin >> t1 >> t2;
		dots.push_back(p(t1, t2));
	}
	std::sort(dots.begin(), dots.end(), [](const p& i, const p& j) -> bool {
		if (i.y < j.y) return true;
		else if (i.y > j.y) return false;
		else {
			if (i.x < j.x) return true;
			else return false;
		}
		});
	for (int i = 0; i < n; ++i) {
		result += std::to_string(dots[i].x) + ' ' + std::to_string(dots[i].y) + '\n';
	}
	cout << result << std::endl;
	return 0;
}