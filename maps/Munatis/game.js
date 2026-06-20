// Min-Heap implementation
class BucketQueue {
    // maxPriority : the max possible priority of any item. Should be ideally small
    // getPriority : a function that takes in an item and returns a priority
    constructor(maxPriority, getPriority) {
        this.buckets = Array.from({ length: maxPriority + 1 }, () => []);
        this.currentMin = Infinity;  // Start with Infinity to properly track min
        this.length = 0;
        this.getPriority = getPriority;
    }

    enqueue(item) {
        const priority = this.getPriority(item);
        this.buckets[priority].push(item);
        if (priority < this.currentMin) {
            this.currentMin = priority;
        }
        this.length++;
    }

    dequeue() {
        while (this.currentMin < this.buckets.length) {
            const bucket = this.buckets[this.currentMin];
            if (bucket.length > 0) {
                this.length--;
                return bucket.shift();
            }
            this.currentMin++;
        }
        return null; // empty
    }

    isEmpty() {
        return this.length === 0;
    }
}

const MAX_TILE_HEIGHT = 510;

const MAP_WIDTH = 250;
const MAP_LENGTH = 250;
const MAP_AREA = MAP_WIDTH * MAP_LENGTH;

const BASE_SIZE = 6;
const BASE_HEIGHT = (x, y, i, range) => Math.floor(range/4);

const targets = [
    [226, 82],
    [167, 23],
    [82, 23],
    [23, 82],

    [23, 167],
    [82, 226],
    [167, 226],
    [226, 167]
];

const base = targets[3];

// The x,y position of the map's center tile
// or the top corner center tile in the case of even width/length
const center_x = Math.ceil(MAP_WIDTH/2) - 1;
const center_y = Math.ceil(MAP_LENGTH/2) - 1;

// Arizona Tileset (MANY OMITTED)
const Texture = Object.freeze({
    BROWN_1:          5, // darkness: -1
    BROWN_2:          6, // darkness: 0
    BROWN_3:          7, // darkness: 1
    BROWN_4:          8, // darkness: 2
    YELLOW_1:         9, // light
    YELLOW_2:         11, // dark
    SAND: 12,
    WATER: 17,
    CLIFF_DOUBLE: 18,
    CONCRETE_1: 22,
    GREEN:            23,
    RED_1:            44, // darkness: 0
    RED_2:            48, // darkness: 4
    RED_3:            53, // darkness: 3
    RED_4:            54, // darkness: 5
    RED_5:            74, // darkness: 1
    RED_6:            76, // darkness: 2
    CRATER_YELLOW:    55,
    CRATER_RED:       56,
    CRATER_BROWN:     58,
    CRATER_GREEN:     62,
    CLIFF2: 71,
    CORNER_CLIFF2: 75,
    CONCRETE_2: 77
});

const TileType = Object.freeze({
    OIL: 0,
    FEATURE: 1,
    GROUND: 2,
    CLIFF: 3
});

const CliffLife = new Set([
    0b00001111,
    0b00010110,
    0b00010111,
    0b00011011,
    0b00011110,
    0b00011111,
    0b00101011,
    0b00101111,
    0b00111011,
    0b00111110,
    0b00111111,
    0b01001111,
    0b01010110,
    0b01010111,
    0b01011011,
    0b01011110,
    0b01011111,
    0b01101000,
    0b01101001,
    0b01101010,
    0b01101011,
    0b01101110,
    0b01101111,
    0b01110110,
    0b01110111,
    0b01111000,
    0b01111001,
    0b01111010,
    0b01111011,
    0b01111100,
    0b01111101,
    0b01111110,
    0b01111111,
    0b10010110,
    0b10010111,
    0b10011011,
    0b10011110,
    0b10011111,
    0b10111011,
    0b10111110,
    0b10111111,
    0b11001011,
    0b11001111,
    0b11010000,
    0b11010010,
    0b11010011,
    0b11010100,
    0b11010110,
    0b11010111,
    0b11011000,
    0b11011001,
    0b11011010,
    0b11011011,
    0b11011100,
    0b11011101,
    0b11011110,
    0b11011111,
    0b11101000,
    0b11101001,
    0b11101010,
    0b11101011,
    0b11101110,
    0b11101111,
    0b11110000,
    0b11110010,
    0b11110011,
    0b11110100,
    0b11110110,
    0b11110111,
    0b11111000,
    0b11111001,
    0b11111010,
    0b11111011,
    0b11111100,
    0b11111101,
    0b11111110,
    0b11111111,
]);

// Returns the corresponding symmetrical [x, y] on the other side of the map.
// WARNING: 90 degree rotation only works on square maps!
// i    : a location on the map, represented as either an index or [x, y]
// type : 90 rotation, 180 rotation, horizontal mirror, vertical mirror, or diagonal mirror
function sym(i, type) {
    if (Array.isArray(i)) {
        const [x, y] = i;
        switch (type) {
            case "90" : return [MAP_WIDTH-1-y, x];
            case "180": return [MAP_WIDTH-1-x, MAP_LENGTH-1-y];
            case "HOR": return [MAP_WIDTH-1-x, y];
            case "VER": return [x, MAP_LENGTH-1-y];
            case "DIA": return [y, x];
        }
    } else {
        switch (type) {
            case "90" : return (i % MAP_WIDTH) * MAP_LENGTH + (MAP_WIDTH-1 - Math.floor(i / MAP_WIDTH));
            case "180": return MAP_AREA-1-i;
            case "HOR": return i - (i % MAP_WIDTH) + MAP_WIDTH - 1 - (i % MAP_WIDTH);
            case "VER": return (MAP_LENGTH - 1 - Math.floor(i / MAP_WIDTH)) * MAP_WIDTH + (i % MAP_WIDTH);
            case "DIA": return sym(xy[i], "DIA");
        }
    }
}

function create_flood_fill(width, length) {
    const size = width * length;

    const seen = new Array(size);
    const queue = new Array(size);

    let stamp = 1;

    return function flood_fill_i(
        start_i,
        max_count,
        shape,
        can_visit,
        visit,
        stop = () => false
    ) {
        if (start_i < 0 || start_i >= size) {
            return 0;
        }

        if (max_count == null) {
            max_count = Infinity;
        }

        const current_stamp = stamp++;

        if (stamp === 0xffffffff) {
            seen.fill(0);
            stamp = 1;
        }

        let head = 0;
        let tail = 0;
        let visit_count = 0;

        seen[start_i] = current_stamp;
        queue[tail++] = start_i;

        while (head < tail && visit_count < max_count && !stop()) {
            const i = queue[head++];

            if (!can_visit(i)) {
                continue;
            }

            visit(i);
            visit_count++;

            const hasNorth = i >= width;
            const hasSouth = i < size - width;
            const hasWest = i % width !== 0;
            const hasEast = (i + 1) % width !== 0;

            let ni;

            // Cardinal neighbors.
            // South
            if (hasSouth) {
                ni = i + width;
                if (seen[ni] !== current_stamp) {
                    seen[ni] = current_stamp;
                    queue[tail++] = ni;
                }
            }

            // East
            if (hasEast) {
                ni = i + 1;
                if (seen[ni] !== current_stamp) {
                    seen[ni] = current_stamp;
                    queue[tail++] = ni;
                }
            }

            // North
            if (hasNorth) {
                ni = i - width;
                if (seen[ni] !== current_stamp) {
                    seen[ni] = current_stamp;
                    queue[tail++] = ni;
                }
            }

            // West
            if (hasWest) {
                ni = i - 1;
                if (seen[ni] !== current_stamp) {
                    seen[ni] = current_stamp;
                    queue[tail++] = ni;
                }
            }

            if (shape) {
                // Preserve original behavior: one RNG roll per ordinal direction.
                if (gameRand(100) < shape && hasSouth && hasEast) {
                    ni = i + width + 1;
                    if (seen[ni] !== current_stamp) {
                        seen[ni] = current_stamp;
                        queue[tail++] = ni;
                    }
                }

                if (gameRand(100) < shape && hasNorth && hasEast) {
                    ni = i - width + 1;
                    if (seen[ni] !== current_stamp) {
                        seen[ni] = current_stamp;
                        queue[tail++] = ni;
                    }
                }

                if (gameRand(100) < shape && hasSouth && hasWest) {
                    ni = i + width - 1;
                    if (seen[ni] !== current_stamp) {
                        seen[ni] = current_stamp;
                        queue[tail++] = ni;
                    }
                }

                if (gameRand(100) < shape && hasNorth && hasWest) {
                    ni = i - width - 1;
                    if (seen[ni] !== current_stamp) {
                        seen[ni] = current_stamp;
                        queue[tail++] = ni;
                    }
                }
            }
        }

        return visit_count;
    };
}

// Shapeless Prioritized Flood-Fill Algorithm
//
// sx, sy       : 0-indexed x,y-coordinate of the flood-fill's starting position
// arr          : 1D array representing a 2D grid. For example, [0, 1, 2,
//                                                               3, 4, 5]
// width        : width of the array. For example, 3.
// length       : length of the array. For example, 2.
// max_count    : how many cells should be visited. For example, 5.
// max_priority : the maximum possible priority value
// get_priority : a function that takes in an item and returns a priority value
// can_visit    : a function that takes in x, y, and returns true if it can be visited.
// visit        : a function that takes in x, y, and performs an operation on it.
// stop         : a function that returns true if the flood-fill should stop.
//
// EXAMPLE USAGE
//
// flood_fill(125, 125, texturemap, MAP_WIDTH, MAP_LENGTH, 3500, MAX_TILE_HEIGHT,
//     ([x, y]) => {
//         const i = y*MAP_WIDTH + x;
//         return heightmap[i];
//     },
//     (x, y) => {
//         const i = y*MAP_WIDTH + x;
//         return texturemap[i] === Texture.WATER || texturemap[i] === Texture.SAND;
//     },
//     (x, y) => {
//         const i = y*MAP_WIDTH + x;
//         texturemap[i] = Texture.CONCRETE;
//     },
//     () => {
//         return false;
//     }
// );
//
function flood_fill(sx, sy, arr, width, length, max_count, max_priority, get_priority, can_visit, visit, stop) {
    const cardinals = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const seen = Array(width).fill().map(() => Array(length).fill(false));
    const queue = new BucketQueue(max_priority, get_priority);
    queue.enqueue([sx, sy]);
    let visit_count = 0;
    seen[sx][sy] = true;
    while (!queue.isEmpty() && visit_count < max_count && !stop()) {
        const [x, y] = queue.dequeue();
        if (can_visit(x, y)) {
            visit(x, y);
            visit_count++;
            for (const [dx, dy] of cardinals) {
                const [nx, ny] = [x+dx, y+dy];
                if (nx >= 0 && ny >= 0 && nx < width && ny < length && !seen[nx][ny]) {
                    seen[nx][ny] = true;
                    queue.enqueue([nx, ny]);
                }
            }
        }
    }
}

// Returns the average height of a tile, determined by its corner points.
// Safely handles tiles on the southern/eastern sides of the map that have <= 2 corner points.
// x, y : map tile location
function avgHeight(x, y) {
    const x2 = Math.min(MAP_WIDTH-1, x + 1);
    const y2 = Math.min(MAP_LENGTH-1, y + 1);
    const i1 = y*MAP_WIDTH + x;
    const i2 = y2*MAP_WIDTH + x;
    const i3 = y*MAP_WIDTH + x2;
    const i4 = y2*MAP_WIDTH + x2;
    return Math.floor((heightmap[i1] + heightmap[i2] + heightmap[i3] + heightmap[i4]) / 4);
}

// The following functions take in an index i, which represents a position at
// coordinate (x, y), and return the index when the position is offset.
// If the offset position exceeds the map boundaries, they return i.

// y - 1
function i_N(i) {
    return i - MAP_WIDTH < 0 ? i : i - MAP_WIDTH;
}
// x + 1
function i_E(i) {
    return (i + 1) % MAP_WIDTH == 0 ? i : i + 1;
}
// y + 1
function i_S(i) {
    return i + MAP_WIDTH >= MAP_AREA ? i : i + MAP_WIDTH;
}
// x - 1
function i_W(i) {
    return i % MAP_WIDTH == 0 ? i : i - 1;
}
// x - 1, y - 1
function i_NW(i) {
    return i - MAP_WIDTH < 0 || i % MAP_WIDTH == 0 ? i : i - 1 - MAP_WIDTH;
}
// x + 1, y - 1
function i_NE(i) {
    return i - MAP_WIDTH < 0 || (i + 1) % MAP_WIDTH == 0 ? i : i + 1 - MAP_WIDTH;
}
// x - 1, y + 1
function i_SW(i) {
    return i + MAP_WIDTH >= MAP_AREA || i % MAP_WIDTH == 0 ? i : i - 1 + MAP_WIDTH;
}
// x + 1, y + 1
function i_SE(i) {
    return i + MAP_WIDTH >= MAP_AREA || (i + 1) % MAP_WIDTH == 0 ? i : i + 1 + MAP_WIDTH;
}

// Auto-Cliff Algorithm
// (1) For each of the 4 corners of a tile, compare the two adjacent edges
// (2) If one edge is significantly shorter than the other, mark it.
// (3) Use the following table to set the tile
//
// N E S W Tile     Rotation
// 1   1   straight 0 (or 180)
//   1   1 straight 90 (or 270)
//   1 1   corner   0 (NW peak)
//     1 1 corner   90 (NE peak)
// 1     1 corner   180 (SE peak)
// 1 1     corner   270 (SW peak)
//
// everything else: doublecliff random rotation
const CliffMap = new Map([
    [0b1010, Texture.CLIFF2 | 0 * 0x1000],
    [0b0101, Texture.CLIFF2 | 1 * 0x1000],
    [0b0110, Texture.CORNER_CLIFF2 | 0 * 0x1000],
    [0b0011, Texture.CORNER_CLIFF2 | 1 * 0x1000],
    [0b1001, Texture.CORNER_CLIFF2 | 2 * 0x1000],
    [0b1100, Texture.CORNER_CLIFF2 | 3 * 0x1000]
]);

const Edge = Object.freeze({
    N: 0b1000,
    E: 0b0100,
    S: 0b0010,
    W: 0b0001
});

function autoCliff(i) {
    const NW = heightmap[i];
    const NE = heightmap[i_E(i)];
    const SW = heightmap[i_S(i)];
    const SE = heightmap[i_SE(i)];

    let bits = 0b0000;

    const lenNorth = Math.abs(NW - NE);
    const lenEast = Math.abs(NE - SE);
    const lenSouth = Math.abs(SW - SE);
    const lenWest = Math.abs(NW - SW);

    const range = Math.max(NW, NE, SW, SE) - Math.min(NW, NE, SW, SE);
    const threshold = Math.floor(range * 0.30);

    // Corner NW
    if (lenWest - lenNorth > threshold) {
        bits |= Edge.N;
    } else if (lenNorth - lenWest > threshold) {
        bits |= Edge.W;
    }
    // Corner NE
    if (lenEast - lenNorth > threshold) {
        bits |= Edge.N;
    } else if (lenNorth - lenEast > threshold) {
        bits |= Edge.E;
    }
    // Corner SE
    if (lenEast - lenSouth > threshold) {
        bits |= Edge.S;
    } else if (lenSouth - lenEast > threshold) {
        bits |= Edge.E;
    }
    // Corner SW
    if (lenWest - lenSouth > threshold) {
        bits |= Edge.S;
    } else if (lenSouth - lenWest > threshold) {
        bits |= Edge.W;
    }

    if (CliffMap.has(bits)) {
        return CliffMap.get(bits);
    } else {
        return Texture.CLIFF_DOUBLE | gameRand(4) * 0x1000;
    }
}

// const Weights = Object.freeze({
//     "Red": 10,
//     "Blue": 75,
//     "Green": 15,
// });
function weightedRandom(object) {
    let sum = 0;
    for (const property in object) {
        sum += object[property];
    }

    let choice = gameRand(sum) + 1;
    for (const property in object) {
        choice -= object[property];
        if (choice <= 0) {
            return property;
        }
    }
    throw new Error("weightedRandom");
}

function set_ground_tex(i, h) {
    if (h < 95) {
        texturemap[i] = gameRand(2) ? get_texture("BROWN") : get_texture("GREEN");
    } else if (h < 160) {
        texturemap[i] = get_texture("YELLOW");
    } else {
        texturemap[i] = get_texture("RED");
    }
}

function get_ground_tiletype() {
    return gameRand(80) ? TileType.GROUND : TileType.FEATURE;
}

function get_feature() {
    switch (weightedRandom({
        "a": 1,
        "b": 1,
        "c": 1,
        "d": 1,
        "e": 1,
        "f": 3,
        "g": 4,
        "h": 4,
        "i": 4,
        "j": 4,
        "k": 4,
        "l": 4
    })) {
        case "a": return "Chevy";
        case "b": return "Pickup";
        case "c": return "WreckedVertCampVan";
        case "d": return "WreckedSuzukiJeep";
        case "e": return "BlueCar";
        case "f": return "WaterTower";
        case "g": return "Ruin1";
        case "h": return "Ruin3";
        case "i": return "Ruin5";
        case "j": return "Ruin7";
        case "k": return "Ruin9";
        case "l": return "BarbHUT";
    }
}

function get_texture(tex) {
    switch (tex) {
    case "GREEN":
        switch (weightedRandom({
            "a": 15,
            "b": 1
        })) {
            case "a": return Texture.GREEN | gameRand(4) * 0x1000;
            case "b": return Texture.CRATER_GREEN | gameRand(4) * 0x1000;
        }
    case "CONCRETE":
        switch (gameRand(2)) {
            case 0: return Texture.CONCRETE_1 | gameRand(4) * 0x1000;
            case 1: return Texture.CONCRETE_2 | gameRand(4) * 0x1000;
        }
    case "BROWN":
        switch (weightedRandom({
            "a": 12,
            "b": 12,
            "c": 12,
            "d": 12,
            "e": 1
        })) {
            case "a": return Texture.BROWN_1 | gameRand(4) * 0x1000;
            case "b": return Texture.BROWN_2 | gameRand(4) * 0x1000;
            case "c": return Texture.BROWN_3 | gameRand(4) * 0x1000;
            case "d": return Texture.BROWN_4 | gameRand(4) * 0x1000;
            case "e": return Texture.CRATER_BROWN | gameRand(4) * 0x1000;
        }
    case "RED":
        switch (weightedRandom({
            "a": 18,
            "b": 18,
            "c": 18,
            "d": 18,
            "e": 18,
            "f": 18,
            "g": 1
        })) {
            case "a": return Texture.RED_1 | gameRand(4) * 0x1000;
            case "b": return Texture.RED_2 | gameRand(4) * 0x1000;
            case "c": return Texture.RED_3 | gameRand(4) * 0x1000;
            case "d": return Texture.RED_4 | gameRand(4) * 0x1000;
            case "e": return Texture.RED_5 | gameRand(4) * 0x1000;
            case "f": return Texture.RED_6 | gameRand(4) * 0x1000;
            case "g": return Texture.CRATER_RED | gameRand(4) * 0x1000;
        }
    case "YELLOW":
        switch (weightedRandom({
            "a": 50,
            "b": 50,
            "c": 1
        })) {
            case "a": return Texture.YELLOW_1 | gameRand(4) * 0x1000;
            case "b": return Texture.YELLOW_2 | gameRand(4) * 0x1000;
            case "c": return Texture.CRATER_YELLOW | gameRand(4) * 0x1000;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////

let texturemap = Array(MAP_AREA);
let heightmap = Array(MAP_AREA).fill(0);
let structures = [];
let droids = [];
let features = [];

let tiletypemap = Array(MAP_AREA).fill(TileType.CLIFF);

const rigged_regions = [
    [0, 0, 0, MAP_LENGTH, (x, y, i, range) => range-1], // western border

    [base[0]-BASE_SIZE, base[1]-BASE_SIZE, base[0]+BASE_SIZE, base[1]+BASE_SIZE, BASE_HEIGHT],
];

// Generate 1 quarter of the heightmap
const submap = generateFractalValueNoise(
        /* width     = */ center_x+2,
        /* length    = */ center_y+2,
        /* range     = */ MAX_TILE_HEIGHT,
        /* crispness = */ 7,
        /* scale     = */ 20,
        /* normalize = */ MAX_TILE_HEIGHT,
        /* regions   = */ rigged_regions,
        /* rowMajor  = */ true
);

// Copy 1 eighth into the real heightmap
for (let y = 0; y <= center_y+1; y++) {
    for (let x = 0; x <= y; x++) {
        const i = y*MAP_WIDTH + x;
        const i2 = y*(center_x+2) + x;
        heightmap[i] = submap[i2];

        // Apply a height penalty if close to the center
        const d = Math.sqrt((x-center_x)**2 + (y-center_y)**2);
        if (d < 10) {
            heightmap[i] = Math.floor(heightmap[i] * d/10);
        }
    }
}

// Carve a path from the center of the map to the base position
{
    let count = 0;
    const cache = new Map();

    flood_fill(center_x, center_y, tiletypemap, MAP_WIDTH, MAP_LENGTH, 9999, MAX_TILE_HEIGHT,
        ([x, y]) => {
            const i = y*MAP_WIDTH + x;
            if (!cache.has(i)) {
                cache.set(i, avgHeight(x, y));
            }
            return cache.get(i);
        },
        (x, y) => {
            const i = y*MAP_WIDTH + x;
            return tiletypemap[i] === TileType.CLIFF && x > 0 && y > 0 && x <= y && y <= center_y;
        },
        (x, y) => {
            tiletypemap[y*MAP_WIDTH + x] = get_ground_tiletype();
            count++;
        },
        () => {
            return count > 3500 && tiletypemap[base[1]*MAP_WIDTH + base[0]] <= TileType.GROUND;
        }
    );
}

// Smooth cliffs
for (let y = 1; y <= center_y; y++) {
    for (let x = 1; x <= y; x++) {
        const i = y*MAP_WIDTH + x;

        let bitmap = 0b00000000;

        if (tiletypemap[i-1-MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b10000000; // NW
        if (tiletypemap[i  -MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b01000000; // N
        if (tiletypemap[i+1-MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b00100000; // NE
        if (tiletypemap[i-1          ] == TileType.CLIFF) bitmap |= 0b00010000; // W
        if (tiletypemap[i+1          ] == TileType.CLIFF) bitmap |= 0b00001000; // E
        if (tiletypemap[i-1+MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b00000100; // SW
        if (tiletypemap[i  +MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b00000010; // S
        if (tiletypemap[i+1+MAP_WIDTH] == TileType.CLIFF) bitmap |= 0b00000001; // SE

        if (!CliffLife.has(bitmap)) {
            tiletypemap[i] = get_ground_tiletype();
        }
    }
}

// Boost cliff heights
for (let y = 0; y <= center_y+1; y++) {
    for (let x = 0; x <= y; x++) {
        const i = y*MAP_WIDTH + x;
        if (tiletypemap[i]       == TileType.CLIFF &&
            tiletypemap[i_N (i)] == TileType.CLIFF &&
            tiletypemap[i_W (i)] == TileType.CLIFF &&
            tiletypemap[i_NW(i)] == TileType.CLIFF) {

            heightmap[i] = Math.min(MAX_TILE_HEIGHT, heightmap[i] * 1 + 96 + gameRand(32));
        }
    }
}

// Place oils
(() => {
    const flood_fill = create_flood_fill(MAP_WIDTH, MAP_LENGTH);
    const oils = Array(MAP_AREA).fill(false);
    for (let y = 1; y < center_y-1; y++) {
        for (let x = 1; x < y-1; x++) {
            const i = y*MAP_WIDTH + x;
            if (!oils[i] &&
                tiletypemap[i-1-MAP_WIDTH] <= TileType.GROUND &&
                tiletypemap[i  -MAP_WIDTH] <= TileType.GROUND &&
                tiletypemap[i+1-MAP_WIDTH] <= TileType.GROUND &&
                tiletypemap[i-1          ] <= TileType.GROUND &&
                tiletypemap[i+1          ] <= TileType.GROUND &&
                tiletypemap[i-1+MAP_WIDTH] <= TileType.GROUND &&
                tiletypemap[i  +MAP_WIDTH] <= TileType.GROUND &&
                tiletypemap[i+1+MAP_WIDTH] <= TileType.GROUND
            ) {
                tiletypemap[i] = TileType.OIL;
                flood_fill(i, 1000, 25,
                    i => {
                        const x = i % MAP_WIDTH;
                        const y = Math.floor(i / MAP_WIDTH);
                        return x > 0 && y > 0 && x <= y && y <= center_y;
                    },
                    i => oils[i] = true,
                    () => false
                );
            }
        }
    }
    tiletypemap[center_y*MAP_WIDTH + center_x] = TileType.OIL;
})();

// // Copy the slice to the others
// {
//     // Due to a "bug" where the right and bottom edges of the map are
//     // "missing" corner vertices, rotation could cause an out-of-bounds error
//     function out_of_bounds(x, y) {
//         return x >= MAP_WIDTH || y >= MAP_LENGTH;
//     }
//
//     for (let y = 0; y <= center_y+1; y++) {
//         for (let x = 0; x <= y; x++) {
//             // Get the tile location for each of the 8 slices
//             const [t1x, t1y] = [x, y];
//             const [t2x, t2y] = sym([t1x, t1y], "DIA");
//             const [t3x, t3y] = sym([t2x, t2y], "HOR");
//             const [t4x, t4y] = sym([t1x, t1y], "HOR");
//             const [t5x, t5y] = sym([t4x, t4y], "VER");
//             const [t6x, t6y] = sym([t5x, t5y], "DIA");
//             const [t7x, t7y] = sym([t6x, t6y], "HOR");
//             const [t8x, t8y] = sym([t1x, t1y], "VER");
//
//             // Each tile's corner vertex needs to be rotated appropriately
//             let [h1x, h1y] = [t1x, t1y];
//             let [h2x, h2y] = [t2x, t2y];
//             let [h3x, h3y] = [t3x+1, t3y];
//             let [h4x, h4y] = [t4x+1, t4y];
//             let [h5x, h5y] = [t5x+1, t5y+1];
//             let [h6x, h6y] = [t6x+1, t6y+1];
//             let [h7x, h7y] = [t7x, t7y+1];
//             let [h8x, h8y] = [t8x, t8y+1];
//
//             const h1 = h1y*MAP_WIDTH + h1x;
//             const h2 = out_of_bounds(h2x, h2y) ? h1y*MAP_WIDTH + h1x : h2y*MAP_WIDTH + h2x;
//             const h3 = out_of_bounds(h3x, h3y) ? h1y*MAP_WIDTH + h1x : h3y*MAP_WIDTH + h3x;
//             const h4 = out_of_bounds(h4x, h4y) ? h1y*MAP_WIDTH + h1x : h4y*MAP_WIDTH + h4x;
//             const h5 = out_of_bounds(h5x, h5y) ? h1y*MAP_WIDTH + h1x : h5y*MAP_WIDTH + h5x;
//             const h6 = out_of_bounds(h6x, h6y) ? h1y*MAP_WIDTH + h1x : h6y*MAP_WIDTH + h6x;
//             const h7 = out_of_bounds(h7x, h7y) ? h1y*MAP_WIDTH + h1x : h7y*MAP_WIDTH + h7x;
//             const h8 = out_of_bounds(h8x, h8y) ? h1y*MAP_WIDTH + h1x : h8y*MAP_WIDTH + h8x;
//
//             const t1 = t1y*MAP_WIDTH + t1x;
//             const t2 = t2y*MAP_WIDTH + t2x;
//             const t3 = t3y*MAP_WIDTH + t3x;
//             const t4 = t4y*MAP_WIDTH + t4x;
//             const t5 = t5y*MAP_WIDTH + t5x;
//             const t6 = t6y*MAP_WIDTH + t6x;
//             const t7 = t7y*MAP_WIDTH + t7x;
//             const t8 = t8y*MAP_WIDTH + t8x;
//
//             tiletypemap[t8] = tiletypemap[t7] = tiletypemap[t6] = tiletypemap[t5] = tiletypemap[t4] = tiletypemap[t3] = tiletypemap[t2] = tiletypemap[t1];
//             heightmap[h8] = heightmap[h7] = heightmap[h6] = heightmap[h5] = heightmap[h4] = heightmap[h3] = heightmap[h2] = heightmap[h1];
//         }
//     }
// }

// ChatGPT 5.5 Thinking optimized version of the code above ^
// Copy the slice to the other 7 symmetric slices.
// Fast path: square maps only.
{
    const N = MAP_WIDTH;
    const n1 = N - 1;
    const maxY = center_y + 1;

    const tiles = tiletypemap;
    const heights = heightmap;

    for (let y = 0; y <= maxY; ++y) {
        const rowY = y * N;
        const mirrorY = n1 - y;
        const rowMirrorY = mirrorY * N;

        // Only valid when y !== 0.
        const hRowBottomY = (N - y) * N;

        for (let x = 0; x <= y; ++x) {
            const rowX = x * N;
            const mirrorX = n1 - x;
            const rowMirrorX = mirrorX * N;

            const t1 = rowY + x;
            const tile = tiles[t1];

            // Tile copies
            tiles[rowX + y] = tile;                  // t2
            tiles[rowX + mirrorY] = tile;            // t3
            tiles[rowY + mirrorX] = tile;            // t4
            tiles[rowMirrorY + mirrorX] = tile;      // t5
            tiles[rowMirrorX + mirrorY] = tile;      // t6
            tiles[rowMirrorX + y] = tile;            // t7
            tiles[rowMirrorY + x] = tile;            // t8

            const height = heights[t1];

            // Height/corner copies.
            // These preserve your original out_of_bounds fallback behavior.
            heights[rowX + y] = height;                                      // h2
            heights[y === 0 ? t1 : rowX + (N - y)] = height;                 // h3
            heights[x === 0 ? t1 : rowY + (N - x)] = height;                 // h4
            heights[(x === 0 || y === 0) ? t1 : hRowBottomY + (N - x)] = height; // h5
            heights[(x === 0 || y === 0) ? t1 : (N - x) * N + (N - y)] = height; // h6
            heights[x === 0 ? t1 : (N - x) * N + y] = height;                // h7
            heights[y === 0 ? t1 : hRowBottomY + x] = height;                // h8
        }
    }
}

// Texture mapping
for (let i = 0; i < MAP_AREA; i++) {
    const x = i % MAP_WIDTH;
    const y = Math.floor(i / MAP_WIDTH);
    const h = avgHeight(x, y);
    switch (tiletypemap[i]) {
    case TileType.OIL:
        features.push({
            name: "OilResource",
            position: [128*(x) + 64, 128*(y) + 64],
            direction: 0
        });
        set_ground_tex(i, h);
        break;
    case TileType.FEATURE:
        if (h > 95) {
            features.push({
                name: get_feature(),
                position: [128*(x) + 64, 128*(y) + 64],
                direction: gameRand(4) * 0x4000
            });
        }
        set_ground_tex(i, h);
        break;
    case TileType.GROUND:
        set_ground_tex(i, h);
        break;
    case TileType.CLIFF:
        texturemap[i] = autoCliff(i);
        break;
    }
}

// Place trucks
for (let player = 0; player < targets.length; player++) {
    let [x, y] = targets[player];
    structures.push({
        name: "A0CommandCentre",
        position: [128*x + 64, 128*y + 64],
        direction: 0,
        modules: 0,
        player
    });
    droids.push({
        name: "ConstructionDroid",
        position: [128*x + 0, 128*y + 0],
        direction: gameRand(0x10000),
        player
    });
    droids.push({
        name: "ConstructionDroid",
        position: [128*x + 127, 128*y + 0],
        direction: gameRand(0x10000),
        player
    });
    droids.push({
        name: "ConstructionDroid",
        position: [128*x + 0, 128*y + 127],
        direction: gameRand(0x10000),
        player
    });
    droids.push({
        name: "ConstructionDroid",
        position: [128*x + 127, 128*y + 127],
        direction: gameRand(0x10000),
        player
    });
}

setMapData(MAP_WIDTH, MAP_LENGTH, texturemap, heightmap, structures, droids, features);
