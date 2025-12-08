const MIN_TILE_HEIGHT = 0;
const MAX_TILE_HEIGHT = 510;

const MAP_WIDTH = 135;
const MAP_LENGTH = 150;
const MAP_AREA = MAP_WIDTH * MAP_LENGTH;

// Variables controlling NTW map layout
const DIVIDER_WIDTH = 3;
const DIVIDER_LENGTH = 12;
const BORDER_SIZE = 5;
const TEAM_SIZE = 4;
const BASE_WIDTH = 29;

// Variables controlling pyramid spawning
const NUM_PYRAMIDS_BIG = 1;
const NUM_PYRAMIDS_MEDIUM = 2;
const NUM_PYRAMIDS_SMALL = 1;
const MARGIN = 18; // number of tiles between the divider and the closest pyramid
const BATTLEFIELD_WIDTH = MAP_WIDTH - 2*BORDER_SIZE; // playable rectangular area between opposing dividers
const BATTLEFIELD_LENGTH = MAP_LENGTH - 2*(BORDER_SIZE + DIVIDER_LENGTH);
const QUADRANT_WIDTH = Math.floor(BATTLEFIELD_WIDTH / 2); // 1/4th of the map where pyramids can spawn
const QUADRANT_LENGTH = Math.floor((BATTLEFIELD_LENGTH - 2*MARGIN) / 2);

// Variables controlling sigmoid function output for smooth height interpolation
const X_MIN = -3;
const X_MAX = 3;
const X_RANGE = 6;
const ZONE_LENGTH = 60; // The length of the zone to be height-smoothed, in tiles
const STEP_SIZE = 0.1; // = X_RANGE / ZONE_LENGTH

const Texture = Object.freeze({
    BROWN: 6,
    SAND: 12,
    WATER: 17,
    CLIFF_DOUBLE: 18,
    GREEN: 23,
    TRANSITION: 43,
    CRATER_YELLOW: 55,
    CRATER_BROWN: 58,
    ROAD: 59,
    CRATER_GREEN: 62,
    CLIFF_STRAIGHT: 71
});

const TileType = Object.freeze({
    EMPTY: 0,
    OCCUPIED: 1,
});

const BaseLayouts = Object.freeze({
    "20x29_normal-cF1-rF": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "20x29_normal-cF1-rB": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "20x29_normal-cF2-rF": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "20x29_normal-cF2-rB": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "20x29_normal-cF3-rF": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "20x29_normal-cF3-rB": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "21x29_normal-cFF1-rF": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "21x29_normal-cFF1-rB": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "21x29_normal-cFF2-rF": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "21x29_normal-cFF2-rB": [
        "                             ",
        "       x   x   x   x   x     ",
        "       c   c   c   c   c     ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "21x29_normal-cFF3-rF": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "21x29_normal-cFF3-rB": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "             txxt            ",
        " o o o o     txht            ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_normal-cB1-rF": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "         txxtx x x x x       ",
        " o o o o txhtc c c c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "17x29_normal-cB1-rB": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "         txxtx x x x x       ",
        " o o o o txhtc c c c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_normal-cB2-rF": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          txxtx x x x x      ",
        " o o o o  txhtc c c c c      ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "17x29_normal-cB2-rB": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          txxtx x x x x      ",
        " o o o o  txhtc c c c c      ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_normal-cB3-rF": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          x xtxxtx x x       ",
        " o o o o  c ctxhtc c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        "                             ",
    ],
    "17x29_normal-cB3-rB": [
        "                             ",
        "      xxx xxx xxx xxx xxx    ",
        "      xfx xfx xfx xfx xfx    ",
        "      xxx xxx xxx xxx xxx    ",
        "                             ",
        "          x xtxxtx x x       ",
        " o o o o  c ctxhtc c c       ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xp xp xp xp xp     ",
        " o o o o                     ",
        " o o o o  xx xx xx xx xx     ",
        " o o o o  xr xr xr xr xr     ",
        "                             ",
    ],
    "17x29_compact-c1-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "          txxtx x x x x      ",
        "    oo oo txhtc c c c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "                             ",
    ],
    "17x29_compact-c2-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           txxtx x x x x     ",
        "    oo oo  txhtc c c c c     ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "                             ",
    ],
    "17x29_compact-c3-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           x xtxxtx x x      ",
        "    oo oo  c ctxhtc c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "                             ",
    ],
    "17x29_compact-c1-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "          txxtx x x x x      ",
        "    oo oo txhtc c c c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "                             ",
    ],
    "17x29_compact-c2-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           txxtx x x x x     ",
        "    oo oo  txhtc c c c c     ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "                             ",
    ],
    "17x29_compact-c3-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "           x xtxxtx x x      ",
        "    oo oo  c ctxhtc c c      ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xp xp xp xp xp    ",
        "    oo oo                    ",
        "    oo oo  xx xx xx xx xx    ",
        "    oo oo  xr xr xr xr xr    ",
        "                             ",
    ],
    "17x29_short-3-c": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "   xx xx xxtxxtxx xx xx xx   ",
        "   xp xr xrtxhtxr xr xr xp   ",
        "                             ",
        "   xx xx oo oo oo oo xx xx   ",
        "   xp xp oo oo oo oo xp xp   ",
        "         oo oo oo oo         ",
        "   xx xx oo oo oo oo xx xx   ",
        "   xp xp oo oo oo oo xp xp   ",
        "                             ",
    ],
    "17x29_short-4-c": [
        "                             ",
        "      x   x   x   x   x      ",
        "      c   c   c   c   c      ",
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "   xx xx xxtxxtxx xx xx xx   ",
        "   xp xr xrtxhtxr xr xr xp   ",
        "                             ",
        "   xx xx xx xx xx xx xx xx   ",
        "   xp xp xp xp xp xp xp xp   ",
        "                             ",
        "   ooooo ooooo ooooo ooooo   ",
        "   ooooo ooooo ooooo ooooo   ",
        "                             ",
    ],
    "17x29_kracker-rF": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "        xxx xxx xxx xxx xxx  ",
        "    txxtxfx xfx xfx xfx xfx  ",
        "    txhtxxx xxx xxx xxx xxx  ",
        "                             ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xr xr xr xr xr  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "                             ",
    ],
    "17x29_kracker-rB": [
        "                             ",
        "        x   x   x   x   x    ",
        "        c   c   c   c   c    ",
        "                             ",
        "        xxx xxx xxx xxx xxx  ",
        "    txxtxfx xfx xfx xfx xfx  ",
        "    txhtxxx xxx xxx xxx xxx  ",
        "                             ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xp xp xp xp xp  ",
        "   o o o o o                 ",
        "   o o o o o xx xx xx xx xx  ",
        "   o o o o o xr xr xr xr xr  ",
        "                             ",
    ],
    "17x29_twin-1-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "         x xtxxtx x x        ",
        " o o     c ctxhtc c c    o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xr xr xr xr xr  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        "                             ",
    ],
    "17x29_twin-1-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "         x xtxxtx x x        ",
        " o o     c ctxhtc c c    o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xr xr xr xr xr  o o ",
        "                             ",
    ],
    "17x29_twin-2-rF": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "      x   x   x   x   x      ",
        " o o  c   c   c   c   c  o o ",
        " o o                     o o ",
        " o o txxtxx xx xx xx xx  o o ",
        " o o txhtxr xr xr xr xr  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        "                             ",
    ],
    "17x29_twin-2-rB": [
        "                             ",
        "     xxx xxx xxx xxx xxx     ",
        "     xfx xfx xfx xfx xfx     ",
        "     xxx xxx xxx xxx xxx     ",
        "                             ",
        "      x   x   x   x   x      ",
        " o o  c   c   c   c   c  o o ",
        " o o                     o o ",
        " o o txxtxx xx xx xx xx  o o ",
        " o o txhtxp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xp xp xp xp xp  o o ",
        " o o                     o o ",
        " o o     xx xx xx xx xx  o o ",
        " o o     xr xr xr xr xr  o o ",
        "                             ",
    ]
});


// x, y     - the northwest corner of the location where the layout is to be pasted
// layout   - an array of strings representing the layout
// rotation - an integer 0, 1, 2, or 3 representing 0, 90, 180, and 270 degree clockwise rotation of the layout
// mirror   - a boolean for if the layout should be mirrored lengthwise (left becomes right, right becomes left)
// player   - an integer repsenting the player that the structures/droids belong to
function pasteLayout(x, y, layout, rotation, mirror, player) {
    let width_t = layout[0].length;
    let length_t = layout.length;

    for (let row = 0; row < length_t; row++) {
        for (let col = 0; col < width_t; col++) {
            let char = (() => {
                switch (rotation) {
                    case 0: return mirror ? layout[row][width_t-1-col] : layout[row][col];
                    case 1: throw new Error("Not yet implemented"); // TODO
                    case 2: return mirror ? layout[length_t-1-row][col] : layout[length_t-1-row][width_t-1-col];
                    case 3: throw new Error("Not yet implemented"); // TODO
                }
            })();

            switch (char) {
                case "c":
                    structures.push({
                        name: "A0CyborgFactory",
                        position: [128 * (x+col) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((2+rotation)%4) * 0x4000,
                        modules: 0,
                        player: player
                    });
                    break;
                case "f":
                    structures.push({
                        name: "A0LightFactory",
                        position: [128 * (x+col) + 64, 128 * (y+row) + 64],
                        direction: ((2+rotation)%4) * 0x4000,
                        modules: 2,
                        player: player
                    });
                    break;
                case "h":
                    structures.push({
                        name: "A0CommandCentre",
                        position: [128 * (x+col+(mirror!=(rotation==2))) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 0,
                        player: player
                    });
                    break;
                case "p":
                    structures.push({
                        name: "A0PowerGenerator",
                        position: [128 * (x+col+(mirror!=(rotation==2))) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 1,
                        player: player
                    });
                    break;
                case "r":
                    structures.push({
                        name: "A0ResearchFacility",
                        position: [128 * (x+col+(mirror!=(rotation==2))) + 64, 128 * (y+row+(rotation==2)) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 1,
                        player: player
                    });
                    break;
                case "o":
                    structures.push({
                        name: "A0ResourceExtractor",
                        position: [128 * (x+col) + 64, 128 * (y+row) + 64],
                        direction: ((0+rotation)%4) * 0x4000,
                        modules: 0,
                        player: player
                    });
                    switch (texturemap[(y+row)*MAP_WIDTH + (x+col)]) {
                        case Texture.SAND:
                            texturemap[(y+row)*MAP_WIDTH + (x+col)] = Texture.CRATER_YELLOW;
                            break;
                        case Texture.BROWN:
                            texturemap[(y+row)*MAP_WIDTH + (x+col)] = Texture.CRATER_BROWN;
                            break;
                        case Texture.GREEN:
                            texturemap[(y+row)*MAP_WIDTH + (x+col)] = Texture.CRATER_GREEN;
                            break;
                    }
                    break;
                case "t":
                    droids.push({
                        name: "ConstructionDroid",
                        position: [128 * (x+col) + 64, 128 * (y+row) + 64],
                        direction: (2+rotation)%4 * 0x4000,
                        player: player
                    });
                    break;
            }
        }
    }
}

const BaseLayoutWeights = Object.freeze({
    "20x29_normal-cF1-rF": 1,
    "20x29_normal-cF1-rB": 1,
    "20x29_normal-cF2-rF": 1,
    "20x29_normal-cF2-rB": 1,
    "20x29_normal-cF3-rF": 1,
    "20x29_normal-cF3-rB": 1,
    "21x29_normal-cFF1-rF": 1,
    "21x29_normal-cFF1-rB": 1,
    "21x29_normal-cFF2-rF": 1,
    "21x29_normal-cFF2-rB": 1,
    "21x29_normal-cFF3-rF": 1,
    "21x29_normal-cFF3-rB": 1,
    "17x29_normal-cB1-rF": 1,
    "17x29_normal-cB1-rB": 1,
    "17x29_normal-cB2-rF": 1,
    "17x29_normal-cB2-rB": 1,
    "17x29_normal-cB3-rF": 1,
    "17x29_normal-cB3-rB": 1,

    "17x29_compact-c1-rF": 3,
    "17x29_compact-c2-rF": 3,
    "17x29_compact-c3-rF": 3,
    "17x29_compact-c1-rB": 3,
    "17x29_compact-c2-rB": 3,
    "17x29_compact-c3-rB": 3,

    "17x29_short-3-c": 9,

    "17x29_short-4-c": 9,

    "17x29_kracker-rF": 4,
    "17x29_kracker-rB": 4,

    "17x29_twin-1-rF": 4,
    "17x29_twin-1-rB": 4,

    "17x29_twin-2-rF": 4,
    "17x29_twin-2-rB": 4,
});

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


// Perform an operation on a rectangular area.
// x, y      : the top left corner of the rectangle
// width     : the width of the rectangle
// length    : the length of the rectangle
// operation : a function that takes in x, y, and performs an operation
function fill(x, y, width, length, operation) {
    for (let dy = 0; dy < length; dy++) {
        for (let dx = 0; dx < width; dx++) {
            operation(x+dx, y+dy);
        }
    }
}

// Fill an area (negative) e.g. create a pit
// x, y      : the top left corner of the rectangle
// width   : the width of the rectangle
// length  : the length of the rectangle
// texture : a function that takes in x, y, and returns a texture for that position
// height  : a function that takes in x, y, and returns a height for that position
function fill_negative(x, y, width, length, texture, height) {
    for (let dy = 0; dy < length; dy++) { // Main body
        for (let dx = 0; dx < width; dx++) {
            const i = (y+dy)*MAP_WIDTH + (x+dx);
            heightmap[i] = height(x+dx, y+dy);
            texturemap[i] = texture(x+dx, y+dy);
        }
    }
    for (let dy = 0; dy < length + 1; dy++) { // Get the right edge
        const i = (y+dy)*MAP_WIDTH + (x+width);
        heightmap[i] = height(x+width, y+dy);
    }
    for (let dx = 0; dx < width; dx++) { // Get the bottom edge
        const i = (y+length)*MAP_WIDTH + (x+dx);
        heightmap[i] = height(x+dx, y+length);
    }
}

// Returns true if every tile in a rectangular area matches the condition.
// Returns false otherwise.
// x, y      : the top left corner of the rectangle
// width     : the width of the rectangle
// length    : the length of the rectangle
// condition : a function that takes in an x, y, and returns true or false
function area_check(x, y, width, length, condition) {
    for (let dy = 0; dy < length; dy++) {
        for (let dx = 0; dx < width; dx++) {
            if (!condition(x+dx, y+dy)) {
                return false;
            }
        }
    }
    return true;
}

// Returns the maximum height of a rectangular area
function max_height(x, y, width, length) {
    let max = 0;
    for (let dy = 0; dy < length; dy++) {
        for (let dx = 0; dx < width; dx++) {
            const i = (y+dy)*MAP_WIDTH + (x+dx);
            if (heightmap[i] > max) {
                max = heightmap[i];
            }
        }
    }
    return max;
}

// Returns the corresponding symmetrical location on the other side of the map.
// i    : a location on the map, represented as either an index or [x, y]
// type : 180 rotation, horizontal mirror, or vertical mirror
function sym(i, type) {
    if (Array.isArray(i)) {
        const [x, y] = i;
        switch (type) {
            case "180": return [MAP_WIDTH-1-x, MAP_LENGTH-1-y];
            case "HOR": return [MAP_WIDTH-1-x, y];
            case "VER": return [x, MAP_LENGTH-1-y];
        }
    } else {
        switch (type) {
            case "180": return MAP_AREA-1-i;
            case "HOR": return i - (i % MAP_WIDTH) + MAP_WIDTH - 1 - (i % MAP_WIDTH);
            case "VER": return (MAP_LENGTH - 1 - Math.floor(i / MAP_WIDTH)) * MAP_WIDTH + (i % MAP_WIDTH);
        }
    }
}

// Transform a heightmap into a symmetrical heightmap, in-place
// This function uses a self-additive method, which causes the height values to increase
// Post-normalization may be needed
// arr  : the heightmap
// type : symmetry type
function symmetricalize(arr, type) {
    switch (type) {
        case "90":   return type90();
        case "180":  return type180();
        case "HOR":  return typeHOR();
        case "VER":  return typeVER();
        case "TWIN": return typeTWIN();
    }
    // 90 degree rotational symmetry
    function type90() {
        // return the index located in the next quadrant
        function rotate90(i) {
            return (i % MAP_WIDTH) * MAP_LENGTH + (MAP_WIDTH-1 - Math.floor(i / MAP_WIDTH));
        }

        if (MAP_WIDTH != MAP_LENGTH) {
            throw new Error("90 degree rotational symmetry is only supported on square maps!");
        }

        for (let x = 0; x < Math.ceil(MAP_WIDTH/2); x++) {
            for (let y = 0; y < Math.ceil(MAP_LENGTH/2); y++) {
                const i1 = y*MAP_WIDTH + x;
                const i2 = rotate90(i1);
                const i3 = rotate90(i2);
                const i4 = rotate90(i3);
                arr[i1] = arr[i1] + arr[i2] + arr[i3] + arr[i4];
                arr[i4] = arr[i3] = arr[i2] = arr[i1];
            }
        }
        return arr;
    }
    // 180 degree rotational symmetry
    function type180() {
        for (let i = 0; i < MAP_AREA; i++) {
            if (i < Math.ceil(MAP_AREA/2)) {
                arr[i] = arr[i] + arr[sym(i,"180")];
            } else {
                arr[i] = arr[sym(i,"180")];
            }
        }
        return arr;
    }
    // Horizontal (left-right) mirror symmetry
    function typeHOR() {
        for (let x = 0; x < MAP_WIDTH; x++) {
            for (let y = 0; y < MAP_LENGTH; y++) {
                const i = y*MAP_WIDTH + x;
                if (x < Math.ceil(MAP_WIDTH/2)) {
                    arr[i] = arr[i] + arr[sym(i,"HOR")];
                } else {
                    arr[i] = arr[sym(i,"HOR")];
                }
            }
        }
        return arr;
    }
    // Vertical (top-bottom) mirror symmetry
    function typeVER() {
        for (let y = 0; y < MAP_LENGTH; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
                const i = y*MAP_WIDTH + x;
                if (y < Math.ceil(MAP_LENGTH/2)) {
                    arr[i] = arr[i] + arr[sym(i,"VER")];
                } else {
                    arr[i] = arr[sym(i,"VER")];
                }
            }
        }
        return arr;
    }
    // Twin (horizontal + vertical) mirror symmetry
    function typeTWIN() {
        typeHOR();
        typeVER();
        return arr;
    }
}

// Normalize an array to the range [a, b]
function normalize(arr, a, b) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = a + ((arr[i] - min) / (max - min)) * (b - a);
    }
    return arr;
}

function sigmoid(x) {
    return (Math.E**x) / (1 + Math.E**x);
}

function get_height(x, y) {
    const i = y*MAP_WIDTH + x;
    const distance = Math.min(y - BORDER_SIZE, MAP_LENGTH - BORDER_SIZE - 1 - y); // Distance from the top/bottom of the map

    let height = noisemap[i];

    if (distance <= ZONE_LENGTH) {
        height = Math.floor(height * sigmoid(STEP_SIZE * distance + X_MIN));
    }
    return Math.max(0, height);
}

function get_texture(x, y) {
    const i = y*MAP_WIDTH + x;
    const distance = Math.min(y - BORDER_SIZE, MAP_LENGTH - BORDER_SIZE - 1 - y); // Distance from the top/bottom of the map

    if (heightmap[i] < 15) {
        return Texture.GREEN;
    } else if (heightmap[i] < 35) {
        return Texture.BROWN;
    } else {
        return Texture.SAND;
    }
}

// Returns true if a pyramid can be built at x, y
// Returns false otherwise
function can_build_pyramid(x, y, size) {
    return area_check(x, y, size, size, (x, y) => {
        const i = y*MAP_WIDTH + x;
        return tiletypemap[i] == TileType.EMPTY;
    });
}

function build_pyramids(x, y, size) {
    const start_height = max_height(x, y, size+1, size+1);
    const finish_height = MAX_TILE_HEIGHT - 32*(10 - size);
    const num_layers = Math.floor(size / 2);
    const increment = Math.floor((finish_height - start_height) / num_layers);
    build_pyramid(x, y, size, start_height, increment);
    build_pyramid(...sym([x+size-1, y+size-1], "180"), size, start_height, increment);
    build_pyramid(...sym([x+size-1, y], "HOR"), size, start_height, increment);
    build_pyramid(...sym([x, y+size-1], "VER"), size, start_height, increment);

    // Set tiletype
    fill(x, y, size, size, (x, y) => {
        const i = y*MAP_WIDTH + x;
        tiletypemap[i] = TileType.OCCUPIED;
    });
}

// [x, y]    : the top left corner of the pyramid
// size      : the width of the pyramid, in tiles
// height    : the height of the current layer
// increment : the height difference in between layers
function build_pyramid(x, y, size, height, increment) {
    const i = y*MAP_WIDTH + x;

    if (size == 0) {
        heightmap[i] = height;
        return;
    }

    texturemap[i] = Texture.CLIFF_DOUBLE | (2 * 0x1000);
    texturemap[i+size-1] = Texture.CLIFF_DOUBLE | (3 * 0x1000);
    texturemap[i+(size-1)*MAP_WIDTH] = Texture.CLIFF_DOUBLE | (1 * 0x1000);
    texturemap[i+(size-1)*MAP_WIDTH+size-1] = Texture.CLIFF_DOUBLE | (0 * 0x1000);

    for (let dx = 0; dx < size - 2; dx++) {
        const i = (y+size-1)*MAP_WIDTH + (x+1+dx);
        texturemap[i] = Texture.CLIFF_STRAIGHT | (0 * 0x1000);
    }
    for (let dy = 0; dy < size - 2; dy++) {
        const i = (y+1+dy)*MAP_WIDTH + x;
        texturemap[i] = Texture.CLIFF_STRAIGHT | (1 * 0x1000);
    }
    for (let dx = 0; dx < size - 2; dx++) {
        const i = y*MAP_WIDTH + (x+1+dx);
        texturemap[i] = Texture.CLIFF_STRAIGHT | (2 * 0x1000);
    }
    for (let dy = 0; dy < size - 2; dy++) {
        const i = (y+1+dy)*MAP_WIDTH + (x+size-1);
        texturemap[i] = Texture.CLIFF_STRAIGHT | (3 * 0x1000);
    }

    // Set height
    fill(x, y, size+1, size+1, (x, y) => {
        const i = y*MAP_WIDTH + x;
        heightmap[i] = height;
    });

    // Recursive call
    build_pyramid(x+1, y+1, size-2, height + increment, increment);
}

////////////////////////////////////////////////////////////////////////////////

let texturemap = Array.from({length: MAP_AREA}, () => Texture.CLIFF_DOUBLE | (gameRand(4) * 0x1000));
let heightmap = Array.from({length: MAP_AREA}, () => 320 - gameRand(128));
let structures = [];
let droids = [];
let features = [];

let tiletypemap = Array(MAP_AREA).fill(TileType.EMPTY);
let noisemap = generateFractalValueNoise(
        /* width     = */ MAP_WIDTH,
        /* length    = */ MAP_LENGTH,
        /* range     = */ MAX_TILE_HEIGHT,
        /* crispness = */ 7,
        /* scale     = */ 22,
        /* normalize = */ MAX_TILE_HEIGHT,
        /* regions   = */ [],
        /* rowMajor  = */ true
);

symmetricalize(noisemap, "TWIN");

normalize(noisemap, 0, 176);

// Build the battlefield
fill_negative(
    /* x        = */ BORDER_SIZE,
    /* y        = */ BORDER_SIZE + DIVIDER_LENGTH,
    /* width    = */ BATTLEFIELD_WIDTH,
    /* length   = */ BATTLEFIELD_LENGTH,
    /* texture  = */ get_texture,
    /* height   = */ get_height
);

// Carve out spaces for the bases
for (let i = 0; i < TEAM_SIZE; i++) {
    const x = BORDER_SIZE + i*(BASE_WIDTH + DIVIDER_WIDTH);
    const yA = BORDER_SIZE;
    const yB = MAP_LENGTH - BORDER_SIZE - DIVIDER_LENGTH;
    fill_negative(x, yA, BASE_WIDTH, DIVIDER_LENGTH, get_texture, get_height);
    fill_negative(x, yB, BASE_WIDTH, DIVIDER_LENGTH, get_texture, get_height);
}

// Paste the bases
let selectedLayouts = Array(TEAM_SIZE);
for (let i = 0; i < TEAM_SIZE; i++) {
    selectedLayouts[i] = BaseLayouts[weightedRandom(BaseLayoutWeights)];
}
for (let i = 0; i < TEAM_SIZE; i++) {
    const layout = selectedLayouts[i];
    const x = BORDER_SIZE + i*(BASE_WIDTH+DIVIDER_WIDTH);
    const y = BORDER_SIZE;
    pasteLayout(x, y, layout, 2, gameRand(2), i);
}
for (let i = 0; i < TEAM_SIZE; i++) {
    const layout = selectedLayouts[TEAM_SIZE-1-i];
    const x = BORDER_SIZE + i*(BASE_WIDTH+DIVIDER_WIDTH);
    const y = MAP_LENGTH - BORDER_SIZE - layout.length;
    pasteLayout(x, y, layout, 0, gameRand(2), i+TEAM_SIZE);
}

// Draw the battle line
for (let x = BORDER_SIZE; x < MAP_WIDTH - BORDER_SIZE; x++) {
    texturemap[74*MAP_WIDTH + x] = Texture.ROAD;
    texturemap[75*MAP_WIDTH + x] = Texture.ROAD;
    tiletypemap[75*MAP_WIDTH + x] = TileType.OCCUPIED;
}

// Build the pyramids!

// One guaranteed big/medium pyramid on the edge
{
    const size = gameRand(2) ? 10 : 8;
    const x = BORDER_SIZE;
    const y = BORDER_SIZE + DIVIDER_LENGTH + MARGIN + gameRand(QUADRANT_LENGTH - size + 1);
    build_pyramids(x, y, size);
}

// Build the rest randomly
let num_bigs = num_mediums = num_smalls = 0;
for (let attempts = 0; attempts < 50; attempts++) {
    const x = BORDER_SIZE + gameRand(QUADRANT_WIDTH - 10 + 1); // assume big pyramid
    const y = BORDER_SIZE + DIVIDER_LENGTH + MARGIN + gameRand(QUADRANT_LENGTH - 6 + 1); // assume small pyramid

    if (num_bigs < NUM_PYRAMIDS_BIG && can_build_pyramid(x, y, 10)) {
        build_pyramids(x, y, 10);
        num_bigs++;
    } else if (num_mediums < NUM_PYRAMIDS_MEDIUM && can_build_pyramid(x, y, 8)) {
        build_pyramids(x, y, 8);
        num_mediums++;
    } else if (num_smalls < NUM_PYRAMIDS_SMALL && can_build_pyramid(x, y, 6)) {
        build_pyramids(x, y, 6);
        num_smalls++;
    }

    if (num_bigs + num_mediums + num_smalls == NUM_PYRAMIDS_BIG + NUM_PYRAMIDS_MEDIUM + NUM_PYRAMIDS_SMALL) {
        break;
    }
}

setMapData(MAP_WIDTH, MAP_LENGTH, texturemap, heightmap, structures, droids, features);
