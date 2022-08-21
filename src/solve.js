const check = (maze, kickOff, pattern) => {
  const height = maze.length;

  const width = maze[0].length;

  let path = [kickOff];
  let obtain = {};

  obtain[key(kickOff)] = true;
  let goBack = undefined;

  while (
    !maze[path[path.length - 1].slice(0, 3).join("")[0]][
      path[path.length - 1].slice(0, 3).join("")[1]
    ] !== "B"
  ) {
    let nearbys = getNearbys(path[path.length - 1], height, width).filter(
      (suiter) => !obtain[key(suiter)]
    );

    let finish = nearbys.filter((e) => maze[e[0]][e[1]] == "B");

    if (finish.length > 0) {
      path.push(finish[0]);
      return path;
    }

    nearbys = nearbys.filter((e) =>
      checkPattern(pattern, path.length - 1, maze, e)
    );

    if (goBack) {
      let index = nearbys.findIndex(
        (e) => e[0] == goBack[0] && e[1] == goBack[1]
      );
      nearbys = index + 1 < nearbys.length ? [nearbys[index + 1]] : [];
    }

    if (nearbys.length < 1) {
      goBack = path.pop();
      delete obtain[key(goBack)];
    } else {
      goBack = undefined;
      let suiter = nearbys[0];
      obtain[key(suiter)] = true;
      path.push(suiter);
    }
  }

  return [];
};

const getNearbys = (xy, height, width) => {
  const left = [xy[0], xy[1] - 1];
  const right = [xy[0], xy[1] + 1];
  const down = [xy[0] + 1, xy[1]];
  const up = [xy[0] - 1, xy[1]];

  const nearbys = [];

  if (up[0] >= 0) nearbys.push(up);
  if (right[1] < width) nearbys.push(right);
  if (down[0] < height) nearbys.push(down);
  if (left[1] >= 0) nearbys.push(left);

  return nearbys;
};
const key = (xy) => {
  return xy[0] + "-" + xy[1];
};

const checkPattern = (pattern, pos, map, e) => {
  return map[e[0]][e[1]] == pattern[pos % pattern.length];
};

module.exports = { check };
