// ==========================================
// KINGDOM STRATEGY PRO - GAME ENGINE
// ==========================================
// --- GAME CONFIGURATION ---
const WEAPONS = {
    "Grunt":    { dmg: 10, cd: 1.0, range: 0.9, speedMod: 0.0, type: "melee", desc: "Grunt (Mercenary, 30 Gold)" },
    "Thug":     { dmg: 15, cd: 1.0, range: 1.0, speedMod: 0.10, type: "melee", desc: "Thug (Mercenary, 177 Gold)" },
    "Brute":    { dmg: 20, cd: 1.25, range: 1.25, speedMod: 0.0, type: "melee", desc: "Brute (Mercenary, 400 Gold)" },
    "Slinger":  { dmg: 11, cd: 1.0, range: 30.0, speedMod: 0.0, type: "bow", prepTime: 2.0, desc: "Slinger (Mercenary, 75 Gold)" },
    "Spy":      { dmg: 10, cd: 1.0, range: 0.9, speedMod: 0.0, type: "melee", hpMod: -50, desc: "Spy (Mercenary, 100 Gold) [Sabotage, Disguise]" },
    "Assassin": { dmg: 50, cd: 2.0, range: 1.25, speedMod: 0.0, type: "melee", desc: "Assassin (Mercenary, 500 Gold) [Stealth, Climbs Walls]" },
    "Doppelsoldner": { dmg: 30, cd: 1.5, range: 1.6, speedMod: 0.0, type: "melee", desc: "Doppelsoldner (Mercenary, 1000 Gold) [AoE Attack]" },
    "RoyalKnight": { dmg: 25, cd: 1.0, range: 1.3, speedMod: 0.0, type: "melee", desc: "Royal Knight (Mercenary, 1777 Gold)" },
    "Spear":    { dmg: 10, cd: 0.8, range: 2.1, speedMod: -0.10, type: "melee", vsCav: 2, desc: "Spear (+2.1 Range, -10% Speed)" },
    "Pike":     { dmg: 17, cd: 2.0, range: 3.1, speedMod: -0.20, type: "melee", vsCav: 3, desc: "Pike (+3.1 Range, -20% Speed)" },
    "Halberd":  { dmg: 22, cd: 2.0, range: 2.1, speedMod: -0.20, type: "melee", vsCav: 2, armorPen: 3, desc: "Halberd (+2.1 Range, -20% Speed)" },
    "Poleaxe":  { dmg: 30, cd: 1.5, range: 1.6, speedMod: -0.15, type: "melee", armorPen: 4, desc: "Poleaxe (+1.6 Range, -15% Speed)" },
    "Axe":      { dmg: 15, cd: 0.8,  range: 0.9, speedMod: 0.0,  type: "melee",  desc: "Battle Axe (Medium vs armor)" },
    "Sword":    { dmg: 10, cd: 0.4,  range: 1.25, speedMod: 0.0, type: "melee",  desc: "Broadsword (Very Fast, Weak vs armor)" },
    "Mace":     { dmg: 24, cd: 1.5,  range: 0.9, speedMod: 0.0,  type: "melee", armorPen: 5, desc: "Heavy Mace (High Dmg, Slow, Strong vs armor)" },
    "Short Bow":{ dmg: 10, cd: 1.0, range: 25.0, speedMod: -0.10, type: "bow",    prepTime: 1.0, desc: "Short Bow (1s wind-up, 1s wind-down)" },
    "Longbow":  { dmg: 13, cd: 1.0, range: 42.0, speedMod: -0.15, type: "bow",    prepTime: 2.0, desc: "Longbow (2s wind-up, 1s wind-down)" },
    "Crossbow": { dmg: 21, cd: 5.0, range: 30.0, speedMod: -0.20, type: "crossbow", armorPen: 8, reloadTime: 5.0, desc: "Crossbow (Needs 5s standstill after shot to reload)" },
    "Ballista": { dmg: 52, cd: 10.0, range: 50.0, speedMod: -0.50, type: "crossbow", reloadTime: 10.0, desc: "Ballista (10s reload, no dmg to stone)" },
    "Catapult": { dmg: 300, cd: 10.0, range: 50.0, speedMod: -0.50, type: "catapult", prepTime: 10.0, desc: "Catapult (10s prep, AOE, friendly fire)" },
    "Trebuchet": { dmg: 510, cd: 15.0, range: 60.0, speedMod: -0.50, type: "catapult", prepTime: 15.0, desc: "Trebuchet (15s prep, High Arc, AOE)" },
    "Mangonel": { dmg: 50, cd: 10.0, range: 50.0, speedMod: -0.50, type: "catapult", prepTime: 10.0, desc: "Mangonel (10s prep, throws 10 rocks)" },
    "Dagger": { dmg: 15, cd: 0.8, range: 1.2, type: "melee", desc: "Assassin weapon, high burst" }
};
const ARMORS = {
    "cloth":   { name: "Cloth",   dmgMod: 0, hpMod: 50,  speedMod: -0.10, armorMod: 1, color: 0xffffff },
    "leather": { name: "Leather", dmgMod: 0, hpMod: 50,  speedMod: 0.20,  armorMod: 0, color: 0x8d6e63 },
    "chain":   { name: "Chain",   dmgMod: 0, hpMod: 25,  speedMod: -0.15, armorMod: 4, color: 0x546e7a },
    "plate":   { name: "Plate",   dmgMod: 0, hpMod: 75,  speedMod: -0.20, armorMod: 2, color: 0xb0bec5 }
};
const WORKER_STATES = new Set([
    "farmer", "farming", "farmer_walking_to_keep", "farmer_walking_to_farm",
    "woodcutter_walking_to_tree", "chopping", "woodcutter_walking_to_hut", "woodcutter_processing",
    "woodcutter_delivering", "miner", "mining", "miner_delivering", "miner_returning",
    "shop_worker", "worker_fetching", "worker_returning_to_shop", "worker_crafting",
    "worker_delivering_item", "market_worker", "loadhouse_worker",
    "constructing_fetching", "constructing_delivering", "constructing", "building", "repairing",
    "returning_payload", "going_home", "training", "siege_training", "siege_waiting",
    "loadhouse_peasant_fetching", "loadhouse_peasant_delivering", "siege_pilot", "cutting_wood"
]);
// Base Unit Stats
const BASE_STATS = {
    king:    { maxHp: 500, speed: 2.0, armor: 5, radius: 0.4, height: 2.0, color: 0xffd700 }, // Gold armor King
    peasant: { maxHp: 50,  speed: 2.5, armor: 0, radius: 0.4, height: 1.2, color: 0x8d6e63 }, // Simple peasant
    soldier: { maxHp: 100, speed: 2.5, armor: 0, radius: 0.5, height: 1.6, color: 0x78909c }, // Trained soldier base
    siege_shield: { maxHp: 300, speed: 1.0, armor: 10, radius: 0.5, height: 1.2, color: 0xcfd8dc },
    siege_ballista: { maxHp: 200, speed: 0.75, armor: 0, radius: 0.6, height: 1.5, color: 0x8b5a2b },
    siege_catapult: { maxHp: 200, speed: 0.75, armor: 0, radius: 1.0, height: 1.5, color: 0x8b5a2b },
    siege_mangonel: { maxHp: 200, speed: 0.75, armor: 0, radius: 1.0, height: 1.5, color: 0x4a3219 },
    siege_trebuchet: { maxHp: 250, speed: 0.5, armor: 0, radius: 1.2, height: 2.5, color: 0x8b5a2b },
    tree:           { maxHp: 400, speed: 0, armor: 5, radius: 0.5, height: 3.2, color: 0x388e3c }
};
// Building configurations
const BUILDING_TYPES = {
    keep:        { name: "Keep",         radius: 2.5, height: 6.0, color: 0x757575, maxHp: 2000, peasantCap: 10, cost: 0, goldCost: 0, armor: 9, material: "stone" },
    house:       { name: "House",        radius: 1.5, height: 2.2, color: 0x8d6e63, maxHp: 300,  peasantCap: 10, cost: 10, goldCost: 0, armor: 5 },
    barracks:    { name: "Barracks",     radius: 2.0, height: 2.4, color: 0x9e9e9e, maxHp: 500,  peasantCap: 0,  cost: 10, goldCost: 0, armor: 9, material: "stone" },
    mercenary_post:{ name: "Mercenary Post", radius: 2.0, height: 2.4, color: 0x4a148c, maxHp: 500, peasantCap: 0, cost: 20, goldCost: 0, armor: 5 },
    farm:        { name: "Farm",         radius: 2.0, height: 1.5, color: 0x2e7d32, maxHp: 250,  peasantCap: 0,  cost: 10, goldCost: 0, armor: 5 },
    woodcutter:  { name: "Woodcutter",   radius: 1.5, height: 2.0, color: 0x8d6e63, maxHp: 250,  peasantCap: 0,  cost: 5,  goldCost: 0, armor: 5 },
    mine:        { name: "Mine",         radius: 2.0, height: 2.5, color: 0x455a64, maxHp: 300,  peasantCap: 0,  cost: 10, goldCost: 0, armor: 5 },
    poleturner:  { name: "Poleturner",   radius: 1.5, height: 2.2, color: 0xa1887f, maxHp: 300,  peasantCap: 0,  cost: 10, goldCost: 100, armor: 5 },
    gruntshop:   { name: "Gruntshop",    radius: 1.5, height: 2.2, color: 0x8d6e63, maxHp: 300,  peasantCap: 0,  cost: 20, goldCost: 100, armor: 5 },
    blacksmith:  { name: "Blacksmith",   radius: 1.5, height: 2.6, color: 0x37474f, maxHp: 400,  peasantCap: 0,  cost: 20, goldCost: 200, armor: 5 },
    fletcher:    { name: "Fletcher",     radius: 1.5, height: 2.0, color: 0x5d4037, maxHp: 250,  peasantCap: 0,  cost: 20, goldCost: 100, armor: 5 },
    knightarms:  { name: "Knight Arms",  radius: 1.5, height: 2.5, color: 0x78909c, maxHp: 350,  peasantCap: 0,  cost: 20, goldCost: 200, armor: 5 },
    tailor:      { name: "Tailor",       radius: 1.5, height: 2.0, color: 0xd7ccc8, maxHp: 250,  peasantCap: 0,  cost: 10, goldCost: 100, armor: 5 },
    armorer:     { name: "Armorer",      radius: 1.5, height: 2.4, color: 0x4e342e, maxHp: 350,  peasantCap: 0,  cost: 20, goldCost: 200, armor: 5 },
    stables:     { name: "Stables",      radius: 2.5, height: 2.5, color: 0x6d4c41, maxHp: 400,  peasantCap: 0,  cost: 20, goldCost: 10, armor: 5 },
    market:      { name: "Market",       radius: 2.0, height: 2.5, color: 0xf57f17, maxHp: 300,  peasantCap: 0,  cost: 20, goldCost: 10, armor: 5 },
    loadhouse:   { name: "Loadhouse",    radius: 2.0, height: 2.0, color: 0x5d4037, maxHp: 400,  peasantCap: 0,  cost: 20, goldCost: 0, armor: 5 },
    siegeshop:   { name: "Siege Shop",   radius: 2.5, height: 2.5, color: 0x5d4037, maxHp: 500,  peasantCap: 0,  cost: 15, ironCost: 5, goldCost: 100, armor: 5 },
    bakery:      { name: "Bakery",       radius: 1.5, height: 2.5, color: 0xffcc80, maxHp: 300,  peasantCap: 0,  cost: 20, goldCost: 0, armor: 5 },
    brewery:     { name: "Brewery",      radius: 1.5, height: 2.5, color: 0x8d6e63, maxHp: 300,  peasantCap: 0,  cost: 20, goldCost: 100, armor: 5 },
    carpenter:   { name: "Carpenter",    radius: 1.5, height: 2.5, color: 0x8b5a2b, maxHp: 300,  peasantCap: 0,  cost: 20, goldCost: 0, armor: 5 },
    jeweler:     { name: "Jeweler",      radius: 1.5, height: 2.5, color: 0x9c27b0, maxHp: 300,  peasantCap: 0,  cost: 20, goldCost: 200, armor: 5 },
    wall_column: { name: "Wall Segment", radius: 0.5, height: 1.0, color: 0x9e9e9e, maxHp: 100,  peasantCap: 0,  cost: 1,  goldCost: 0, armor: 9 },
    gatehouse:   { name: "Gatehouse",    radius: 0.5, height: 1.0, color: 0x757575, maxHp: 50,   peasantCap: 0,  cost: 2,  goldCost: 0, armor: 9 },
    tower:       { name: "Tower",        radius: 1.5, height: 1.0, color: 0x9e9e9e, maxHp: 100,  peasantCap: 0,  cost: 2,  goldCost: 0, armor: 9 }
};
// Workshop productions config
const WORKSHOP_PRODS = {
    bakery: [
        { name: "Premium Food", type: "premium_food", cost: { food: 10 }, time: 20 }
    ],
    brewery: [
        { name: "Brew", type: "brew", cost: { food: 10 }, time: 20 }
    ],
    carpenter: [
        { name: "Furniture", type: "furniture", cost: { wood: 20 }, time: 20 }
    ],
    jeweler: [
        { name: "Gem", type: "gem", cost: { stone: 20 }, time: 20 }
    ],
    poleturner: [
        { name: "Spear", type: "weapon", cost: { wood: 5 }, time: 5 },
        { name: "Pike", type: "weapon", cost: { wood: 10 }, time: 10 }
    ],
    gruntshop: [
        { name: "Axe", type: "weapon", cost: { iron: 5 }, time: 5 },
        { name: "Halberd", type: "weapon", cost: { wood: 10, iron: 5 }, time: 15 }
    ],
    blacksmith: [
        { name: "Sword", type: "weapon", cost: { iron: 10 }, time: 10 },
        { name: "Mace", type: "weapon", cost: { iron: 10 }, time: 10 }
    ],
    fletcher: [
        { name: "Short Bow", type: "weapon", cost: { wood: 10 }, time: 10 },
        { name: "Longbow", type: "weapon", cost: { wood: 15 }, time: 15 }
    ],
    knightarms: [
        { name: "Poleaxe", type: "weapon", cost: { wood: 5, iron: 15 }, time: 20 },
        { name: "Crossbow", type: "weapon", cost: { wood: 10, iron: 10 }, time: 20 }
    ],
    tailor: [
        { name: "cloth", type: "armor", cost: { food: 5 }, time: 5 },
        { name: "leather", type: "armor", cost: { food: 10 }, time: 10 }
    ],
    armorer: [
        { name: "chain", type: "armor", cost: { iron: 5 }, time: 5 },
        { name: "plate", type: "armor", cost: { iron: 10 }, time: 10 }
    ],
    stables: [
        { name: "horse", type: "mount", cost: { food: 20 }, time: 20 }
    ]
};
// Unit train Gold costs
const UNIT_GOLD_COSTS = {
    "Spear": 10, "Pike": 15, "Halberd": 20, "Poleaxe": 25, "Axe": 10,
    "Sword": 15, "Mace": 10, "Short Bow": 25, "Longbow": 35, "Crossbow": 10
};
// Siege Unit Training Costs
const SIEGE_UNIT_COSTS = {
    "Shield": { gold: 150, wood: 15, iron: 5, peasants: 1 },
    "Ballista": { gold: 300, wood: 30, iron: 10, peasants: 2 },
    "Catapult": { gold: 300, wood: 30, iron: 10, peasants: 2 },
    "Mangonel": { gold: 300, wood: 30, iron: 10, peasants: 2 },
    "Trebuchet": { gold: 450, wood: 45, iron: 15, peasants: 3 }
};
// --- GAME ENGINE STATE ---
window.onerror = function(message, source, lineno, colno, error) {
    document.body.innerHTML += "<h1 style='color:red;z-index:999999;position:absolute;background:black;padding:20px;'>" + message + " at line " + lineno + "</h1><pre style='color:red;z-index:999999;position:absolute;top:100px;background:black;padding:20px;'>" + (error ? error.stack : '') + "</pre>";
};
let scene, camera, renderer;
let ambientLight, directionalLight;
let terrainMesh;
let isGameStarted = false;
window.isPaused = false;

// --- MUSIC SETUP ---
let bgMusic = null;
let currentPlaylist = [];
let currentPlaylistIndex = 0;
let currentDifficulty = null;

function startMusic() {
    let newPlaylist = [];
    if (gameDifficulty === 'test') {
        newPlaylist = ['music/Crows Over the Fields (Test Mode).mp3'];
    } else if (gameDifficulty === 'easy') {
        newPlaylist = [
            'music/Crows Over the Fields (Easy Mode).mp3',
            'music/Crows Over the Fields (Test Mode).mp3'
        ];
    } else if (gameDifficulty === 'medium') {
        newPlaylist = [
            'music/Crows Over the Fields (Medium1).mp3',
            'music/Crows Over the Fields (Medium2).mp3',
            'music/Crows Over the Fields (Easy Mode).mp3',
            'music/Crows Over the Fields (Test Mode).mp3'
        ];
    } else if (gameDifficulty === 'hard') {
        newPlaylist = [
            'music/Crows Over the Fields (Hard Mode).mp3',
            'music/Crows Over the Fields (Medium2).mp3',
            'music/Crows Over the Fields (Medium1).mp3',
            'music/Crows Over the Fields (Easy Mode).mp3',
            'music/Crows Over the Fields (Test Mode).mp3'
        ];
    }

    if (!bgMusic) {
        bgMusic = new Audio();
        bgMusic.addEventListener('ended', () => {
            if (currentPlaylist.length > 1) {
                currentPlaylistIndex = (currentPlaylistIndex + 1) % currentPlaylist.length;
                bgMusic.src = currentPlaylist[currentPlaylistIndex];
                bgMusic.play().catch(e => {});
            }
        });
        bgMusic.addEventListener('error', () => {
            if (currentPlaylist.length > 1) {
                console.log("Track failed to load, skipping to next...");
                currentPlaylistIndex = (currentPlaylistIndex + 1) % currentPlaylist.length;
                bgMusic.src = currentPlaylist[currentPlaylistIndex];
                bgMusic.play().catch(e => {});
            }
        });
    }

    if (currentDifficulty !== gameDifficulty) {
        currentDifficulty = gameDifficulty;
        currentPlaylist = newPlaylist;
        currentPlaylistIndex = 0;
        bgMusic.loop = (currentPlaylist.length === 1);
        bgMusic.src = currentPlaylist[currentPlaylistIndex];
        bgMusic.volume = window.musicVolume !== undefined ? window.musicVolume : 0.24;
        bgMusic.play().catch(error => {
            console.log("No music folder found, or playback blocked. Playing in silence.");
        });
    } else {
        if (bgMusic.paused) {
            bgMusic.play().catch(error => {
                console.log("No music folder found, or playback blocked. Playing in silence.");
            });
        }
    }
}
let gameDifficulty = "easy";
let hardBotWaveTimer = 60.0;
let hardBotWaveCount = 5;
let pendingHardBotSpawns = 0;
let hardBotSpawnTimer = 0;
let hardBotAiTimer = 10.0;
let globalFoodTimer = 20.0;
let starvationTimer = 1.0;
let globalGameTime = 0;
function formatGameTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}
const SILLY_FIRST_NAMES = ["Bob", "Jimmy", "Sally", "Sir", "Lord", "Count", "Duke", "Baron", "Stinky", "Wobble", "Cheesy", "Grumble", "Bacon", "Muddy", "Filthy", "Greg", "Mildred", "Agatha", "Bartholomew", "Jebediah", "Chuckle", "Bongo", "Sniffles", "Pompous", "Beef", "Noodle", "Barnaby", "Giggles", "Squeaks", "Sir Flapjack", "Aurelius", "Solon", "Valerius", "Cassius", "Orion", "Seraphina", "Alexander", "Theobald", "Balthazar", "Boil", "Mash", "Stew", "Smell", "Blanch", "Pickle", "Z69 DIVINE ARSENAL: XX NYX NIGHT THUNDER", "Tubby", "George", "Left Arm of", "Right Arm of", "Left Leg of", "Right Leg of", "(copyrighted)", "Holy", "{{DHK}}", "(GoC)", "((X2X))", "=G$F=", "Third Leg of", "Dr.", "The Great and (somewhat) Mighty", "Flaming"];
const SILLY_LAST_NAMES = ["the Turnip", "the Unwashed", "the Mud-Eater", "Pants", "Socks", "the Clumsy", "the Confused", "of the Puddle", "the Chicken-Chaser", "the Potato", "the Smelly", "the Brave...ish", "the Hungry", "the Flatulent", "of the Pigsty", "the Ankle-Biter", "the Pigeon-Tamer", "the Clueless", "the Slightly-Damp", "the Unprepared", "the Butter-Fingered", "the Cowardly", "the Onion", "the Resolute", "the Indomitable", "the Wise", "of the Eternal Flame", "Lightbringer", "the Unbroken", "Truthseeker", "the Stoic", "the Magnificent", "McJerk", "the Profound", "Victoria", "Notaspy", "Desk", "the Suspicious", "the Forbidden One", "Lord", "Dracula", "XXoDDuSS", "Bartholo", "LuIs7", "Razi", "Viper", "Firedragon", "Standard", "7WINNER7", "Hotsauce", "Hazard2People", "FUBAR_NOYC", "Peabody", "Lemming", "HolyLord"];
function generateSillyName() {
    const first = SILLY_FIRST_NAMES[Math.floor(Math.random() * SILLY_FIRST_NAMES.length)];
    const last = SILLY_LAST_NAMES[Math.floor(Math.random() * SILLY_LAST_NAMES.length)];
    return first + " " + last;
}
const entities = [];
const projectiles = [];
const particleEffects = [];
window.uiNeedsUpdate = false;
function getItemEmoji(item) {
    const map = {
        "gold": "\u{1FA99}",
        "food": "\u{1F33E}",
        "premium_food": "\u{1F956}",
        "wood": "\u{1FAB5}",
        "stone": "\u{1FAA8}",
        "iron": "\u{26D3}\u{FE0F}",
        "brew": "\u{1F37A}",
        "furniture": "\u{1FA91}",
        "gem": "\u{1F48E}",
        "cloth": "\u{1F455}",
        "leather": "\u{1F462}",
        "chain": "\u{26D3}\u{FE0F}",
        "plate": "\u{1F6E1}\u{FE0F}",
        "Spear": "\u{1F531}",
        "Pike": "\u{1F531}",
        "Halberd": "\u{1F531}",
        "Poleaxe": "\u{1FA93}",
        "Axe": "\u{1FA93}",
        "Sword": "\u{1F5E1}\u{FE0F}",
        "Mace": "\u{1F528}",
        "Short Bow": "\u{1F3F9}",
        "Longbow": "\u{1F3F9}",
        "Crossbow": "\u{1F3F9}",
        "Mangonel": "\u2728"
    };
    return map[item] || "\u{1F4E6}";
}
function updateUI() {
    window.uiNeedsUpdate = true;
}
// --- SPATIAL HASH GRIDS ---
const SPATIAL_CELL_SIZE = 10;
const SPATIAL_WIDTH = Math.ceil(300 / SPATIAL_CELL_SIZE);
const SPATIAL_HEIGHT = Math.ceil(300 / SPATIAL_CELL_SIZE);
const unitGrid = new Array(SPATIAL_WIDTH * SPATIAL_HEIGHT).fill(null).map(() => []);
const buildingGrid = new Array(SPATIAL_WIDTH * SPATIAL_HEIGHT).fill(null).map(() => []);
const spatialGrid = new Array(SPATIAL_WIDTH * SPATIAL_HEIGHT).fill(null).map(() => []); // Used for trees and other static non-building objects
let buildingGridDirty = true; // Flag to rebuild buildingGrid when static objects change
function getSpatialCell(x, z) {
    const cx = Math.max(0, Math.min(SPATIAL_WIDTH - 1, Math.floor((x + 150) / SPATIAL_CELL_SIZE)));
    const cz = Math.max(0, Math.min(SPATIAL_HEIGHT - 1, Math.floor((z + 150) / SPATIAL_CELL_SIZE)));
    return cz * SPATIAL_WIDTH + cx;
}
function clearUnitGrid() {
    for (let i = 0; i < unitGrid.length; i++) {
        unitGrid[i].length = 0;
    }
}
function rebuildBuildingGrid() {
    for (let i = 0; i < buildingGrid.length; i++) {
        buildingGrid[i].length = 0;
    }
    for (let i = 0; i < spatialGrid.length; i++) {
        spatialGrid[i].length = 0;
    }
    entities.forEach(e => {
        if (e.isDead || e.state === "dead" || (e.isPlanned && e.resourcesDelivered === 0)) return;
        if (e.type === "wall_column" || e.type === "gatehouse" || e.type === "keep" ||
           (e.baseSpeed === 0 && e.type !== "tree" && e.type !== "iron" && e.type !== "stone" && e.type !== "gold")) {
            // Buildings can span multiple cells. Add them to all cells they intersect.
            const hw = (e.dimX !== undefined ? e.dimX : (e.radius ? e.radius * 2 : 1)) / 2;
            const hd = (e.dimZ !== undefined ? e.dimZ : (e.radius ? e.radius * 2 : 1)) / 2;
            const minCellX = Math.max(0, Math.floor((e.x - hw - 1.0 + 150) / SPATIAL_CELL_SIZE));
            const maxCellX = Math.min(SPATIAL_WIDTH - 1, Math.floor((e.x + hw + 1.0 + 150) / SPATIAL_CELL_SIZE));
            const minCellZ = Math.max(0, Math.floor((e.z - hd - 1.0 + 150) / SPATIAL_CELL_SIZE));
            const maxCellZ = Math.min(SPATIAL_HEIGHT - 1, Math.floor((e.z + hd + 1.0 + 150) / SPATIAL_CELL_SIZE));
            for (let cz = minCellZ; cz <= maxCellZ; cz++) {
                for (let cx = minCellX; cx <= maxCellX; cx++) {
                    buildingGrid[cz * SPATIAL_WIDTH + cx].push(e);
                }
            }
        } else if (e.type === "tree") {
            const minCellX = Math.max(0, Math.floor((e.x - 1.0 + 150) / SPATIAL_CELL_SIZE));
            const maxCellX = Math.min(SPATIAL_WIDTH - 1, Math.floor((e.x + 1.0 + 150) / SPATIAL_CELL_SIZE));
            const minCellZ = Math.max(0, Math.floor((e.z - 1.0 + 150) / SPATIAL_CELL_SIZE));
            const maxCellZ = Math.min(SPATIAL_HEIGHT - 1, Math.floor((e.z + 1.0 + 150) / SPATIAL_CELL_SIZE));
            for (let cz = minCellZ; cz <= maxCellZ; cz++) {
                for (let cx = minCellX; cx <= maxCellX; cx++) {
                    spatialGrid[cz * SPATIAL_WIDTH + cx].push(e);
                }
            }
        }
    });
    buildingGridDirty = false;
}
let nextEntityId = 1;
// Resource Deposits on Map
const resourceDeposits = [];
// Player Faction Economy (Red)
let resources = {
    gold: 10000,
    food: 10000,
    wood: 10000,
    iron: 10000,
    stone: 10000,
    premium_food: 0,
    brew: 0,
    furniture: 0,
    gem: 0
};
// Global Starting Barracks Inventory Pool (before any barracks built)
const startingPool = {
    "Spear": 5, "Pike": 5, "Halberd": 5, "Poleaxe": 5, "Axe": 5, "Sword": 5, "Mace": 5,
    "Short Bow": 5, "Longbow": 5, "Crossbow": 5,
    "cloth": 5, "leather": 5, "chain": 5, "plate": 5
};
// Selection State
let selectedEntities = [];
let controlGroups = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 0: [] };
let isDragging = false;
let attackGroundMode = false;
let attackGroundIndicator = null;
let moveMarkersLine = null;
let rangeMarkersLine = null;
const dragStart = new THREE.Vector2();
const dragEnd = new THREE.Vector2();
let isRightDrag = false;
let rightDragPath = [];
let rightDragLine = null;
let rightDragTargetEntity = null;
let rightDragFightMove = false;
// Camera control State
let cameraOffset = new THREE.Vector3(0, 35, 25);
let cameraLookAt = new THREE.Vector3(0, 0, 0);
let customCameraAngle = 0.0;
let spacebarScrolled = false;
const keysPressed = {};
const panSpeed = 0.5;
let zoomFactor = 1.0;
// Placement State
let placementMode = null; // building type key
let placementGhost = null;
let wallTargetIndicator = null;
let enemyTargetIndicator = null;
// Fight Move Queue State
let isFightMoveQueued = false;
// Game state flags
let isGameOver = false;
let needsPathGridUpdate = false;
let currentCommandIndex = 0;
let soldierTrainingQueue = { "red": [], "blue": [] };
let siegeTrainingQueue = { "red": [], "blue": [] };
let gameWinner = null;
// Wall Drawing States
let wallDrawMode = null; // "freehand", "line", "box", "circle", "ramp", "gatehouse", "delete", or null
let wallDrawStart = null;
let wallGhosts = [];
let wallFreehandPath = [];
// --- TERRAIN HEIGHT FUNCTION (2.5D) ---
const MOUNTAINS = [];
for (let i = 0; i < 3; i++) {
    let mx = (Math.random() - 0.5) * 220;
    let mz = (Math.random() - 0.5) * 220;
    if (Math.hypot(mx - (-80), mz - (-40)) < 40 || Math.hypot(mx - 80, mz - 40) < 40) {
        i--; continue;
    }
    const height = 10 + Math.random() * 6;
    const radius = 15 + Math.random() * 10;
    MOUNTAINS.push({ x: mx, z: mz, h: height, r: radius });
    MOUNTAINS.push({ x: -mx, z: -mz, h: height, r: radius });
}
const TERRAIN_HEIGHT_MAP = new Float32Array(300 * 300);
for (let x = 0; x < 300; x++) {
    for (let z = 0; z < 300; z++) {
        const cx = x - 150;
        const cz = z - 150;
        let noise = Math.sin(cx * 0.04) * Math.sin(cz * 0.04) * 2.0 + Math.cos(cx * 0.08) * 0.5;
        for (let i = 0; i < MOUNTAINS.length; i++) {
            const m = MOUNTAINS[i];
            const distSq = (cx - m.x)*(cx - m.x) + (cz - m.z)*(cz - m.z);
            noise += m.h * Math.exp(-distSq / (m.r * m.r));
        }
        TERRAIN_HEIGHT_MAP[z * 300 + x] = noise;
    }
}
function getTerrainHeight(x, z) {
    const cx = x + 150;
    const cz = z + 150;
    if (cx < 0 || cx >= 299 || cz < 0 || cz >= 299) {
        let noise = Math.sin(x * 0.04) * Math.sin(z * 0.04) * 2.0 + Math.cos(x * 0.08) * 0.5;
        for (let i = 0; i < MOUNTAINS.length; i++) {
            const m = MOUNTAINS[i];
            const distSq = (x - m.x)*(x - m.x) + (z - m.z)*(z - m.z);
            noise += m.h * Math.exp(-distSq / (m.r * m.r));
        }
        return noise;
    }
    const fx = Math.floor(cx);
    const fz = Math.floor(cz);
    const rx = cx - fx;
    const rz = cz - fz;
    const idx = fz * 300 + fx;
    const h00 = TERRAIN_HEIGHT_MAP[idx];
    const h10 = TERRAIN_HEIGHT_MAP[idx + 1];
    const h01 = TERRAIN_HEIGHT_MAP[idx + 300];
    const h11 = TERRAIN_HEIGHT_MAP[idx + 301];
    const h0 = h00 * (1 - rx) + h10 * rx;
    const h1 = h01 * (1 - rx) + h11 * rx;
    return h0 * (1 - rz) + h1 * rz;
}
let gameFrameCount = 0;
let currentCollisionFrame = -1;
let cachedCollisionBuildings = [];
const _sharedFloorResult = { y: 0, onWall: false, isRamp: false, rampDx: 0, rampDz: 0, ejectX: null, ejectZ: null };
function getFloorHeight(unit, nextX, nextZ) {
    let floorHeight = getTerrainHeight(nextX, nextZ);
    let onWall = false;
    let rampEntity = null;
    let ejectX = null;
    let ejectZ = null;

    if (buildingGridDirty) rebuildBuildingGrid();

    const cellIdx = getSpatialCell(nextX, nextZ);
    const localBuildings = buildingGrid[cellIdx];
    
    if (localBuildings) localBuildings.forEach(e => {
        const colRad = unit.radius || 0.1;
        if (e.type === "keep") {
            const absX = Math.abs(nextX - e.x);
            const absZ = Math.abs(nextZ - e.z);
            const pad = Math.min(colRad, 0.4) * 0.9;
            if (absX <= 2.5 + pad && absZ <= 2.5 + pad) {
                if (unit.y >= e.y + e.height - 0.8 || (unit && unit.weapon === "Assassin")) {
                    if (e.y + e.height > floorHeight) {
                        floorHeight = e.y + e.height;
                        onWall = true;
                    }
                }
            }
        } else if (e.type !== "farm" && e.type !== "mine" && e.type !== "tower") {
            const hw = (e.dimX !== undefined ? e.dimX : ((e.radius || 0.5) * 2)) / 2;
            const hd = (e.dimZ !== undefined ? e.dimZ : ((e.radius || 0.5) * 2)) / 2;
            
            if (nextX < e.x - hw - 1.0 || nextX > e.x + hw + 1.0 || nextZ < e.z - hd - 1.0 || nextZ > e.z + hd + 1.0) return;
            
            let isInside = false;
            let isTouching = false;
            let tDistSq = 0;
            const effColRad = Math.min(colRad, 0.4) * 1.5; // Increased to give leeway for units bumping on corners
            
            const clampX = Math.max(e.x - hw, Math.min(nextX, e.x + hw));
            const clampZ = Math.max(e.z - hd, Math.min(nextZ, e.z + hd));
            isInside = (clampX === nextX && clampZ === nextZ);
            const distSq = (nextX - clampX)**2 + (nextZ - clampZ)**2;
            isTouching = isInside || distSq < effColRad * effColRad;
            
            if (isTouching) {
                let roofHeight = e.y + (e.type === "wall_column" && e.blocks ? e.blocks.length : (e.height || 2.0));
                let currentIsRamp = false;
                
                if (e.isRamp && (!e.blocks || e.blocks.length === e.originalHeight)) {
                    const dot = (nextX - e.x) * e.rampDx + (nextZ - e.z) * e.rampDz;
                    const extraH = dot * Math.tan(e.rampSlope * Math.PI / 180);
                    roofHeight = e.y + e.exactHeight + extraH;
                    currentIsRamp = true;
                }
                
                let maxStep = currentIsRamp ? 1.6 : 0.8;
                if (unit && unit.weapon === "Assassin") maxStep = 999.0;
                
                if (unit && typeof pathGrid !== "undefined") {
                    const unitGX = Math.round(unit.x) + 150;
                    const unitGZ = Math.round(unit.z) + 150;
                    if (unitGX >= 0 && unitGX < 300 && unitGZ >= 0 && unitGZ < 300) {
                        const unitSurfs = pathGrid[unitGZ * 300 + unitGX];
                        const gHeight = getTerrainHeight(unit.x, unit.z);
                        if (unit.y > gHeight + 0.5) {
                            // maxStep=999 hack removed, rely on elevators
                        }
                    }
                }
                
                if (unit.y >= roofHeight - maxStep) {
                    if (roofHeight > floorHeight) {
                        floorHeight = roofHeight;
                        if (e.type === "wall_column" || e.type === "gatehouse" || e.type === "keep" || e.type === "tower_tile") {
                            onWall = true;
                            if (currentIsRamp) rampEntity = e;
                            else rampEntity = null;
                        }
                    }
                } else if (!((e.type === "gatehouse" || e.type === "keep") && e.isOpen !== false)) {
                    let shouldEject = true;
                    if (e.type === "tower" && unit.y >= e.y + 2.0 - 1.5) {
                        shouldEject = false;
                    }
                    if (shouldEject && isInside) {
                        if (e.type === "tower" && inCell) {
                            const dLeft = nextX - (inCell.x - 0.5);
                            const dRight = (inCell.x + 0.5) - nextX;
                            const dTop = nextZ - (inCell.z - 0.5);
                            const dBottom = (inCell.z + 0.5) - nextZ;
                            const minDist = Math.min(dLeft, dRight, dTop, dBottom);
                            if (minDist > 0.15) {
                                if (minDist === dLeft) ejectX = inCell.x - 0.5 - (colRad + 0.1);
                                else if (minDist === dRight) ejectX = inCell.x + 0.5 + (colRad + 0.1);
                                else if (minDist === dTop) ejectZ = inCell.z - 0.5 - (colRad + 0.1);
                                else ejectZ = inCell.z + 0.5 + (colRad + 0.1);
                            }
                        } else {
                            const dLeft = nextX - (e.x - hw);
                            const dRight = (e.x + hw) - nextX;
                            const dTop = nextZ - (e.z - hd);
                            const dBottom = (e.z + hd) - nextZ;
                            const minDist = Math.min(dLeft, dRight, dTop, dBottom);
                            if (minDist > 0.15) {
                                if (minDist === dLeft) ejectX = e.x - hw - (colRad + 0.1);
                                else if (minDist === dRight) ejectX = e.x + hw + (colRad + 0.1);
                                else if (minDist === dTop) ejectZ = e.z - hd - (colRad + 0.1);
                                else ejectZ = e.z + hd + (colRad + 0.1);
                            }
                        }
                    } else if (!shouldEject && isInside && e.type === "tower") {
                        if (unit.y > floorHeight) {
                            floorHeight = unit.y;
                            onWall = true;
                        }
                    } else {
                        // Unit is touching the outside of the bounding box, do NOT hoist them to the roof
                    }
                }
            }
        }
    });

    if (!onWall && unit && unit.y !== undefined) {
        // Fallback for microscopic diagonal gaps between blocks (only for walls)
        const bx = Math.floor(nextX);
        const bz = Math.floor(nextZ);
        const cells = [ [bx, bz], [bx + 1, bz], [bx, bz + 1], [bx + 1, bz + 1] ];
        for (let cell of cells) {
            const cx = cell[0];
            const cz = cell[1];
            if (Math.hypot(cx - nextX, cz - nextZ) <= 0.55) {
                if (cx >= -150 && cx < 150 && cz >= -150 && cz < 150) {
                    let surfs = pathGrid[(cz + 150) * 300 + (cx + 150)];
                    if (surfs && surfs.length > 0 && surfs.isWall) {
                        for (let i = 0; i < surfs.length; i++) {
                            if (surfs[i] > floorHeight && (unit.y === 10000 || Math.abs(surfs[i] - unit.y) <= 0.8)) {
                                floorHeight = surfs[i];
                                onWall = true;
                            }
                        }
                    }
                }
            }
        }
    }

    return { 
        y: floorHeight, 
        onWall: onWall,
        isRamp: !!rampEntity,
        rampDx: rampEntity ? rampEntity.rampDx : 0,
        rampDz: rampEntity ? rampEntity.rampDz : 0,
        ejectX: ejectX,
        ejectZ: ejectZ
    };
}
// --- INITIALIZATION ---
setInterval(() => {
    entities.forEach(e => {
        if (e.isUnreachable) {
            e.isUnreachable = false;
            if (e.mesh) {
                e.mesh.traverse(c => {
                    if (c.isMesh && c.material) {
                        if (e.isPlanned && c.material.color) c.material.color.setHex(0x00ff00);
                        else if (e.isZzz && window.applyZzzTint) {
                            window.applyZzzTint(e, true);
                        }
                        else if (c.material.emissive && c.material.origEmissive !== undefined) {
                            c.material.emissive.setHex(c.material.origEmissive);
                        }
                    }
                });
            }
        }
    });
}, 3000);
document.getElementById("btn-test-mode").addEventListener("click", () => {
    gameDifficulty = "test";
    hardBotWaveCount = 0;
    resources = { gold: 10000, food: 10000, wood: 10000, iron: 10000, stone: 10000, premium_food: 0, brew: 0, furniture: 0, gem: 0 };
    document.getElementById("start-screen").style.display = "none";
    createInitialBases();
    isGameStarted = true;
    startMusic();
});
document.getElementById("btn-easy-mode").addEventListener("click", () => {
    gameDifficulty = "easy";
    hardBotWaveCount = 1;
    resources = { gold: 100, food: 100, wood: 100, iron: 100, stone: 100, premium_food: 100, brew: 0, furniture: 0, gem: 0 };
    document.getElementById("start-screen").style.display = "none";
    createInitialBases();
    isGameStarted = true;
    startMusic();
});
document.getElementById("btn-hard-mode").addEventListener("click", () => {
    gameDifficulty = "hard";
    hardBotWaveCount = 7;
    resources = { gold: 100, food: 100, wood: 100, iron: 100, stone: 100, premium_food: 100, brew: 0, furniture: 0, gem: 0 };
    document.getElementById("start-screen").style.display = "none";
    createInitialBases();
    isGameStarted = true;
    startMusic();
});
document.getElementById("btn-medium-mode").addEventListener("click", () => {
    gameDifficulty = "medium";
    hardBotWaveCount = 3;
    resources = { gold: 100, food: 100, wood: 100, iron: 100, stone: 100, premium_food: 100, brew: 0, furniture: 0, gem: 0 };
    document.getElementById("start-screen").style.display = "none";
    createInitialBases();
    isGameStarted = true;
    startMusic();
});
document.getElementById("btn-menu").addEventListener("click", () => {
    window.isPaused = true;
    document.getElementById("pause-menu").style.display = "flex";
});
document.getElementById("btn-resume").addEventListener("click", () => {
    window.isPaused = false;
    document.getElementById("pause-menu").style.display = "none";
});
document.getElementById("volume-slider").addEventListener("input", (e) => {
    let vol = parseFloat(e.target.value);
    window.musicVolume = vol;
    if (bgMusic) {
        bgMusic.volume = vol;
    }
});
document.getElementById("btn-restart-menu").addEventListener("click", () => {
    window.isPaused = false;
    document.getElementById("pause-menu").style.display = "none";
    restartGame();
});
document.getElementById("btn-how-to-play").addEventListener("click", () => {
    document.getElementById("pause-menu").style.display = "none";
    document.getElementById("how-to-play-menu").style.display = "flex";
});
document.getElementById("btn-close-how-to-play").addEventListener("click", () => {
    document.getElementById("how-to-play-menu").style.display = "none";
    document.getElementById("pause-menu").style.display = "flex";
});
document.getElementById("btn-buildings-list").addEventListener("click", () => {
    document.getElementById("pause-menu").style.display = "none";
    document.getElementById("buildings-list-menu").style.display = "flex";
});
document.getElementById("btn-close-buildings-list").addEventListener("click", () => {
    document.getElementById("buildings-list-menu").style.display = "none";
    document.getElementById("pause-menu").style.display = "flex";
});
function buildHardBotCastle(cx, cz) {
    createEntity("keep", "blue", cx, cz);
    // 3-thick towering walls
    const layers = [16, 17, 18];
    for (let layer of layers) {
        const isOuter = (layer === 18);
        const wHeight = 3;
        // Left wall
        for (let z = cz - layer; z <= cz + layer; z++) {
            let e;
            if (Math.abs(z - cz) <= 1) e = createEntity("gatehouse", "blue", cx - layer, z);
            else e = createEntity("wall_column", "blue", cx - layer, z);
            e.height = wHeight;
            e.originalHeight = wHeight;
            e.exactHeight = wHeight;
            if (e.type === "wall_column") {
                e.blocks = [{hp:100}, {hp:100}, {hp:100}];
            } else {
                e.dimY = wHeight;
            }
            e.health = 100 * wHeight;
            e.maxHp = 100 * wHeight;
            e.maxHealth = 100 * wHeight;
            e.isOuterWall = isOuter;
            scene.remove(e.mesh);
            disposeHierarchy(e.mesh);
            e.mesh = buildEntityMesh(e);
            e.mesh.position.set(e.x, e.y, e.z);
            scene.add(e.mesh);
        }
        // Right wall
        for (let z = cz - layer; z <= cz + layer; z++) {
            let e;
            if (Math.abs(z - cz) <= 1) e = createEntity("gatehouse", "blue", cx + layer, z);
            else e = createEntity("wall_column", "blue", cx + layer, z);
            e.height = wHeight;
            e.originalHeight = wHeight;
            e.exactHeight = wHeight;
            if (e.type === "wall_column") {
                e.blocks = [{hp:100}, {hp:100}, {hp:100}];
            } else {
                e.dimY = wHeight;
            }
            e.health = 100 * wHeight;
            e.maxHp = 100 * wHeight;
            e.maxHealth = 100 * wHeight;
            e.isOuterWall = isOuter;
            scene.remove(e.mesh);
            disposeHierarchy(e.mesh);
            e.mesh = buildEntityMesh(e);
            e.mesh.position.set(e.x, e.y, e.z);
            scene.add(e.mesh);
        }
        // Top wall
        for (let x = cx - layer + 1; x <= cx + layer - 1; x++) {
            let e;
            if (Math.abs(x - cx) <= 1) e = createEntity("gatehouse", "blue", x, cz - layer);
            else e = createEntity("wall_column", "blue", x, cz - layer);
            e.height = wHeight;
            e.originalHeight = wHeight;
            e.exactHeight = wHeight;
            if (e.type === "wall_column") {
                e.blocks = [{hp:100}, {hp:100}, {hp:100}];
            } else {
                e.dimY = wHeight;
            }
            e.health = 100 * wHeight;
            e.maxHp = 100 * wHeight;
            e.maxHealth = 100 * wHeight;
            e.isOuterWall = isOuter;
            scene.remove(e.mesh);
            disposeHierarchy(e.mesh);
            e.mesh = buildEntityMesh(e);
            e.mesh.position.set(e.x, e.y, e.z);
            scene.add(e.mesh);
        }
        // Bottom wall
        for (let x = cx - layer + 1; x <= cx + layer - 1; x++) {
            let e;
            if (Math.abs(x - cx) <= 1) e = createEntity("gatehouse", "blue", x, cz + layer);
            else e = createEntity("wall_column", "blue", x, cz + layer);
            e.height = wHeight;
            e.originalHeight = wHeight;
            e.exactHeight = wHeight;
            if (e.type === "wall_column") {
                e.blocks = [{hp:100}, {hp:100}, {hp:100}];
            } else {
                e.dimY = wHeight;
            }
            e.health = 100 * wHeight;
            e.maxHp = 100 * wHeight;
            e.maxHealth = 100 * wHeight;
            e.isOuterWall = isOuter;
            scene.remove(e.mesh);
            disposeHierarchy(e.mesh);
            e.mesh = buildEntityMesh(e);
            e.mesh.position.set(e.x, e.y, e.z);
            scene.add(e.mesh);
        }
    }
    // 6 Houses (Left top and bottom)
    createEntity("house", "blue", cx - 8, cz - 8);
    createEntity("house", "blue", cx - 8, cz - 4);
    createEntity("house", "blue", cx - 4, cz - 8);
    createEntity("house", "blue", cx - 8, cz + 8);
    createEntity("house", "blue", cx - 8, cz + 4);
    createEntity("house", "blue", cx - 4, cz + 8);
    // 1 Barracks (Right bottom)
    createEntity("barracks", "blue", cx + 8, cz + 8);
    // 1 Siege Shop (Right top)
    createEntity("siegeshop", "blue", cx + 8, cz - 8);
    // Force path grid update so spawned units on walls are properly elevated
    updatePathGrid();
    updateRegionGrid();
    needsPathGridUpdate = false;
    // Blue King + 10 Crossbowmen on keep
    const king = createEntity("king", "blue", cx, cz);
    king.y = getFloorHeight({y:10000}, cx, cz).y + 12; // on top of keep
    for (let i = 0; i < 10; i++) {
        const u = createEntity("soldier", "blue", cx + (Math.random()-0.5)*4, cz + (Math.random()-0.5)*4);
        u.y = king.y;
        const config = { weapon: "Crossbow", armors: ["cloth", "leather", "chain", "plate"], hasHorse: false };
        applyEquipmentStats(u, config);
    }
    // Longbowmen on walls (scattered on outer walls)
    for (let i = 0; i < 15; i++) {
        const walls = entities.filter(e => e.type === "wall_column" && e.faction === "blue" && e.isOuterWall);
        if (walls.length > 0) {
            const w = walls[Math.floor(Math.random() * walls.length)];
            const u = createEntity("soldier", "blue", w.x, w.z);
            u.y = getFloorHeight(u, u.x, u.z).y;
            const config = { weapon: "Longbow", armors: ["cloth", "leather"], hasHorse: false };
            applyEquipmentStats(u, config);
        }
    }
}

function disposeHierarchy(node) {
    if (!node) return;
    node.traverse((child) => {
        if (child.isMesh || child.isSprite || child.isLine || child.isPoints) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => {
                        if (mat.map) mat.map.dispose();
                        mat.dispose();
                    });
                } else {
                    if (child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
            }
        }
    });
}

function init() {
    const container = document.getElementById("game-container");
    // Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb2ebf2);
    scene.fog = new THREE.FogExp2(0xb2ebf2, 0.007);
    // Create Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    updateCameraPosition();
    // Create Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    wallTargetIndicator = new THREE.Mesh(
        new THREE.TorusGeometry(0.8, 0.1, 8, 24),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
    );
    wallTargetIndicator.rotation.x = Math.PI / 2;
    wallTargetIndicator.visible = false;
    scene.add(wallTargetIndicator);
    attackGroundIndicator = new THREE.Mesh(
        new THREE.RingGeometry(0.8, 1.2, 16),
        new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
    );
    attackGroundIndicator.rotation.x = -Math.PI / 2;
    attackGroundIndicator.visible = false;
    const crossHair1 = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 2.8), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    const crossHair2 = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 0.2), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    attackGroundIndicator.add(crossHair1);
    attackGroundIndicator.add(crossHair2);
    scene.add(attackGroundIndicator);
    const moveMarkersGeo = new THREE.BufferGeometry();
    const moveMarkersMat = new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false, transparent: true, opacity: 0.6 });
    moveMarkersLine = new THREE.LineSegments(moveMarkersGeo, moveMarkersMat);
    moveMarkersLine.renderOrder = 998;
    moveMarkersLine.frustumCulled = false;
    scene.add(moveMarkersLine);
    const rangeMarkersGeo = new THREE.BufferGeometry();
    const rangeMarkersMat = new THREE.LineBasicMaterial({ vertexColors: true, depthTest: false, transparent: true, opacity: 0.6 });
    rangeMarkersLine = new THREE.LineSegments(rangeMarkersGeo, rangeMarkersMat);
    rangeMarkersLine.renderOrder = 998;
    rangeMarkersLine.frustumCulled = false;
    scene.add(rangeMarkersLine);
    enemyTargetIndicator = new THREE.Group();
    const eCrossHair1 = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 1.2), new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
    const eCrossHair2 = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.15), new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
    eCrossHair1.rotation.z = Math.PI / 4;
    eCrossHair2.rotation.z = Math.PI / 4;
    enemyTargetIndicator.add(eCrossHair1);
    enemyTargetIndicator.add(eCrossHair2);
    enemyTargetIndicator.visible = false;
    scene.add(enemyTargetIndicator);
    // Lighting
    ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);
    directionalLight = new THREE.DirectionalLight(0xfffaed, 0.85);
    directionalLight.position.set(50, 80, 40);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 250;
    const d = 120;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.bias = -0.0005;
    scene.add(directionalLight);
    // Build Terrain
    buildTerrain();
    // Spawn Plentiful Resource Deposits (4-5 of each)
    spawnResourceDeposits();
    // (Bases are now created when the user clicks a difficulty button)
    // Setup Procedural Trees (add to entities as harvestable objects)
    growForest();
    // Event Listeners
    window.addEventListener("resize", onWindowResize);

const minimapCanvas = document.getElementById("minimap");
if (minimapCanvas) {
    minimapCanvas.addEventListener("mousedown", (e) => {
        const rect = minimapCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const worldX = (x / minimapCanvas.width) * 300 - 150;
        const worldZ = (y / minimapCanvas.height) * 300 - 150;
        
        cameraLookAt.x = worldX;
        cameraLookAt.z = worldZ;
        cameraLookAt.y = typeof getTerrainHeight === "function" ? getTerrainHeight(worldX, worldZ) : 0;
    });
    let isMinimapDragging = false;
    minimapCanvas.addEventListener("mousedown", (e) => {
        isMinimapDragging = true;
    });
    window.addEventListener("mouseup", (e) => {
        isMinimapDragging = false;
    });
    window.addEventListener("mousemove", (e) => {
        if (isMinimapDragging) {
            const rect = minimapCanvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            x = Math.max(0, Math.min(x, minimapCanvas.width));
            y = Math.max(0, Math.min(y, minimapCanvas.height));
            
            const worldX = (x / minimapCanvas.width) * 300 - 150;
            const worldZ = (y / minimapCanvas.height) * 300 - 150;
            
            cameraLookAt.x = worldX;
            cameraLookAt.z = worldZ;
            cameraLookAt.y = typeof getTerrainHeight === "function" ? getTerrainHeight(worldX, worldZ) : 0;
        }
    });

}

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("wheel", onMouseWheel);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    container.addEventListener("contextmenu", (e) => e.preventDefault());
    // Setup Sliders
    const tSlider = document.getElementById("wall-thickness");
    if(tSlider) tSlider.addEventListener("input", (e) => document.getElementById("lbl-wall-thickness").innerText = e.target.value);
    const hSlider = document.getElementById("wall-height");
    if(hSlider) hSlider.addEventListener("input", (e) => document.getElementById("lbl-wall-height").innerText = e.target.value);
    const sSlider = document.getElementById("wall-slope");
    if(sSlider) sSlider.addEventListener("input", (e) => document.getElementById("lbl-wall-slope").innerText = e.target.value);
    // Setup UI Tab Buttons
    document.getElementById("tab-civilian").addEventListener("click", () => showBuildTab("civilian"));
    document.getElementById("tab-military").addEventListener("click", () => showBuildTab("military"));
    document.getElementById("tab-walls").addEventListener("click", () => showBuildTab("walls"));
    const tabLuxuries = document.getElementById("tab-luxuries");
    if (tabLuxuries) tabLuxuries.addEventListener("click", () => showBuildTab("luxuries"));
    const tabDemolish = document.getElementById("tab-demolish");
    if (tabDemolish) {
        tabDemolish.addEventListener("click", () => showBuildTab("demolish"));
    }
    const btnUndo = document.getElementById("btn-undo");
    if (btnUndo) {
        btnUndo.addEventListener("click", () => undoLastBlueprint());
    }
    // Setup Wall Tools
    const wallTools = ["freehand", "line", "box", "circle", "ramp", "delete"];
    wallTools.forEach(t => {
        document.getElementById(`btn-tool-${t}`).addEventListener("click", () => {
            wallDrawMode = t;
            placementMode = null;
            if (placementGhost) placementGhost.visible = false;
            // Highlight active tool
            wallTools.forEach(tt => document.getElementById(`btn-tool-${tt}`).classList.remove("active-prod"));
            document.getElementById("btn-build-gatehouse").classList.remove("active-prod");
            document.getElementById("btn-build-tower").classList.remove("active-prod");
            document.getElementById(`btn-tool-${t}`).classList.add("active-prod");
        });
    });
    document.getElementById("btn-build-gatehouse").addEventListener("click", () => {
        wallDrawMode = "gatehouse";
        placementMode = null;
        if (placementGhost) placementGhost.visible = false;
        wallTools.forEach(tt => document.getElementById(`btn-tool-${tt}`).classList.remove("active-prod"));
        document.getElementById("btn-build-tower").classList.remove("active-prod");
        document.getElementById("btn-build-gatehouse").classList.add("active-prod");
    });
    document.getElementById("btn-build-tower").addEventListener("click", () => {
        wallDrawMode = "tower";
        placementMode = null;
        if (placementGhost) placementGhost.visible = false;
        wallTools.forEach(tt => document.getElementById(`btn-tool-${tt}`).classList.remove("active-prod"));
        document.getElementById("btn-build-gatehouse").classList.remove("active-prod");
        document.getElementById("btn-build-tower").classList.add("active-prod");
    });
    // Setup GUI Button Handlers
    const civilianKeys = ["house", "farm", "stables", "woodcutter", "mine", "market", "loadhouse"];
    civilianKeys.forEach(k => {
        document.getElementById(`btn-build-${k}`).addEventListener("click", () => startPlacement(k));
    });
    const luxuryKeys = ["bakery", "brewery", "carpenter", "jeweler"];
    luxuryKeys.forEach(k => {
        document.getElementById(`btn-build-${k}`).addEventListener("click", () => startPlacement(k));
    });
    const militaryKeys = ["barracks", "mercenary_post", "siegeshop", "poleturner", "gruntshop", "blacksmith", "knightarms", "fletcher", "tailor", "armorer"];
    militaryKeys.forEach(k => {
        document.getElementById(`btn-build-${k}`).addEventListener("click", () => startPlacement(k));
    });
    const weaponsToTrain = ["Spear", "Pike", "Halberd", "Poleaxe", "Axe", "Sword", "Mace", "ShortBow", "Longbow", "Crossbow"];
    weaponsToTrain.forEach(w => {
        const actualWeapon = w === "ShortBow" ? "Short Bow" : w;
        document.getElementById(`btn-train-${w}`).addEventListener("click", (e) => trainUnitFromSelectedBarracks(actualWeapon, e));
    });
    document.getElementById("btn-train-RoyalKnight").addEventListener("click", (e) => trainMercenary("RoyalKnight", e));
    document.getElementById("btn-train-Grunt").addEventListener("click", (e) => trainMercenary("Grunt", e));
    document.getElementById("btn-train-Thug").addEventListener("click", (e) => trainMercenary("Thug", e));
    document.getElementById("btn-train-Brute").addEventListener("click", (e) => trainMercenary("Brute", e));
    document.getElementById("btn-train-Slinger").addEventListener("click", (e) => trainMercenary("Slinger", e));
    document.getElementById("btn-train-Spy").addEventListener("click", (e) => trainMercenary("Spy", e));
    document.getElementById("btn-train-Assassin").addEventListener("click", (e) => trainMercenary("Assassin", e));
    document.getElementById("btn-train-Doppelsoldner").addEventListener("click", (e) => trainMercenary("Doppelsoldner", e));
    const siegeToTrain = ["Shield", "Ballista", "Catapult", "Mangonel", "Trebuchet"];
    siegeToTrain.forEach(w => {
        document.getElementById(`btn-train-${w}`).addEventListener("click", (e) => trainSiegeUnitFromSelectedShop(w, e));
    });
    document.getElementById("btn-restart").addEventListener("click", restartGame);
    const btnCancelQueue = document.getElementById("btn-cancel-military-queue");
    if (btnCancelQueue) btnCancelQueue.addEventListener("click", () => window.cancelMilitaryQueue("red"));
    const btnCancelSiegeQueue = document.getElementById("btn-cancel-siege-queue");
    if (btnCancelSiegeQueue) btnCancelSiegeQueue.addEventListener("click", () => window.cancelSiegeQueue("red"));
    const btnAttackGround = document.getElementById("btn-attack-ground");
    if (btnAttackGround) btnAttackGround.addEventListener("click", () => {
        attackGroundMode = !attackGroundMode;
        if (attackGroundMode) {
            document.body.style.cursor = "crosshair";
        } else {
            document.body.style.cursor = "default";
            if (attackGroundIndicator) attackGroundIndicator.visible = false;
        }
    });
    // Setup Toggle Buttons for Workshops
    document.getElementById("btn-product-1").addEventListener("click", () => toggleWorkshopProduct(0));
    document.getElementById("btn-product-2").addEventListener("click", () => toggleWorkshopProduct(1));
    // Set initial UI
    updateUI();
    // Start Game Loop
    needsPathGridUpdate = true;
    requestAnimationFrame(gameLoop);
}
// --- TERRAIN BUILDER ---
function buildTerrain() {
    const size = 300;
    const segments = 100;
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const z = -pos.getY(i);
        const y = getTerrainHeight(x, z);
        pos.setZ(i, y);
    }
    geometry.computeVertexNormals();
    geometry.rotateX(-Math.PI / 2);
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = "#f0f0f0";
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 === 0) {
                ctx.fillRect(i * 64, j * 64, 64, 64);
            }
        }
    }
    ctx.fillStyle = "#e0e0e0";
    for (let i = 0; i < 400; i++) {
        const rx = Math.random() * 512;
        const ry = Math.random() * 512;
        ctx.fillRect(rx, ry, 2 + Math.random()*2, 2 + Math.random()*2);
    }
    // Assign vertex colors based on steepness (normal.y)
    const colors = [];
    const colorGrass = new THREE.Color(0x4caf50); // Lush green
    const colorDeadGrass = new THREE.Color(0xd2b48c); // Tan / dead grass
    const colorDirt = new THREE.Color(0x8d6e63);  // Dirt brown
    const colorStone = new THREE.Color(0x78909c); // Slate grey
    const norms = geometry.attributes.normal;
    for (let i = 0; i < norms.count; i++) {
        const ny = norms.getY(i);
        let finalColor = new THREE.Color();
        if (ny >= 0.996) { // ~5 degrees or flatter
            finalColor.copy(colorGrass);
        } else if (ny >= 0.95) { // ~5 to ~18 degrees
            const t = (ny - 0.95) / (0.996 - 0.95);
            finalColor.copy(colorDeadGrass).lerp(colorGrass, Math.pow(t, 4.0)); // curve it so it favors tan heavily to show building placement limits
        } else if (ny >= 0.8) { // ~18 to ~36 degrees
            const t = (ny - 0.8) / (0.95 - 0.8);
            finalColor.copy(colorDirt).lerp(colorDeadGrass, t);
        } else { // > 36 degrees
            const t = Math.max(0, (ny - 0.5) / (0.8 - 0.5));
            finalColor.copy(colorStone).lerp(colorDirt, t);
        }
        colors.push(finalColor.r, finalColor.g, finalColor.b);
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(15, 15);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.9,
        metalness: 0.15,
        flatShading: true,
        vertexColors: true
    });
    terrainMesh = new THREE.Mesh(geometry, material);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);
}
// --- VISUAL RESOURCE DEPOSITS SPARK ---
function spawnResourceDeposits() {
    // Generate circular deposits on the field
    const configs = [
        { type: "fertile", color: 0x388e3c, radius: 11, count: 6 }, // lush forest-green
        { type: "iron",    color: 0x7e57c2, radius: 4,  count: 6 }, // metallic purple-grey
        { type: "stone",   color: 0x78909c, radius: 4,  count: 6 }, // slate grey
        { type: "gold",    color: 0xffb300, radius: 3.5, count: 6 }  // glittering gold
    ];
    configs.forEach(cfg => {
        for (let i = 0; i < cfg.count; i += 2) {
            // Distribute widely across map boundaries (between -120 and 120)
            let x = (Math.random() - 0.5) * 220;
            let z = (Math.random() - 0.5) * 220;
            // Do not spawn immediately adjacent to Red Keep (-80, -40) or Blue Keep (80, 40)
            if (Math.hypot(x - (-80), z - (-40)) < 30.0 || Math.hypot(x - 80, z - 40) < 30.0) {
                i -= 2;
                continue;
            }
            const points = [
                { x: x, z: z },
                { x: -x, z: -z }
            ];
            points.forEach(pt => {
                resourceDeposits.push({
                    type: cfg.type,
                    x: pt.x,
                    z: pt.z,
                    radius: cfg.radius
                });
                // Create flat draped circle mesh
                const mesh = createDepositMesh(pt.x, pt.z, cfg.radius, cfg.color);
                scene.add(mesh);
            });
        }
    });
    // Spawn starting deposits for Red Keep (-80, -40) and Blue Keep (80, 40)
    const keeps = [ {x: -80, z: -40}, {x: 80, z: 40} ];
    keeps.forEach(keep => {
        const startDeps = [
            { type: "gold", color: 0xffb300 },
            { type: "iron", color: 0x7e57c2 },
            { type: "stone", color: 0x78909c },
            { type: "fertile", color: 0x388e3c }
        ];
        // Distribute evenly around the keep at distance 20-25
        startDeps.forEach((dep, idx) => {
            const angle = (idx * Math.PI * 2) / 4;
            const dist = 20 + Math.random() * 5;
            const dx = keep.x + Math.cos(angle) * dist;
            const dz = keep.z + Math.sin(angle) * dist;
            const r = 2.0; // small enough for exactly 1 building
            resourceDeposits.push({
                type: dep.type,
                x: dx,
                z: dz,
                radius: r
            });
            const mesh = createDepositMesh(dx, dz, r, dep.color);
            scene.add(mesh);
        });
    });
}
function createDepositMesh(x, z, radius, color) {
    const geo = new THREE.CircleGeometry(radius, 16);
    geo.rotateX(-Math.PI / 2);
    // Drape vertices over terrain height
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i) + x;
        const vz = pos.getZ(i) + z;
        const vy = getTerrainHeight(vx, vz) + 0.03; // slightly above terrain
        pos.setY(i, vy - getTerrainHeight(x, z));
    }
    geo.computeVertexNormals();
    const mat = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, getTerrainHeight(x, z), z);
    return mesh;
}
// Check if building matches deposit type at 75% coverage
function isBuildingOnResource(bx, bz, bRadius, resourceType) {
    // Math approximation: 75% coverage if distance to center is within (DepositRadius - 0.5 * BuildingRadius)
    for (let i = 0; i < resourceDeposits.length; i++) {
        const dep = resourceDeposits[i];
        if (dep.type === resourceType) {
            const dist = Math.hypot(dep.x - bx, dep.z - bz);
            if (dist <= (dep.radius - bRadius * 0.5)) {
                return dep; // Valid overlap! Return deposit reference
            }
        }
    }
    return null;
}
// --- PROCEDURAL TREES (WOOD RESOURCE) ---
function growForest() {
    const forbiddenRadius = 15;
    const mapSize = 120;
    const treeCoords = [];
    // Scattered trees (mirrored, so we generate half)
    for (let i = 0; i < 40; i++) {
        let x = (Math.random() - 0.5) * mapSize * 2;
        let z = (Math.random() - 0.5) * mapSize * 2;
        treeCoords.push({ x: x, z: z });
        treeCoords.push({ x: -x, z: -z });
    }
    // Forest clusters (mirrored, so we generate half)
    const forestCount = 5;
    for (let f = 0; f < forestCount; f++) {
        let fx = (Math.random() - 0.5) * mapSize * 2;
        let fz = (Math.random() - 0.5) * mapSize * 2;
        for (let t = 0; t < 25; t++) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * Math.random() * 18;
            let tx = Math.max(-mapSize, Math.min(mapSize, fx + Math.cos(angle) * r));
            let tz = Math.max(-mapSize, Math.min(mapSize, fz + Math.sin(angle) * r));
            treeCoords.push({ x: tx, z: tz });
            treeCoords.push({ x: -tx, z: -tz });
        }
    }
    // Shared Geometries & Materials for performance
    const sharedTrunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 1.8, 5);
    const sharedTrunkMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 });
    const sharedConeMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.85, flatShading: true });
    const sharedCone1Geo = new THREE.ConeGeometry(0.8, 1.5, 5);
    const sharedCone2Geo = new THREE.ConeGeometry(0.6, 1.2, 5);
    treeCoords.forEach(coord => {
        let x = coord.x;
        let z = coord.z;
        const distToRed = Math.hypot(x - (-80), z - (-40));
        const distToBlue = Math.hypot(x - 80, z - 40);
        if (distToRed < forbiddenRadius || distToBlue < forbiddenRadius) {
            return;
        }
        const y = getTerrainHeight(x, z);
        // Tree group mesh
        const treeGroup = new THREE.Group();
        // Trunk
        const trunk = new THREE.Mesh(sharedTrunkGeo, sharedTrunkMat);
        trunk.position.y = 0.9;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        treeGroup.add(trunk);
        // Foliage
        const cone1 = new THREE.Mesh(sharedCone1Geo, sharedConeMat);
        cone1.position.y = 1.9;
        cone1.castShadow = true;
        treeGroup.add(cone1);
        const cone2 = new THREE.Mesh(sharedCone2Geo, sharedConeMat);
        cone2.position.y = 2.7;
        cone2.castShadow = true;
        treeGroup.add(cone2);
        treeGroup.position.set(x, y, z);
        scene.add(treeGroup);
        // Register tree as harvestable static entity
        const id = nextEntityId++;
        const treeEntity = {
            id: id,
            type: "tree",
            faction: "neutral",
            x: x,
            z: z,
            y: y,
            radius: 0.5,
            height: 3.2,
            health: 400,
            maxHealth: 400,
            armor: 5,
            state: "idle",
            mesh: treeGroup
        };
        entities.push(treeEntity);
    });
}
// --- CREATE INITIAL BASES ---
function createInitialBases() {
    // Red Base (Player 1)
    const redKeepX = -80;
    const redKeepZ = -40;
    const redKeepY = getTerrainHeight(redKeepX, redKeepZ);
    const redKeep = createEntity("keep", "red", redKeepX, redKeepZ);
    // Spawn red King
    createEntity("king", "red", redKeepX + 5, redKeepZ + 5);
    // Blue Base (Player 2, AI)
    const blueKeepX = 80;
    const blueKeepZ = 40;
    const blueKeepY = getTerrainHeight(blueKeepX, blueKeepZ);
    if (gameDifficulty !== "test") {
        buildHardBotCastle(blueKeepX, blueKeepZ);
    } else {
        const blueKeep = createEntity("keep", "blue", blueKeepX, blueKeepZ);
        blueKeep.mesh.rotation.y = Math.PI; // Flip door to the left side
        // Spawn blue King
        createEntity("king", "blue", blueKeepX - 5, blueKeepZ - 5);
    }
    
    // Spawn 10 masked assassins on Hard Mode to attack the player's king early
    if (gameDifficulty === "hard") {
        const playerKing = entities.find(e => e.type === "king" && e.faction === "red");
        if (playerKing) {
            for (let i = 0; i < 10; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 150 + Math.random() * 10;
                const ax = redKeepX + Math.cos(angle) * dist;
                const az = redKeepZ + Math.sin(angle) * dist;
                
                const assassin = createEntity("soldier", "blue", ax, az);
                if (assassin) {
                    assassin.killCount = 1; // Give them the mask
                    applyEquipmentStats(assassin, { weapon: "Assassin", armors: ["cloth"], hasHorse: false });
                    assassin.targetEntity = null;
                    assassin.targetPosition = new THREE.Vector3(playerKing.x, playerKing.y, playerKing.z);
                    assassin.fightMoveDestination = assassin.targetPosition.clone();
                    assassin.state = "fightmove";
                    assassin.path = null;
                    assassin.pathCooldown = 0;
                }
            }
        }
    }

    // Adjust camera initial focus on player's keep
    cameraLookAt.set(redKeepX, redKeepY, redKeepZ);
    updateCameraPosition();
}
// --- ENTITY CREATION ---
function createEntity(type, faction, x, z, isPlanned = false, homeBuilding = null) {
    if (BUILDING_TYPES[type] && type !== "gatehouse" && type !== "wall_column" && type !== "wall_ramp") {
        const config = BUILDING_TYPES[type];
        const w = config.dimX !== undefined ? config.dimX : (config.radius || 0.5) * 2;
        const d = config.dimZ !== undefined ? config.dimZ : (config.radius || 0.5) * 2;
        const isEvenX = (Math.round(w) % 2 === 0);
        const isEvenZ = (Math.round(d) % 2 === 0);
        x = isEvenX ? Math.round(x - 0.5) + 0.5 : Math.round(x);
        z = isEvenZ ? Math.round(z - 0.5) + 0.5 : Math.round(z);
    }
    const id = nextEntityId++;
    const base = BASE_STATS[type] || BUILDING_TYPES[type] || { maxHp: 100, radius: 0.5, height: 1 };
    const y = getTerrainHeight(x, z);
    const entity = {
        id: id,
        type: type,
        faction: faction,
        isPlanned: isPlanned,
        commandIndex: currentCommandIndex,
        x: x,
        z: z,
        y: y,
        radius: base.radius,
        height: base.height,
        health: isPlanned ? 1 : base.maxHp,
        maxHealth: base.maxHp,
        resourcesNeededTotal: isPlanned ? (base.cost || base.goldCost || 0) : 0,
        resourcesDelivered: 0,
        constructionProgress: isPlanned ? 0 : 1,
        escrow: isPlanned ? (base.cost || base.goldCost || 0) : 0,
        material: base.material,
        baseSpeed: base.speed || 0,
        speed: base.speed || 0,
        armor: base.armor || 0,
        killCount: 0,
        // Navigation / Action states
        targetPosition: null,
        targetEntity: null,
        state: "idle", // idle, wander, moving, training, attacking, fightmove, dead
        savedFightMoveDest: null, // backup coordinate for fightmove commands
        isAggro: (type === "peasant" || type === "logistics_wagon" || type === "king" || type.startsWith("siege_")) ? false : true,
        // Wander AI state (peasants)
        homeBuilding: homeBuilding,
        wanderTimer: Math.random() * 3,
        // Custom Workers State trackers (Farming, woodcutting, mining, crafting)
        workTimer: 0,
        workerBuilding: null, // building this worker is assigned to
        carriedItem: null, // product type or cost logs
        payloadAmount: 0, // resources currently carried by this worker
        // Combat states
        weapon: null,
        armors: [],
        cooldownTimer: 0,
        timeStationary: 0,
        reloadTimer: 0,
        // Spawning & Custom Inventories
        spawnTimer: 0,
        spawnedPeasants: [],
        inventory: null, // Initialized if Barracks or Mine
        // Workshop Product Selection Toggles
        activeProductIdx: 0,
        // ThreeJS references
        mesh: null,
        selectionRing: null
    };
    if (type === "peasant") {
        entity.sillyName = generateSillyName();
        entity.spawnTime = formatGameTime(globalGameTime);
    }
    if (type === "siege_catapult") entity.weapon = "Catapult";
    else if (type === "siege_mangonel") entity.weapon = "Mangonel";
    else if (type === "siege_ballista") entity.weapon = "Ballista";
    else if (type === "siege_trebuchet") entity.weapon = "Trebuchet";
    // Set specialized inventory properties
    if (type === "barracks") {
        entity.inventory = {};
        // Prepopulate red faction's first barracks (or all barracks) with 5 of every weapon and armor
        if (faction === "red") {
            for (let k in startingPool) {
                entity.inventory[k] = startingPool[k];
                startingPool[k] = 0; // empty global starting pool on transfer
            }
        }
    } else if (type === "mine") {
        entity.inventory = { gold: 0, iron: 0, stone: 0 };
        entity.miners = [];
    }
    // Build the visual model
    let mesh = buildEntityMesh(entity);
    if (isPlanned) {
        mesh.traverse(child => {
            if (child.isMesh && child.material) {
                child.material = child.material.clone();
                child.material.transparent = true;
                child.material.opacity = 0.4;
            }
        });
    }
    mesh.position.set(x, y, z);
    scene.add(mesh);
    entity.mesh = mesh;
    // Add selection ring (hidden by default)
    const ringGeo = new THREE.RingGeometry(entity.radius * 1.25, entity.radius * 1.35, 16);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
        color: faction === "red" ? 0x00ff00 : 0xff0000,
        side: THREE.DoubleSide,
        visible: false
    });
    entity.selectionRing = new THREE.Mesh(ringGeo, ringMat);
    entity.selectionRing.position.y = 0.05;
    entity.mesh.add(entity.selectionRing);
    if (type === "farm") {
        entity.isFertile = !!isBuildingOnResource(x, z, entity.radius || 1.5, "fertile");
    }
    entities.push(entity);
    if (entity.baseSpeed === 0 && !entity.isPlanned) {
        buildingGridDirty = true;
    }
    if (homeBuilding && type === "peasant") {
        homeBuilding.spawnedPeasants.push(entity);
    }
    return entity;
}
// --- MESH GENERATION (PROCEDURAL & DETAILED) ---
function buildWagonMesh(hasCargo, faction) {
    const group = new THREE.Group();
    group.name = "movingWagon";
    const teamColor = faction === "red" ? 0xd32f2f : 0x1976d2;
    // Wagon
    const wagonGeo = new THREE.BoxGeometry(2.0, 0.8, 1.2);
    const wagon = new THREE.Mesh(wagonGeo, new THREE.MeshStandardMaterial({ color: 0x8d6e63 }));
    wagon.position.set(0, 0.4, 0);
    group.add(wagon);
    // Horse
    const horseGeo = new THREE.BoxGeometry(0.8, 1.2, 1.6);
    const horse = new THREE.Mesh(horseGeo, new THREE.MeshStandardMaterial({ color: 0x4e342e }));
    horse.position.set(0, 0.6, 1.4);
    group.add(horse);
    // Team Flag
    const flagGeo = new THREE.BoxGeometry(0.1, 0.6, 0.4);
    const flag = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({ color: teamColor }));
    flag.position.set(0, 1.1, 0.6);
    group.add(flag);
    if (hasCargo) {
        // Cargo Boxes
        const crateGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
        const crateMat = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
        const crate1 = new THREE.Mesh(crateGeo, crateMat);
        crate1.position.set(-0.4, 1.1, -0.2);
        group.add(crate1);
        const crate2 = new THREE.Mesh(crateGeo, crateMat);
        crate2.position.set(0.4, 1.1, 0.1);
        group.add(crate2);
    }
    return group;
}
function buildEntityMesh(entity) {
    const group = new THREE.Group();
    if (entity.type === "tower_tile") return group; // Invisible physics tile
    const teamColor = entity.faction === "red" ? 0xd32f2f : 0x1976d2;
    if (entity.type === "keep") {
        const bodyGeo = new THREE.CylinderGeometry(2.4, 2.8, 6.0, 8);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x757575, roughness: 0.8, flatShading: true });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 3.0;
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);
        // Battlements
        const battMat = new THREE.MeshStandardMaterial({ color: 0x616161 });
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const b = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.8), battMat);
            b.position.set(Math.cos(angle) * 2.4, 6.1, Math.sin(angle) * 2.4);
            b.rotation.y = -angle;
            b.castShadow = true;
            group.add(b);
        }
        // Archway and Portcullis
        const doorArchGroup = new THREE.Group();
        doorArchGroup.position.set(2.4, 0, 0);
        doorArchGroup.rotation.y = Math.PI / 2;
        group.add(doorArchGroup);
        const portcullisMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.8 });
        const portcullis = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.0, 0.1), portcullisMat);
        portcullis.position.set(0, 1.0, 0);
        portcullis.name = "gatehouseDoor";
        doorArchGroup.add(portcullis);
        const archMat = new THREE.MeshStandardMaterial({ color: 0x424242, roughness: 0.8 });
        const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.2, 0.5), archMat);
        p1.position.set(0.9, 1.1, 0);
        doorArchGroup.add(p1);
        const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.2, 0.5), archMat);
        p2.position.set(-0.9, 1.1, 0);
        doorArchGroup.add(p2);
        const p3 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 0.5), archMat);
        p3.position.set(0, 2.45, 0);
        doorArchGroup.add(p3);
        // Large Banner
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.0, 4), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        pole.position.set(0, 8.0, 0);
        group.add(pole);
        const flag = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.0, 1.8), new THREE.MeshStandardMaterial({ color: teamColor }));
        flag.position.set(0, 9.5, 0.9);
        group.add(flag);
    } else if (entity.type === "house") {
        const cabinMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.9 });
        const cabin = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.6, 3.0), cabinMat);
        cabin.position.y = 0.8;
        cabin.castShadow = true;
        cabin.receiveShadow = true;
        group.add(cabin);
        const shape = new THREE.Shape();
        shape.moveTo(-1.6, 0);
        shape.lineTo(0, 1.2);
        shape.lineTo(1.6, 0);
        shape.lineTo(-1.6, 0);
        const roofGeo = new THREE.ExtrudeGeometry(shape, { depth: 3.2, bevelEnabled: false });
        roofGeo.center();
        const roofMat = new THREE.MeshStandardMaterial({ color: teamColor, flatShading: true });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.set(0, 2.2, 0);
        roof.castShadow = true;
        group.add(roof);
    } else if (entity.type === "barracks") {
        const matColor = entity.material === "wood" ? 0x6d4c41 : 0x9e9e9e;
        const build = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.2, 4.0), new THREE.MeshStandardMaterial({ color: matColor }));
        build.position.y = 1.1;
        build.castShadow = true;
        build.receiveShadow = true;
        group.add(build);
        const awning = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.2, 2.0), new THREE.MeshStandardMaterial({ color: teamColor }));
        awning.position.set(0, 2.3, 1.6);
        group.add(awning);
        const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.2, 4), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        p1.position.set(-1.8, 1.1, 2.5);
        group.add(p1);
        const p2 = p1.clone();
        p2.position.x = 1.8;
        group.add(p2);
    } else if (entity.type === "mercenary_post") {
        const matColor = 0x4a148c; // Deep purple
        const build = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.2, 4.0), new THREE.MeshStandardMaterial({ color: matColor }));
        build.position.y = 1.1;
        build.castShadow = true;
        build.receiveShadow = true;
        group.add(build);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(3.2, 1.5, 4), new THREE.MeshStandardMaterial({ color: 0x212121 })); // Black roof
        roof.position.set(0, 2.95, 0);
        roof.rotation.y = Math.PI / 4;
        roof.castShadow = true;
        group.add(roof);
        // Gold coin emblem on the front
        const emblem = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16), new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 }));
        emblem.position.set(0, 1.5, 2.05);
        emblem.rotation.x = Math.PI / 2;
        group.add(emblem);
    } else if (entity.type === "farm") {
        // Red/Blue crop fences, centered patch
        const soil = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.15, 4.0), new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 }));
        soil.position.y = 0.08;
        soil.receiveShadow = true;
        group.add(soil);
        // Small scarecrow or flag
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 4), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        post.position.set(0, 0.75, 0);
        group.add(post);
        const cropMat = new THREE.MeshStandardMaterial({ color: 0x4caf50 });
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const crop = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 4), cropMat);
                crop.position.set(i * 0.9, 0.35, j * 0.9);
                group.add(crop);
            }
        }
    } else if (entity.type === "woodcutter") {
        // Wooden cabin with tree stumps
        const cabin = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.6, 3.0), new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.95 }));
        cabin.position.y = 0.8;
        cabin.castShadow = true;
        group.add(cabin);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(2.2, 1.0, 4), new THREE.MeshStandardMaterial({ color: teamColor }));
        roof.position.set(0, 2.1, 0);
        roof.rotation.y = Math.PI / 4;
        group.add(roof);
        // Small wood pile decoration
        const log = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 5), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        log.rotation.z = Math.PI / 2;
        log.position.set(1.5, 0.1, 1.0);
        group.add(log);
        const log2 = log.clone();
        log2.position.set(1.5, 0.25, 0.8);
        group.add(log2);
    } else if (entity.type === "mine") {
        // Mine shaft structure
        const frame = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.4, 0.3), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        frame.position.set(0, 1.2, 1.8);
        group.add(frame);
        const cross = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 4.0), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        cross.position.set(0, 2.4, 0);
        group.add(cross);
        // Dark hole inside
        const hole = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.0, 0.1), new THREE.MeshBasicMaterial({ color: 0x111111 }));
        hole.position.set(0, 1.0, 1.3);
        group.add(hole);
    } else if (entity.type === "bakery") {
        const oven = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.0, 3.0), new THREE.MeshStandardMaterial({ color: 0xe0e0e0 }));
        oven.position.y = 1.0;
        group.add(oven);
        const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.5, 8), new THREE.MeshStandardMaterial({ color: teamColor }));
        chimney.position.set(0.9, 2.5, -0.9);
        group.add(chimney);
        const fire = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.8, 3.1), new THREE.MeshBasicMaterial({ color: 0xff3300 }));
        fire.position.y = 0.5;
        group.add(fire);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(2.3, 1.0, 4), new THREE.MeshStandardMaterial({ color: 0xffcc80 }));
        roof.position.set(0, 2.5, 0);
        roof.rotation.y = Math.PI / 4;
        group.add(roof);
    } else if (entity.type === "brewery") {
        const base = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.0, 3.0), new THREE.MeshStandardMaterial({ color: 0xe0e0e0 }));
        base.position.y = 1.0;
        group.add(base);
        const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 2.0, 8), new THREE.MeshStandardMaterial({ color: teamColor }));
        chimney.position.set(0, 2.8, 0);
        group.add(chimney);
        const vat = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.5, 16), new THREE.MeshStandardMaterial({ color: 0x8d6e63 }));
        vat.position.set(-0.2, 1.5, 0.2);
        group.add(vat);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(2.3, 1.0, 4), new THREE.MeshStandardMaterial({ color: 0x8d6e63 }));
        roof.position.set(0, 2.5, 0);
        roof.rotation.y = Math.PI / 4;
        group.add(roof);
    } else if (entity.type === "market") {
        const stall = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.4, 2.0), new THREE.MeshStandardMaterial({ color: 0x8d6e63 }));
        stall.position.y = 0.8;
        group.add(stall);
        const canopy = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.1, 2.4), new THREE.MeshStandardMaterial({ color: teamColor }));
        canopy.position.set(0, 2.2, 0);
        canopy.rotation.x = -0.1;
        group.add(canopy);
        const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 4), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        p1.position.set(-1.9, 1.1, -1.0);
        group.add(p1);
        const p2 = p1.clone();
        p2.position.set(1.9, 1.1, -1.0);
        group.add(p2);
        const p3 = p1.clone();
        p3.position.set(-1.9, 1.1, 1.0);
        group.add(p3);
        const p4 = p1.clone();
        p4.position.set(1.9, 1.1, 1.0);
        group.add(p4);
    } else if (entity.type === "stables") {
        const barn = new THREE.Mesh(new THREE.BoxGeometry(5.0, 1.8, 2.8), new THREE.MeshStandardMaterial({ color: 0x6d4c41 }));
        barn.position.y = 0.9;
        barn.castShadow = true;
        barn.receiveShadow = true;
        group.add(barn);
        const roof = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 5.0, 3), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        roof.position.y = 2.2;
        roof.rotation.z = Math.PI / 2;
        roof.rotation.x = Math.PI / 2;
        group.add(roof);
        const fence = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.4, 5.0), new THREE.MeshBasicMaterial({ color: 0x4e342e, wireframe: true }));
        fence.position.y = 0.2;
        group.add(fence);
    } else if (entity.type === "loadhouse") {
        const platform = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.4, 4.0), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        platform.position.y = 0.2;
        group.add(platform);
        const trimMat = new THREE.MeshStandardMaterial({ color: teamColor });
        const tN = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.1, 0.1), trimMat);
        tN.position.set(0, 0.45, -2.05);
        const tS = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.1, 0.1), trimMat);
        tS.position.set(0, 0.45, 2.05);
        const tE = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 4.0), trimMat);
        tE.position.set(2.05, 0.45, 0);
        const tW = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 4.0), trimMat);
        tW.position.set(-2.05, 0.45, 0);
        group.add(tN, tS, tE, tW);
        if (entity.hasHorse) {
            const wagonGroup = new THREE.Group();
            wagonGroup.name = "wagonGroup";
            const wagonGeo = new THREE.BoxGeometry(2.0, 0.8, 1.2);
            const wagon = new THREE.Mesh(wagonGeo, new THREE.MeshStandardMaterial({ color: 0x8d6e63 }));
            wagon.position.set(0, 0.8, -0.4);
            wagonGroup.add(wagon);
            const horseGeo = new THREE.BoxGeometry(0.8, 1.2, 1.6);
            const horse = new THREE.Mesh(horseGeo, new THREE.MeshStandardMaterial({ color: 0x4e342e }));
            horse.position.set(0, 0.8, 1.2);
            wagonGroup.add(horse);
            if (entity.wagonAway) wagonGroup.visible = false;
            group.add(wagonGroup);
        } else {
            const emptySpace = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 1.0), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
            emptySpace.position.set(0, 0.5, 0);
            group.add(emptySpace);
        }
        const cratesGroup = new THREE.Group();
        const crateGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
        const crateMat = new THREE.MeshStandardMaterial({ color: 0xdeb887 });
        const cratePositions = [
            [-1.8, 0.7, -1.8], [-1.0, 0.7, -2.0], [1.8, 0.7, -1.8], [2.0, 0.7, -1.0],
            [1.8, 0.7, 1.8], [1.0, 0.7, 2.0], [-1.8, 0.7, 1.8], [-2.0, 0.7, 1.0]
        ];
        cratePositions.forEach(pos => {
            const crate = new THREE.Mesh(crateGeo, crateMat);
            crate.position.set(pos[0], pos[1], pos[2]);
            crate.rotation.y = Math.random() * Math.PI;
            crate.visible = false;
            cratesGroup.add(crate);
        });
        group.add(cratesGroup);
        entity.cratesGroup = cratesGroup;
    } else if (entity.type === "wall_column") {
        const isDamaged = entity.originalHeight && entity.blocks && entity.blocks.length < entity.originalHeight;
        const actualH = isDamaged ? entity.blocks.length : (entity.exactHeight !== undefined ? entity.exactHeight : (entity.height !== undefined ? entity.height : 1));
        let geo;
        let baseH = actualH;
        if (actualH === 0 && !entity.isRamp) {
            geo = new THREE.BoxGeometry(1.0, 0.2, 1.0);
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                const vx = pos.getX(i);
                const vz = pos.getZ(i);
                const terrainY = getTerrainHeight(entity.x + vx, entity.z + vz);
                pos.setY(i, (terrainY - entity.y) + (pos.getY(i) > 0 ? 0.2 : 0));
            }
            geo.computeVertexNormals();
        } else {
            baseH = (entity.isRamp && !isDamaged) ? Math.max(3.0, actualH + 2.0) : actualH;
            if (entity.isPlanned) {
                geo = new THREE.BoxGeometry(1.05, baseH + 0.05, 1.05);
            } else {
                geo = new THREE.BoxGeometry(1.0, baseH, 1.0);
            }
        }
        if (entity.isRamp && !isDamaged && entity.rampDx !== undefined) {
            const pos = geo.attributes.position;
            for (let i = 0; i < pos.count; i++) {
                if (pos.getY(i) > 0) {
                    const vx = pos.getX(i);
                    const vz = pos.getZ(i);
                    const dot = vx * entity.rampDx + vz * entity.rampDz;
                    const extraH = dot * Math.tan(entity.rampSlope * Math.PI / 180);
                    const desiredLocalY = (actualH / 2) + extraH;
                    pos.setY(i, desiredLocalY);
                }
            }
            geo.computeVertexNormals();
        }
        let mat;
        if (entity.isPlanned) {
            mat = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.4 });
        } else {
            const matColor = entity.material === "wood" ? 0x8d6e63 : 0x9e9e9e;
            mat = new THREE.MeshStandardMaterial({ color: matColor, roughness: 0.9, flatShading: true });
        }
        const mesh = new THREE.Mesh(geo, mat);
        if (entity.isOuterWall) {
            const crenMat = new THREE.MeshStandardMaterial({ color: entity.material === "wood" ? 0x8d6e63 : 0x9e9e9e, roughness: 0.9, flatShading: true });
            for (let cx = -0.3; cx <= 0.3; cx += 0.6) {
                for (let cz = -0.3; cz <= 0.3; cz += 0.6) {
                    const cMesh = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), crenMat);
                    cMesh.position.set(cx, (baseH / 2) + 0.2, cz);
                    mesh.add(cMesh);
                }
            }
        }
        if (actualH === 0) mesh.position.y = 0;
        else mesh.position.y = actualH / 2;
        mesh.castShadow = !entity.isPlanned;
        mesh.receiveShadow = !entity.isPlanned;
        group.add(mesh);
        if (entity.isCrenulated && !entity.isRamp && actualH > 0 && !isDamaged) {
            const crenSlope = new THREE.BoxGeometry(1.0, 0.5, 1.0);
            const pos = crenSlope.attributes.position;
            for(let i=0; i<pos.count; i++) {
                if (pos.getY(i) > 0) {
                    pos.setX(i, pos.getX(i) * 0.5);
                    pos.setZ(i, pos.getZ(i) * 0.5);
                }
            }
            crenSlope.computeVertexNormals();
            const meshSlope = new THREE.Mesh(crenSlope, mat);
            meshSlope.position.y = actualH + 0.25;
            meshSlope.castShadow = !entity.isPlanned;
            group.add(meshSlope);
            const crenTop = new THREE.BoxGeometry(0.5, 1.0, 0.5);
            const meshTop = new THREE.Mesh(crenTop, mat);
            meshTop.position.y = actualH + 0.5;
            meshTop.castShadow = !entity.isPlanned;
            group.add(meshTop);
        }
    } else if (entity.type === "tower") {
        const matColor = entity.material === "wood" ? 0x8d6e63 : 0x9e9e9e;
        const mat = new THREE.MeshStandardMaterial({ color: matColor, roughness: 0.9, flatShading: true });
        if (entity.isPlanned) {
            mat.color.setHex(0x00ff00);
            mat.transparent = true;
            mat.opacity = 0.4;
        }
        const visualRadius = Math.max(0.5, ((entity.dimX || (entity.radius ? entity.radius * 2 + 1 : 3)) / 2.0) - 0.15);
        const colGeo = new THREE.CylinderGeometry(visualRadius, visualRadius, entity.height, 24);
        const mesh = new THREE.Mesh(colGeo, mat);
        mesh.position.set(0, entity.height / 2, 0);
        mesh.castShadow = !entity.isPlanned;
        mesh.receiveShadow = !entity.isPlanned;
        group.add(mesh);
        const rimGeo = new THREE.TorusGeometry(visualRadius - 0.1, 0.25, 8, 24);
        const rim = new THREE.Mesh(rimGeo, mat);
        rim.rotation.x = Math.PI / 2;
        rim.position.y = entity.height;
        rim.castShadow = !entity.isPlanned;
        group.add(rim);
        const numCrens = Math.max(8, Math.floor(visualRadius * 4));
        for (let i = 0; i < numCrens; i++) {
            const angle = (i / numCrens) * Math.PI * 2;
            const cx = Math.cos(angle) * (visualRadius - 0.25);
            const cz = Math.sin(angle) * (visualRadius - 0.25);
            const crenGeo = new THREE.BoxGeometry(0.5, 1.0, 0.5);
            const meshTop = new THREE.Mesh(crenGeo, mat);
            meshTop.position.set(cx, entity.height + 0.5, cz);
            meshTop.rotation.y = -angle;
            meshTop.castShadow = !entity.isPlanned;
            meshTop.userData.isCren = true;
            group.add(meshTop);
        }
        // Add doors for connected walls
        entities.forEach(w => {
            if ((w.type === "wall_column" || w.type === "gatehouse" || w.type === "wall_ramp" || (w.type === "tower" && w !== entity)) && !w.isPlanned && w.faction === entity.faction) {
                const wRadius = (w.dimX !== undefined ? w.dimX : (w.radius ? w.radius * 2 : 1)) / 2.0;
                if (Math.abs(w.x - entity.x) <= visualRadius + wRadius + 0.5 && Math.abs(w.z - entity.z) <= visualRadius + wRadius + 0.5) {
                    const wRoofY = w.y + (w.type === "wall_column" && w.blocks ? w.blocks.length : (w.height || 2.0));
                    if (entity.y + entity.height >= wRoofY + 1.8) {
                        let wallAngle = Math.atan2(w.z - entity.z, w.x - entity.x);
                        let doorX = Math.cos(wallAngle) * (visualRadius - 0.2);
                        let doorZ = Math.sin(wallAngle) * (visualRadius - 0.2);
                        const doorGeo = new THREE.BoxGeometry(1.0, 1.5, 0.5);
                        const doorMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 1.0 });
                        const door = new THREE.Mesh(doorGeo, doorMat);
                        door.position.set(doorX, wRoofY - entity.y + 0.75, doorZ);
                        door.rotation.y = -wallAngle;
                        group.add(door);
                    }
                }
            }
        });
    } else if (entity.type === "gatehouse") {
        const dimX = entity.dimX || 1;
        const dimY = entity.dimY || 1;
        const dimZ = entity.dimZ || 1;
        if (entity.isPlanned) {
            const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.4 });
            const mesh = new THREE.Mesh(new THREE.BoxGeometry(dimX, dimY, dimZ), mat);
            mesh.position.y = dimY / 2;
            group.add(mesh);
        } else {
            const matColor = entity.material === "wood" ? 0x8d6e63 : 0x757575;
            const mat = new THREE.MeshStandardMaterial({ color: matColor, roughness: 0.8, flatShading: true });
            // Invisible Hitbox for Raycasting (selection/clicking)
            const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
            const hitBox = new THREE.Mesh(new THREE.BoxGeometry(dimX, dimY, dimZ), hitMat);
            hitBox.position.y = dimY / 2;
            group.add(hitBox);
            // Top Surface
            const topThickness = 0.5;
            const topMesh = new THREE.Mesh(new THREE.BoxGeometry(dimX, topThickness, dimZ), mat);
            topMesh.position.y = dimY - (topThickness / 2);
            topMesh.castShadow = true;
            topMesh.receiveShadow = true;
            group.add(topMesh);
            // 4 Corner Pillars
            const pW = 0.25;
            const pH = dimY - topThickness;
            const pillarGeo = new THREE.BoxGeometry(pW, pH, pW);
            const offsets = [
                [-dimX/2 + pW/2, -dimZ/2 + pW/2],
                [ dimX/2 - pW/2, -dimZ/2 + pW/2],
                [-dimX/2 + pW/2,  dimZ/2 - pW/2],
                [ dimX/2 - pW/2,  dimZ/2 - pW/2]
            ];
            offsets.forEach(off => {
                const p = new THREE.Mesh(pillarGeo, mat);
                p.position.set(off[0], pH / 2, off[1]);
                p.castShadow = true;
                p.receiveShadow = true;
                group.add(p);
            });
            // Metal Bar Gate (Portcullis Cage)
            const gateGroup = new THREE.Group();
            gateGroup.name = "gatehouseDoor";
            if (entity.isOpen) gateGroup.visible = false;
            const ironMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.5 });
            // X-aligned bars
            const numBarsX = Math.max(2, Math.floor((dimX - pW*2) * 3));
            const spacingX = (dimX - pW*2) / numBarsX;
            for(let i=0; i<=numBarsX; i++) {
                const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, pH, 0.08), ironMat);
                b1.position.set(-dimX/2 + pW + i*spacingX, pH/2, dimZ/2 - pW/2);
                gateGroup.add(b1);
                const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, pH, 0.08), ironMat);
                b2.position.set(-dimX/2 + pW + i*spacingX, pH/2, -dimZ/2 + pW/2);
                gateGroup.add(b2);
            }
            // Z-aligned bars
            const numBarsZ = Math.max(2, Math.floor((dimZ - pW*2) * 3));
            const spacingZ = (dimZ - pW*2) / numBarsZ;
            for(let i=0; i<=numBarsZ; i++) {
                const b3 = new THREE.Mesh(new THREE.BoxGeometry(0.08, pH, 0.08), ironMat);
                b3.position.set(dimX/2 - pW/2, pH/2, -dimZ/2 + pW + i*spacingZ);
                gateGroup.add(b3);
                const b4 = new THREE.Mesh(new THREE.BoxGeometry(0.08, pH, 0.08), ironMat);
                b4.position.set(-dimX/2 + pW/2, pH/2, -dimZ/2 + pW + i*spacingZ);
                gateGroup.add(b4);
            }
            // Horizontal bands
            for (let y = 0.8; y < pH; y += 0.8) {
                const hBand = new THREE.Mesh(new THREE.BoxGeometry(dimX - pW, 0.08, dimZ - pW), ironMat);
                hBand.position.y = y;
                gateGroup.add(hBand);
            }
            group.add(gateGroup);
        }
    } else if (["poleturner", "gruntshop", "blacksmith", "fletcher", "knightarms", "tailor", "armorer", "carpenter", "jeweler"].includes(entity.type)) {
        // Generic wood production workshop with custom decorations
        const baseBuild = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.0, 3.0), new THREE.MeshStandardMaterial({ color: BUILDING_TYPES[entity.type].color }));
        baseBuild.position.y = 1.0;
        baseBuild.castShadow = true;
        baseBuild.receiveShadow = true;
        group.add(baseBuild);
        const roof = new THREE.Mesh(new THREE.ConeGeometry(2.3, 1.2, 4), new THREE.MeshStandardMaterial({ color: teamColor }));
        roof.position.set(0, 2.6, 0);
        roof.rotation.y = Math.PI/4;
        group.add(roof);
        let cx = 0, cz = 0;
        if (entity.type === "poleturner") { cz = -0.9; }
        else if (entity.type === "gruntshop") { cx = -0.9; cz = -0.9; }
        else if (entity.type === "blacksmith") { cx = -0.9; }
        else if (entity.type === "knightarms") { cx = -0.9; cz = 0.9; }
        else if (entity.type === "fletcher") { cz = 0.9; }
        else if (entity.type === "tailor") { cx = 0.9; cz = 0.9; }
        else if (entity.type === "armorer") { cx = 0.9; }
        if (entity.type !== "carpenter" && entity.type !== "jeweler") {
            const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.5, 0.5), new THREE.MeshStandardMaterial({ color: BUILDING_TYPES[entity.type].color }));
            chimney.position.set(cx, 2.5, cz);
            group.add(chimney);
        } else {
            entity.lanternMaterials = [];
            const corners = [
                {x: 1.4, z: 1.4}, {x: -1.4, z: 1.4},
                {x: 1.4, z: -1.4}, {x: -1.4, z: -1.4}
            ];
            corners.forEach(c => {
                const lanternGeo = new THREE.BoxGeometry(0.25, 0.4, 0.25);
                const lanternMat = new THREE.MeshStandardMaterial({ color: 0x333333, emissive: 0x000000 });
                const lantern = new THREE.Mesh(lanternGeo, lanternMat);
                lantern.position.set(c.x, 2.0, c.z);
                group.add(lantern);
                entity.lanternMaterials.push(lanternMat);
            });
        }
        let emoji = "";
        if (entity.type === "poleturner") emoji = "⚔️";
        else if (entity.type === "gruntshop") emoji = "🪓";
        else if (entity.type === "blacksmith") emoji = "⚒️";
        else if (entity.type === "fletcher") emoji = "🏹";
        else if (entity.type === "knightarms") emoji = "🛡️";
        else if (entity.type === "tailor") emoji = "🧵";
        else if (entity.type === "armorer") emoji = "👕";
        else if (entity.type === "carpenter") emoji = "🪚";
        else if (entity.type === "jeweler") emoji = "💍";
        if (emoji) {
            const canvas = document.createElement("canvas");
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext("2d");
            const wallColor = BUILDING_TYPES[entity.type].color.toString(16).padStart(6, '0');
            ctx.fillStyle = "#" + wallColor;
            ctx.fillRect(0, 0, 128, 128);
            ctx.strokeStyle = "#3e2723";
            ctx.lineWidth = 16;
            ctx.strokeRect(0, 0, 128, 128);
            ctx.font = "80px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(emoji, 64, 72);
            const tex = new THREE.CanvasTexture(canvas);
            const signMat = new THREE.MeshStandardMaterial({ map: tex });
            const sign = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.1), signMat);
            sign.position.set(0, 3.8, 0);
            const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 4), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
            signPost.position.set(0, 3.2, 0);
            group.add(signPost);
            group.add(sign);
        }
    } else if (entity.type === "king" || (entity.type === "soldier" && entity.weapon === "RoyalKnight")) {
        const isRK = entity.weapon === "RoyalKnight";
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1.3, 8), new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.9 }));
        body.position.y = 0.65;
        body.castShadow = true;
        group.add(body);
        const sash = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.15, 8), new THREE.MeshStandardMaterial({ color: teamColor }));
        sash.position.y = 0.55;
        group.add(sash);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffcc80 }));
        head.position.y = 1.45;
        group.add(head);
        if (isRK) {
            const helm = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.4, 8), new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.2, metalness: 0.9 }));
            helm.position.y = 1.6;
            group.add(helm);
            
            const plume = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 5), new THREE.MeshStandardMaterial({ color: teamColor }));
            plume.position.set(0, 1.85, -0.08);
            plume.rotation.x = -0.4;
            group.add(plume);
        } else {
            const crownGroup = new THREE.Group();
            crownGroup.position.set(0, 1.7, 0);
            const crownBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.12, 8), new THREE.MeshStandardMaterial({ color: 0xffd700 }));
            crownGroup.add(crownBase);
            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI * 2;
                const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 4), new THREE.MeshStandardMaterial({ color: 0xffd700 }));
                spike.position.set(Math.cos(angle) * 0.22, 0.14, Math.sin(angle) * 0.22);
                crownGroup.add(spike);
            }
            group.add(crownGroup);
        }
        const cape = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.08), new THREE.MeshStandardMaterial({ color: teamColor }));
        cape.position.set(0, 0.7, -0.45);
        cape.rotation.x = 0.12;
        group.add(cape);
        
        if (entity.hasHorse) {
            const horseGeo = new THREE.BoxGeometry(0.8, 1.2, 1.8);
            const horseMat = new THREE.MeshStandardMaterial({ color: 0x4e342e });
            const horseBody = new THREE.Mesh(horseGeo, horseMat);
            horseBody.position.set(0, 0.6, 0);
            group.add(horseBody);
            const horseHeadGeo = new THREE.BoxGeometry(0.4, 0.5, 0.6);
            const horseHead = new THREE.Mesh(horseHeadGeo, horseMat);
            horseHead.position.set(0, 1.3, 1.0);
            group.add(horseHead);
            // shift human parts up
            group.children.forEach(c => {
                if (c !== horseBody && c !== horseHead) {
                    c.position.y += 0.8;
                }
            });
        }
        
        if (isRK) {
            group.scale.set(0.9, 0.9, 0.9);
        }
    } else if (entity.type === "peasant") {
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.72, 6), new THREE.MeshStandardMaterial({ color: 0x8d6e63 }));
        body.position.y = 0.36;
        body.castShadow = true;
        group.add(body);
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.08, 6), new THREE.MeshStandardMaterial({ color: teamColor }));
        collar.position.y = 0.76;
        group.add(collar);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffcc80 }));
        head.position.y = 0.96;
        group.add(head);
        // Straw hat
        const hat = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.18, 6), new THREE.MeshStandardMaterial({ color: 0xd7ccc8 }));
        hat.position.y = 1.1;
        group.add(hat);
        // Tool in hand
        const toolGroup = new THREE.Group();
        toolGroup.name = "weaponGroup";
        toolGroup.position.set(0.35, 0.4, 0.2);
        toolGroup.rotation.x = Math.PI / 6;
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.8, 4), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        shaft.position.y = 0.2;
        toolGroup.add(shaft);
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.05), new THREE.MeshStandardMaterial({ color: 0xb0bec5 }));
        blade.position.set(0, 0.58, 0.06);
        toolGroup.add(blade);
        group.add(toolGroup);
    } else if (entity.type === "soldier" && entity.weapon === "Assassin") {
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x111111, transparent: true, opacity: 1.0 }); // All black
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 1.0, 8), bodyMat);
        body.position.y = 0.5;
        body.castShadow = true;
        body.name = "assassinBody";
        group.add(body);
        const headMat = new THREE.MeshStandardMaterial({ color: 0x111111, transparent: true, opacity: 1.0 });
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), headMat);
        head.position.y = 1.15;
        head.name = "assassinHead";
        group.add(head);
        // Sash (team color)
        const sashMat = new THREE.MeshStandardMaterial({ color: teamColor, transparent: true, opacity: 1.0 });
        const sash = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.05, 8, 12), sashMat);
        sash.rotation.x = Math.PI / 4;
        sash.position.y = 0.5;
        sash.name = "assassinSash";
        group.add(sash);
        // Skull Mask (hidden until kill, facing +z)
        const maskGroup = new THREE.Group();
        maskGroup.name = "assassinMask";
        maskGroup.visible = (entity && entity.killCount > 0);
        const maskMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const domeGeo = new THREE.SphereGeometry(0.18, 16, 16);
        domeGeo.scale(1, 0.9, 0.4);
        const dome = new THREE.Mesh(domeGeo, maskMat);
        dome.position.set(0, 1.18, 0.22);
        maskGroup.add(dome);
        const cheeks = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.06), maskMat);
        cheeks.position.set(0, 1.10, 0.23);
        maskGroup.add(cheeks);
        const socketMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
        const eyeR = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 8), socketMat);
        eyeR.rotation.x = Math.PI / 2;
        eyeR.position.set(-0.06, 1.15, 0.28);
        maskGroup.add(eyeR);
        const eyeL = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 8), socketMat);
        eyeL.rotation.x = Math.PI / 2;
        eyeL.position.set(0.06, 1.15, 0.28);
        maskGroup.add(eyeL);
        const noseGeo = new THREE.ConeGeometry(0.03, 0.06, 3);
        noseGeo.scale(1, 1, 0.25);
        const nose = new THREE.Mesh(noseGeo, socketMat);
        nose.position.set(0, 1.10, 0.28);
        maskGroup.add(nose);
        const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.15, 0.05), maskMat);
        jaw.position.set(0, 1.025, 0.22);
        maskGroup.add(jaw);
        for (let i = -2; i <= 2; i++) {
            const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.12, 0.02), socketMat);
            tooth.position.set(i * 0.03, 1.01, 0.24);
            maskGroup.add(tooth);
        }
        group.add(maskGroup);
        const toolGroup = new THREE.Group();
        toolGroup.name = "weaponGroup";
        toolGroup.position.set(0.4, 0.6, 0.2);
        toolGroup.rotation.x = Math.PI / 4;
        const katanaMat = new THREE.MeshStandardMaterial({ color: 0x90a4ae, transparent: true, opacity: 1.0 });
        const katana = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.8, 0.06), katanaMat);
        katana.position.y = 0.4;
        katana.name = "assassinKatana";
        toolGroup.add(katana);
        group.add(toolGroup);
    } else if (entity.type === "soldier" && entity.weapon === "Spy") {
        let shirtColor = 0x222222;
        let hatColor = 0xffffff;
        if (entity.isDisguised) {
            if (entity.faction === "red") shirtColor = 0x800080; // Purple for player
            else shirtColor = 0xffffff; // Fake red for enemy
        }
        const bodyMat = new THREE.MeshStandardMaterial({ color: shirtColor });
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.72, 6), bodyMat);
        body.position.y = 0.36;
        body.castShadow = true;
        body.name = "spyBody";
        group.add(body);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffcc80 }));
        head.position.y = 0.96;
        group.add(head);
        const hat = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.15, 8), new THREE.MeshStandardMaterial({ color: hatColor }));
        hat.position.y = 1.1;
        group.add(hat);
        const toolGroup = new THREE.Group();
        toolGroup.name = "weaponGroup";
        toolGroup.position.set(0.35, 0.4, 0.2);
        toolGroup.rotation.x = Math.PI / 6;
        const dagger = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.3, 0.05), new THREE.MeshStandardMaterial({ color: 0xb0bec5 }));
        dagger.position.y = 0.15;
        toolGroup.add(dagger);
        group.add(toolGroup);
    } else if (entity.type === "soldier" && entity.weapon === "Grunt") {
        // Look like a peasant but with a black shirt and small black hat
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.72, 6), new THREE.MeshStandardMaterial({ color: 0x222222 })); // Black shirt
        body.position.y = 0.36;
        body.castShadow = true;
        group.add(body);
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.08, 6), new THREE.MeshStandardMaterial({ color: teamColor }));
        collar.position.y = 0.76;
        group.add(collar);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffcc80 }));
        head.position.y = 0.96;
        group.add(head);
        // Small black hat (smaller than peasant straw hat)
        const hat = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.15, 6), new THREE.MeshStandardMaterial({ color: 0x222222 }));
        hat.position.y = 1.1;
        group.add(hat);
        // Tool in hand (Small Club)
        const toolGroup = new THREE.Group();
        toolGroup.name = "weaponGroup";
        toolGroup.position.set(0.35, 0.4, 0.2);
        toolGroup.rotation.x = Math.PI / 6;
        const club = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.02, 0.6, 6), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        club.position.y = 0.3;
        toolGroup.add(club);
        group.add(toolGroup);
    } else if (entity.type === "soldier" && entity.weapon === "Thug") {
        const thugGroup = new THREE.Group();
        // Look like a peasant with a black shirt and no hat. Eyepatch, scar, evil goatee.
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.30, 0.72, 6), new THREE.MeshStandardMaterial({ color: 0x222222 })); // Black shirt, slightly buff
        body.position.y = 0.36;
        body.castShadow = true;
        thugGroup.add(body);
        // Leather boots
        const boots = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.2, 6), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        boots.position.y = 0.1;
        thugGroup.add(boots);
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.08, 6), new THREE.MeshStandardMaterial({ color: teamColor }));
        collar.position.y = 0.76;
        thugGroup.add(collar);
        const headGroup = new THREE.Group();
        headGroup.position.y = 0.96;
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffcc80 }));
        headGroup.add(head);
        // Eyepatch
        const eyepatch = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.05), new THREE.MeshStandardMaterial({ color: 0x111111 }));
        eyepatch.position.set(-0.06, 0.04, 0.17);
        eyepatch.rotation.z = -Math.PI / 12;
        headGroup.add(eyepatch);
        const eyepatchStrap = new THREE.Mesh(new THREE.CylinderGeometry(0.182, 0.182, 0.012, 16), new THREE.MeshStandardMaterial({ color: 0x111111 }));
        eyepatchStrap.position.set(0, 0.04, 0);
        eyepatchStrap.rotation.z = -Math.PI / 12;
        headGroup.add(eyepatchStrap);
        // Scar (vertical, underneath eyepatch)
        const scar = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.14, 0.05), new THREE.MeshStandardMaterial({ color: 0xd32f2f }));
        scar.position.set(-0.06, 0.04, 0.16);
        scar.rotation.z = 0;
        headGroup.add(scar);
        // Goatee
        const goatee = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.12, 4), new THREE.MeshStandardMaterial({ color: 0x222222 }));
        goatee.position.set(0, -0.15, 0.15);
        goatee.rotation.x = Math.PI / 8;
        headGroup.add(goatee);
        thugGroup.add(headGroup);
        // Tool in hand (Club/Shiv)
        const toolGroup = new THREE.Group();
        toolGroup.name = "weaponGroup";
        toolGroup.position.set(0.38, 0.4, 0.2);
        toolGroup.rotation.x = Math.PI / 4;
        const club = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.02, 0.6, 6), new THREE.MeshStandardMaterial({ color: 0x4e342e }));
        club.position.y = 0.3;
        toolGroup.add(club);
        const spikes = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 0.12), new THREE.MeshStandardMaterial({ color: 0x90a4ae, metalness: 0.8 }));
        spikes.position.y = 0.55;
        toolGroup.add(spikes);
        thugGroup.add(toolGroup);
        thugGroup.scale.set(1.08, 1.08, 1.08);
        group.add(thugGroup);
    } else if (entity.type === "soldier" && entity.weapon === "Slinger") {
        // Look like a peasant with a white shirt and no hat. Has a sling.
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.72, 6), new THREE.MeshStandardMaterial({ color: 0xffffff })); // White shirt
        body.position.y = 0.36;
        body.castShadow = true;
        group.add(body);
        const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.08, 6), new THREE.MeshStandardMaterial({ color: teamColor }));
        collar.position.y = 0.76;
        group.add(collar);
        const headGroup = new THREE.Group();
        headGroup.position.y = 0.96;
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffcc80 }));
        headGroup.add(head);
        group.add(headGroup);
        // Tool in hand (Sling)
        const toolGroup = new THREE.Group();
        toolGroup.name = "weaponGroup";
        toolGroup.position.set(0.35, 0.5, 0.0);
        // Sling strings (V shape)
        const string1 = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.4, 4), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        string1.position.y = 0.2;
        string1.position.x = 0.05;
        string1.rotation.z = Math.PI / 8;
        toolGroup.add(string1);
        const string2 = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.4, 4), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        string2.position.y = 0.2;
        string2.position.x = -0.05;
        string2.rotation.z = -Math.PI / 8;
        toolGroup.add(string2);
        // Pouch at the top
        const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.08), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        pouch.position.y = 0.4;
        toolGroup.add(pouch);
        group.add(toolGroup);
    } else if (entity.type === "soldier" && entity.weapon === "Doppelsoldner") {
        const bodyCanvas = document.createElement("canvas");
        bodyCanvas.width = 64; bodyCanvas.height = 64;
        const bctx = bodyCanvas.getContext("2d");
        const teamColor = entity.faction === "red" ? "#d32f2f" : "#1976d2";
        bctx.fillStyle = "#ffd700"; // Yellow
        bctx.fillRect(0,0,64,64);
        bctx.fillStyle = teamColor;
        bctx.fillRect(0,0,32,32); bctx.fillRect(32,32,32,32);
        const bodyTex = new THREE.CanvasTexture(bodyCanvas);
        bodyTex.magFilter = THREE.NearestFilter;
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.9, 8), new THREE.MeshStandardMaterial({ map: bodyTex }));
        body.position.y = 0.45;
        body.castShadow = true;
        group.add(body);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.20, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffcc80 }));
        head.position.y = 1.05;
        head.castShadow = true;
        group.add(head);
        const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 8), new THREE.MeshStandardMaterial({ color: 0xffd700 }));
        hat.position.y = 1.25;
        group.add(hat);
        const feather = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 0.04), new THREE.MeshStandardMaterial({ color: entity.faction === "red" ? 0xd32f2f : 0x1976d2 }));
        feather.position.set(0.15, 1.3, 0.1);
        feather.rotation.z = -Math.PI/6;
        feather.rotation.x = Math.PI/6;
        group.add(feather);
        // Greatsword
        const toolGroup = new THREE.Group();
        toolGroup.name = "weaponGroup";
        toolGroup.position.set(0.42, 0.4, 0.2);
        toolGroup.rotation.x = Math.PI / 4;
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.3, 0.02), new THREE.MeshStandardMaterial({ color: 0xcfd8dc, metalness: 0.9, roughness: 0.1 }));
        blade.position.y = 0.65;
        const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3, 8), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        hilt.position.y = -0.15;
        const crossguard = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 0.04), new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8 }));
        crossguard.position.y = 0;
        toolGroup.add(blade);
        toolGroup.add(hilt);
        toolGroup.add(crossguard);
        group.add(toolGroup);
    } else if (entity.type === "soldier" && entity.weapon === "Brute") {
        const bruteGroup = new THREE.Group();
        // Big hulking ugly dumb peasant. Skin color body, loincloth.
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.72, 6), new THREE.MeshStandardMaterial({ color: 0xe0b080 })); // Skin color, very buff
        body.position.y = 0.46; // Shifted up slightly because loincloth is at the bottom
        body.castShadow = true;
        bruteGroup.add(body);
        // Loincloth
        const loincloth = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.2, 6), new THREE.MeshStandardMaterial({ color: teamColor }));
        loincloth.position.y = 0.4;
        bruteGroup.add(loincloth);
        const headGroup = new THREE.Group();
        headGroup.position.y = 1.0;
        // Large ugly head
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), new THREE.MeshStandardMaterial({ color: 0xe0b080 }));
        headGroup.add(head);
        // Jutting jaw
        const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.15), new THREE.MeshStandardMaterial({ color: 0xe0b080 }));
        jaw.position.set(0, -0.1, 0.15);
        headGroup.add(jaw);
        // Heavy brow
        const brow = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.05, 0.1), new THREE.MeshStandardMaterial({ color: 0xc09060 }));
        brow.position.set(0, 0.06, 0.2);
        headGroup.add(brow);
        // Tiny eyes
        const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.02, 4, 4), new THREE.MeshStandardMaterial({ color: 0x111111 }));
        eyeR.position.set(0.06, 0.02, 0.21);
        headGroup.add(eyeR);
        const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.02, 4, 4), new THREE.MeshStandardMaterial({ color: 0x111111 }));
        eyeL.position.set(-0.06, 0.02, 0.21);
        headGroup.add(eyeL);
        bruteGroup.add(headGroup);
        // Huge simple club
        const toolGroup = new THREE.Group();
        toolGroup.name = "weaponGroup";
        toolGroup.position.set(0.45, 0.4, 0.2);
        toolGroup.rotation.x = Math.PI / 3;
        const club = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.03, 0.9, 6), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        club.position.y = 0.4;
        toolGroup.add(club);
        bruteGroup.add(toolGroup);
        bruteGroup.scale.set(1.5, 1.5, 1.5);
        group.add(bruteGroup);
    } else if (entity.type === "soldier") {
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 0.9, 8), new THREE.MeshStandardMaterial({ color: 0x78909c, metalness: 0.6 }));
        body.position.y = 0.45;
        body.castShadow = true;
        group.add(body);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.20, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffcc80 }));
        head.position.y = 1.1;
        group.add(head);
        const shoulders = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.12, 0.26), new THREE.MeshStandardMaterial({ color: teamColor }));
        shoulders.position.set(0, 0.86, 0);
        group.add(shoulders);
        // Layer stack armor configurations
        const hasCloth = entity.armors.includes("cloth");
        const hasLeather = entity.armors.includes("leather");
        const hasChain = entity.armors.includes("chain");
        const hasPlate = entity.armors.includes("plate");
        if (hasCloth) {
            const clothShirt = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.35, 0.65, 8), new THREE.MeshStandardMaterial({ color: 0xffffff }));
            clothShirt.position.y = 0.42;
            group.add(clothShirt);
        }
        if (hasLeather) {
            const bootMat = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
            const leatherBoots = new THREE.Mesh(new THREE.CylinderGeometry(0.30, 0.33, 0.4, 8), bootMat);
            leatherBoots.position.y = 0.2;
            group.add(leatherBoots);
        }
        if (hasChain) {
            const chainMail = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.36, 8), new THREE.MeshStandardMaterial({ color: 0x455a64, metalness: 0.8 }));
            chainMail.position.y = 0.65;
            group.add(chainMail);
        }
        if (hasPlate) {
            const helm = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.26, 8), new THREE.MeshStandardMaterial({ color: 0xb0bec5, metalness: 0.9 }));
            helm.position.y = 1.25;
            group.add(helm);
            const plume = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.32, 5), new THREE.MeshStandardMaterial({ color: teamColor }));
            plume.position.set(0, 1.45, -0.08);
            plume.rotation.x = -0.4;
            group.add(plume);
        }
        const weaponMesh = buildWeaponMesh(entity.weapon);
        if (weaponMesh) {
            weaponMesh.name = "weaponGroup";
            weaponMesh.position.set(0.42, 0.6, 0.2);
            group.add(weaponMesh);
        }
        if (entity.hasHorse) {
            const horseGeo = new THREE.BoxGeometry(0.8, 1.2, 1.8);
            const horseMat = new THREE.MeshStandardMaterial({ color: 0x4e342e });
            const horseBody = new THREE.Mesh(horseGeo, horseMat);
            horseBody.position.set(0, 0.6, 0);
            group.add(horseBody);
            const horseHeadGeo = new THREE.BoxGeometry(0.4, 0.5, 0.6);
            const horseHead = new THREE.Mesh(horseHeadGeo, horseMat);
            horseHead.position.set(0, 1.3, 1.0);
            group.add(horseHead);
            // shift human parts up
            group.children.forEach(c => {
                if (c !== horseBody && c !== horseHead) {
                    c.position.y += 0.8;
                }
            });
        }
    } else if (entity.type === "siegeshop") {
        const bodyGeo = new THREE.BoxGeometry(5.0, 2.5, 5.0);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 1.25;
        body.castShadow = true;
        body.receiveShadow = true;
        group.add(body);
        const roofGeo = new THREE.ConeGeometry(3.8, 1.5, 4);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x3e2723 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = 3.25;
        roof.rotation.y = Math.PI / 4;
        roof.castShadow = true;
        group.add(roof);
        const gear = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.2, 8), new THREE.MeshStandardMaterial({ color: 0x90a4ae }));
        gear.position.set(2.6, 1.0, 0);
        gear.rotation.z = Math.PI / 2;
        group.add(gear);
    } else if (entity.type === "siege_shield") {
        const shieldBody = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.0, 0.5), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
        shieldBody.position.y = 1.0;
        shieldBody.castShadow = true;
        group.add(shieldBody);
        const support = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.5, 1.0), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        support.position.set(0, 0.75, -0.6);
        support.rotation.x = -Math.PI / 6;
        group.add(support);
    } else if (entity.type === "siege_ballista") {
        const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 1.8), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        chassis.position.y = 0.4;
        chassis.castShadow = true;
        group.add(chassis);
        const bow = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.2, 0.2), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        bow.name = "ballistaBow";
        bow.position.set(0, 0.8, 0.6);
        group.add(bow);
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 1.8), new THREE.MeshStandardMaterial({ color: 0x4e342e }));
        stock.position.set(0, 0.7, 0);
        group.add(stock);
        const wheels = [ [-0.7, 0.6], [0.7, 0.6], [-0.7, -0.6], [0.7, -0.6] ];
        wheels.forEach(pos => {
            const w = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.15, 8), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
            w.position.set(pos[0], 0.3, pos[1]);
            w.rotation.z = Math.PI / 2;
            group.add(w);
        });
    } else if (entity.type === "siege_catapult") {
        const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 2.2), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        chassis.position.y = 0.5;
        chassis.castShadow = true;
        group.add(chassis);
        const armGroup = new THREE.Group();
        armGroup.name = "catapultArmGroup";
        armGroup.position.set(0, 0.8, -0.2); // pivot point
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.8, 0.2), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        arm.position.set(0, 0.9, 0.0);
        armGroup.add(arm);
        const bowl = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 0.6), new THREE.MeshStandardMaterial({ color: 0x4e342e }));
        bowl.position.set(0, 1.8, 0.0);
        armGroup.add(bowl);
        armGroup.rotation.x = Math.PI / 6;
        group.add(armGroup);
        const wheels = [ [-0.8, 0.8], [0.8, 0.8], [-0.8, -0.8], [0.8, -0.8] ];
        wheels.forEach(pos => {
            const w = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.2, 8), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
            w.position.set(pos[0], 0.4, pos[1]);
            w.rotation.z = Math.PI / 2;
            group.add(w);
        });
    } else if (entity.type === "siege_mangonel") {
        const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 2.2), new THREE.MeshStandardMaterial({ color: 0x4a3219 }));
        chassis.position.y = 0.5;
        chassis.castShadow = true;
        group.add(chassis);
        const armGroup = new THREE.Group();
        armGroup.name = "catapultArmGroup";
        armGroup.position.set(0, 0.8, -0.2); // pivot point
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.8, 0.2), new THREE.MeshStandardMaterial({ color: 0x2e1a0f }));
        arm.position.set(0, 0.9, 0.0);
        armGroup.add(arm);
        const sling = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.4), new THREE.MeshStandardMaterial({ color: 0x8b4513 }));
        sling.position.set(0, 1.8, 0.2);
        armGroup.add(sling);
        const rope1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4), new THREE.MeshStandardMaterial({ color: 0xddccaa }));
        rope1.position.set(0.2, 1.8, 0.1);
        rope1.rotation.x = Math.PI/4;
        armGroup.add(rope1);
        const rope2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4), new THREE.MeshStandardMaterial({ color: 0xddccaa }));
        rope2.position.set(-0.2, 1.8, 0.1);
        rope2.rotation.x = Math.PI/4;
        armGroup.add(rope2);
        armGroup.rotation.x = Math.PI / 6;
        group.add(armGroup);
        const wheels = [ [-0.8, 0.8], [0.8, 0.8], [-0.8, -0.8], [0.8, -0.8] ];
        wheels.forEach(pos => {
            const w = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.2, 8), new THREE.MeshStandardMaterial({ color: 0x2e1a0f }));
            w.position.set(pos[0], 0.4, pos[1]);
            w.rotation.z = Math.PI / 2;
            group.add(w);
        });
    } else if (entity.type === "siege_trebuchet") {
        const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 2.6), new THREE.MeshStandardMaterial({ color: 0x4e342e }));
        chassis.position.y = 0.6;
        chassis.castShadow = true;
        group.add(chassis);
        const frame1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.0, 0.3), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        frame1.position.set(-0.6, 2.0, 0);
        group.add(frame1);
        const frame2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.0, 0.3), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
        frame2.position.set(0.6, 2.0, 0);
        group.add(frame2);
        const armGroup = new THREE.Group();
        armGroup.name = "catapultArmGroup";
        armGroup.position.set(0, 3.2, 0); // High pivot point
        // Counterweight
        const counterweight = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.8), new THREE.MeshStandardMaterial({ color: 0x212121 }));
        counterweight.position.set(0, -0.6, 0.6);
        armGroup.add(counterweight);
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.5, 0.2), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
        arm.position.set(0, 1.2, -0.1);
        armGroup.add(arm);
        const sling = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.4), new THREE.MeshStandardMaterial({ color: 0x795548 }));
        sling.position.set(0, 3.0, -0.2);
        armGroup.add(sling);
        armGroup.rotation.x = -Math.PI / 6;
        group.add(armGroup);
        const wheels = [ [-0.9, 1.0], [0.9, 1.0], [-0.9, -1.0], [0.9, -1.0] ];
        wheels.forEach(pos => {
            const w = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.25, 8), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
            w.position.set(pos[0], 0.5, pos[1]);
            w.rotation.z = Math.PI / 2;
            group.add(w);
        });
    }
    if (BUILDING_TYPES[entity.type] && entity.type !== "wall_column" && entity.type !== "gatehouse" && entity.type !== "keep") {
        const config = BUILDING_TYPES[entity.type];
        const w = config.dimX !== undefined ? config.dimX : (config.radius || 0.5) * 2;
        const d = config.dimZ !== undefined ? config.dimZ : (config.radius || 0.5) * 2;
        // Exact footprint bounding box
        const foundation = new THREE.Mesh(
            new THREE.BoxGeometry(w - 0.1, 0.05, d - 0.1),
            new THREE.MeshStandardMaterial({ color: 0x5a5a5a, roughness: 1.0 })
        );
        foundation.position.y = 0.025;
        foundation.receiveShadow = true;
        group.add(foundation);
    }
    return group;
}
// --- WEAPON MESH BUILDER ---
function buildWeaponMesh(weaponType) {
    if (!weaponType) return null;
    const wGroup = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 });
    const steelMat = new THREE.MeshStandardMaterial({ color: 0xcfd8dc, metalness: 0.85 });
    switch(weaponType) {
        case "Spear": {
            const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.5, 5), woodMat);
            shaft.rotation.x = Math.PI / 2;
            shaft.position.z = 0.5;
            wGroup.add(shaft);
            const head = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.4, 5), steelMat);
            head.rotation.x = Math.PI / 2;
            head.position.z = 1.85;
            wGroup.add(head);
            break;
        }
        case "Pike": {
            const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 4.2, 5), woodMat);
            shaft.rotation.x = Math.PI / 2;
            shaft.position.z = 1.3;
            wGroup.add(shaft);
            const head = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.5, 5), steelMat);
            head.rotation.x = Math.PI / 2;
            head.position.z = 3.5;
            wGroup.add(head);
            break;
        }
        case "Halberd": {
            const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.6, 5), woodMat);
            shaft.rotation.x = Math.PI / 2;
            shaft.position.z = 0.6;
            wGroup.add(shaft);
            const headGroup = new THREE.Group();
            headGroup.position.set(0, 0, 1.8);
            headGroup.rotation.x = Math.PI / 2;
            const tip = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.4, 4), steelMat);
            tip.position.y = 0.2;
            headGroup.add(tip);
            const blade = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.03), steelMat);
            blade.position.set(0.14, 0, 0);
            headGroup.add(blade);
            wGroup.add(headGroup);
            break;
        }
        case "Poleaxe": {
            const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 2.1, 5), woodMat);
            shaft.rotation.x = Math.PI / 2;
            shaft.position.z = 0.45;
            wGroup.add(shaft);
            const headGroup = new THREE.Group();
            headGroup.position.set(0, 0, 1.45);
            headGroup.rotation.x = Math.PI / 2;
            const blade = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.05), steelMat);
            blade.position.set(0.12, 0, 0);
            headGroup.add(blade);
            const hammer = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.1), steelMat);
            hammer.position.set(-0.08, 0, 0);
            headGroup.add(hammer);
            wGroup.add(headGroup);
            break;
        }
        case "Axe": {
            const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 5), woodMat);
            shaft.position.y = 0.2;
            wGroup.add(shaft);
            const blade = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.03), steelMat);
            blade.position.set(0.12, 0.5, 0);
            wGroup.add(blade);
            break;
        }
        case "Sword": {
            const blade = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.1, 0.015), steelMat);
            blade.position.y = 0.55;
            wGroup.add(blade);
            const guard = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.04), steelMat);
            guard.position.y = 0.05;
            wGroup.add(guard);
            const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.2, 5), woodMat);
            grip.position.y = -0.08;
            wGroup.add(grip);
            break;
        }
        case "Mace": {
            const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 5), woodMat);
            grip.position.y = 0.2;
            wGroup.add(grip);
            const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 6, 6), steelMat);
            head.position.y = 0.7;
            wGroup.add(head);
            for (let i = 0; i < 6; i++) {
                const sp = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 4), steelMat);
                const angle = (i / 6) * Math.PI * 2;
                sp.position.set(Math.cos(angle) * 0.15, 0.7, Math.sin(angle) * 0.15);
                sp.rotation.z = angle - Math.PI / 2;
                wGroup.add(sp);
            }
            break;
        }
        case "Short Bow": {
            const bowGroup = new THREE.Group();
            bowGroup.rotation.y = -Math.PI / 2;
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, -0.6, 0), new THREE.Vector3(0.24, -0.2, 0),
                new THREE.Vector3(0.24, 0.2, 0), new THREE.Vector3(0, 0.6, 0)
            ]);
            const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 10, 0.024, 4, false), woodMat);
            bowGroup.add(tube);
            const string = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 1.2, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            string.name = "bowString";
            bowGroup.add(string);
            // Loaded arrow
            const arrowGroup = new THREE.Group();
            arrowGroup.name = "loadedArrow";
            arrowGroup.visible = false; // Hidden until winding up
            const arrowShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.7, 4), new THREE.MeshBasicMaterial({ color: 0x4e342e }));
            arrowShaft.rotation.z = -Math.PI / 2; // Point along local X
            arrowShaft.position.x = 0.35;
            arrowGroup.add(arrowShaft);
            const arrowHead = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.06, 4), new THREE.MeshBasicMaterial({ color: 0x90a4ae }));
            arrowHead.rotation.z = -Math.PI / 2;
            arrowHead.position.x = 0.7;
            arrowGroup.add(arrowHead);
            bowGroup.add(arrowGroup);
            wGroup.add(bowGroup);
            break;
        }
        case "Longbow": {
            const bowGroup = new THREE.Group();
            bowGroup.rotation.y = -Math.PI / 2;
            bowGroup.position.y = 0.45;
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, -1.0, 0), new THREE.Vector3(0.36, -0.3, 0),
                new THREE.Vector3(0.36, 0.3, 0), new THREE.Vector3(0, 1.0, 0)
            ]);
            const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.028, 4, false), woodMat);
            bowGroup.add(tube);
            const string = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 2.0, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            string.name = "bowString";
            bowGroup.add(string);
            // Loaded arrow
            const arrowGroup = new THREE.Group();
            arrowGroup.name = "loadedArrow";
            arrowGroup.visible = false;
            const arrowShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.9, 4), new THREE.MeshBasicMaterial({ color: 0x4e342e }));
            arrowShaft.rotation.z = -Math.PI / 2;
            arrowShaft.position.x = 0.45;
            arrowGroup.add(arrowShaft);
            const arrowHead = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.08, 4), new THREE.MeshBasicMaterial({ color: 0x90a4ae }));
            arrowHead.rotation.z = -Math.PI / 2;
            arrowHead.position.x = 0.9;
            arrowGroup.add(arrowHead);
            bowGroup.add(arrowGroup);
            wGroup.add(bowGroup);
            break;
        }
        case "Crossbow": {
            const cbGroup = new THREE.Group();
            const stock = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.8), woodMat);
            stock.position.z = 0.1;
            cbGroup.add(stock);
            const arms = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.03, 0.04), woodMat);
            arms.position.z = 0.42;
            cbGroup.add(arms);
            const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.1, 0.04), steelMat);
            trigger.position.set(0, -0.06, -0.1);
            cbGroup.add(trigger);
            // Loaded bolt
            const boltGroup = new THREE.Group();
            boltGroup.name = "loadedBolt";
            boltGroup.visible = false;
            const boltShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 4), new THREE.MeshBasicMaterial({ color: 0x4e342e }));
            boltShaft.rotation.x = Math.PI / 2;
            boltShaft.position.set(0, 0.04, 0.2);
            boltGroup.add(boltShaft);
            const boltHead = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.05, 4), new THREE.MeshBasicMaterial({ color: 0x90a4ae }));
            boltHead.rotation.x = Math.PI / 2;
            boltHead.position.set(0, 0.04, 0.45);
            boltGroup.add(boltHead);
            cbGroup.add(boltGroup);
            wGroup.add(cbGroup);
            break;
        }
    }
    return wGroup;
}
// --- CONVERT PEASANT TO SOLDIER MESH ---
function updateUnitToSoldierMesh(entity) {
    if (entity.mesh) scene.remove(entity.mesh);
    entity.mesh = buildEntityMesh(entity);
    entity.mesh.position.set(entity.x, entity.y, entity.z);
    scene.add(entity.mesh);
    const ringGeo = new THREE.RingGeometry(entity.radius * 1.25, entity.radius * 1.35, 16);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
        color: entity.faction === "red" ? 0x00ff00 : 0xff0000,
        side: THREE.DoubleSide,
        visible: selectedEntities.includes(entity)
    });
    entity.selectionRing = new THREE.Mesh(ringGeo, ringMat);
    entity.selectionRing.position.y = 0.05;
    entity.mesh.add(entity.selectionRing);
}
// --- CAMERA FUNCTIONS ---
function updateCameraOffset() {
    const baseRadius = 43.0116; // sqrt(35^2 + 25^2)
    const defaultAngle = 0.9505; // atan2(35, 25)
    const verticalAngle = Math.PI / 2 - 0.01;
    const currentAngle = THREE.MathUtils.lerp(defaultAngle, verticalAngle, customCameraAngle);
    const horizontalAngle = Math.atan2(cameraOffset.x, cameraOffset.z);
    const radiusXZ = Math.cos(currentAngle) * baseRadius;
    cameraOffset.x = Math.sin(horizontalAngle) * radiusXZ;
    cameraOffset.y = Math.sin(currentAngle) * baseRadius;
    cameraOffset.z = Math.cos(horizontalAngle) * radiusXZ;
    updateCameraPosition();
}
function updateCameraPosition() {
    camera.position.copy(cameraLookAt).add(cameraOffset.clone().multiplyScalar(zoomFactor));
    const tHeight = getTerrainHeight(camera.position.x, camera.position.z);
    if (camera.position.y < tHeight + 1.5) {
        camera.position.y = tHeight + 1.5;
    }
    camera.lookAt(cameraLookAt);
}
// --- PATHFINDING ---
const pathGrid = new Array(300 * 300);
const clearanceGrid = new Uint8Array(90000);
const rampGrid = new Uint8Array(90000);
const regionGrid = new Uint16Array(90000);
const keepRegions = new Set();
class BinaryHeap {
    constructor(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }
    push(element) {
        this.content.push(element);
        element.heapIndex = this.content.length - 1;
        this.bubbleUp(this.content.length - 1);
    }
    pop() {
        const result = this.content[0];
        const end = this.content.pop();
        if (this.content.length > 0) {
            this.content[0] = end;
            end.heapIndex = 0;
            this.sinkDown(0);
        }
        return result;
    }
    remove(node) {
        const i = node.heapIndex;
        if (this.content[i] !== node) return;
        const end = this.content.pop();
        if (i === this.content.length) return;
        this.content[i] = end;
        end.heapIndex = i;
        this.bubbleUp(i);
        this.sinkDown(i);
    }
    rescoreElement(node) {
        this.bubbleUp(node.heapIndex);
    }
    size() {
        return this.content.length;
    }
    bubbleUp(n) {
        const element = this.content[n];
        const score = this.scoreFunction(element);
        while (n > 0) {
            const parentN = Math.floor((n + 1) / 2) - 1;
            const parent = this.content[parentN];
            if (score >= this.scoreFunction(parent)) break;
            this.content[parentN] = element;
            element.heapIndex = parentN;
            this.content[n] = parent;
            parent.heapIndex = n;
            n = parentN;
        }
    }
    sinkDown(n) {
        const length = this.content.length;
        const element = this.content[n];
        const elemScore = this.scoreFunction(element);
        while (true) {
            const child2N = (n + 1) * 2;
            const child1N = child2N - 1;
            let swap = null;
            let child1Score;
            if (child1N < length) {
                const child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);
                if (child1Score < elemScore) swap = child1N;
            }
            if (child2N < length) {
                const child2 = this.content[child2N];
                const child2Score = this.scoreFunction(child2);
                if (child2Score < (swap == null ? elemScore : child1Score)) swap = child2N;
            }
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap].heapIndex = n;
                this.content[swap] = element;
                element.heapIndex = swap;
                n = swap;
            } else {
                break;
            }
        }
    }
}
function updateRegionGrid() {
    regionGrid.fill(0);
    keepRegions.clear();
    
    const visitedSurfaces = new Uint8Array(90000 * 2);
    
    let currentRegion = 1;
    const dirs = [
        {dx: -1, dz: 0}, {dx: 1, dz: 0}, {dx: 0, dz: -1}, {dx: 0, dz: 1},
        {dx: -1, dz: -1}, {dx: 1, dz: -1}, {dx: -1, dz: 1}, {dx: 1, dz: 1},
        {dx: 0, dz: 0} // Elevator
    ];

    for (let i = 0; i < 90000; i++) {
        if (regionGrid[i] !== 0) continue;
        
        const sx = i % 300;
        const sz = Math.floor(i / 300);
        
        let sSurfs = pathGrid[sz * 300 + sx];
        if (sSurfs && (sSurfs.length === 0 || sSurfs.isBuilding)) {
            regionGrid[i] = 65535; // Impassable marker
            continue;
        }

        let sy = sSurfs ? sSurfs[0] : getTerrainHeight(sx - 150, sz - 150);

        const queue = [{x: sx, y: sy, z: sz}];
        regionGrid[i] = currentRegion;
        visitedSurfaces[i * 2 + 0] = 1;
        let head = 0;
        
        while (head < queue.length) {
            const curr = queue[head++];
            
            for (let d = 0; d < dirs.length; d++) {
                const nx = curr.x + dirs[d].dx;
                const nz = curr.z + dirs[d].dz;
                
                if (nx < 0 || nx >= 300 || nz < 0 || nz >= 300) continue;
                const nIdx = nz * 300 + nx;
                
                let nSurfs = pathGrid[nIdx];
                if (nSurfs && nSurfs.length === 0) continue; 
                
                if (!nSurfs) nSurfs = [ getTerrainHeight(nx - 150, nz - 150) ];
                let validStep = false;
                let targetY = 0;
                let targetS = 0;
                
                const isElevator = (dirs[d].dx === 0 && dirs[d].dz === 0);
                
                for (let s = 0; s < nSurfs.length; s++) {
                    if (isElevator) {
                        if (Math.abs(nSurfs[s] - curr.y) > 0.1) {
                            validStep = true;
                            targetY = nSurfs[s];
                            targetS = s;
                            break;
                        }
                    } else {
                        const currIdx = curr.z * 300 + curr.x;
                        const isNextRamp = rampGrid[nIdx];
                        const isCurrRamp = rampGrid[currIdx];
                        
                        let isValidRampDir = true;
                        if (isNextRamp && !isCurrRamp) {
                            if (isNextRamp === 1 && Math.abs(dirs[d].dz) > 0) isValidRampDir = false;
                            if (isNextRamp === 2 && Math.abs(dirs[d].dx) > 0) isValidRampDir = false;
                        } else if (!isNextRamp && isCurrRamp) {
                            if (isCurrRamp === 1 && Math.abs(dirs[d].dz) > 0) isValidRampDir = false;
                            if (isCurrRamp === 2 && Math.abs(dirs[d].dx) > 0) isValidRampDir = false;
                        }
                        
                        let effectiveMaxJump = (isCurrRamp === 1 || isCurrRamp === 2 || isNextRamp === 1 || isNextRamp === 2) ? 1.6 : 0.8;
                        const currSurfs = pathGrid[currIdx];
                        if (currSurfs && nSurfs) {
                            if ((currSurfs.isTower && nSurfs.isWall) || (currSurfs.isWall && nSurfs.isTower)) {
                                effectiveMaxJump = 999.0;
                            }
                        }
                        
                        if (isValidRampDir && Math.abs(nSurfs[s] - curr.y) <= effectiveMaxJump) {
                            validStep = true;
                            targetY = nSurfs[s];
                            targetS = s;
                            break;
                        }
                    }
                }
                
                if (!validStep) continue;
                
                if (visitedSurfaces[nIdx * 2 + targetS] === 1) continue;
                
                if (dirs[d].dx !== 0 && dirs[d].dz !== 0) {
                    const checkBlock = (cx, cz, cy) => {
                        let surfs = pathGrid[cz * 300 + cx];
                        if (!surfs) surfs = [ getTerrainHeight(cx - 150, cz - 150) ];
                        return !surfs.some(s => Math.abs(s - cy) <= 0.8);
                    };
                    const b1 = checkBlock(nx, curr.z, curr.y);
                    const b2 = checkBlock(curr.x, nz, curr.y);
                    
                    const isWallJump = curr.y > getTerrainHeight(curr.x - 150, curr.z - 150) + 0.5 && targetY > getTerrainHeight(nx - 150, nz - 150) + 0.5;
                    if ((b1 || b2) && !isWallJump) continue;
                }
                
                regionGrid[nIdx] = currentRegion;
                visitedSurfaces[nIdx * 2 + targetS] = 1;
                queue.push({x: nx, y: targetY, z: nz});
            }
        }
        currentRegion++;
    }

    const keeps = entities.filter(e => e.type === "keep" && e.state !== "dead" && !e.isPlanned);
    keeps.forEach(k => {
        const r = (k.radius || 0.5) + 1.0;
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
            const px = Math.max(0, Math.min(299, Math.round(k.x + Math.cos(angle) * r) + 150));
            const pz = Math.max(0, Math.min(299, Math.round(k.z + Math.sin(angle) * r) + 150));
            const rId = regionGrid[pz * 300 + px];
            if (rId !== 0 && rId !== 65535) keepRegions.add(rId);
        }
    });
}
function updatePathGrid() {
    pathGrid.fill(null);
    rampGrid.fill(0);
    const allObstacles = entities.filter(e => (e.baseSpeed === 0 && e.type !== "farm" && e.type !== "mine") || e.type === "tree" || e.type === "iron" || e.type === "stone" || e.type === "gold");
    allObstacles.forEach(e => {
        if (e.state === "dead" || !e.mesh || !e.mesh.visible || (e.isPlanned && e.resourcesDelivered === 0)) return;
        const hw = (e.dimX || 1) / 2;
        const hd = (e.dimZ || 1) / 2;
        if (e.type !== "wall_column" && e.type !== "gatehouse" && e.type !== "tower" && e.type !== "wall_ramp" && e.type !== "tower_tile") {
            const isBuilding = e.type !== "tree" && e.type !== "iron" && e.type !== "stone" && e.type !== "gold";
            if (isBuilding) {
                // Buildings use box collision
                const bHwX = (e.dimX !== undefined ? e.dimX : ((e.radius || 0.5) * 2)) / 2;
                const bHwZ = (e.dimZ !== undefined ? e.dimZ : ((e.radius || 0.5) * 2)) / 2;
                const hwX = bHwX;
                const hwZ = bHwZ;
                const minX = Math.max(0, Math.floor(e.x - hwX + 150));
                const maxX = Math.min(299, Math.ceil(e.x + hwX + 150));
                const minZ = Math.max(0, Math.floor(e.z - hwZ + 150));
                const maxZ = Math.min(299, Math.ceil(e.z + hwZ + 150));
                for (let x = minX; x <= maxX; x++) {
                    for (let z = minZ; z <= maxZ; z++) {
                        const cx = x - 150;
                        const cz = z - 150;
                        let inBounds = false;
                        if (e.type === "keep") {
                            const rdx = cx - Math.round(e.x);
                            const rdz = cz - Math.round(e.z);
                            inBounds = Math.abs(rdx) <= 1 && Math.abs(rdz) <= 1; // 3x3 core
                            if (Math.abs(rdx) === 2 && Math.abs(rdz) === 0) inBounds = true;
                            if (Math.abs(rdx) === 0 && Math.abs(rdz) === 2) inBounds = true;
                        } else {
                            inBounds = Math.abs(cx - e.x) <= hwX && Math.abs(cz - e.z) <= hwZ;
                        }
                        if (inBounds) {
                            if (e.type === "keep") {
                                const dx = cx - Math.round(e.x);
                                const dz = cz - Math.round(e.z);
                                const isFlipped = (e.mesh && Math.abs(e.mesh.rotation.y - Math.PI) < 0.1);
                                const redDx = isFlipped ? -2 : 2;
                                const roofHeight = e.y + e.height;
                                const idx = z * 300 + x;
                                if (dx === redDx && dz === 0 && e.isOpen !== false) {
                                    pathGrid[idx] = [ getTerrainHeight(cx, cz), roofHeight ];
                                    pathGrid[idx].isBuilding = true;
                                    pathGrid[idx].isWall = true;
                                    pathGrid[idx].isKeep = true;
                                    rampGrid[idx] = 3;
                                } else {
                                    pathGrid[idx] = [ roofHeight ];
                                    pathGrid[idx].isBuilding = true;
                                    pathGrid[idx].isWall = true;
                                    pathGrid[idx].isKeep = true;
                                }
                            } else {
                                const idx = z * 300 + x;
                                pathGrid[idx] = [ e.y + (e.height || 2.0) ];
                                pathGrid[idx].isBuilding = true;
                            }
                        }
                    }
                }
            } else {
                if (e.type === "tree") {
                    // Decouple organic visual placement from pathing grid by snapping collision to single nearest grid cell
                    const px = Math.round(e.x) + 150;
                    const pz = Math.round(e.z) + 150;
                    if (px >= 0 && px < 300 && pz >= 0 && pz < 300) {
                        pathGrid[pz * 300 + px] = []; // Blocked completely
                        pathGrid[pz * 300 + px].isTree = true;
                    }
                } else {
                    // Other natural resources use cylinder collision
                    const r = (e.radius || 0.5) + 0.45;
                    const minX = Math.max(0, Math.floor(e.x - r + 150));
                    const maxX = Math.min(299, Math.ceil(e.x + r + 150));
                    const minZ = Math.max(0, Math.floor(e.z - r + 150));
                    const maxZ = Math.min(299, Math.ceil(e.z + r + 150));
                    for (let x = minX; x <= maxX; x++) {
                        for (let z = minZ; z <= maxZ; z++) {
                            const cx = x - 150;
                            const cz = z - 150;
                            if (Math.hypot(cx - e.x, cz - e.z) < r) {
                                pathGrid[z * 300 + x] = []; // Blocked completely
                            }
                        }
                    }
                }
            }
        } else {
            if (e.type === "tower" && e.footprint) {
                e.footprint.forEach(p => {
                    const x = Math.round(p.x) + 150;
                    const z = Math.round(p.z) + 150;
                    if (x >= 0 && x < 300 && z >= 0 && z < 300) {
                        const idx = z * 300 + x;
                        let currentSurfs = pathGrid[idx] || [];
                        let lowerY = e.y + 2.0;
                        let roofY = e.y + e.height;
                        if (!currentSurfs.includes(lowerY)) currentSurfs.push(lowerY);
                        if (!currentSurfs.includes(roofY)) currentSurfs.push(roofY);
                        rampGrid[idx] = 3; // Elevator!
                        currentSurfs.isBuilding = true;
                        currentSurfs.isWall = true;
                        currentSurfs.isTower = true;
                        pathGrid[idx] = currentSurfs;
                    }
                });
                return; // exit the forEach callback early
            }
            const minX = Math.max(0, Math.round(e.x - hw + 0.01 + 150));
            const maxX = Math.min(299, Math.round(e.x + hw - 0.01 + 150));
            const minZ = Math.max(0, Math.round(e.z - hd + 0.01 + 150));
            const maxZ = Math.min(299, Math.round(e.z + hd - 0.01 + 150));
            for (let x = minX; x <= maxX; x++) {
                for (let z = minZ; z <= maxZ; z++) {
                    const cx = x - 150;
                    const cz = z - 150;
                    let roofHeight = e.y + (e.type === "wall_column" && e.blocks ? e.blocks.length : e.height);
                    if (e.isRamp && (!e.blocks || e.blocks.length === e.originalHeight)) {
                        const dot = (cx - e.x) * e.rampDx + (cz - e.z) * e.rampDz;
                        const extraH = dot * Math.tan(e.rampSlope * Math.PI / 180);
                        roofHeight = e.y + e.exactHeight + extraH;
                        rampGrid[z * 300 + x] = Math.abs(e.rampDx) > 0.5 ? 1 : 2;
                    }
                    const idx = z * 300 + x;
                    let currentSurfs = pathGrid[idx] || [];
                    if (e.type === "keep" || (e.type === "gatehouse" && e.isOpen !== false)) {
                        let groundY = getTerrainHeight(cx, cz);
                        if (!currentSurfs.includes(groundY)) currentSurfs.push(groundY);
                        if (!currentSurfs.includes(roofHeight)) currentSurfs.push(roofHeight);
                        rampGrid[idx] = 3;
                        currentSurfs.isOpenGate = true;
                        if (e.type === "gatehouse") currentSurfs.isTower = true;
                    } else {
                        if (!currentSurfs.includes(roofHeight)) currentSurfs.push(roofHeight);
                    }
                    currentSurfs.isBuilding = true;
                    currentSurfs.isWall = true;
                    pathGrid[idx] = currentSurfs;
                }
            }
        }
    });

    for (let z = 0; z < 300; z++) {
        for (let x = 0; x < 300; x++) {
            const idx = z * 300 + x;
            const cell = pathGrid[idx];
            if (cell && (cell.length === 0 || (cell.isBuilding && !cell.isOpenGate) || cell.isTree)) {
                clearanceGrid[idx] = 0;
            } else {
                let minC = 255;
                if (x > 0) minC = Math.min(minC, clearanceGrid[idx - 1] + 1);
                if (z > 0) minC = Math.min(minC, clearanceGrid[idx - 300] + 1);
                if (x > 0 && z > 0) minC = Math.min(minC, clearanceGrid[idx - 301] + 1);
                if (x < 299 && z > 0) minC = Math.min(minC, clearanceGrid[idx - 299] + 1);
                clearanceGrid[idx] = minC;
            }
        }
    }
    for (let z = 299; z >= 0; z--) {
        for (let x = 299; x >= 0; x--) {
            const idx = z * 300 + x;
            let minC = clearanceGrid[idx];
            if (x < 299) minC = Math.min(minC, clearanceGrid[idx + 1] + 1);
            if (z < 299) minC = Math.min(minC, clearanceGrid[idx + 300] + 1);
            if (x < 299 && z < 299) minC = Math.min(minC, clearanceGrid[idx + 301] + 1);
            if (x > 0 && z < 299) minC = Math.min(minC, clearanceGrid[idx + 299] + 1);
            clearanceGrid[idx] = minC;
        }
    }
}
function smoothPath(path, unit) {
    if (path.length <= 2) return path;
    const smoothed = [path[0]];
    let currentIdx = 0;
    while (currentIdx < path.length - 1) {
        let furthestVisible = currentIdx + 1;
        for (let i = currentIdx + 2; i < Math.min(path.length, currentIdx + 15); i++) {
            let containsElevator = false;
            for (let j = currentIdx; j < i; j++) {
                if (Math.abs(path[j+1].y - path[j].y) >= 0.8) {
                    containsElevator = true;
                    break;
                }
            }
            if (containsElevator) break;
            
            if (hasLineOfSight(path[currentIdx], path[i], unit)) {
                furthestVisible = i;
            }
        }
        smoothed.push(path[furthestVisible]);
        currentIdx = furthestVisible;
    }
    return smoothed;
}
function hasLineOfSight(p1, p2, unit) {
    if (p1.y !== undefined && p2.y !== undefined && Math.abs(p1.y - p2.y) > 0.8) return false;
    const isAssassin = unit && unit.weapon === "Assassin";
    const dist = Math.hypot(p2.x - p1.x, p2.z - p1.z);
    const steps = Math.max(1, Math.ceil(dist * 5));
    let lastY = p1.y;
    for (let i = 1; i < steps; i++) {
        const cx = p1.x + (p2.x - p1.x) * (i / steps);
        const cz = p1.z + (p2.z - p1.z) * (i / steps);
        const fX = Math.round(cx - 0.4) + 150;
        const cX2 = Math.round(cx + 0.4) + 150;
        const fZ = Math.round(cz - 0.4) + 150;
        const cZ2 = Math.round(cz + 0.4) + 150;
        for (let x = fX; x <= cX2; x++) {
            for (let z = fZ; z <= cZ2; z++) {
                if (x >= 0 && x < 300 && z >= 0 && z < 300) {
                    let surfs = pathGrid[z * 300 + x];
                                        if (surfs && surfs.length === 0) {
                        if (!(isAssassin && surfs.isTree)) return false;
                    } else if (surfs && surfs.isBuilding && !surfs.isWall) {
                        return false;
                    } // Blocked by a solid building
                }
            }
        }
        let floorData = getFloorHeight({ y: 10000, radius: unit ? unit.radius : 0.4 }, cx, cz);
        let sy = floorData.y;
        if (floorData.isRamp) {
            const dx = p2.x - p1.x;
            const dz = p2.z - p1.z;
            const dist = Math.hypot(dx, dz);
            if (dist > 0) {
                const dot = Math.abs((dx / dist) * floorData.rampDx + (dz / dist) * floorData.rampDz);
                if (dot < 0.999) {
                    return false; // Cannot string-pull across the side of a ramp
                }
            }
        }
        if (Math.abs(sy - lastY) > 0.8) {
            return false;
        }
        lastY = sy;
    }
    return true;
}
function hasMeleeLineOfSight(p1, p2) {
    const dist = Math.hypot(p2.x - p1.x, p2.z - p1.z);
    const steps = Math.max(1, Math.ceil(dist * 5));
    let lastY = p1.y;
    for (let i = 1; i < steps; i++) {
        const cx = p1.x + (p2.x - p1.x) * (i / steps);
        const cz = p1.z + (p2.z - p1.z) * (i / steps);
        let floorData = getFloorHeight({ y: 10000, radius: p1.radius || 0.4 }, cx, cz);
        let sy = floorData.y;
        if (Math.abs(sy - lastY) > 0.8) {
            let thw, thd;
            if (p2.dimX !== undefined) {
                thw = p2.dimX / 2;
                thd = p2.dimZ / 2;
            } else {
                thw = p2.radius || 0.5;
                thd = p2.radius || 0.5;
            }
            // Add margin to ignore corners of buildings the target or attacker is leaning against
            const isInsideTarget = Math.abs(cx - p2.x) <= (thw + 0.8) && Math.abs(cz - p2.z) <= (thd + 0.8);
            let ahw = p1.radius || 0.5;
            let ahd = p1.radius || 0.5;
            const isInsideAttacker = Math.abs(cx - p1.x) <= (ahw + 0.8) && Math.abs(cz - p1.z) <= (ahd + 0.8);
            if (!isInsideTarget && !isInsideAttacker) {
                return false;
            }
        }
        lastY = sy;
    }
    return true;
}
function hasProjectileLoS(attacker, target) {
    const startY = attacker.y + (attacker.height || 1.0) * 0.7;
    const endY = target.y + (target.height || 1.0) * 0.6;
    const dist = Math.hypot(target.x - attacker.x, target.z - attacker.z);
    if (dist === 0) return true;
    const steps = Math.max(2, Math.ceil(dist * 3));
    for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const cx = attacker.x + (target.x - attacker.x) * t;
        const cz = attacker.z + (target.z - attacker.z) * t;
        const cy = startY + (endY - startY) * t;
        let floorData = getFloorHeight({ y: 10000 }, cx, cz);
        let blockHeight = floorData.y;
        const fX = Math.round(cx);
        const fZ = Math.round(cz);
        let wall = null;
        const cellIdx = Math.max(0, Math.min(SPATIAL_WIDTH - 1, Math.floor((fX + 150) / SPATIAL_CELL_SIZE))) + Math.max(0, Math.min(SPATIAL_HEIGHT - 1, Math.floor((fZ + 150) / SPATIAL_CELL_SIZE))) * SPATIAL_WIDTH;
        const localBuildings = buildingGrid[cellIdx];
        if (localBuildings) {
            for (let b = 0; b < localBuildings.length; b++) {
                const e = localBuildings[b];
                if (!e.isDead) {
                    if (e.type === "wall_column" && e.isCrenulated && e.x === fX && e.z === fZ) {
                        wall = e;
                        break;
                    }
                    if (e.type === "tower" && e.footprint) {
                        const fp = e.footprint.find(p => p.x === fX && p.z === fZ);
                        if (fp && fp.isCren) {
                            wall = e;
                            break;
                        }
                    }
                }
            }
        }
        if (wall) {
            const actualH = wall.y + (wall.blocks ? wall.blocks.length : wall.height);
            blockHeight = Math.max(blockHeight, actualH + 1.0);
        }
        if (blockHeight > cy) {
            return false;
        }
    }
    return true;
}
function getUncrowdedNearbySpot(targetPos, unit, activeUnits) {
    if (!targetPos || targetPos.x === undefined || targetPos.z === undefined) return null;
    const tx = Math.round(targetPos.x);
    const tz = Math.round(targetPos.z);
    let nearbyUnits = [];
    if (activeUnits) {
        for (let i = 0; i < activeUnits.length; i++) {
            const u = activeUnits[i];
            if (u.mesh.visible && !u.isPhasing && u !== unit && u.x !== undefined && u.z !== undefined && Math.hypot(u.x - tx, u.z - tz) < 15) {
                nearbyUnits.push(u);
            }
        }
    } else {
        // Fallback if activeUnits not provided
        for (let i = 0; i < entities.length; i++) {
            const u = entities[i];
            if (u && u.mesh.visible && u !== unit && u.baseSpeed > 0 && !u.isDead && u.x !== undefined && u.z !== undefined && Math.hypot(u.x - tx, u.z - tz) < 15) {
                nearbyUnits.push(u);
            }
        }
    }
    const queue = [{x: tx, z: tz, dist: 0}];
    const visited = new Set([`${tx},${tz}`]);
    let iterations = 0;
    while (queue.length > 0) {
        iterations++;
        if (iterations > 300) return null; // Safe guard against freeze
        const curr = queue.shift();
        if (curr.dist > 0) {
            let crowdCount = 0;
            for (let i = 0; i < nearbyUnits.length; i++) {
                const u = nearbyUnits[i];
                if (Math.hypot(u.x - curr.x, u.z - curr.z) < 1.5) {
                    crowdCount++;
                }
            }
            if (crowdCount < 3) {
                const fHeight = getFloorHeight(unit, curr.x, curr.z);
                return new THREE.Vector3(curr.x, fHeight ? fHeight.y : 0, curr.z);
            }
        }
        if (curr.dist >= 3) continue; // Limit radius to 3 tiles (max ~49 tiles checked)
        const neighbors = [
            {dx: 1, dz: 0}, {dx: -1, dz: 0},
            {dx: 0, dz: 1}, {dx: 0, dz: -1}
        ];
        for (const n of neighbors) {
            const nx = curr.x + n.dx;
            const nz = curr.z + n.dz;
            if (nx < -150 || nx > 149 || nz < -150 || nz > 149) continue;
            const key = `${nx},${nz}`;
            if (!visited.has(key)) {
                visited.add(key);
                const nFloor = getFloorHeight(unit, nx, nz);
                const currFloor = getFloorHeight(unit, curr.x, curr.z);
                if (nFloor && currFloor && Math.abs(nFloor.y - currFloor.y) <= 0.8) {
                    queue.push({x: nx, z: nz, dist: curr.dist + 1});
                }
            }
        }
    }
    return null;
}
function findPath(unit, targetPos, targetRadius = 0) {
    if (unit) unit.pathBudgetExhausted = false;
    const isAssassin = unit && unit.weapon === "Assassin";
    let sx = Math.max(-150, Math.min(149, Math.round(unit.x)));
    let sz = Math.max(-150, Math.min(149, Math.round(unit.z)));
    let ex = Math.max(-150, Math.min(149, Math.round(targetPos.x)));
    let ez = Math.max(-150, Math.min(149, Math.round(targetPos.z)));
    let sy = unit.y;
    let sSurfaces = pathGrid[(sz + 150) * 300 + (sx + 150)];
    if (sSurfaces && (sSurfaces.length === 0 || (!isAssassin && sSurfaces.isBuilding && !sSurfaces.isWall))) {
        let bestDist = Infinity;
        let bestX = sx, bestZ = sz;
        let found = false;
        for(let r=1; r<=15 && !found; r++) {
            for(let dx=-r; dx<=r; dx++) {
                for(let dz=-r; dz<=r; dz++) {
                    if (Math.max(Math.abs(dx), Math.abs(dz)) === r) {
                        const nx = sx + dx, nz = sz + dz;
                        if (nx >= -150 && nx < 150 && nz >= -150 && nz < 150) {
                            let surf = pathGrid[(nz + 150) * 300 + (nx + 150)];
                            if (!surf || (surf.length > 0 && (isAssassin || !(surf.isBuilding && !surf.isWall)))) {
                                let dist = Math.hypot(nx - ex, nz - ez);
                                if (dist < bestDist) {
                                    bestDist = dist;
                                    bestX = nx;
                                    bestZ = nz;
                                    found = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (found) {
            sx = bestX;
            sz = bestZ;
        }
    }
    let tSurfaces = pathGrid[(ez + 150) * 300 + (ex + 150)];
    if (tSurfaces && (tSurfaces.length === 0 || (!isAssassin && tSurfaces.isBuilding && !tSurfaces.isWall))) {
        let bestDist = Infinity;
        let bestX = ex, bestZ = ez;
        let found = false;
        for(let r=1; r<=15 && !found; r++) {
            for(let dx=-r; dx<=r; dx++) {
                for(let dz=-r; dz<=r; dz++) {
                    if (Math.max(Math.abs(dx), Math.abs(dz)) === r) {
                        const nx = ex + dx, nz = ez + dz;
                        if (nx >= -150 && nx < 150 && nz >= -150 && nz < 150) {
                            let surf = pathGrid[(nz + 150) * 300 + (nx + 150)];
                            if (!surf || (surf.length > 0 && (isAssassin || !(surf.isBuilding && !surf.isWall)))) {
                                let dist = Math.hypot(nx - sx, nz - sz);
                                if (dist < bestDist) {
                                    bestDist = dist;
                                    bestX = nx;
                                    bestZ = nz;
                                    found = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (found) {
            ex = bestX;
            ez = bestZ;
        }
        if (!found) return null;
    }
    if (sx === ex && sz === ez && Math.abs(sy - targetPos.y) < 1.5) return [];
    const sIdx = (sz + 150) * 300 + (sx + 150);
    const eIdx = (ez + 150) * 300 + (ex + 150);
    let sRegion = regionGrid[sIdx];
    const eRegion = regionGrid[eIdx];
    if (unit && unit.workerBuilding) {
        const b = unit.workerBuilding;
        if (Math.hypot(b.x - unit.x, b.z - unit.z) <= (b.radius || (Math.max(b.dimX || 1, b.dimZ || 1) / 2)) + 0.5) {
            let foundSafeRegion = false;
            for (let r = 1; r <= 3 && !foundSafeRegion; r++) {
                for (let ox = -r; ox <= r && !foundSafeRegion; ox++) {
                    for (let oz = -r; oz <= r && !foundSafeRegion; oz++) {
                        if (Math.max(Math.abs(ox), Math.abs(oz)) !== r) continue;
                        const nx = sx + ox;
                        const nz = sz + oz;
                        if (nx >= -150 && nx < 150 && nz >= -150 && nz < 150) {
                            const nIdx = (nz + 150) * 300 + (nx + 150);
                            if ((!pathGrid[nIdx] || (isAssassin || !(pathGrid[nIdx].isBuilding && !pathGrid[nIdx].isWall))) && regionGrid[nIdx] !== 65535 && regionGrid[nIdx] !== 0) {
                                sRegion = regionGrid[nIdx];
                                foundSafeRegion = true;
                            }
                        }
                    }
                }
            }
        }
    }
    if (!isAssassin && sRegion !== 0 && sRegion !== 65535 && sRegion !== eRegion) {
        let foundAlternative = false;
        let bestDist = Infinity;
        let bestX = ex;
        let bestZ = ez;
        for (let r = 1; r <= 8 && !foundAlternative; r++) {
            for (let ox = -r; ox <= r; ox++) {
                for (let oz = -r; oz <= r; oz++) {
                    if (Math.max(Math.abs(ox), Math.abs(oz)) !== r) continue;
                    const cx = ex + ox;
                    const cz = ez + oz;
                    if (cx >= -150 && cx < 150 && cz >= -150 && cz < 150) {
                        const idx = (cz + 150) * 300 + (cx + 150);
                        if (regionGrid[idx] === sRegion) {
                            const dist = Math.hypot(ox, oz);
                            if (dist < bestDist) {
                                bestDist = dist;
                                bestX = cx;
                                bestZ = cz;
                                foundAlternative = true;
                            }
                        }
                    }
                }
            }
        }
        if (!foundAlternative || Math.hypot(unit.x - bestX, unit.z - bestZ) < 1.5) {
            return null;
        } else {
            ex = bestX;
            ez = bestZ;
            // Provide a fallback target radius if we found an alternative to prevent failure when the alternative is further than targetRadius
            if (targetRadius > 0) {
                targetRadius = Math.max(targetRadius, Math.hypot(ex - targetPos.x, ez - targetPos.z) + 0.1);
            }
        }
    }
    const nodes = new Map();
    const openHeap = new BinaryHeap(n => n.f);
    const startNode = { x: sx, y: sy, z: sz, g: 0, f: 0, parent: null, closed: false };
    const startKey = (sz + 150) * 300 + (sx + 150) + Math.floor(sy * 10) * 90000;
    nodes.set(startKey, startNode);
    openHeap.push(startNode);
    let maxNodes = 8000;
    let bestNode = startNode;
    let bestH = Infinity;
    while (openHeap.size() > 0) {
        const isBudgetExhausted = window.pathNodesEvaluatedThisFrame !== undefined && window.pathNodesEvaluatedThisFrame > 30000;
        if (--maxNodes <= 0 || isBudgetExhausted) {
            const path = [];
            let curr = bestNode;
            while (curr && curr.parent) {
                path.push(new THREE.Vector3(curr.x, curr.y, curr.z));
                curr = curr.parent;
            }
            if (path.length > 0) {
                if (unit) unit.pathBudgetExhausted = false; // Prevents 2-frame lag loop
                return path.reverse();
            }
            if (isBudgetExhausted && unit) unit.pathBudgetExhausted = true;
            return null;
        }
        if (window.pathNodesEvaluatedThisFrame !== undefined) {
            window.pathNodesEvaluatedThisFrame++;
        }
        const current = openHeap.pop();
        current.closed = true;
        
        const cdx = Math.abs(current.x - ex);
        const cdz = Math.abs(current.z - ez);
        const currentH = (cdx + cdz) - 0.586 * Math.min(cdx, cdz);
        if (currentH < bestH) {
            bestH = currentH;
            bestNode = current;
        }
        
        let yTolerance = Math.max(1.5, targetRadius);
        if (unit && unit.workerBuilding && (unit.workerBuilding.type === "wall_column" || unit.workerBuilding.type === "wall_ramp" || unit.workerBuilding.type === "gatehouse" || unit.workerBuilding.type === "tower")) {
            yTolerance = 12.0;
        }
        if ((targetRadius === 0 && current.x === ex && current.z === ez && Math.abs(current.y - targetPos.y) < 1.0) || (targetRadius > 0 && Math.hypot(current.x - targetPos.x, current.z - targetPos.z) <= targetRadius && Math.abs(current.y - targetPos.y) <= yTolerance)) {
            const path = [];
            let curr = current;
            while (curr.parent) {
                path.push(new THREE.Vector3(curr.x, curr.y, curr.z));
                curr = curr.parent;
            }
            if (targetRadius === 0) {
                if (path.length > 0) {
                    path[0].x = targetPos.x;
                    path[0].z = targetPos.z;
                } else {
                    path.push(new THREE.Vector3(targetPos.x, current.y, targetPos.z));
                }
            } else if (path.length === 0) {
                path.push(new THREE.Vector3(current.x, current.y, current.z));
            }
            path.reverse();
            return smoothPath(path, unit);
        }
        const neighbors = [
            {x: current.x, z: current.z - 1, cost: 1},
            {x: current.x, z: current.z + 1, cost: 1},
            {x: current.x - 1, z: current.z, cost: 1},
            {x: current.x + 1, z: current.z, cost: 1},
            {x: current.x - 1, z: current.z - 1, cost: 1.414},
            {x: current.x + 1, z: current.z - 1, cost: 1.414},
            {x: current.x - 1, z: current.z + 1, cost: 1.414},
            {x: current.x + 1, z: current.z + 1, cost: 1.414},
            {x: current.x, z: current.z, cost: 0.5}
        ];
        for (let i = 0; i < neighbors.length; i++) {
            const nx = neighbors[i].x;
            const nz = neighbors[i].z;
            const dx = nx - current.x;
            const dz = nz - current.z;
            if (nx < -150 || nx >= 150 || nz < -150 || nz >= 150) continue;
            const idx = (nz + 150) * 300 + (nx + 150);
            const currIdx = (current.z + 150) * 300 + (current.x + 150);
            const isNextRamp = rampGrid[idx];
            const isCurrRamp = rampGrid[currIdx];
            if (isNextRamp && !isCurrRamp) {
                if (isNextRamp === 1 && Math.abs(dz) > 0) continue;
                if (isNextRamp === 2 && Math.abs(dx) > 0) continue;
            } else if (!isNextRamp && isCurrRamp) {
                if (isCurrRamp === 1 && Math.abs(dz) > 0) continue;
                if (isCurrRamp === 2 && Math.abs(dx) > 0) continue;
            }
                        let nSurfs = pathGrid[idx];
            if (!nSurfs) {
                nSurfs = [ getTerrainHeight(nx, nz) ];
            }
            if (nSurfs.length === 0) {
                if (unit && unit.weapon === "Assassin" && nSurfs.isTree) {
                    nSurfs = [ getTerrainHeight(nx, nz) ];
                } else {
                    continue;
                }
            }
            for (let s = 0; s < nSurfs.length; s++) {
                const ny = nSurfs[s];
                const isSiege = unit && unit.type && unit.type.startsWith("siege_");
                const isVerticalTeleport = (dx === 0 && dz === 0);
                if (isVerticalTeleport) {
                    if (isSiege) continue; // Siege units cannot use elevators
                    const currentValid = nSurfs.some(y => Math.abs(y - current.y) < 0.1);
                    if (!currentValid) continue;
                    if (ny === current.y) continue;
                } else {
                    if (unit && unit.radius > 0.5 && clearanceGrid[idx] < 2) continue;
                    if (isSiege) {
                        const dist = Math.hypot(dx, dz);
                        let slopeLimit = Math.tan(15 * Math.PI / 180) * dist;
                        const cIdx = (current.z + 150) * 300 + (current.x + 150);
                        const isCBuilding = pathGrid[cIdx] && pathGrid[cIdx].isBuilding;
                        const isNBuilding = pathGrid[idx] && pathGrid[idx].isBuilding;
                        if (isCBuilding || isNBuilding) slopeLimit = Math.max(slopeLimit, 0.8);
                        if (Math.abs(ny - current.y) > slopeLimit) continue;
                    } else {
                        let maxJumpUp = (isCurrRamp === 1 || isCurrRamp === 2 || isNextRamp === 1 || isNextRamp === 2) ? 1.6 : 0.8;
                        const cIdx = (current.z + 150) * 300 + (current.x + 150);
                        const isBuilding = pathGrid[cIdx] && pathGrid[cIdx].isBuilding;
                        const isRoofDrop = (isBuilding && !pathGrid[cIdx].isWall) ? 10.0 : 1.2;
                        let maxJumpDown = (isCurrRamp === 1 || isCurrRamp === 2 || isNextRamp === 1 || isNextRamp === 2) ? 1.6 : isRoofDrop;
                        const currSurfs = pathGrid[cIdx];
                        const nextSurfs = pathGrid[idx];
                        if (currSurfs) {
                            if (nextSurfs) {
                                const cElevated = current.y > getTerrainHeight(current.x, current.z) + 0.5;
                                const nElevated = ny > getTerrainHeight(nx, nz) + 0.5;
                                // Tower/Wall jump hacks removed to force A* to use elevator paths (just like Gatehouses)
                            }
                        }
                        if (unit && unit.weapon === "Assassin") {
                            maxJumpUp = 999;
                            maxJumpDown = 999;
                        }
                        if (ny > current.y && (ny - current.y) > maxJumpUp) continue;
                        if (ny < current.y && (current.y - ny) > maxJumpDown) continue;
                    }
                }
                if (neighbors[i].cost > 1.1) {
                    const checkBlock = (cx, cz, cy) => {
                        let surfs = pathGrid[(cz + 150) * 300 + (cx + 150)];
                        if (!surfs) surfs = [ getTerrainHeight(cx, cz) ];
                        if (surfs.length === 0) return true;
                        const cRamp = rampGrid[(cz + 150) * 300 + (cx + 150)];
                        let jumpUp = (isCurrRamp === 1 || isCurrRamp === 2 || cRamp === 1 || cRamp === 2) ? 1.6 : 0.8;
                        let jumpDown = (isCurrRamp === 1 || isCurrRamp === 2 || cRamp === 1 || cRamp === 2) ? 1.6 : 1.2;
                        if (unit && unit.weapon === "Assassin") {
                            jumpUp = 999;
                            jumpDown = 999;
                        }
                        return !surfs.some(y => (y - cy) <= jumpUp && (cy - y) <= jumpDown);
                    };
                    const b1 = checkBlock(nx, current.z, current.y);
                    const b2 = checkBlock(current.x, nz, current.y);
                    const isWallJump = current.y > getTerrainHeight(current.x, current.z) + 0.5 && ny > getTerrainHeight(nx, nz) + 0.5;
                    if ((b1 || b2) && !isWallJump) continue;
                }
                const key = (nz + 150) * 300 + (nx + 150) + Math.floor(ny * 10) * 90000;
                let neighbor = nodes.get(key);
                if (neighbor && neighbor.closed) continue;
                const gScore = current.g + neighbors[i].cost;
                let visited = !!neighbor;
                if (!visited || gScore < neighbor.g) {
                    if (!visited) {
                        neighbor = { x: nx, y: ny, z: nz };
                        nodes.set(key, neighbor);
                    }
                    neighbor.parent = current;
                    neighbor.g = gScore;
                    const dx = Math.abs(nx - ex);
                    const dz = Math.abs(nz - ez);
                    const hScore = (dx + dz) - 0.586 * Math.min(dx, dz);
                    // Add a small tie-breaker to prefer straight lines
                    neighbor.f = neighbor.g + hScore * 1.001;
                    if (!visited) {
                        openHeap.push(neighbor);
                    } else {
                        openHeap.rescoreElement(neighbor);
                    }
                }
            }
        }
    }
    return null;
}
// --- TERRAIN INTERSECTION (RAYCASTING) ---
function getTerrainIntersection(mouseX, mouseY) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
        (mouseX / window.innerWidth) * 2 - 1,
        -(mouseY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const checkObjects = [terrainMesh];
    entities.forEach(e => {
        if (!e.isPlanned && !e.isDead && (e.type === "wall_column" || e.type === "gatehouse" || e.type === "keep")) {
            checkObjects.push(e.mesh);
        }
    });
    const intersects = raycaster.intersectObjects(checkObjects, true);
    if (intersects.length > 0) {
        const pt = intersects[0].point.clone();
        let root = intersects[0].object;
        while (root.parent && root.parent !== scene) {
            root = root.parent;
        }
        const hitEnt = entities.find(ent => ent.mesh === root);
        if (hitEnt && hitEnt.type !== "tree" && hitEnt.type !== "stone" && hitEnt.type !== "iron" && hitEnt.type !== "gold") {
            const dx = hitEnt.x - pt.x;
            const dz = hitEnt.z - pt.z;
            const dist = Math.hypot(dx, dz);
            if (dist > 0) {
                pt.x += (dx / dist) * 0.1;
                pt.z += (dz / dist) * 0.1;
            }
        }
        return pt;
    }
    return null;
}
// --- SPAWNING LOGIC (PEASANTS) ---
function handleSpawning(deltaTime) {
    entities.forEach(entity => {
        if (entity.state === "dead" || entity.isPlanned || entity.isZzz) return;
        if (entity.type === "keep" || entity.type === "house") {
            const config = BUILDING_TYPES[entity.type];
            entity.spawnedPeasants = entity.spawnedPeasants.filter(p => !p.isDead);
            if (entity.spawnedPeasants.length < config.peasantCap) {
                entity.spawnTimer += deltaTime;
                if (entity.spawnTimer >= 8.0) {
                    let spawnPt = null;
                    for (let attempts = 0; attempts < 10; attempts++) {
                        const angle = Math.random() * Math.PI * 2;
                        const dist = (entity.radius || 0.5) + 1.5;
                        const px = entity.x + Math.cos(angle) * dist;
                        const pz = entity.z + Math.sin(angle) * dist;
                        const cx = Math.floor(px) + 150;
                        const cz = Math.floor(pz) + 150;
                        if (cx >= 0 && cx < 300 && cz >= 0 && cz < 300) {
                            const pg = pathGrid[cz * 300 + cx];
                            if (!pg || (pg.length !== 0 && !pg.isBuilding)) {
                                spawnPt = {x: px, z: pz};
                                break;
                            }
                        }
                    }
                    if (spawnPt) {
                        if (entity.faction === "red") {
                            let totalFood = (resources.premium_food || 0) + (resources.food || 0);
                            let totalPeasants = entities.filter(e => e.faction === "red" && e.type === "peasant" && e.state !== "dead").length;
                            if (totalFood < 10) {
                                if (totalPeasants === 0 && entity.type === "keep") {
                                    // First peasant spawns for free at the Keep
                                    entity.spawnTimer = 0;
                                    const p = createEntity("peasant", entity.faction, spawnPt.x, spawnPt.z, false, entity);
                                    p.state = "wander";
                                    showStatusLog("Emergency Peasant spawned for free at Keep!");
                                    updateUI();
                                } else {
                                    // Insufficient food to spawn peasant
                                    entity.spawnTimer = 7.0; // Retry next second
                                }
                            } else {
                                let needed = 10;
                                let premiumToUse = Math.min(needed, resources.premium_food || 0);
                                if (resources.premium_food !== undefined) {
                                    resources.premium_food -= premiumToUse;
                                }
                                needed -= premiumToUse;
                                resources.food -= needed;
                                entity.spawnTimer = 0;
                                const p = createEntity("peasant", entity.faction, spawnPt.x, spawnPt.z, false, entity);
                                p.state = "wander";
                                showStatusLog("Peasant spawned at " + config.name + "!");
                                updateUI();
                            }
                        } else {
                            // AI factions don't use resources for peasants in the same way, or just bypass it here
                            entity.spawnTimer = 0;
                            const p = createEntity("peasant", entity.faction, spawnPt.x, spawnPt.z, false, entity);
                            p.state = "wander";
                            updateUI();
                        }
                    } else {
                        // Could not find spawn point, try again later
                        entity.spawnTimer = 7.0; // Retry in 1 second
                    }
                }
            } else {
                entity.spawnTimer = 0;
            }
        }
    });
}
// --- PEASANT WANDER AI ---
function handlePeasantWander(entity, deltaTime) {
    if (entity.type !== "peasant" || entity.state !== "wander") return;
    if (!entity.homeBuilding || entity.homeBuilding.state === "dead") return;
    if ((entity.payloadAmount && entity.payloadAmount > 0) || entity.craftedItem) {
        const keep = entities.find(e => e.type === "keep" && e.faction === entity.faction && e.state !== "dead" && !e.isPlanned);
        if (keep) {
            const dx = entity.x - keep.x;
            const dz = entity.z - keep.z;
            const distToKeepTrue = Math.hypot(dx, dz);
            if (distToKeepTrue <= 6.0) {
                if (["food", "wood", "iron", "stone", "gold", "premium_food", "brew", "furniture", "gem"].includes(entity.payloadResource)) {
                    if (entity.faction === "red") resources[entity.payloadResource] = (resources[entity.payloadResource] || 0) + entity.payloadAmount;
                    spawnFloatingText("+" + entity.payloadAmount + " " + (entity.payloadResource || "Wood").toUpperCase(), keep.x, keep.y + 4.0, keep.z, 0xffffff);
                } else if (entity.craftedItem && entity.payloadAmount > 0) {
                    if (entity.faction === "red") {
                        const targetDrop = findNearestMilitaryDropoff(entity.x, entity.z, entity.faction) || keep;
                        if (targetDrop.type === "barracks") {
                            targetDrop.inventory[entity.craftedItem] = (targetDrop.inventory[entity.craftedItem] || 0) + entity.payloadAmount;
                        } else if (targetDrop.type === "loadhouse") {
                            targetDrop.storage = targetDrop.storage || {};
                            targetDrop.storage[entity.craftedItem] = (targetDrop.storage[entity.craftedItem] || 0) + entity.payloadAmount;
                        }
                    }
                    spawnFloatingText("+" + entity.payloadAmount + " " + entity.craftedItem, keep.x, keep.y + 4.0, keep.z, 0xd4af37);
                }
                entity.payloadAmount = 0;
                entity.payloadResource = null;
                entity.targetPosition = null;
                entity.path = null;
            } else {
                if (!entity.targetPosition) {
                    const shiftDist = 5.5; // Offset so it doesn't path into the unpathable center of the keep
                    const tx = keep.x + (dx / distToKeepTrue) * shiftDist;
                    const tz = keep.z + (dz / distToKeepTrue) * shiftDist;
                    entity.targetPosition = new THREE.Vector3(tx, getTerrainHeight(tx, tz), tz);
                    entity.wanderMoveTime = 120.0;
                }
                return;
            }
        }
    }
    entity.wanderTimer -= deltaTime;
    const distToTarget = entity.targetPosition ? Math.hypot(entity.x - entity.targetPosition.x, entity.z - entity.targetPosition.z) : 0;
    // Stop moving if arrived, OR if they've been trying to move for 1.0 seconds to prevent jitter
    if (entity.targetPosition) {
        entity.wanderMoveTime = (entity.wanderMoveTime || 0) - deltaTime;
        if (distToTarget < 0.2 || entity.wanderMoveTime <= 0) {
            entity.targetPosition = null;
            entity.path = null;
        }
    }
    // Pick a new random point within 2 units of home every 1-10s
    if (!entity.targetPosition && entity.wanderTimer <= 0) {
        entity.wanderTimer = 1.0 + Math.random() * 9.0; // 1 to 10 seconds wait
        entity.wanderMoveTime = 1.0; // Walk for exactly 1 second
        let tx, tz;
        if (Math.hypot(entity.x - entity.homeBuilding.x, entity.z - entity.homeBuilding.z) > 5.0) {
            // Wander towards home
            const dx = entity.homeBuilding.x - entity.x;
            const dz = entity.homeBuilding.z - entity.z;
            const dist = Math.hypot(dx, dz);
            // Move up to 2 units towards home
            const moveDist = 1.0 + Math.random() * 1.0;
            tx = entity.x + (dx / dist) * moveDist;
            tz = entity.z + (dz / dist) * moveDist;
        } else {
            // Wander around home
            const wanderRadius = Math.random() * 2.0;
            const angle = Math.random() * Math.PI * 2;
            tx = entity.homeBuilding.x + Math.cos(angle) * wanderRadius;
            tz = entity.homeBuilding.z + Math.sin(angle) * wanderRadius;
        }
        entity.targetPosition = new THREE.Vector3(tx, getTerrainHeight(tx, tz), tz);
    }
}
function buildCarriedMap(faction, skipUnit = null) {
    let carriedMap = new Map();
    const plannedWalls = entities.filter(e => e.faction === faction && e.isPlanned && e.state !== "dead" && !e.isUnreachable && (e.type === "wall_column" || e.type === "gatehouse" || e.type === "wall_ramp" || e.type === "tower"));
    const keep = entities.find(k => k.type === "keep" && k.faction === faction && !k.isPlanned);
    plannedWalls.sort((a, b) => {
        const getCat = (e) => {
            if (e.type === "gatehouse") return 4;
            if (e.type === "wall_ramp") return 3;
            if (e.type === "tower" || e.type === "tower_tile") return 2;
            if (e.type === "wall_column") return 1;
            return 0;
        };
        const cA = getCat(a);
        const cB = getCat(b);
        if (cA !== cB) return cB - cA;
        const idxA = a.commandIndex || 0;
        const idxB = b.commandIndex || 0;
        if (idxA !== idxB) return idxA - idxB;
        if (a.type === "wall_ramp" && b.type === "wall_ramp") return (b.height || 0) - (a.height || 0);
        if (a.type === "wall_column" && b.type === "wall_column" && keep) {
            let dA = Math.hypot(a.x - keep.x, a.z - keep.z);
            let dB = Math.hypot(b.x - keep.x, b.z - keep.z);
            let rA = Math.round(dA);
            let rB = Math.round(dB);
            if (rA !== rB) return rB - rA;
            let angA = Math.atan2(a.z - keep.z, a.x - keep.x);
            let angB = Math.atan2(b.z - keep.z, b.x - keep.x);
            return angA - angB;
        }
        return 0;
    });
    entities.forEach(p => {
        if (p.type === "peasant" && p.faction === faction && p !== skipUnit && (p.state === "constructing_fetching" || p.state === "constructing_delivering") && p.workerBuilding) {
            let cap = (p.payloadAmount || 0) + (p.intendedFetchAmount || 0);
            if (p.workerBuilding.type === "wall_column" || p.workerBuilding.type === "gatehouse" || p.workerBuilding.type === "wall_ramp" || p.workerBuilding.type === "tower") {
                let startIndex = plannedWalls.indexOf(p.workerBuilding);
                if (startIndex !== -1) {
                    let bx = p.workerBuilding.x;
                    let bz = p.workerBuilding.z;
                    for (let i = startIndex; i < plannedWalls.length && cap > 0; i++) {
                        let w = plannedWalls[i];
                        let wType = w.material || ((w.type === "wall_column" || w.type === "gatehouse" || w.type === "wall_ramp" || w.type === "tower") ? "stone" : "wood");
                        let pType = p.payloadResource || p.workerBuilding.material || ((p.workerBuilding.type === "wall_column" || p.workerBuilding.type === "gatehouse" || p.workerBuilding.type === "wall_ramp" || p.workerBuilding.type === "tower") ? "stone" : "wood");
                        if (wType !== pType) continue;
                        let wCost = w.resourcesNeededTotal - w.resourcesDelivered - (carriedMap.get(w) || 0);
                        if (wCost > 0) {
                            let take = Math.min(cap, wCost);
                            carriedMap.set(w, (carriedMap.get(w) || 0) + take);
                            cap -= take;
                        }
                    }
                }
            } else {
                carriedMap.set(p.workerBuilding, (carriedMap.get(p.workerBuilding) || 0) + cap);
            }
        }
    });
    return carriedMap;
}
function findNextChainedWall(unit, isFetching = false, fallbackRef = null) {
    let plannedWalls = entities.filter(e => {
        if (!e.isPlanned || e.isUnreachable || e.faction !== unit.faction) return false;
        if (e.type !== "wall_column" && e.type !== "gatehouse" && e.type !== "wall_ramp" && e.type !== "tower") return false;
        let eType = e.material || ((e.type === "wall_column" || e.type === "gatehouse" || e.type === "wall_ramp" || e.type === "tower") ? "stone" : "wood");
        if (unit.payloadAmount > 0 && eType !== unit.payloadResource) return false;
        return true;
    });
    if (plannedWalls.length > 0) {
        const keep = entities.find(k => k.type === "keep" && k.faction === unit.faction && k.state !== "dead" && !k.isPlanned);
        plannedWalls.sort((a, b) => {
            const getCat = (e) => {
                if (e.type === "gatehouse") return 4;
                if (e.type === "wall_ramp") return 3;
                if (e.type === "tower" || e.type === "tower_tile") return 2;
                if (e.type === "wall_column") return 1;
                return 0;
            };
            const cA = getCat(a);
            const cB = getCat(b);
            if (cA !== cB) return cB - cA;
            const idxA = a.commandIndex || 0;
            const idxB = b.commandIndex || 0;
            if (idxA !== idxB) return idxA - idxB;
            if (a.type === "wall_ramp" && b.type === "wall_ramp") return (b.height || 0) - (a.height || 0);
            if (a.type === "wall_column" && b.type === "wall_column" && keep) {
                let dA = Math.hypot(a.x - keep.x, a.z - keep.z);
                let dB = Math.hypot(b.x - keep.x, b.z - keep.z);
                let rA = Math.round(dA);
                let rB = Math.round(dB);
                if (rA !== rB) return rB - rA;
                let angA = Math.atan2(a.z - keep.z, a.x - keep.x);
                let angB = Math.atan2(b.z - keep.z, b.x - keep.x);
                return angA - angB;
            }
            return 0;
        });
        let currentlyCarriedMap = buildCarriedMap(unit.faction, unit);
        let bestWall = null;
        let bestScore = -Infinity;
        plannedWalls.forEach((w, index) => {
            let needed = w.resourcesNeededTotal - w.resourcesDelivered;
            if (needed <= 0) return;
            let carried = currentlyCarriedMap.get(w) || 0;
            let isClaimed = carried >= needed;
            let refX = unit.workerBuilding ? unit.workerBuilding.x : (fallbackRef ? fallbackRef.x : unit.x);
            let refZ = unit.workerBuilding ? unit.workerBuilding.z : (fallbackRef ? fallbackRef.z : unit.z);
            let distToRef = Math.hypot(w.x - refX, w.z - refZ);
            let distToKeep = keep ? Math.hypot(w.x - keep.x, w.z - keep.z) : 0;
            let score;
            if (distToRef <= 5.0) {
                score = distToKeep - (distToRef / 2.0);
            } else {
                let band = Math.floor(distToRef / 5.0);
                let bandPenalty = band * 1000000;
                let claimPenalty = isClaimed ? 500000 : 0;
                score = distToKeep - bandPenalty - claimPenalty - index - 10000000;
            }
            if (score > bestScore) {
                bestScore = score;
                bestWall = w;
            }
        });
        if (bestWall) {
            unit.workerBuilding = bestWall;
            if (isFetching) {
                unit.state = "constructing_fetching";
                unit.intendedFetchAmount = 20;
                unit.payloadResource = bestWall.material || ((bestWall.type === "wall_column" || bestWall.type === "gatehouse" || bestWall.type === "wall_ramp" || bestWall.type === "tower") ? "stone" : "wood");
                if (keep) {
                    unit.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                }
            } else {
                unit.state = "constructing_delivering";
                unit.targetPosition = new THREE.Vector3(bestWall.x, getTerrainHeight(bestWall.x, bestWall.z), bestWall.z);
            }
            unit.path = null;
            return true;
        }
    }
    return false;
}
function consumeBlueprintResources(b) {
    if (!b.isPlanned) return;
    let rType = b.material || ((b.type === "wall_column" || b.type === "gatehouse" || b.type === "wall_ramp") ? "stone" : "wood");
    b.escrow = 0;
    entities.forEach(p => {
        if (p.workerBuilding === b) {
            p.workerBuilding = null;
            if (p.state === "constructing_fetching" || p.state === "constructing_delivering" || p.state === "constructing") {
                if (p.payloadAmount > 0 && (b.type === "wall_column" || b.type === "gatehouse" || b.type === "wall_ramp" || b.type === "tower" || b.type === "tower_tile") && findNextChainedWall(p, false, b)) {
                    return; // Successfully chained because they still have payload
                }
                if (p.payloadAmount > 0) {
                    p.state = "returning_payload";
                    p.payloadResource = rType;
                    const keep = entities.find(k => k.type === "keep" && k.faction === p.faction && k.state !== "dead" && !k.isPlanned);
                    if (keep) p.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                } else {
                    p.intendedFetchAmount = 0;
                    p.state = "wander";
                }
                p.path = null;
            }
        }
    });
}
function refundBlueprintResources(b) {
    if (!b.isPlanned) return;
    let rType = b.material || ((b.type === "wall_column" || b.type === "gatehouse" || b.type === "wall_ramp") ? "stone" : "wood");
    b.escrow = 0;
    if (b.resourcesDelivered > 0) {
        resources[rType] += b.resourcesDelivered;
        b.resourcesDelivered = 0;
    }
    const config = BUILDING_TYPES[b.type];
    if (config) {
        if (config.goldCost) resources.gold += config.goldCost;
        if (config.ironCost) resources.iron += config.ironCost;
    }
    entities.forEach(p => {
        if (p.workerBuilding === b) {
            p.workerBuilding = null;
            if (p.state === "constructing_fetching" || p.state === "constructing_delivering" || p.state === "constructing") {
                if (p.payloadAmount > 0) {
                    p.state = "returning_payload";
                    p.payloadResource = rType;
                    const keep = entities.find(k => k.type === "keep" && k.faction === p.faction && k.state !== "dead" && !k.isPlanned);
                    if (keep) p.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                } else {
                    p.intendedFetchAmount = 0;
                    p.state = "wander";
                }
                p.path = null;
            }
        }
    });
}
function completeBuilding(b) {
    if (b.replacesEntityId) {
        const oldE = entities.find(e => e.id === b.replacesEntityId);
        if (oldE) {
            let rType = oldE.material || ((oldE.type === "wall_column" || oldE.type === "gatehouse" || oldE.type === "wall_ramp") ? "stone" : "wood");
            let refund = oldE.resourcesNeededTotal ? Math.floor(oldE.resourcesNeededTotal / 2) : 0;
            resources[rType] += refund;
            triggerDeath(oldE, null);
        }
    }
    if (b.replacesEntityIds) {
        b.replacesEntityIds.forEach(id => {
            const oldE = entities.find(e => e.id === id);
            if (oldE) {
                let rType = oldE.material || ((oldE.type === "wall_column" || oldE.type === "gatehouse" || oldE.type === "wall_ramp") ? "stone" : "wood");
                let refund = oldE.resourcesNeededTotal ? Math.floor(oldE.resourcesNeededTotal / 2) : 0;
                resources[rType] += refund;
                triggerDeath(oldE, null);
            }
        });
    }
    b.health = b.maxHealth;
    b.constructionProgress = 1.0;
    needsPathGridUpdate = true;
    consumeBlueprintResources(b);
    b.isPlanned = false;
    if (b.type === "tower" && b.childTiles) {
        b.childTiles.forEach(tileId => {
            let tile = entities.find(e => e.id === tileId);
            if (tile) tile.isPlanned = false;
        });
    }
    if (b.type === "wall_column" || b.type === "gatehouse" || b.type === "tower") {
        scene.remove(b.mesh);
        b.mesh = buildEntityMesh(b);
        b.mesh.position.set(b.x, b.y, b.z);
        scene.add(b.mesh);
    } else {
        b.mesh.traverse(child => {
            if (child.material) {
                child.material.transparent = false;
                child.material.opacity = 1.0;
                child.material.needsUpdate = true;
            }
        });
        b.mesh.scale.y = 1.0;
    }
    buildingGridDirty = true;
    showStatusLog(b.faction.toUpperCase() + " " + b.type + " constructed!");
        updateUI();
}
function getUnitMass(u) {
    let mass = 1.0;
    if (u.type === "peasant") mass = 0.5;
    else if (u.type === "king" || (u.type === "soldier" && u.weapon === "RoyalKnight")) mass = 50.0;
    else if (u.type && u.type.startsWith("siege")) mass = 20.0;
    if (u.armors) {
        for (let i = 0; i < u.armors.length; i++) {
            const aKey = u.armors[i];
            if (aKey === "Cloth" || aKey === "Leather") mass += 1.0;
            else if (aKey === "Chain") mass += 2.0;
            else if (aKey === "Plate") mass += 4.0;
        }
    }
    if (u.hasHorse) mass += 4.0;
    if (u.state === "idle" || u.state === "wander") {
        mass *= 0.0001;
    }
    return mass;
}
function handleMovementAndCollisions(deltaTime, activeUnits, buildings) {
    clearUnitGrid();
    activeUnits.forEach(unit => {
        if (!unit.mesh || (!unit.mesh.visible && unit.weapon !== "Assassin") || unit.state === "dead") return;
        const cellIdx = getSpatialCell(unit.x, unit.z);
        unitGrid[cellIdx].push(unit);
    });
    // 1. Steering
    activeUnits.forEach(unit => {
        if (!unit.mesh || (!unit.mesh.visible && unit.weapon !== "Assassin") || unit.state === "dead") return;
        if (unit.isMounting) {
            unit.mountTimer -= deltaTime;
            
            if (!unit.mountBarGroup) {
                unit.mountBarGroup = new THREE.Group();
                const bg = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.2), new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }));
                const fg = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.2), new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }));
                fg.position.z = 0.01;
                fg.name = "mountProgress";
                unit.mountBarGroup.add(bg);
                unit.mountBarGroup.add(fg);
                unit.mountBarGroup.position.set(0, 2.5, 0);
                unit.mesh.add(unit.mountBarGroup);
            }
            if (unit.mountBarGroup) {
                unit.mountBarGroup.quaternion.copy(camera.quaternion);
                const progress = Math.max(0, 1.0 - (unit.mountTimer / 10.0));
                const fg = unit.mountBarGroup.getObjectByName("mountProgress");
                if (fg) {
                    fg.scale.x = progress;
                    fg.position.x = -0.75 + (0.75 * progress);
                }
            }

            if (unit.mountTimer <= 0) {
                unit.isMounting = false;
                unit.hasHorse = true;
                if (unit.weapon === "RoyalKnight") {
                    unit.speed = 2.0 + 1.625;
                    unit.baseSpeed = unit.speed;
                }
                updateUnitToSoldierMesh(unit);
                window.uiNeedsUpdate = true;
            }
            return; // Skip steering/movement while mounting
        } else if (unit.mountBarGroup) {
            unit.mesh.remove(unit.mountBarGroup);
            unit.mountBarGroup = null;
        }
        
        if (unit.pathCooldown && unit.pathCooldown > 0) unit.pathCooldown--;
        if (unit.state === "constructing_fetching" || unit.state === "constructing_delivering") {
            let isReachable = true;
            if (unit.workerBuilding) {
                const b = unit.workerBuilding;
                const bx = Math.max(0, Math.min(299, Math.round(b.x) + 150));
                const bz = Math.max(0, Math.min(299, Math.round(b.z) + 150));
                isReachable = false;
                for (let ox = -2; ox <= 2 && !isReachable; ox++) {
                    for (let oz = -2; oz <= 2 && !isReachable; oz++) {
                        const cx = Math.max(0, Math.min(299, bx + ox));
                        const cz = Math.max(0, Math.min(299, bz + oz));
                        const rId = regionGrid[cz * 300 + cx];
                        if (keepRegions.has(rId)) isReachable = true;
                    }
                }
            }
            if (!unit.workerBuilding || unit.workerBuilding.state === "dead" || !unit.workerBuilding.isPlanned) {
                let reassigned = false;
                if (unit.payloadAmount > 0 && unit.workerBuilding && (unit.workerBuilding.type === "wall_column" || unit.workerBuilding.type === "gatehouse" || unit.workerBuilding.type === "wall_ramp" || unit.workerBuilding.type === "tower" || unit.workerBuilding.type === "tower_tile")) {
                    reassigned = findNextChainedWall(unit, false);
                }
                if (!reassigned) {
                    if (unit.payloadAmount > 0 || (unit.state === "constructing_fetching" && unit.payloadAmount > 0)) {
                        unit.state = "returning_payload";
                        const keep = entities.find(k => k.type === "keep" && k.faction === unit.faction && k.state !== "dead" && !k.isPlanned);
                        if (keep) unit.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                    } else {
                        if (unit.homeBuilding && unit.homeBuilding.state !== "dead") {
                            unit.state = "going_home";
                            unit.targetPosition = new THREE.Vector3(unit.homeBuilding.x, getTerrainHeight(unit.homeBuilding.x, unit.homeBuilding.z), unit.homeBuilding.z);
                        } else {
                            unit.state = "wander";
                        }
                        unit.payloadAmount = 0;
                    }
                    unit.intendedFetchAmount = 0;
                    unit.workerBuilding = null;
                    unit.path = null;
                }
            } else if (unit.targetPosition) {
                const distToTarget = Math.hypot(unit.x - unit.targetPosition.x, unit.z - unit.targetPosition.z);
                if (unit.state === "constructing_fetching" && distToTarget <= 6.0) {
                    let rType = unit.payloadResource || "wood";
                    if (resources[rType] >= unit.intendedFetchAmount) {
                        resources[rType] -= unit.intendedFetchAmount;
                        unit.payloadAmount = (unit.payloadAmount || 0) + unit.intendedFetchAmount;
                    } else {
                        unit.payloadAmount = (unit.payloadAmount || 0) + resources[rType];
                        resources[rType] = 0;
                    }
                    unit.intendedFetchAmount = 0;
                    if (unit.payloadAmount > 0) {
                        unit.state = "constructing_delivering";
                        unit.targetPosition = new THREE.Vector3(unit.workerBuilding.x, getTerrainHeight(unit.workerBuilding.x, unit.workerBuilding.z), unit.workerBuilding.z);
                    } else {
                        unit.state = "wander";
                        unit.workerBuilding = null;
                        unit.targetPosition = null;
                    }
                    unit.path = null;
                } else if (unit.state === "constructing_delivering") {
                    const b = unit.workerBuilding;
                    const reach = b ? (b.radius || Math.max(b.dimX || 1, b.dimZ || 1) / 2) + 2.0 : 2.5;
                    if (distToTarget <= reach) {
                        let amountToDeliver = Math.min(unit.payloadAmount, (b.resourcesNeededTotal || 0) - b.resourcesDelivered);
                        b.resourcesDelivered += amountToDeliver;
                        unit.payloadAmount -= amountToDeliver;
                        if (b.resourcesNeededTotal === 0) {
                            b.constructionProgress += (deltaTime / 10.0);
                        } else {
                            b.constructionProgress = (b.resourcesDelivered / b.resourcesNeededTotal);
                        }
                        b.health = Math.max(1, b.maxHealth * b.constructionProgress);
                    if (b.mesh && b.type !== "wall_column" && b.type !== "gatehouse") {
                        b.mesh.scale.y = Math.max(0.1, Math.min(1.0, b.constructionProgress));
                    }
                    if ((b.resourcesNeededTotal > 0 && b.resourcesDelivered >= b.resourcesNeededTotal) || b.constructionProgress >= 1.0) {
                        completeBuilding(b);
                    } else if (b.resourcesDelivered < b.resourcesNeededTotal) {
                        unit.state = "constructing_fetching";
                        const keep = entities.find(k => k.type === "keep" && k.faction === unit.faction && k.state !== "dead" && !k.isPlanned);
                        if (keep) {
                            unit.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                        }
                        unit.path = null;
                        return;
                    }
                    } else {
                        if (true) {
                            if (unit.pathCooldown <= 0) {
                                const path = findPath(unit, unit.targetPosition, reach - 0.8);
                                if (path) {
                                    unit.path = path;
                                    unit.repathTimer = 0;
                                } else {
                                    unit.pathCooldown = unit.pathBudgetExhausted ? 2 : 60 + Math.floor(Math.random() * 60);
                                }
                            } else {
                                unit.pathCooldown--;
                            }
                        }
                    }
                }
            }
        }
        if (unit.state === "returning_payload") {
            if (unit.targetPosition) {
                const distToTarget = Math.hypot(unit.x - unit.targetPosition.x, unit.z - unit.targetPosition.z);
                if (distToTarget <= 6.0) {
                    let rType = unit.payloadResource || "wood";
                    if (unit.payloadAmount) resources[rType] += unit.payloadAmount;
                    unit.payloadAmount = 0;

                    if (unit.disbandGoods && unit.targetBuilding) {
                        const b = unit.targetBuilding;
                        if (b.state !== "dead" && b.inventory) {
                            if (unit.disbandGoods.weapon) b.inventory[unit.disbandGoods.weapon] = (b.inventory[unit.disbandGoods.weapon] || 0) + 1;
                            if (unit.disbandGoods.armors) {
                                unit.disbandGoods.armors.forEach(a => {
                                    b.inventory[a] = (b.inventory[a] || 0) + 1;
                                });
                            }
                            if (unit.disbandGoods.hasHorse) {
                                b.inventory["horse"] = (b.inventory["horse"] || 0) + 1;
                            }
                        }
                        unit.disbandGoods = null;
                        unit.targetBuilding = null;
                    }

                    if (unit.homeBuilding && unit.homeBuilding.state !== "dead") {
                        unit.state = "going_home";
                        unit.targetPosition = new THREE.Vector3(unit.homeBuilding.x, getTerrainHeight(unit.homeBuilding.x, unit.homeBuilding.z), unit.homeBuilding.z);
                    } else {
                        unit.state = "wander";
                        unit.targetPosition = null;
                    }
                    unit.path = null;
                }
            } else {
                unit.state = "wander";
            }
        }
        if (unit.state === "going_home") {
            if (unit.targetPosition && unit.homeBuilding && unit.homeBuilding.state !== "dead") {
                const distToTarget = Math.hypot(unit.x - unit.targetPosition.x, unit.z - unit.targetPosition.z);
                const hb = unit.homeBuilding;
                if (distToTarget <= (hb.radius || (Math.max(hb.dimX || 1, hb.dimZ || 1) / 2)) + 1.5) {
                    unit.state = "wander";
                    unit.targetPosition = null;
                    unit.path = null;
                    window.uiNeedsUpdate = true;
                }
            } else {
                unit.state = "wander";
                unit.targetPosition = null;
                unit.path = null;
                window.uiNeedsUpdate = true;
            }
        }
        if (unit.state === "training" && unit.targetPosition) {
            const b = unit.targetBarracks;
            const reach = b ? (b.radius || Math.max(b.dimX || 1, b.dimZ || 1) / 2) + 3.0 : 3.5;
            const distToTarget = Math.hypot(unit.x - unit.targetPosition.x, unit.z - unit.targetPosition.z);
            if (distToTarget <= reach) {
                convertPeasantToSoldier(unit, b);
                unit.targetPosition = null;
                unit.path = null;
            }
        }
        if (unit.state === "siege_training" && unit.targetPosition) {
            const b = unit.targetSiegeShop;
            const reach = b ? (b.radius || Math.max(b.dimX || 1, b.dimZ || 1) / 2) + 3.0 : 3.5;
            const distToTarget = Math.hypot(unit.x - unit.targetPosition.x, unit.z - unit.targetPosition.z);
            if (distToTarget <= reach) {
                convertPeasantToSiegeUnit(unit, b);
                unit.targetPosition = null;
                unit.path = null;
            }
        }
        let isMovingThisFrame = false;
        // Don't steer if miner/worker is inside a mine/shop
        if (unit.state === "crafting" || !unit.mesh || (!unit.mesh.visible && unit.weapon !== "Assassin")) {
            return;
        }
        if (unit.targetPosition) {
            let pathRadius = 0;
            if (["constructing_fetching", "returning_payload", "wagon_delivering", "loadhouse_peasant_delivering", "loadhouse_peasant_fetching", "worker_fetching", "worker_delivering_item", "woodcutter_delivering", "miner_delivering", "farmer_walking_to_keep"].includes(unit.state)) {
                pathRadius = 4.0;
            } else if (["constructing_delivering", "training", "siege_training", "worker_returning_to_shop", "worker_returning_to_shop_with_materials", "woodcutter_walking_to_hut", "miner_returning", "farmer_walking_to_farm", "loadhouse_worker", "loadhouse_fetching_horse", "going_home", "miner", "farmer", "shop_worker", "market_worker"].includes(unit.state)) {
                const b = unit.workerBuilding || unit.targetBarracks || unit.targetSiegeShop || unit.homeBuilding;
                pathRadius = b ? (b.radius || Math.max(b.dimX || 1, b.dimZ || 1) / 2) + 1.0 : 2.0;
            } else if (unit.state === "woodcutter_walking_to_tree") {
                const t = unit.targetTree;
                pathRadius = t ? (t.radius || 0.5) + 1.0 : 1.5;
            } else if ((unit.state === "attacking" && unit.targetEntity) || unit.state === "attack_ground") {
                const wStats = unit.weapon ? WEAPONS[unit.weapon] : { range: 0.9 };
                const tRad = unit.targetEntity ? (unit.targetEntity.radius || 1.0) : 0.1;
                pathRadius = unit.state === "attack_ground" ? Math.max(0.1, wStats.range - 1.0) : (tRad + (wStats.range * 0.5));
            }
            let pathEndsTooFar = false;
            if (unit.path && unit.path.length > 0 && unit.targetEntity && unit.targetEntity.baseSpeed > 0) {
                const lastNode = unit.path[unit.path.length - 1];
                if (lastNode && unit.targetPosition && lastNode.x !== undefined && unit.targetPosition.x !== undefined) {
                    pathEndsTooFar = Math.hypot(lastNode.x - unit.targetPosition.x, lastNode.z - unit.targetPosition.z) > Math.max(1.5, pathRadius + 0.5);
                }
            }
            if (!unit.path || unit.path.length === 0 || pathEndsTooFar) {
                let shouldFindPath = true;
                if (unit.pathCooldown && unit.pathCooldown > 0) {
                    shouldFindPath = false;
                }
                if (shouldFindPath) {
                    unit.path = findPath(unit, unit.targetPosition, pathRadius);
                    unit.pathCooldown = unit.path ? 15 : 60 + Math.floor(Math.random() * 60);
                    unit.repathTimer = 0;
                    if (!unit.path) {
                        if (unit.pathBudgetExhausted) {
                            unit.pathCooldown = 2;
                            return;
                        }
                        let isClose = false;
                        if (unit.targetPosition) {
                            const dist = Math.hypot(unit.x - unit.targetPosition.x, unit.z - unit.targetPosition.z);
                            if (dist <= Math.max(2.0, (pathRadius || 0) + 1.0)) {
                                isClose = true;
                                unit.pathFails = [];
                            }
                        }
                        if (!isClose) {
                            const sx = Math.max(0, Math.min(299, Math.round(unit.x) + 150));
                            const sz = Math.max(0, Math.min(299, Math.round(unit.z) + 150));
                            if (regionGrid[sz * 300 + sx] === 65535) {
                                unit.stuckCount = 4;
                                unit.progressFrames = 999;
                            } else if (!["attack_ground", "attacking", "constructing_fetching", "constructing_delivering", "fetching", "returning_payload", "mining", "farming", "worker_fetching", "worker_returning_to_shop_with_materials", "worker_delivering_item", "worker_returning_to_shop", "shop_worker", "loadhouse_peasant_fetching", "loadhouse_peasant_delivering", "woodcutter_walking_to_tree", "woodcutter_walking_to_hut", "woodcutter_delivering", "miner_delivering", "miner_returning", "miner", "farmer", "farmer_walking_to_keep", "farmer_walking_to_farm", "market_worker", "loadhouse_worker", "loadhouse_fetching_horse", "going_home", "training", "siege_training", "wagon_delivering"].includes(unit.state)) {
                                unit.targetPosition = null;
                                if (unit.state === "moving" || unit.state === "fightmove") {
                                    if (!processNextCommand(unit)) unit.state = (unit.type === "peasant") ? "wander" : "idle";
                                }
                            }
                            if (unit.state === "training" && unit.trainingConfig && unit.targetBarracks) {
                                if (!soldierTrainingQueue[unit.faction]) soldierTrainingQueue[unit.faction] = [];
                                soldierTrainingQueue[unit.faction].unshift({
                                    barracksId: unit.targetBarracks.id,
                                    weapon: unit.trainingConfig.weapon,
                                    armors: unit.trainingConfig.armors,
                                    hasHorse: unit.trainingConfig.hasHorse,
                                    goldCost: unit.trainingConfig.goldCost || 0
                                });
                                unit.targetBarracks = null;
                                unit.trainingConfig = null;
                                unit.state = "wander";
                            }
                            if (unit.state === "siege_training" && unit.trainingConfig && unit.targetSiegeShop) {
                                const sq = siegeTrainingQueue[unit.faction];
                                if (sq) {
                                    const order = sq.find(q => q.shopId === unit.targetSiegeShop.id && q.type === unit.trainingConfig.type);
                                    if (order && order.peasantsDispatched > 0) {
                                        order.peasantsDispatched--;
                                    }
                                }
                                unit.targetSiegeShop = null;
                                unit.trainingConfig = null;
                                unit.state = "wander";
                            }
                            if (window.abortWorkerWithZzz) {
                                if (unit.pathBudgetExhausted) { unit.pathCooldown = 15; return; }
                                if (!unit.pathFails) unit.pathFails = [];
                                unit.pathFails.push(gameFrameCount);
                                unit.pathFails = unit.pathFails.filter(frame => gameFrameCount - frame <= 180);
                                if (unit.pathFails.length >= 11) {
                                    window.abortWorkerWithZzz(unit, entities);
                                } else {
                                    unit.pathCooldown = 15;
                                    return;
                                }
                            }
                            return;
                        }
                    }
                }
            }
            let localTarget;
            if (!unit.path || unit.path.length === 0) {
                if (!unit.targetPosition) return;
                localTarget = unit.targetPosition;
            } else {
                unit.pathFails = [];
                // Continuous string pulling for fluid movement
                let nextIndex = 0;
                for (let i = 1; i < Math.min(unit.path.length, 5); i++) {
                    let containsElevator = false;
                    for (let j = 0; j < i; j++) {
                        const p1 = j === 0 ? unit : unit.path[j-1];
                        const p2 = unit.path[j];
                        if (Math.abs(p2.y - p1.y) >= 0.5 && Math.hypot(p2.x - p1.x, p2.z - p1.z) < 0.5) {
                            containsElevator = true;
                            break;
                        }
                    }
                    if (containsElevator) break;
                    
                    if (hasLineOfSight(unit, unit.path[i], unit)) {
                        nextIndex = i;
                    }
                }
                if (nextIndex > 0) {
                    unit.path.splice(0, nextIndex);
                }
                localTarget = unit.path[0];
            }
            let shiftDist = 0.6; // Increased from 0.15 to allow corner-cutting when crowded
            if (localTarget.y !== undefined && Math.abs(localTarget.y - unit.y) >= 0.5) {
                shiftDist = 0.15; // Square up completely when leaving/entering stairs
            } else if (unit.path && unit.path.length > 1) {
                const nextTarget = unit.path[1];
                if (localTarget.y !== undefined && nextTarget.y !== undefined) {
                    if (Math.abs(nextTarget.y - localTarget.y) >= 0.5) {
                        shiftDist = 0.2; // Square up before climbing stairs, small enough to prevent dropping node early
                    }
                }
            }
            let isTowerWallJump = false; // Obsolete hack removed

            let dist2D = Math.hypot(localTarget.x - unit.x, localTarget.z - unit.z);
            let dropWaypoint = dist2D < shiftDist;
            if (!isTowerWallJump && localTarget.y !== undefined && Math.abs(localTarget.y - unit.y) > 0.8 && dist2D < 0.6) {
                dropWaypoint = true;
            }
            if (isTowerWallJump && localTarget.y < unit.y && dist2D > 0.1) {
                dropWaypoint = false;
            }

            if (dropWaypoint) {
                if (localTarget.y !== undefined && Math.abs(localTarget.y - unit.y) > 0.8) {
                    let isElevator = false;
                    if (typeof rampGrid !== "undefined") {
                        const unitGX = Math.round(unit.x) + 150;
                        const unitGZ = Math.round(unit.z) + 150;
                        for (let ox = -1; ox <= 1; ox++) {
                            for (let oz = -1; oz <= 1; oz++) {
                                const checkX = unitGX + ox;
                                const checkZ = unitGZ + oz;
                                if (checkX >= 0 && checkX < 300 && checkZ >= 0 && checkZ < 300) {
                                    if (rampGrid[checkZ * 300 + checkX] === 3 || (pathGrid[checkZ * 300 + checkX] && pathGrid[checkZ * 300 + checkX].isOpenGate)) {
                                        isElevator = true;
                                    }
                                }
                            }
                        }
                    }
                    if (isElevator && !isTowerWallJump && unit.weapon !== "Assassin" && unit.path && unit.path.length > 0) {
                        unit.y = localTarget.y; // Execute vertical teleport (gatehouse elevator)
                        unit.mesh.position.set(unit.x, unit.y, unit.z);
                    } else if (!isTowerWallJump && unit.weapon !== "Assassin" && Math.abs(localTarget.y - unit.y) > 2.5) {
                        if (!unit.pathFails) unit.pathFails = [];
                        unit.pathFails.push(gameFrameCount);
                        unit.pathFails = unit.pathFails.filter(frame => gameFrameCount - frame <= 180);
                        if (unit.pathFails.length >= 11 && window.abortWorkerWithZzz) {
                            window.abortWorkerWithZzz(unit, entities);
                        } else {
                            unit.path = null;
                            unit.pathCooldown = 15;
                        }
                        return; // Abort invalid vertical teleport
                    }
                }
                if (unit.path) {
                    unit.path.shift();
                    if (unit.path.length > 0) {
                        localTarget = unit.path[0];
                    } else {
                        const finalDist = Math.hypot(unit.targetPosition.x - unit.x, unit.targetPosition.z - unit.z);
                        if (!isTowerWallJump && unit.targetPosition && unit.targetPosition.y !== undefined && Math.abs(unit.targetPosition.y - unit.y) > 2.5 + finalDist * 1.5) {
                            if (!unit.pathFails) unit.pathFails = [];
                            unit.pathFails.push(gameFrameCount);
                            unit.pathFails = unit.pathFails.filter(frame => gameFrameCount - frame <= 180);
                            if (unit.pathFails.length >= 11 && window.abortWorkerWithZzz) {
                                window.abortWorkerWithZzz(unit, entities);
                            } else {
                                unit.path = null;
                                unit.pathCooldown = 15;
                            }
                            return; // Stop here! Can't straight-line walk to a different height level
                        }
                        localTarget = unit.targetPosition;
                    }
                }
            }
            const dx = localTarget.x - unit.x;
            const dz = localTarget.z - unit.z;
            const dist = Math.hypot(dx, dz);
            const finalDist = Math.hypot(unit.targetPosition.x - unit.x, unit.targetPosition.z - unit.z);
            if ((unit.state === "moving" || unit.state === "fightmove") && finalDist <= 3.0) {
                unit.timeNearTarget = (unit.timeNearTarget || 0) + deltaTime;
            } else {
                unit.timeNearTarget = 0;
            }
            let arrivalRadius = 0.15;
            if (unit.state === "wander" || unit.state === "idle") arrivalRadius = 1.0;
            if ((unit.state === "attacking" && unit.targetEntity) || unit.state === "attack_ground") {
                const wStats = unit.weapon ? WEAPONS[unit.weapon] : { range: 0.9 };
                const tRad = unit.targetEntity ? (unit.targetEntity.radius || 1.0) : 0.1;
                arrivalRadius = unit.state === "attack_ground" ? Math.max(0.1, wStats.range - 1.0) : tRad;
            }
            if (pathRadius > 0 && unit.state !== "attacking" && unit.state !== "attack_ground") {
                arrivalRadius = Math.max(arrivalRadius, pathRadius - 0.5);
            }
            let isYArrived = true;
            if (unit.targetPosition && unit.targetPosition.y !== undefined && unit.y !== undefined) {
                isYArrived = Math.abs(unit.targetPosition.y - unit.y) < 1.5;
            }
            if (finalDist < arrivalRadius && isYArrived && unit.timeNearTarget < 3.0) {
                if (unit.path) {
                    unit.path = null;
                }
                if (!["attack_ground", "attacking", "constructing_fetching", "constructing_delivering", "fetching", "returning_payload", "mining", "farming", "worker_fetching", "worker_returning_to_shop_with_materials", "worker_delivering_item", "worker_returning_to_shop", "shop_worker", "loadhouse_peasant_fetching", "loadhouse_peasant_delivering", "woodcutter_walking_to_tree", "woodcutter_walking_to_hut", "woodcutter_delivering", "miner_delivering", "miner_returning", "miner", "farmer", "farmer_walking_to_keep", "farmer_walking_to_farm", "market_worker", "loadhouse_worker", "loadhouse_fetching_horse", "going_home", "training", "siege_training", "wagon_delivering"].includes(unit.state)) {
                    unit.targetPosition = null;
                }
                if (unit.state === "moving") {
                    if (!processNextCommand(unit)) unit.state = (unit.type === "peasant") ? "wander" : "idle";
                } else if (unit.state === "fightmove") {
                    if (!processNextCommand(unit)) {
                        unit.state = (unit.type === "peasant") ? "wander" : "idle";
                        unit.fightMoveDestination = null;
                    }
                }
            } else if (dist > 0.15 && unit.timeNearTarget < 3.0) {
                isMovingThisFrame = true;
                if (!unit.stuckPos) {
                    unit.stuckPos = new THREE.Vector3(unit.x, unit.y, unit.z);
                    unit.stuckTimer = 0;
                }
                if (Math.hypot(unit.x - unit.stuckPos.x, unit.z - unit.stuckPos.z) < 0.3) {
                    unit.stuckTimer += deltaTime;
                    unit.repathTimer = (unit.repathTimer || 0) + deltaTime;
                    // Force a repath if we've been stuck for a bit, but keep stuckTimer running
                    // so that phasing (at 5.0s) will eventually activate if the repath fails too.
                    if (unit.stuckTimer > 1.0 && unit.path && unit.repathTimer > 1.0) {
                        unit.path = null;
                        unit.pathCooldown = 5;
                        unit.repathTimer = 0;
                    }
                } else {
                    unit.stuckPos.set(unit.x, unit.y, unit.z);
                    unit.stuckTimer = 0;
                    unit.repathTimer = 0;
                }
                const cx = Math.max(0, Math.min(299, Math.floor(unit.x) + 150));
                const cz = Math.max(0, Math.min(299, Math.floor(unit.z) + 150));
                const isTrappedTile = (pathGrid[cz * 300 + cx] && pathGrid[cz * 300 + cx].length === 0);
                if (isTrappedTile || unit.stuckTimer > 5.0) {
                    unit.isPhasing = true;
                    if (unit.stuckTimer > 7.0) {
                        unit.stuckTimer = 0;
                        unit.isPhasing = false;
                        unit.stuckPos.set(unit.x, unit.y, unit.z);
                    }
                } else {
                    unit.isPhasing = false;
                }
                const speedMult = 1.0;
                const moveDist = unit.speed * speedMult * deltaTime;
                const ratio = Math.min(moveDist / dist, 1);
                unit.preMoveX = unit.x;
                unit.preMoveZ = unit.z;
                const nextX = unit.x + dx * ratio;
                const nextZ = unit.z + dz * ratio;
                const floorData = getFloorHeight(unit, nextX, nextZ);
                const isAssassin = unit.weapon === "Assassin";
                if (floorData.ejectX !== null || floorData.ejectZ !== null) {
                    let pushX = 0, pushZ = 0;
                    if (floorData.ejectX !== null) {
                        pushX = Math.abs(nextX - floorData.ejectX);
                        unit.x = floorData.ejectX;
                    }
                    if (floorData.ejectZ !== null) {
                        pushZ = Math.abs(nextZ - floorData.ejectZ);
                        unit.z = floorData.ejectZ;
                    }
                    unit.path = null;
                    unit.pathCooldown = 0;
                    return;
                }
                const nextY = floorData.y;
                const dy = nextY - unit.y;
                const dxz = Math.hypot(nextX - unit.x, nextZ - unit.z);
                let slopeDeg = 0;
                if (dxz > 0) {
                    slopeDeg = Math.atan2(dy, dxz) * (180 / Math.PI);
                }
                const cFloorData = getFloorHeight(unit, unit.x, unit.z);
                let isTowerWallJumpMove = false; // Obsolete hack removed
                const cTerrain = getTerrainHeight(unit.x, unit.z);
                const isElevated = unit.y > cTerrain + 1.0;
                const maxJumpDown = (isAssassin || isTowerWallJumpMove) ? 999.0 : (isElevated && !cFloorData.onWall) ? 12.0 : 1.2;
                const maxJumpUp = (isAssassin || isTowerWallJumpMove) ? 999.0 : 1.2;
                let approachingElevator = false;
                if (!isAssassin && !isTowerWallJumpMove && localTarget && localTarget.y !== undefined && Math.abs(localTarget.y - unit.y) >= 0.5) {
                    const cIdx = getSpatialCell(localTarget.x, localTarget.z);
                    const lBuilds = buildingGrid[cIdx];
                    if (lBuilds) {
                        approachingElevator = lBuilds.some(e => {
                            if ((e.type === "gatehouse" || e.type === "keep" || e.type === "wall_column" || e.type === "tower") && e.isOpen !== false) {
                                if (e.type === "keep") {
                                    return Math.abs((e.x + (e.doorDx||0)) - localTarget.x) <= 0.8 && Math.abs(e.z - localTarget.z) <= 0.8;
                                } else {
                                    const hw = (e.dimX !== undefined ? e.dimX : (e.radius ? e.radius * 2 : 1)) / 2;
                                    const hd = (e.dimZ !== undefined ? e.dimZ : (e.radius ? e.radius * 2 : 1)) / 2;
                                    return (Math.abs(e.x - localTarget.x) <= hw + 0.5 && Math.abs(e.z - localTarget.z) <= hd + 0.5);
                                }
                            }
                            return false;
                        });
                    }
                }
                unit.isClimbing = false;
                // Sliding collision against steep slopes (max 45 deg)
                if (unit.isPhasing || isAssassin || approachingElevator || (slopeDeg <= (unit.type.startsWith("siege_") && unit.type !== "siege_engineer" ? 15 : 45)) || dy <= maxJumpUp) {
                    let speedMod = 1.0;
                    if (!approachingElevator && !isAssassin) {
                        if (slopeDeg > 0) speedMod = Math.max(0.1, 1.0 - (slopeDeg * 0.01));
                    }
                    const actualRatio = Math.min((moveDist * speedMod) / dist, 1);
                    const pX = unit.x + dx * actualRatio;
                    const pZ = unit.z + dz * actualRatio;
                    const pY = getFloorHeight(unit, pX, pZ).y;
                    if (approachingElevator) {
                        unit.x = pX;
                        unit.z = pZ;
                    } else if (pY >= unit.y - maxJumpDown && pY <= unit.y + maxJumpUp) {
                        unit.x = pX;
                        unit.z = pZ;
                        if (pY >= unit.y - maxJumpUp) {
                            if (!(isAssassin && pY - unit.y > 1.2)) unit.y = pY;
                        }
                    } else {
                        const pXOnlyY = getFloorHeight(unit, pX, unit.z).y;
                        const pZOnlyY = getFloorHeight(unit, unit.x, pZ).y;
                        const validX = pXOnlyY >= unit.y - maxJumpDown && pXOnlyY <= unit.y + maxJumpUp;
                        const validZ = pZOnlyY >= unit.y - maxJumpDown && pZOnlyY <= unit.y + maxJumpUp;
                        if (validX && !validZ) {
                            unit.x = pX;
                            if (pXOnlyY >= unit.y - maxJumpUp) { if (!(isAssassin && pXOnlyY - unit.y > 1.2)) unit.y = pXOnlyY; }
                        } else if (validZ && !validX) {
                            unit.z = pZ;
                            if (pZOnlyY >= unit.y - maxJumpUp) { if (!(isAssassin && pZOnlyY - unit.y > 1.2)) unit.y = pZOnlyY; }
                        } else if (validX && validZ) {
                            if (Math.abs(dx) > Math.abs(dz)) {
                                unit.x = pX;
                                if (pXOnlyY >= unit.y - maxJumpUp) { if (!(isAssassin && pXOnlyY - unit.y > 1.2)) unit.y = pXOnlyY; }
                            } else {
                                unit.z = pZ;
                                if (pZOnlyY >= unit.y - maxJumpUp) { if (!(isAssassin && pZOnlyY - unit.y > 1.2)) unit.y = pZOnlyY; }
                            }
                        }
                    }
                    unit.mesh.position.set(unit.x, unit.y, unit.z);
                } else {
                    // Try sliding along X or Z if blocked by slope (e.g. hitting a wall)
                    const nextXOnly = unit.x + dx * ratio;
                    const dyX = getFloorHeight(unit, nextXOnly, unit.z).y - unit.y;
                    const slopeX = dx !== 0 ? Math.atan2(dyX, Math.abs(dx * ratio)) * (180/Math.PI) : 90;
                    const nextZOnly = unit.z + dz * ratio;
                    const dyZ = getFloorHeight(unit, unit.x, nextZOnly).y - unit.y;
                    const slopeZ = dz !== 0 ? Math.atan2(dyZ, Math.abs(dz * ratio)) * (180/Math.PI) : 90;
                    if (slopeX <= 45 || dyX <= maxJumpUp) {
                        const pX2Y = getFloorHeight(unit, nextXOnly, unit.z).y;
                        if (pX2Y >= unit.y - maxJumpDown && pX2Y <= unit.y + maxJumpUp) {
                            unit.x = nextXOnly;
                            if (pX2Y >= unit.y - maxJumpUp) { if (!(isAssassin && pX2Y - unit.y > 1.2)) unit.y = pX2Y; }
                            unit.mesh.position.set(unit.x, unit.y, unit.z);
                        }
                    } else if (slopeZ <= 45 || dyZ <= maxJumpUp) {
                        const pZ2Y = getFloorHeight(unit, unit.x, nextZOnly).y;
                        if (pZ2Y >= unit.y - maxJumpDown && pZ2Y <= unit.y + maxJumpUp) {
                            unit.z = nextZOnly;
                            if (pZ2Y >= unit.y - maxJumpUp) { if (!(isAssassin && pZ2Y - unit.y > 1.2)) unit.y = pZ2Y; }
                            unit.mesh.position.set(unit.x, unit.y, unit.z);
                        }
                    } else {
                        // Nudge towards center of current tile to escape corners
                        const cx = Math.round(unit.x);
                        const cz = Math.round(unit.z);
                        const nx = unit.x + (cx - unit.x) * 0.1;
                        const nz = unit.z + (cz - unit.z) * 0.1;
                        const nudgeY = getFloorHeight(unit, nx, nz).y;
                        if (nudgeY >= unit.y - maxJumpDown && nudgeY <= unit.y + 1.2) {
                            unit.x = nx;
                            unit.z = nz;
                            if (nudgeY >= unit.y - 1.2) unit.y = nudgeY;
                            unit.mesh.position.set(unit.x, unit.y, unit.z);
                        } else {
                            unit.path = null;
                            unit.pathCooldown = 15;
                        }
                    }
                }
                const targetAngle = Math.atan2(dx, dz);
                unit.mesh.rotation.y = targetAngle;
            } else {
                if (!["attack_ground", "attacking", "constructing_fetching", "constructing_delivering", "fetching", "returning_payload", "mining", "farming", "worker_fetching", "worker_returning_to_shop_with_materials", "worker_delivering_item", "worker_returning_to_shop", "shop_worker", "loadhouse_peasant_fetching", "loadhouse_peasant_delivering", "woodcutter_walking_to_tree", "woodcutter_walking_to_hut", "woodcutter_delivering", "miner_delivering", "miner_returning", "miner", "farmer", "farmer_walking_to_keep", "farmer_walking_to_farm", "market_worker", "loadhouse_worker", "loadhouse_fetching_horse", "going_home", "training", "siege_training", "wagon_delivering"].includes(unit.state)) {
                    unit.targetPosition = null;
                }
                if (unit.state === "moving") {
                    if (!processNextCommand(unit)) unit.state = (unit.type === "peasant") ? "wander" : "idle";
                } else if (unit.state === "fightmove") {
                    if (!processNextCommand(unit)) {
                        unit.state = (unit.type === "peasant") ? "wander" : "idle";
                        unit.fightMoveDestination = null;
                    }
                } else if (unit.state === "training") {
                    convertPeasantToSoldier(unit, unit.targetBarracks);
                }
            }
        }
        // Track standstill logic for Bows, Crossbows & Siege
        let intendedMove = unit.targetPosition !== null || (unit.path && unit.path.length > 0);
        if (unit.state === "attack_ground" && unit.targetPosition) {
            const wStats = unit.weapon ? WEAPONS[unit.weapon] : { range: 0.9 };
            const dist = Math.hypot(unit.x - unit.targetPosition.x, unit.z - unit.targetPosition.z);
            if (dist <= wStats.range) {
                intendedMove = false;
            }
        }
        let isMountedShortBow = (unit.weapon === "Short Bow" && unit.hasHorse);
        let effectivelyStationary = !intendedMove || isMountedShortBow;
        if (!effectivelyStationary) {
            if (unit.weapon === "Short Bow" || unit.weapon === "Longbow" || unit.weapon === "Catapult" || unit.weapon === "Trebuchet" || unit.weapon === "Mangonel" || unit.weapon === "Slinger") {
                unit.timeStationary = 0;
            }
            // Crossbow/Ballista intentionally do not reset reloadTimer, allowing incremental reload
        } else {
            // Wind-up weapons only start accumulating stationary time AFTER cooldown finishes (sequential)
            if (unit.cooldownTimer <= 0) {
                if (unit.weapon === "Short Bow" || unit.weapon === "Longbow" || unit.weapon === "Catapult" || unit.weapon === "Trebuchet" || unit.weapon === "Mangonel" || unit.weapon === "Slinger") {
                    unit.timeStationary += deltaTime;
                }
            }
            // Reload weapons can reload while on cooldown, but ONLY while stationary
            if (unit.weapon === "Crossbow" || unit.weapon === "Ballista") {
                const maxRel = unit.weapon === "Ballista" ? 10.0 : 5.0;
                unit.reloadTimer = Math.min((unit.reloadTimer || 0) + deltaTime, maxRel);
            }
        }
        if ((unit.weapon === "Catapult" || unit.weapon === "Trebuchet" || unit.weapon === "Mangonel") && unit.mesh) {
            const armGroup = unit.mesh.children.find(c => c.name === "catapultArmGroup");
            if (armGroup) {
                const wStats = WEAPONS[unit.weapon];
                const fireAnimTime = 0.5;
                if (unit.cooldownTimer > wStats.cd - fireAnimTime) {
                    armGroup.rotation.x = Math.PI / 6; 
                } else if (unit.cooldownTimer > 0) {
                    const progress = 1.0 - (unit.cooldownTimer / (wStats.cd - fireAnimTime));
                    armGroup.rotation.x = (Math.PI / 6) - (Math.PI * 0.66 * progress);
                } else {
                    const progress = Math.min(1.0, unit.timeStationary / wStats.prepTime);
                    armGroup.rotation.x = (Math.PI / 6) - (Math.PI * 0.66 * progress);
                }
            }
        }
        if (unit.mesh && (unit.type === "peasant" || unit.weapon === "Sword" || unit.weapon === "Mace" || unit.weapon === "Axe" || unit.weapon === "Doppelsoldner")) {
            const wStats = WEAPONS[unit.weapon] || { cd: 1.0 };
            const pivotObj = unit.mesh.children.find(c => c.name === "weaponGroup");
            if (pivotObj) {
                const defaultRot = (unit.type === "peasant") ? (Math.PI / 6) : 0;
                let isWorkingAnim = false;
                if (unit.type === "peasant" && (unit.state === "farming" || unit.state === "chopping")) {
                    const cycle = (unit.workTimer || 0) % 1.5;
                    if (cycle > 1.25) {
                        isWorkingAnim = true;
                    }
                }

                if (unit.cooldownTimer > wStats.cd - 0.25 && unit.cooldownTimer <= wStats.cd) {
                    if (unit.type === "peasant") {
                        pivotObj.rotation.x = defaultRot + Math.PI / 4; // Pivot hoe by 45 degrees
                    } else {
                        pivotObj.rotation.x = Math.PI / 2; // Weapon parallel to ground
                    }
                } else if (isWorkingAnim) {
                    pivotObj.rotation.x = defaultRot + Math.PI / 4;
                } else {
                    pivotObj.rotation.x = defaultRot;
                }
            }
        }
        if (unit.mesh && unit.weapon === "Slinger") {
            const pivotObj = unit.mesh.children.find(c => c.name === "weaponGroup");
            if (pivotObj) {
                if (unit.state === "attacking" || unit.state === "attack_ground") {
                    if (unit.timeStationary > 0 && unit.timeStationary < 2.0) {
                        const spinTime = unit.timeStationary;
                        const spinRate = Math.PI * 6; // 3 full rotations per second
                        pivotObj.rotation.y = spinTime * spinRate;
                        pivotObj.rotation.x = Math.PI / 2; // above head
                        pivotObj.position.y = 1.0; // Raise above head
                        pivotObj.position.x = 0; // Center over head
                    } else if (unit.timeStationary >= 2.0 || unit.cooldownTimer > 0.8) {
                        // Just fired
                        pivotObj.rotation.y = 0;
                        pivotObj.rotation.x = Math.PI / 4; // throw follow-through
                        pivotObj.position.set(0.35, 0.4, 0.2); // Return to default
                    } else {
                        pivotObj.rotation.y = 0;
                        pivotObj.rotation.x = 0;
                        pivotObj.position.set(0.35, 0.4, 0.2);
                    }
                } else {
                    pivotObj.rotation.y = 0;
                    pivotObj.rotation.x = 0;
                    pivotObj.position.set(0.35, 0.4, 0.2);
                }
            }
        }
        if (unit.mesh && (unit.weapon === "Short Bow" || unit.weapon === "Longbow")) {
            const pivotObj = unit.mesh.children.find(c => c.name === "weaponGroup");
            if (pivotObj) {
                // Find loaded arrow and string
                let arrowGroup = null;
                let bowString = null;
                pivotObj.children.forEach(c => {
                    if (c.children) {
                        arrowGroup = c.children.find(subC => subC.name === "loadedArrow") || arrowGroup;
                        bowString = c.children.find(subC => subC.name === "bowString") || bowString;
                    }
                });
                if (unit.state === "attacking" || unit.state === "attack_ground") {
                    const wStats = WEAPONS[unit.weapon];
                    if (unit.timeStationary > 0 && unit.timeStationary < wStats.prepTime) {
                        // Winding up: show arrow, pull back
                        if (arrowGroup) arrowGroup.visible = true;
                        // Calculate pull percentage
                        const pullPct = Math.min(1.0, unit.timeStationary / (wStats.prepTime - 0.2)); // Pull back over windup time
                        // Pull arrow back (Z axis relative to bowGroup)
                        if (arrowGroup) arrowGroup.position.x = -pullPct * 0.4;
                        if (bowString) bowString.position.x = -pullPct * 0.4;
                        // Aim bow upwards slightly for arc
                        pivotObj.rotation.x = -Math.PI / 8;
                        pivotObj.rotation.z = Math.PI / 8; // Hold sideways
                    } else if (unit.cooldownTimer > wStats.cd - 0.2) {
                        // Just fired: hide arrow, snap string back
                        if (arrowGroup) arrowGroup.visible = false;
                        if (bowString) bowString.position.x = 0;
                    } else {
                        // Resting
                        if (arrowGroup) arrowGroup.visible = false;
                        if (bowString) bowString.position.x = 0;
                        pivotObj.rotation.x = 0;
                        pivotObj.rotation.z = 0;
                    }
                } else {
                    if (arrowGroup) arrowGroup.visible = false;
                    if (bowString) bowString.position.x = 0;
                    pivotObj.rotation.x = 0;
                    pivotObj.rotation.z = 0;
                }
            }
        }
        if (unit.mesh && unit.weapon === "Crossbow") {
            const pivotObj = unit.mesh.children.find(c => c.name === "weaponGroup");
            if (pivotObj) {
                // Find loadedBolt
                let boltGroup = null;
                pivotObj.children.forEach(c => {
                    if (c.children) {
                        boltGroup = c.children.find(subC => subC.name === "loadedBolt") || boltGroup;
                    }
                });
                const wStats = WEAPONS[unit.weapon];
                if (unit.reloadTimer < wStats.reloadTime) {
                    // Reloading
                    if (boltGroup) boltGroup.visible = false;
                    // Pivot gradually back to pointing forward
                    // 90 degrees down = Math.PI / 2
                    // pointing forward = 0
                    const reloadPct = unit.reloadTimer / wStats.reloadTime;
                    pivotObj.rotation.x = (Math.PI / 2) * (1.0 - reloadPct);
                } else if (unit.cooldownTimer > wStats.cd - 0.2) {
                    // Just fired
                    if (boltGroup) boltGroup.visible = false;
                    pivotObj.rotation.x = 0;
                } else {
                    // Fully loaded and ready to fire
                    if (boltGroup) boltGroup.visible = true;
                    pivotObj.rotation.x = 0;
                }
            }
        }

        if (unit.mesh && unit.type === "siege_ballista") {
            const bowObj = unit.mesh.children.find(c => c.name === "ballistaBow");
            if (bowObj) {
                const wStats = WEAPONS[unit.weapon];
                if (unit.reloadTimer < wStats.reloadTime) {
                    const reloadPct = unit.reloadTimer / wStats.reloadTime;
                    bowObj.position.z = 0.6 - (0.6 * reloadPct);
                } else if (unit.cooldownTimer > wStats.cd - 0.2) {
                    bowObj.position.z = 0.6;
                } else {
                    bowObj.position.z = 0.0;
                }
            }
        }
    });
    // 1.5 Terrain Repulsion (soft pushing away from cliffs/walls)
    activeUnits.forEach(unit => {
        if (!unit.mesh || (!unit.mesh.visible && unit.weapon !== "Assassin") || unit.isPhasing || unit.state === "dead") return;
        const isIdlePeasant = unit.type === "peasant" && (unit.state === "idle" || unit.state === "wander" || unit.state === "constructing_fetching");
        if (isIdlePeasant && (unit.id % 4 !== gameFrameCount % 4)) return;
        let repX = 0;
        let repZ = 0;
        const repDist = (unit.radius || 0.4) + 0.05;
        const offsets = isIdlePeasant ?
            [[repDist, 0], [-repDist, 0], [0, repDist], [0, -repDist]] :
            [[repDist, 0], [-repDist, 0], [0, repDist], [0, -repDist],
             [repDist*0.7, repDist*0.7], [-repDist*0.7, -repDist*0.7],
             [-repDist*0.7, repDist*0.7], [repDist*0.7, -repDist*0.7]];
        offsets.forEach(off => {
            const sampleY = getFloorHeight(unit, unit.x + off[0], unit.z + off[1]).y;
            const diff = sampleY - unit.y;
            if (diff > 1.0) {
                // Steep height difference upwards (wall). Push away!
                repX -= off[0];
                repZ -= off[1];
            }
        });
        if (repX !== 0 || repZ !== 0) {
            const mag = Math.hypot(repX, repZ);
            const force = 1.0 * deltaTime; // Reduced Push strength
            const pX = unit.x + (repX / mag) * force;
            const pZ = unit.z + (repZ / mag) * force;
            const pY = getFloorHeight(unit, pX, pZ).y;
            // Only apply if it doesn't push us off a cliff or into a wall itself
            if (Math.abs(pY - unit.y) <= 1.0) {
                unit.x = pX;
                unit.z = pZ;
                unit.y = pY;
                unit.mesh.position.set(unit.x, unit.y, unit.z);
            }
        }
    });
    // 2. Unit-to-Unit Push Separations (Spatial Grid)
    for (let i = 0; i < activeUnits.length; i++) {
        const uA = activeUnits[i];
        if (!uA.mesh || !uA.mesh.visible || uA.state === "dead") continue;
        const cellX = Math.max(0, Math.min(SPATIAL_WIDTH - 1, Math.floor((uA.x + 150) / SPATIAL_CELL_SIZE)));
        const cellZ = Math.max(0, Math.min(SPATIAL_HEIGHT - 1, Math.floor((uA.z + 150) / SPATIAL_CELL_SIZE)));
        for (let oz = -1; oz <= 1; oz++) {
            const cz = cellZ + oz;
            if (cz < 0 || cz >= SPATIAL_HEIGHT) continue;
            for (let ox = -1; ox <= 1; ox++) {
                const cx = cellX + ox;
                if (cx < 0 || cx >= SPATIAL_WIDTH) continue;
                const cellUnits = unitGrid[cz * SPATIAL_WIDTH + cx];
                for (let k = 0; k < cellUnits.length; k++) {
                    const uB = cellUnits[k];
                    // Prevent self-collision and double-processing pairs
                    if (uB.id <= uA.id) continue;
                    if (!uB.mesh || !uB.mesh.visible || uB.state === "dead") continue;
                    if ((uA.weapon === "Assassin" && uB.weapon !== "Assassin") || (uB.weapon === "Assassin" && uA.weapon !== "Assassin")) continue;
                    const cullDist = uA.radius + uB.radius + 0.5;
                    const dx = uB.x - uA.x;
                    if (dx > cullDist || dx < -cullDist) continue; // Quick cull X
                    const dz = uB.z - uA.z;
                    if (dz > cullDist || dz < -cullDist) continue; // Quick cull Z
                    const dy = uB.y - uA.y;
                    const distSq = dx*dx + dz*dz;
                    const minDist = uA.radius + uB.radius;
                    if (distSq < minDist*minDist && Math.abs(dy) < 2.0) {
                        const dist = Math.sqrt(distSq);
                        const overlap = minDist - dist;
                        // Determine base weights
                        let baseA = getUnitMass(uA, false); // Don't use the old +0.49 seniority bonus
                        let baseB = getUnitMass(uB, false);
                        let weightA = baseA;
                        let weightB = baseB;
                        // Tie-Breaker Only 10x Seniority
                        // If they have the exact same base mass, the older unit (uA) gets a massive 10x anchor bonus
                        if (baseA === baseB && uA.state !== "idle" && uA.state !== "wander") {
                            weightA *= 10.0;
                        } else {
                            // If they aren't identical, just use a tiny micro-bonus so we don't divide by zero or perfectly tie
                            weightA += 0.000001;
                        }
                        const totalWeight = weightA + weightB;
                        const ratioA = weightB / totalWeight;
                        const ratioB = weightA / totalWeight;
                        let pushX = (dist > 0 ? (dx / dist) : 1) * overlap; if (!isFinite(pushX)) pushX = 0;
                        let pushZ = (dist > 0 ? (dz / dist) : 0) * overlap; if (!isFinite(pushZ)) pushZ = 0;
                        // Add a tangential slide force using a time-based sine wave to break symmetry and prevent perfect deadlocks
                        // Fast, tiny sway to avoid sliding too far and "dancing"
                        const now = performance.now() * 0.012; // Faster oscillation (approx 0.5 seconds per full cycle)
                        const slideMult = 0.3 + Math.sin(now + uA.id) * 0.05;
                        const jitterX = Math.cos(now + uB.id * 0.5) * 0.002;
                        const jitterZ = Math.sin(now + uA.id * 0.5) * 0.002;
                        const slideX = -pushZ * slideMult + jitterX;
                        const slideZ = pushX * slideMult + jitterZ;
                        let dxA = -pushX * ratioA + slideX * ratioA;
                        let dzA = -pushZ * ratioA + slideZ * ratioA;
                        let dxB = pushX * ratioB - slideX * ratioB;
                        let dzB = pushZ * ratioB - slideZ * ratioB;
                        // Conservation of Displacement (Directional)
                        function resolvePush(u, px, pz, dt) {
                            const bSpeed = u.baseSpeed !== undefined ? u.baseSpeed : 1.0;
                            const limit = bSpeed * dt * 1.05;
                            const pMag = Math.hypot(px, pz);
                            if (pMag < 0.0001) return { dx: px, dz: pz, rejX: 0, rejZ: 0 };
                            const pathX = u.x - u._frameStartX;
                            const pathZ = u.z - u._frameStartZ;
                            const pathMag = Math.hypot(pathX, pathZ);
                            let rX = 0, rZ = 0;
                            if (pathMag > 0.0001) {
                                const dirX = pathX / pathMag;
                                const dirZ = pathZ / pathMag;
                                const pushParallel = px * dirX + pz * dirZ;
                                if (pushParallel > 0) {
                                    const budget = Math.max(0, limit - pathMag);
                                    if (pushParallel > budget) {
                                        const excess = pushParallel - budget;
                                        const eX = dirX * excess;
                                        const eZ = dirZ * excess;
                                        rX += eX; rZ += eZ;
                                        px -= eX; pz -= eZ;
                                    }
                                }
                            }
                            // Idle units (pathMag is 0) should be easily shoved out of the way (5.0x),
                            // UNLESS they are heavy objects like siege equipment or the King.
                            let idleMult = 5.0;
                            if (u.type && (u.type.startsWith("siege") || u.type === "king" || (u.type === "soldier" && u.weapon === "RoyalKnight"))) {
                                idleMult = 0.1; // Heavy units barely budge when idle
                            }
                            // Moving units can be pushed sideways at 2.5x to allow smooth sliding/passing.
                            const maxLat = limit * (pathMag > 0.0001 ? 2.5 : idleMult);
                            const curMag = Math.hypot(px, pz);
                            if (curMag > maxLat) {
                                const scale = maxLat / curMag;
                                rX += px * (1 - scale);
                                rZ += pz * (1 - scale);
                                px *= scale;
                                pz *= scale;
                            }
                            return { dx: px, dz: pz, rejX: rX, rejZ: rZ };
                        }
                        let resB = resolvePush(uB, dxB, dzB, deltaTime);
                        dxB = resB.dx; dzB = resB.dz;
                        dxA -= resB.rejX; dzA -= resB.rejZ;
                        let resA = resolvePush(uA, dxA, dzA, deltaTime);
                        dxA = resA.dx; dzA = resA.dz;
                        dxB -= resA.rejX; dzB -= resA.rejZ;
                        const pAX = uA.x + dxA;
                        const pAZ = uA.z + dzA;
                        const pBX = uB.x + dxB;
                        const pBZ = uB.z + dzB;
                        const floorAY = getFloorHeight(uA, pAX, pAZ).y;
                        const floorBY = getFloorHeight(uB, pBX, pBZ).y;
                        const cFloorA = getFloorHeight(uA, uA.x, uA.z);
                        const cTerrainA = getTerrainHeight(uA.x, uA.z);
                        const maxJumpDownA = (uA.y > cTerrainA + 1.0 && !cFloorA.onWall) ? 12.0 : 1.2;
                        const cFloorB = getFloorHeight(uB, uB.x, uB.z);
                        const cTerrainB = getTerrainHeight(uB.x, uB.z);
                        const maxJumpDownB = (uB.y > cTerrainB + 1.0 && !cFloorB.onWall) ? 12.0 : 1.2;
                        if (floorAY >= uA.y - maxJumpDownA && floorAY <= uA.y + 1.2) {
                            uA.x = pAX;
                            uA.z = pAZ;
                            uA.y = floorAY;
                            uA.mesh.position.set(uA.x, uA.y, uA.z);
                        }
                        if (floorBY >= uB.y - maxJumpDownB && floorBY <= uB.y + 1.2) {
                            uB.x = pBX;
                            uB.z = pBZ;
                            uB.y = floorBY;
                            uB.mesh.position.set(uB.x, uB.y, uB.z);
                        }
                    }
                }
            }
        }
    }
    // 1.7 Building collision push
    activeUnits.forEach(unit => {
        if (!unit.mesh || (!unit.mesh.visible && unit.weapon !== "Assassin")) return;
        if (unit.weapon === "Assassin") return; // Assassins climb over buildings, so skip circular pushback
        let netPushX = 0, netPushZ = 0;
        let pushCount = 0;
        let inOpenGate = false;
        if (unit.radius > 0.4) {
            for (let i = 0; i < buildings.length; i++) {
                const e = buildings[i];
                if (((e.type === "gatehouse" && e.isOpen !== false) || e.type === "tower" || e.type === "tower_tile") && Math.hypot(unit.x - e.x, unit.z - e.z) < (unit.radius + 0.2) && unit.y <= e.y + (e.height || 2.0) - 0.8) {
                    inOpenGate = true;
                    break;
                }
            }
        }
        buildings.forEach(b => {
            const bHwX = (b.dimX !== undefined ? b.dimX : ((b.radius || 0.5) * 2)) / 2;
            const bHwZ = (b.dimZ !== undefined ? b.dimZ : ((b.radius || 0.5) * 2)) / 2;
            const cullDistX = bHwX + unit.radius + 0.5;
            const cullDistZ = bHwZ + unit.radius + 0.5;
            const dx = unit.x - b.x;
            if (dx > cullDistX || dx < -cullDistX) return; // Quick cull X
            const dz = unit.z - b.z;
            if (dz > cullDistZ || dz < -cullDistZ) return; // Quick cull Z
            const dist = Math.hypot(dx, dz);
            const isBoxBuilding = BUILDING_TYPES[b.type] !== undefined && b.type !== "wall_column" && b.type !== "keep";
            if (b.isPlanned && unit.type === "king" && unit.faction === b.faction) {
                let withinBuildRange = false;
                if (b.type === "gatehouse" || b.type === "wall_column") {
                    const hw = (b.dimX || 1) / 2;
                    const hd = (b.dimZ || 1) / 2;
                    if (unit.x >= b.x - hw - 1.5 && unit.x <= b.x + hw + 1.5 && unit.z >= b.z - hd - 1.5 && unit.z <= b.z + hd + 1.5) {
                        withinBuildRange = true;
                    }
                } else if (isBoxBuilding) {
                    const hw = b.radius || 0.5;
                    const bMinX = b.x - hw;
                    const bMaxX = b.x + hw;
                    const bMinZ = b.z - hw;
                    const bMaxZ = b.z + hw;
                    if (unit.x >= bMinX - 1.5 && unit.x <= bMaxX + 1.5 && unit.z >= bMinZ - 1.5 && unit.z <= bMaxZ + 1.5) {
                        withinBuildRange = true;
                    }
                } else {
                    if (dist < (unit.radius + b.radius) + 1.5) withinBuildRange = true;
                }
                if (withinBuildRange) {
                    let rType = b.material || ((b.type === "wall_column" || b.type === "gatehouse" || b.type === "wall_ramp") ? "stone" : "wood");
                    let unassignedCost = (b.resourcesNeededTotal || 0) - (b.resourcesDelivered || 0);
                    let keepDist = 0;
                    const keep = entities.find(e => e.type === "keep" && e.faction === b.faction && e.state !== "dead" && !e.isPlanned);
                    if (keep) {
                        keepDist = Math.hypot(b.x - keep.x, b.z - keep.z);
                    }
                    const baseRate = 20; // base resources/sec
                    const buildRate = baseRate / Math.max(1.0, keepDist / 15.0);
                    if (b.resourcesNeededTotal > 0) {
                        if (unassignedCost > 0) {
                            unit.buildFraction = (unit.buildFraction || 0) + buildRate * deltaTime;
                            let deductInt = Math.floor(unit.buildFraction);
                            if (deductInt > 0) {
                                unit.buildFraction -= deductInt;
                                let toDeduct = Math.min(unassignedCost, resources[rType], deductInt);
                                if (toDeduct > 0) {
                                    resources[rType] -= toDeduct;
                                    b.resourcesDelivered += toDeduct;
                                    unassignedCost -= toDeduct;
                                    b.constructionProgress = b.resourcesDelivered / b.resourcesNeededTotal;
                                    b.health = Math.max(1, b.maxHealth * b.constructionProgress);
                                    if (b.mesh && b.type !== "wall_column" && b.type !== "gatehouse") {
                                        b.mesh.scale.y = Math.max(0.1, b.constructionProgress);
                                    }
                                    // Update UI so the player can see resources draining in real-time
                                    if (unit.faction === "red") {
                                        window.uiNeedsUpdate = true;
                                    }
                                }
                            }
                        }
                        if (unassignedCost <= 0 && b.constructionProgress >= 1.0) {
                            completeBuilding(b);
                            showStatusLog(b.faction.toUpperCase() + " " + b.type + " constructed by King!");
                        }
                    } else {
                        // Free buildings (e.g. farms) take time based on config scaled by distance
                        const distFactor = Math.max(1.0, keepDist / 15.0);
                        const modifiedBuildTime = (b.buildTime || 10) * distFactor;
                        // King builds free things at 4x peasant speed
                        b.constructionProgress += (deltaTime / modifiedBuildTime) * 4.0;
                        b.health = Math.max(1, b.maxHealth * b.constructionProgress);
                        if (b.mesh && b.type !== "wall_column" && b.type !== "gatehouse") {
                            b.mesh.scale.y = Math.max(0.1, Math.min(1.0, b.constructionProgress));
                        }
                        if (b.constructionProgress >= 1.0) {
                            completeBuilding(b);
                            showStatusLog(b.faction.toUpperCase() + " " + b.type + " constructed by King!");
                        }
                    }
                }
            }
            if (unit.isPhasing) return;
            if (b.type === "wall_column" && inOpenGate) return;
            if (b.type === "tree" && unit.weapon === "Assassin") return;
            if (b.type === "farm" || b.type === "mine") return;
            if (b.type === "tower_tile") return; // Physics handled purely by getFloorHeight
            let isColliding = false;
            let pushX = 0;
            let pushZ = 0;
            let overlapDist = 0;
            if (isBoxBuilding) {
                const hwX = (b.dimX !== undefined ? b.dimX : ((b.radius || 0.5) * 2)) / 2;
                const hwZ = (b.dimZ !== undefined ? b.dimZ : ((b.radius || 0.5) * 2)) / 2;
                const ur = unit.radius;
                const absX = Math.abs(unit.x - b.x);
                const absZ = Math.abs(unit.z - b.z);
                if (absX < hwX + ur && absZ < hwZ + ur) {
                    if (absX > hwX && absZ > hwZ) {
                        const cornerDist = Math.hypot(absX - hwX, absZ - hwZ);
                        if (cornerDist < ur) {
                            isColliding = true;
                            overlapDist = ur - cornerDist;
                            const pushDirX = (absX - hwX) / cornerDist;
                            const pushDirZ = (absZ - hwZ) / cornerDist;
                            pushX = pushDirX * overlapDist * Math.sign(unit.x - b.x);
                            pushZ = pushDirZ * overlapDist * Math.sign(unit.z - b.z);
                            // Gentle nudge to glide off the perfect equilibrium of a rounded corner
                            const nX = pushDirX * Math.sign(unit.x - b.x);
                            const nZ = pushDirZ * Math.sign(unit.z - b.z);
                            let tX = -nZ; let tZ = nX;
                            const velX = unit.x - (unit.preMoveX !== undefined ? unit.preMoveX : unit.x);
                            const velZ = unit.z - (unit.preMoveZ !== undefined ? unit.preMoveZ : unit.z);
                            if (velX * tX + velZ * tZ < 0) { tX = -tX; tZ = -tZ; }
                            const nudge = 0.03;
                            pushX += tX * nudge;
                            pushZ += tZ * nudge;
                        }
                    } else {
                        isColliding = true;
                        const distLeft = (hwX + ur) - absX;
                        const distTop = (hwZ + ur) - absZ;
                        if (absZ <= hwZ && absX > hwX) {
                            pushX = distLeft * Math.sign(unit.x - b.x);
                            overlapDist = distLeft;
                        } else if (absX <= hwX && absZ > hwZ) {
                            pushZ = distTop * Math.sign(unit.z - b.z);
                            overlapDist = distTop;
                        } else {
                            if (distLeft < distTop) {
                                pushX = distLeft * Math.sign(unit.x - b.x);
                                overlapDist = distLeft;
                            } else {
                                pushZ = distTop * Math.sign(unit.z - b.z);
                                overlapDist = distTop;
                            }
                        }
                    }
                }
            } else if (b.type === "keep") {
                const ur = unit.radius || 0.1;
                const absX = Math.abs(unit.x - b.x);
                const absZ = Math.abs(unit.z - b.z);
                const maxArm = 2.5;
                const maxCenter = 1.5;
                if (absX < maxArm + ur && absZ < maxArm + ur) {
                    if (absX > maxCenter && absZ > maxCenter) {
                        const cornerDist = Math.hypot(absX - maxCenter, absZ - maxCenter);
                        if (cornerDist < ur) {
                            isColliding = true;
                            overlapDist = ur - cornerDist;
                            const pushDirX = (absX - maxCenter) / cornerDist;
                            const pushDirZ = (absZ - maxCenter) / cornerDist;
                            pushX = pushDirX * overlapDist * Math.sign(unit.x - b.x);
                            pushZ = pushDirZ * overlapDist * Math.sign(unit.z - b.z);
                            // Gentle nudge to glide off the perfect equilibrium of a rounded corner
                            const nX = pushDirX * Math.sign(unit.x - b.x);
                            const nZ = pushDirZ * Math.sign(unit.z - b.z);
                            let tX = -nZ; let tZ = nX;
                            const velX = unit.x - (unit.preMoveX !== undefined ? unit.preMoveX : unit.x);
                            const velZ = unit.z - (unit.preMoveZ !== undefined ? unit.preMoveZ : unit.z);
                            if (velX * tX + velZ * tZ < 0) { tX = -tX; tZ = -tZ; }
                            const nudge = 0.03;
                            pushX += tX * nudge;
                            pushZ += tZ * nudge;
                        }
                    } else {
                        isColliding = true;
                        const dXOuter = maxArm + ur - absX;
                        const dZOuter = maxArm + ur - absZ;
                        const dXInner = (absZ > maxCenter) ? (maxCenter + ur - absX) : 999;
                        const dZInner = (absX > maxCenter) ? (maxCenter + ur - absZ) : 999;
                        let options = [
                            { dir: 'X', val: dXOuter },
                            { dir: 'Z', val: dZOuter }
                        ];
                        if (dXInner > 0 && dXInner !== 999) options.push({ dir: 'X', val: dXInner });
                        if (dZInner > 0 && dZInner !== 999) options.push({ dir: 'Z', val: dZInner });
                        options.sort((a, b) => a.val - b.val);
                        overlapDist = options[0].val;
                        if (options[0].dir === 'X') pushX = overlapDist * Math.sign(unit.x - b.x);
                        if (options[0].dir === 'Z') pushZ = overlapDist * Math.sign(unit.z - b.z);
                    }
                }
            } else {
                const bRadius = (b.radius || 0.5);
                const minDist = unit.radius + bRadius;
                if (dist < minDist) {
                    isColliding = true;
                    overlapDist = minDist - dist;
                    if (dist > 0.01) {
                        const nX = dx / dist;
                        const nZ = dz / dist;
                        pushX = nX * overlapDist;
                        pushZ = nZ * overlapDist;
                        // Gentle nudge to glide off perfect equilibrium
                        let tX = -nZ; let tZ = nX;
                        const velX = unit.x - (unit.preMoveX !== undefined ? unit.preMoveX : unit.x);
                        const velZ = unit.z - (unit.preMoveZ !== undefined ? unit.preMoveZ : unit.z);
                        if (velX * tX + velZ * tZ < 0) { tX = -tX; tZ = -tZ; }
                        // If perfectly still, pick a random side to slide
                        if (velX === 0 && velZ === 0 && Math.random() < 0.5) { tX = -tX; tZ = -tZ; }
                        const nudge = 0.03;
                        pushX += tX * nudge;
                        pushZ += tZ * nudge;
                    }
                }
            }
            if (isColliding) {
                if (b.isPlanned) {
                    if (unit.faction !== b.faction && unit.type !== "tree") {
                        triggerDeath(b, unit);
                        return;
                    } else if (b.resourcesDelivered === 0) {
                        return; // Walk straight through blueprints with no resources
                    }
                }
                const tempRoof = b.y + (b.height || 2.0);
                if (b.type === "gatehouse" && b.isOpen !== false && unit.y <= tempRoof - 0.8) return;
                // Towers allow passage ONLY if the unit is already elevated (on a wall).
                if (b.type === "tower" && unit.y > getTerrainHeight(unit.x, unit.z) + 0.5 && unit.y <= tempRoof - 0.8) return;
                if (b.type === "keep" && unit.y < b.y + 0.5) {
                    const angleToUnit = Math.atan2(unit.z - b.z, unit.x - b.x);
                    const doorAngle = b.mesh ? -b.mesh.rotation.y : 0;
                    let angleDiff = Math.abs(angleToUnit - doorAngle);
                    if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff;
                    if (angleDiff < Math.PI / 4) return; // Allow walking into the door!
                }
                let roof = b.y + (b.height || 2.0);
                if (b.type === "wall_column" && b.blocks) roof = b.y + b.blocks.length;
                if (b.isRamp && b.exactHeight !== undefined) {
                    const dot = (unit.x - b.x) * (b.rampDx || 0) + (unit.z - b.z) * (b.rampDz || 0);
                    const extraH = dot * Math.tan((b.rampSlope || 0) * Math.PI / 180);
                    roof = b.y + b.exactHeight + extraH;
                }
                let maxStep = b.isRamp ? 1.6 : 0.8;
                if ((b.type === "tower" || b.type === "gatehouse") && typeof pathGrid !== "undefined") {
                    const unitGX = Math.round(unit.x) + 150;
                    const unitGZ = Math.round(unit.z) + 150;
                    if (unitGX >= 0 && unitGX < 300 && unitGZ >= 0 && unitGZ < 300) {
                        const unitSurfs = pathGrid[unitGZ * 300 + unitGX];
                        if (unitSurfs && unitSurfs.isWall) maxStep = 999.0;
                    }
                }
                if (unit.y >= roof - maxStep) {
                    return; // Don't push them off the roof, and allow them to step onto it!
                }
                // Trapped unit failsafe: if deep inside the building, handle escape
                const isWorking = WORKER_STATES.has(unit.state);
                if ((overlapDist > (unit.radius || 0.2) + Math.min(0.8, (b.radius || 1.0) * 0.5) || pushCount >= 2) && !isWorking) {
                    if (b.type === "wall_column" || b.type === "wall_ramp" || b.type === "gatehouse" || b.type === "keep") {
                        unit.y = roof;
                    } else {
                        // Find nearest pathable tile
                        let bestDist = Infinity;
                        let bestPt = null;
                        for (let ox = -3; ox <= 3; ox++) {
                            for (let oz = -3; oz <= 3; oz++) {
                                const gx = Math.floor(unit.x + ox + 150);
                                const gz = Math.floor(unit.z + oz + 150);
                                if (gx >= 0 && gx < 300 && gz >= 0 && gz < 300) {
                                    const idx = gz * 300 + gx;
                                    if (regionGrid[idx] !== 65535 && (!pathGrid[idx] || !(pathGrid[idx].isBuilding && !pathGrid[idx].isWall))) {
                                        const px = gx - 150 + 0.5;
                                        const pz = gz - 150 + 0.5;
                                        // Ensure this tile is ACTUALLY safe from buildings (prevents teleporting back into off-grid gaps)
                                        let isSafe = true;
                                        for (let i = 0; i < buildings.length; i++) {
                                            const bb = buildings[i];
                                            if (Math.hypot(px - bb.x, pz - bb.z) < (bb.radius || 1.0) + (unit.radius || 0.2)) {
                                                isSafe = false;
                                                break;
                                            }
                                        }
                                        if (isSafe) {
                                            const dist = Math.hypot(unit.x - px, unit.z - pz);
                                            if (dist < bestDist) {
                                                bestDist = dist;
                                                bestPt = { x: px, z: pz };
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (bestPt) {
                            unit.x = bestPt.x;
                            unit.z = bestPt.z;
                        } else {
                            const escapeDist = (b.radius || 1.0) + (unit.radius || 0.2) + 0.1;
                            let angle = Math.atan2(unit.z - b.z, unit.x - b.x);
                            if (unit.x === b.x && unit.z === b.z) angle = Math.random() * Math.PI * 2;
                            unit.x = b.x + (Math.cos(angle) || 0) * escapeDist;
                            unit.z = b.z + (Math.sin(angle) || 0) * escapeDist;
                        }
                    }
                    if (unit.mesh) unit.mesh.position.set(unit.x, unit.y, unit.z);
                    return;
                }
                // Apply Orthogonal Restitution if squeezed (watermelon seed effect)
                if (pushCount > 0) {
                    const dot = (netPushX * pushX) + (netPushZ * pushZ);
                    if (dot < -0.001) {
                        const originalPushX = pushX;
                        // Cycle squirt directions based on unit ID and time period (120 frames = 2.0s)
                        // This ensures they persistently slide out of long cracks, but if they slide into a dead-end T-junction,
                        // they will eventually turn around and slide back out the way they came!
                        const period = Math.floor(gameFrameCount / 120);
                        const seed = period * 1337 + (unit.id || 0);
                        const dir = (seed % 2 === 0) ? 1 : -1;
                        pushX += -pushZ * 0.5 * dir;
                        pushZ += originalPushX * 0.5 * dir;
                    }
                }
                netPushX += pushX;
                netPushZ += pushZ;
                pushCount++;
                const nextX = unit.x + pushX;
                const nextZ = unit.z + pushZ;
                const floorData = getFloorHeight(unit, nextX, nextZ);
                const dy = floorData.y - unit.y;
                unit.x = nextX;
                unit.z = nextZ;
                if (dy <= 1.6 || Math.atan2(dy, overlapDist) * (180/Math.PI) <= 45) {
                    unit.y = floorData.y;
                }
                unit.mesh.position.set(unit.x, unit.y, unit.z);
            }
        });
    });
    // 4. Stuck Detection & Re-pathing (Removed due to high-FPS teleport bug. Primary delta-time stuck detection handles repaths perfectly)
    activeUnits.forEach(unit => {
        if (!unit.mesh) return;
        // Always apply gravity even if X/Z didn't change so stuck units can fall!
        const finalFloorY = getFloorHeight(unit, unit.x, unit.z).y;
        const isAssassin = unit.weapon === "Assassin";
        let isTowerWallJumpSnap = false; // Obsolete hack removed
        if (unit.y > finalFloorY && !unit.isClimbing) {
            if (isAssassin || isTowerWallJumpSnap) {
                unit.y = finalFloorY;
            } else {
                unit.y = Math.max(finalFloorY, unit.y - 15.0 * deltaTime);
            }
            unit.mesh.position.set(unit.x, unit.y, unit.z);
        } else if (unit.y < finalFloorY && finalFloorY - unit.y <= ((isAssassin || isTowerWallJumpSnap) ? 999.0 : 1.2)) {
            unit.y = finalFloorY;
            unit.mesh.position.set(unit.x, unit.y, unit.z);
        } else if (unit.x !== unit._frameStartX || unit.z !== unit._frameStartZ) {
            unit.mesh.position.set(unit.x, unit.y, unit.z);
        }
        if (isAssassin && Math.abs(unit.y - unit._frameStartY) > 1.0) {
            spawnAssassinSmoke(unit, unit._frameStartX, unit._frameStartY, unit._frameStartZ);
        }
        unit.preMoveX = undefined;
        unit.preMoveZ = undefined;
    });
}
function getPredictedTargetPosition(target, timeSeconds = 10.0) {
    let px = target.x;
    let pz = target.z;
    if (target.targetPosition && target.speed > 0) {
        const dx = target.targetPosition.x - target.x;
        const dz = target.targetPosition.z - target.z;
        const d = Math.hypot(dx, dz);
        if (d > 0) {
            const moveDist = Math.min(d, target.speed * timeSeconds);
            px += (dx / d) * moveDist;
            pz += (dz / d) * moveDist;
        }
    }
    return new THREE.Vector3(px, getTerrainHeight(px, pz), pz);
}
// --- COMBAT & DAMAGE ENGINE ---
function handleCombat(deltaTime, combatants) {
    combatants.forEach(unit => {
        if (unit.cooldownTimer > 0) {
            unit.cooldownTimer -= deltaTime;
        }
        // All units (including peasants) can now natively defend themselves thanks to spatial hashing!
        if (unit.type === "siege_shield") return;
        // Restore worker combat filter: only idle, wandering, or manually commanded peasants will fight
        if (unit.type === "peasant" && !["idle", "wander", "fightmove", "attacking", "going_home", "moving"].includes(unit.state)) {
            return;
        }
        const isFightMoving = (unit.state === "fightmove") || (unit.state === "attacking" && unit.savedFightMoveDest) || (unit.isAggro && (unit.state === "idle" || unit.state === "wander"));
        const isManuallyMoving = (unit.state === "moving" || unit.state === "training");
        const isMountedShortBow = (unit.weapon === "Short Bow" && unit.hasHorse);
        const wStats = unit.weapon ? (WEAPONS[unit.weapon] || { range: 1.0, dmg: 10, cd: 1.0, type: "melee" }) : { range: (unit.type === "king" ? 1.3 : 0.9), dmg: (unit.type === "king" ? 25 : 5), cd: 1.0, type: "melee" };
        let target = unit.targetEntity;
        if (target && target.state === "dead") {
            target = null;
            unit.targetEntity = null;
            // If finished fightmove fight, resume movement
            if (unit.savedFightMoveDest) {
                unit.state = "fightmove";
                unit.targetPosition = unit.savedFightMoveDest.clone();
                unit.savedFightMoveDest = null;
                unit.path = null;
                unit.pathCooldown = 0;
            } else if (unit.state === "attacking") {
                if (!processNextCommand(unit)) {
                    unit.state = "idle";
                    unit.isExplicitAttack = false;
                    unit.targetPosition = null;
                    unit.path = null;
                    unit.pathCooldown = 0;
                }
            }
        }
        if (unit.state === "attack_ground" && unit.targetPosition) {
            target = {
                x: unit.targetPosition.x,
                y: unit.targetPosition.y,
                z: unit.targetPosition.z,
                radius: 0.1,
                height: 0.2,
                state: "alive",
                isGroundTarget: true
            };
        }
        // Auto-acquisition logic
        if (!target) {
            if (isManuallyMoving) {
                if (!isMountedShortBow) {
                    return; // Direct move commands ignore out-of-range combat targeters
                }
            }
            if (unit.type === "peasant" && unit.state === "wander" && (unit.id % 10 !== gameFrameCount % 10)) {
                return; // Throttle idle peasant combat scans to 6Hz (10 frames)
            }
            if ((unit.weapon === "Catapult" || unit.weapon === "Trebuchet" || unit.weapon === "Mangonel") && !isFightMoving) {
                return; // Catapult does not auto-target unless fightmoving
            }
            // Pre-calculate baseline seek limit
            const isRanged = (wStats.type === "bow" || wStats.type === "crossbow" || wStats.type === "catapult");
            const estimatedHeightAdv = isRanged ? Math.max(0, unit.y - getTerrainHeight(unit.x, unit.z)) : 0;
            const baselineSeekLimit = Math.max(15.0, wStats.range + unit.radius + 1.0) + estimatedHeightAdv;
            const gridRange = Math.ceil(baselineSeekLimit / SPATIAL_CELL_SIZE);
            const cellX = Math.max(0, Math.min(SPATIAL_WIDTH - 1, Math.floor((unit.x + 150) / SPATIAL_CELL_SIZE)));
            const cellZ = Math.max(0, Math.min(SPATIAL_HEIGHT - 1, Math.floor((unit.z + 150) / SPATIAL_CELL_SIZE)));
            let bestDist = Infinity;
            // Helper to check a grid
            const checkGrid = (gridArr) => {
                for (let oz = -gridRange; oz <= gridRange; oz++) {
                    const cz = cellZ + oz;
                    if (cz < 0 || cz >= SPATIAL_HEIGHT) continue;
                    for (let ox = -gridRange; ox <= gridRange; ox++) {
                        const cx = cellX + ox;
                        if (cx < 0 || cx >= SPATIAL_WIDTH) continue;
                        const cellEnts = gridArr[cz * SPATIAL_WIDTH + cx];
                        for (let k = 0; k < cellEnts.length; k++) {
                            const enemy = cellEnts[k];
                            if (enemy.faction !== unit.faction && enemy.faction !== "neutral" && !["tree", "gold", "iron", "stone"].includes(enemy.type) && enemy.state !== "dead" && !(enemy.weapon === "Spy" && enemy.isDisguised)) {
                                if (unit.weapon === "Catapult" || unit.weapon === "Trebuchet" || unit.weapon === "Mangonel") {
                                    const isEnemyUnit = (enemy.type === "soldier" || enemy.type === "peasant" || enemy.type === "king");
                                    const isExplicitFightMoving = (unit.state === "fightmove" || (unit.state === "attacking" && unit.savedFightMoveDest));
                                    if (isEnemyUnit && !isExplicitFightMoving) continue;
                                }
                                const isEnemyStone = (enemy.material === "stone" || enemy.type === "keep" || enemy.type === "wall_column" || enemy.type === "gatehouse" || enemy.type === "wall_ramp");
                                if ((wStats.type === "bow" || wStats.type === "crossbow") && isEnemyStone) continue;
                                const dx = enemy.x - unit.x;
                                const dy = enemy.y - unit.y;
                                const dz = enemy.z - unit.z;
                                const distSq = dx*dx + dy*dy + dz*dz;
                                if (enemy.weapon === "Assassin" && distSq > 225.0) continue;
                                const isRanged = (wStats.type === "bow" || wStats.type === "crossbow" || wStats.type === "catapult");
                                const exactHeightAdv = isRanged ? Math.max(0, unit.y - enemy.y) : 0;
                                const exactSeekLimit = Math.max(15.0, wStats.range + unit.radius + 1.0) + exactHeightAdv;
                                if (distSq < bestDist * bestDist && distSq <= exactSeekLimit * exactSeekLimit) {
                                    bestDist = Math.sqrt(distSq);
                                    target = enemy;
                                }
                            }
                        }
                    }
                }
            };
            checkGrid(unitGrid);
            checkGrid(buildingGrid);
        }
        if (target) {
            const isRanged = (wStats.type === "bow" || wStats.type === "crossbow" || wStats.type === "catapult");
            const exactTargetHeightAdv = isRanged ? Math.max(0, unit.y - target.y) : 0;
            const chaseLimit = Math.max(20.0, wStats.range + 5.0) + exactTargetHeightAdv;
            const distToTarget = Math.hypot(target.x - unit.x, target.y - unit.y, target.z - unit.z);
            if (distToTarget > chaseLimit) {
                // If it was explicitly ordered to attack, let's just let it chase across the map.
                if (unit.savedFightMoveDest) {
                    target = null;
                    unit.targetEntity = null;
                    unit.state = "fightmove";
                    unit.targetPosition = unit.savedFightMoveDest.clone();
                    unit.savedFightMoveDest = null;
                    unit.path = null;
                    unit.pathCooldown = 0;
                } else if (unit.state === "moving" || unit.state === "wander" || unit.state === "idle") {
                    target = null;
                    unit.targetEntity = null;
                } else if (unit.state === "attacking" && !unit.isExplicitAttack) {
                    target = null;
                    unit.targetEntity = null;
                    unit.state = "idle";
                }
            } else if (!isRanged && unit.state === "idle" && distToTarget > wStats.range + unit.radius + target.radius + 2.0 && (unit.id % 15 === gameFrameCount % 15)) {
                // Melee units watching distant enemies periodically drop target to allow re-evaluating closer threats
                target = null;
                unit.targetEntity = null;
            }
        }
        if (target && unit.state !== "attacking") {
            if (isFightMoving) {
                if (isMountedShortBow) {
                    unit.targetEntity = target;
                } else {
                    // Engage and chase
                    unit.savedFightMoveDest = unit.targetPosition ? unit.targetPosition.clone() : (unit.fightMoveDestination ? unit.fightMoveDestination.clone() : new THREE.Vector3(unit.x, unit.y, unit.z));
                    if (unit.weapon === "Catapult" || unit.weapon === "Trebuchet" || unit.weapon === "Mangonel") {
                        unit.targetEntity = null;
                        unit.state = "attack_ground";
                        unit.targetPosition = getPredictedTargetPosition(target);
                    } else {
                        unit.targetEntity = target;
                        unit.state = "attacking";
                        unit.isExplicitAttack = false;
                    }
                    unit.path = null;
                    unit.pathCooldown = 0;
                }
            } else {
                // Not fightmoving, but found a target
                if (unit.type !== "peasant") {
                    unit.targetEntity = target;
                    // Intentionally do NOT change state to "attacking" so idle/moving units won't chase
                    if (!isMountedShortBow) {
                        unit.path = null;
                        unit.pathCooldown = 0;
                    }
                }
            }
        }
        if (!target) return;
        // Distance Check
        const isRanged = (wStats.type === "bow" || wStats.type === "crossbow" || wStats.type === "catapult");
        const heightAdv = isRanged ? Math.max(0, unit.y - target.y) : 0;
        const attackRange = wStats.range + heightAdv + unit.radius + (target.radius || 1.0);
        const dist = Math.hypot(target.x - unit.x, target.y - unit.y, target.z - unit.z);
        let inRange = (dist <= attackRange);
        if (inRange && !isRanged) {
            if (!hasMeleeLineOfSight(unit, target)) {
                inRange = false;
            }
        }
        if (inRange) {
            if (unit.weapon === "Catapult" || unit.weapon === "Trebuchet" || unit.weapon === "Mangonel") {
                unit.mesh.rotation.y = Math.atan2(target.x - unit.x, target.z - unit.z);
            }
            // Check bows/crossbow reload readiness
            let stanceReady = true;
            if (wStats.type === "bow" || wStats.type === "catapult") {
                if (unit.timeStationary < wStats.prepTime) {
                    stanceReady = false;
                }
            } else if (wStats.type === "crossbow") {
                if (unit.reloadTimer < wStats.reloadTime) {
                    stanceReady = false;
                }
            }
            if (unit.cooldownTimer <= 0 && stanceReady) {
                unit.cooldownTimer = wStats.cd;
                if (unit.faction === "blue" && gameDifficulty !== "test" && (unit.weapon === "Spear" || unit.weapon === "Pike")) {
                    unit.kiteTimer = 1.0 + Math.random(); // 1 to 2 seconds of kiting
                }
                if (isRanged) {
                    if (unit.weapon === "Mangonel") {
                        for (let i = 0; i < 10; i++) {
                            spawnProjectile(unit, target, wStats.dmg);
                        }
                    } else {
                        spawnProjectile(unit, target, wStats.dmg);
                    }
                    if (wStats.type === "crossbow") {
                        unit.reloadTimer = 0;
                    }
                    if (wStats.type === "bow") {
                        unit.timeStationary = 0;
                    }
                } else {
                    dealDamage(unit, target, wStats.dmg);
                    spawnSlashEffect(target.x, target.y + target.height * 0.5, target.z);
                    if (unit.weapon === "Doppelsoldner") {
                        const hits = getEntitiesInSplashRadius(target.x, target.z, 2.0);
                        hits.forEach(hit => {
                            if (hit.ent !== target && hit.ent.faction !== unit.faction && hit.ent.state !== "dead" && !["tree","gold","iron","stone"].includes(hit.ent.type)) {
                                dealDamage(unit, hit.ent, 15);
                                spawnSlashEffect(hit.ent.x, hit.ent.y + hit.ent.height * 0.5, hit.ent.z);
                            }
                        });
                    }
                }
                unit.mesh.rotation.y = Math.atan2(target.x - unit.x, target.z - unit.z);
            }
            // Stop chasing if we hit range limit
            if (unit.state === "attacking" || unit.state === "attack_ground") {
                if (unit.state === "attacking") {
                    unit.targetPosition = null;
                }
                unit.path = null;
                unit.inCombatRange = true;
            }
        } else {
            // Out of range: Idle units do NOT chase. Attacking/chasing units DO chase.
            unit.inCombatRange = false;
            if (unit.state === "attacking") {
                if (target.y > unit.y + 1.0) {
                    // Try to path onto the wall/building
                    unit.targetPosition = new THREE.Vector3(target.x, target.y, target.z);
                } else {
                    unit.targetPosition = new THREE.Vector3(target.x, getTerrainHeight(target.x, target.z), target.z);
                }
            }
        }
    });
}
// --- HELPER TO CALCULATE UNIT VELOCITY ---
function getUnitVelocity(unit) {
    if (unit.inCombatRange) return { x: 0, z: 0 };
    if (unit.targetPosition && unit.baseSpeed > 0 && unit.state !== "dead") {
        const target = (unit.path && unit.path.length > 0) ? unit.path[0] : unit.targetPosition;
        const dx = target.x - unit.x;
        const dz = target.z - unit.z;
        const dist = Math.hypot(dx, dz);
        if (dist > 0.15) {
            // Sample terrain slope to account for uphill speed penalties, mirroring movement logic
            let speedMod = 1.0;
            const stepDist = Math.min(dist, 1.0);
            const sampleX = unit.x + (dx / dist) * stepDist;
            const sampleZ = unit.z + (dz / dist) * stepDist;
            const sampleY = getFloorHeight(unit, sampleX, sampleZ).y;
            const dy = sampleY - unit.y;
            if (stepDist > 0 && dy > 0) {
                const slopeDeg = Math.atan2(dy, stepDist) * (180 / Math.PI);
                speedMod = Math.max(0.1, 1.0 - (slopeDeg * 0.01));
            }
            const effSpeed = unit.speed * speedMod;
            return {
                x: (dx / dist) * effSpeed,
                z: (dz / dist) * effSpeed
            };
        }
    }
    return { x: 0, z: 0 };
}
// --- HELPER TO CALCULATE INTERCEPTION (LEADING) ---
function calculateInterception(attackerPos, targetPos, targetVelocity, projectileSpeed) {
    const dx = targetPos.x - attackerPos.x;
    const dz = targetPos.z - attackerPos.z;
    const vx = targetVelocity.x;
    const vz = targetVelocity.z;
    const A = vx * vx + vz * vz - projectileSpeed * projectileSpeed;
    const B = 2 * (dx * vx + dz * vz);
    const C = dx * dx + dz * dz;
    let t = 0;
    if (Math.abs(A) > 0.0001) {
        const disc = B * B - 4 * A * C;
        if (disc >= 0) {
            const t1 = (-B + Math.sqrt(disc)) / (2 * A);
            const t2 = (-B - Math.sqrt(disc)) / (2 * A);
            if (t1 > 0 && t2 > 0) t = Math.min(t1, t2);
            else if (t1 > 0) t = t1;
            else if (t2 > 0) t = t2;
        }
    }
    if (t <= 0) {
        t = Math.sqrt(C) / projectileSpeed;
    }
    t = Math.min(t, 4.0); // clamp lookahead offset
    const finalX = targetPos.x + vx * t;
    const finalZ = targetPos.z + vz * t;
    return new THREE.Vector3(finalX, getFloorHeight({y: 10000}, finalX, finalZ).y, finalZ);
}
// --- PROJECTILE SYSTEMS ---
function spawnProjectile(attacker, target, damage) {
    const arrowGroup = new THREE.Group();
    const isCatapult = attacker.weapon === "Catapult" || attacker.weapon === "Trebuchet" || attacker.weapon === "Mangonel";
    if (attacker.weapon === "Catapult" || attacker.weapon === "Trebuchet") {
        const boulderRadius = attacker.weapon === "Trebuchet" ? 0.45 : 0.3;
        const boulder = new THREE.Mesh(new THREE.SphereGeometry(boulderRadius, 8, 8), new THREE.MeshStandardMaterial({ color: 0x9e9e9e }));
        arrowGroup.add(boulder);
    } else if (attacker.weapon === "Slinger" || attacker.weapon === "Mangonel") {
        const rSize = attacker.weapon === "Mangonel" ? 0.15 : 0.1;
        const rock = new THREE.Mesh(new THREE.SphereGeometry(rSize, 8, 8), new THREE.MeshStandardMaterial({ color: 0x9e9e9e }));
        arrowGroup.add(rock);
    } else {
        const length = attacker.weapon === "Ballista" ? 1.0 : 0.5;
        const width = attacker.weapon === "Ballista" ? 0.05 : 0.01;
        const arrowGeo = new THREE.CylinderGeometry(width, width, length, 4);
        arrowGeo.rotateX(Math.PI / 2);
        const arrowMat = new THREE.MeshBasicMaterial({ color: 0x4e342e });
        const arrow = new THREE.Mesh(arrowGeo, arrowMat);
        arrowGroup.add(arrow);
        const feather = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, 0.12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        feather.position.z = -length/2;
        arrowGroup.add(feather);
    }
    const startX = attacker.x;
    let startY = attacker.y + attacker.height * 0.7;
    if (attacker.weapon === "Trebuchet") startY = attacker.y + 4.5;
    else if (attacker.weapon === "Catapult" || attacker.weapon === "Mangonel") startY = attacker.y + 2.5;
    const startZ = attacker.z;
    arrowGroup.position.set(startX, startY, startZ);
    scene.add(arrowGroup);
    // Calculate leading point
    const v_t = getUnitVelocity(target);
    const pSpeed = 24.0;
    const interception = calculateInterception({ x: startX, z: startZ }, { x: target.x, y: target.y, z: target.z }, v_t, pSpeed);
    // Miss Chance (1% per distance unit)
    const dist = Math.hypot(target.x - attacker.x, target.y - attacker.y, target.z - attacker.z);
    const hasLoS = hasProjectileLoS(attacker, target);
    let missChance = dist * (attacker.weapon === "Catapult" ? 0.02 : (attacker.weapon === "Ballista" ? 0.005 : 0.01));
    let scatterMax = dist * (attacker.weapon === "Catapult" ? 0.20 : (attacker.weapon === "Ballista" ? 0.05 : 0.10));
    if (attacker.weapon === "Slinger") {
        missChance *= 2;
        scatterMax *= 2;
    } else if (attacker.weapon === "Mangonel") {
        missChance *= 4;
        scatterMax *= 4;
    }
    const wStats = WEAPONS[attacker.weapon] || { range: 15 };
    let effectiveDist = dist;
    let arcHeight = 0.8 * (0.2 + Math.random() * 1.3);
    if (attacker.weapon === "Trebuchet") arcHeight = 25.0; // Very high arc for walls
    else if (attacker.weapon === "Catapult") arcHeight = 8.0;
    else if (attacker.weapon === "Mangonel") arcHeight = 8.0 * (0.8 + Math.random() * 0.4);
    else if (attacker.weapon === "Longbow") arcHeight = 6.0 * (0.2 + Math.random() * 1.3);
    else if (attacker.weapon === "Short Bow" || attacker.weapon === "Slinger") arcHeight = 4.0 * (0.2 + Math.random() * 1.3);
    if (!hasLoS && !isCatapult) {
        missChance *= 2;
        scatterMax *= 2;
        effectiveDist = wStats.range;
        arcHeight = Math.max(arcHeight, 12.0 + Math.random() * 4.0);
    }
    let aimX = isCatapult ? (target.x || target.x === 0 ? target.x : interception.x) : interception.x;
    let aimZ = isCatapult ? (target.z || target.z === 0 ? target.z : interception.z) : interception.z;
    let aimY = getFloorHeight({y: 10000}, aimX, aimZ).y + target.height * 0.6;
    let isMiss = false;
    if (Math.random() < missChance) {
        isMiss = true;
        const scatterDist = Math.random() * scatterMax;
        const scatterAngle = Math.random() * Math.PI * 2;
        aimX += Math.cos(scatterAngle) * scatterDist;
        aimZ += Math.sin(scatterAngle) * scatterDist;
        // Clamp to weapon max range
        const maxRangeWorld = wStats.range + (attacker.radius || 0.5) + (target.radius || 0.5);
        const newDist = Math.hypot(aimX - startX, aimZ - startZ);
        if (newDist > maxRangeWorld) {
            const dirX = (aimX - startX) / newDist;
            const dirZ = (aimZ - startZ) / newDist;
            aimX = startX + dirX * maxRangeWorld;
            aimZ = startZ + dirZ * maxRangeWorld;
        }
        aimY = getFloorHeight({y: 10000}, aimX, aimZ).y + (target.height || 1.0) * 0.6;
    }
    // Damage drop-off: reduce damage by 1 for every 10 units of distance
    const dmgReduction = isCatapult ? 0 : Math.floor(effectiveDist / 10);
    const finalDmg = Math.max(1, damage - dmgReduction);
    projectiles.push({
        mesh: arrowGroup,
        startX: startX,
        startY: startY,
        startZ: startZ,
        x: startX,
        y: startY,
        z: startZ,
        aimX: aimX,
        aimY: aimY,
        aimZ: aimZ,
        target: target,
        damage: finalDmg,
        attacker: attacker,
        timeAlive: 0,
        speed: pSpeed,
        isMiss: isMiss,
        arcHeight: arcHeight
    });
}
function getEntitiesInSplashRadius(x, z, radius) {
    const results = [];
    const cellX = Math.max(0, Math.min(SPATIAL_WIDTH - 1, Math.floor((x + 150) / SPATIAL_CELL_SIZE)));
    const cellZ = Math.max(0, Math.min(SPATIAL_HEIGHT - 1, Math.floor((z + 150) / SPATIAL_CELL_SIZE)));
    for (let oz = -1; oz <= 1; oz++) {
        const cz = cellZ + oz;
        if (cz < 0 || cz >= SPATIAL_HEIGHT) continue;
        for (let ox = -1; ox <= 1; ox++) {
            const cx = cellX + ox;
            if (cx < 0 || cx >= SPATIAL_WIDTH) continue;
            const idx = cz * SPATIAL_WIDTH + cx;
            const checkList = (list) => {
                if (!list) return;
                for(let i = 0; i < list.length; i++) {
                    const e = list[i];
                    if (e.state !== "dead" && e.type !== "tree") {
                        const dist = Math.hypot(e.x - x, e.z - z);
                        if (dist <= radius + (e.radius || 0.25)) {
                            results.push({ ent: e, dist: dist });
                        }
                    }
                }
            };
            checkList(unitGrid[idx]);
            checkList(buildingGrid[idx]);
        }
    }
    return results;
}
function updateProjectiles(deltaTime, activeShields) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.timeAlive += deltaTime;
        const targetX = p.aimX;
        const targetY = p.aimY;
        const targetZ = p.aimZ;
        const totalDist = Math.hypot(targetX - p.startX, targetZ - p.startZ);
        const currentDistTraveled = p.speed * p.timeAlive;
        const t = totalDist > 0.001 ? Math.min(currentDistTraveled / totalDist, 1.0) : 1.0;
        p.x = p.startX + (targetX - p.startX) * t;
        p.z = p.startZ + (targetZ - p.startZ) * t;
        const arcY = Math.sin(t * Math.PI) * p.arcHeight;
        p.y = p.startY + (targetY - p.startY) * t + arcY;
        p.mesh.position.set(p.x, p.y, p.z);
        const lookTarget = new THREE.Vector3(
            p.startX + (targetX - p.startX) * (t + 0.05),
            p.startY + (targetY - p.startY) * (t + 0.05) + Math.sin(Math.min(t + 0.05, 1.0) * Math.PI) * p.arcHeight,
            p.startZ + (targetZ - p.startZ) * (t + 0.05)
        );
        p.mesh.lookAt(lookTarget);
        let crashed = false;
        let crashEntity = null;
        if (t < 1.0) {
            const floorInfo = getFloorHeight({y: 10000}, p.x, p.z);
            if (p.y <= floorInfo.y) {
                crashed = true;
            }
            if (!crashed && activeShields) {
                for (let j = 0; j < activeShields.length; j++) {
                    const s = activeShields[j];
                    if (s.faction !== p.attacker.faction && s.state !== "dead") {
                        const distSq = (s.x - p.x)**2 + (s.z - p.z)**2;
                        if (distSq <= (s.radius)**2) {
                            if (p.y >= s.y && p.y <= s.y + (s.height || 2.0)) {
                                crashed = true;
                                crashEntity = s;
                                break;
                            }
                        }
                    }
                }
            }
            if (!crashed) {
                const cellIdx = getSpatialCell(p.x, p.z);
                const localTrees = spatialGrid[cellIdx];
                if (localTrees) {
                    for (let j = 0; j < localTrees.length; j++) {
                        const e = localTrees[j];
                        if (e.type === "tree" && e.state !== "dead") {
                            const distSq = (e.x - p.x)**2 + (e.z - p.z)**2;
                            // Trees block arrows as if 2 units wide (radius 1.0) and 2 units high
                            if (distSq <= 1.0) {
                                if (p.y >= e.y && p.y <= e.y + 2.0) {
                                    crashed = true;
                                    crashEntity = e;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (t >= 1.0 || crashed) {
            const isExplosive = (p.attacker.weapon === "Catapult" || p.attacker.weapon === "Trebuchet" || p.attacker.weapon === "Mangonel");
            
            if (isExplosive) {
                let hitAnything = false;
                const splashRadius = p.attacker.weapon === "Mangonel" ? 0.4 : 0.5;
                let potentialHits = getEntitiesInSplashRadius(p.x, p.z, splashRadius).filter(h => h.ent !== p.attacker);
                
                if (potentialHits.length > 0) {
                    hitAnything = true;
                    potentialHits.sort((a, b) => a.dist - b.dist);
                    let directHit = potentialHits[0].ent;
                    
                    if (!crashed && p.target && !p.target.isMock && !p.target.isGroundTarget && p.target.state !== "dead") {
                        const targetHit = potentialHits.find(h => h.ent === p.target);
                        if (targetHit) {
                            directHit = targetHit.ent;
                        }
                    }
                    if (crashed && crashEntity) {
                        const crashHit = potentialHits.find(h => h.ent === crashEntity);
                        if (crashHit) {
                            directHit = crashEntity;
                        }
                    }
                    
                    const splashDmg = p.attacker.weapon === "Trebuchet" ? 50 : 25;
                    
                    potentialHits.forEach(hit => {
                        if (hit.ent === directHit) {
                            dealDamage(p.attacker, hit.ent, p.damage);
                        } else if (p.attacker.weapon !== "Mangonel") {
                            dealDamage(p.attacker, hit.ent, splashDmg);
                        }
                    });
                } else if (crashed && crashEntity) {
                    dealDamage(p.attacker, crashEntity, p.damage);
                    hitAnything = true;
                }
                
                if (!hitAnything) {
                    spawnFloatingText(crashed ? "Blocked!" : "Missed!", p.x, p.y + 0.5, p.z, 0x757575);
                }
            } else {
                if (crashed) {
                    if (crashEntity) {
                        dealDamage(p.attacker, crashEntity, p.damage);
                    }
                    spawnFloatingText("Blocked!", p.x, p.y + 0.5, p.z, 0x757575);
                } else {
                    let hitEntity = null;
                    const hitboxRadius = 0.25;
                    if (p.target && !p.target.isMock && !p.target.isGroundTarget && p.target.state !== "dead") {
                        const hitDist = Math.hypot(p.target.x - p.x, p.target.z - p.z);
                        if (hitDist <= (p.target.radius + hitboxRadius)) {
                            hitEntity = p.target;
                        }
                    }
                    if (!hitEntity) {
                        const hits = getEntitiesInSplashRadius(p.x, p.z, hitboxRadius);
                        for (let j = 0; j < hits.length; j++) {
                            const ent = hits[j].ent;
                            if (ent !== p.attacker && ent.faction && ent.faction !== p.attacker.faction) {
                                hitEntity = ent;
                                break;
                            }
                        }
                    }
                    if (hitEntity) {
                        dealDamage(p.attacker, hitEntity, p.damage);
                    } else {
                        spawnFloatingText("Missed!", p.x, p.y + 0.5, p.z, 0x757575);
                    }
                }
            }
            scene.remove(p.mesh);
            disposeHierarchy(p.mesh);
            projectiles.splice(i, 1);
        }
    }
}
// --- HARVESTING & WORKER SYSTEM LOOPS ---
function processSoldierQueue(activePeasants) {
    const factions = ["red", "blue"];
    factions.forEach(faction => {
        let idlePeasants = activePeasants.filter(p => p.faction === faction && (p.state === "wander" || p.state === "going_home"));
        if (idlePeasants.length === 0) return;
        const sq = soldierTrainingQueue[faction];
        while (sq && sq.length > 0 && idlePeasants.length > 0) {
            const order = sq[0];
            const b = entities.find(e => e.id === order.barracksId);
            if (b && b.state !== "dead") {
                let bestDist = Infinity;
                let bestIdx = -1;
                for (let i = 0; i < idlePeasants.length; i++) {
                    const p = idlePeasants[i];
                    const dist = Math.hypot(p.x - b.x, p.z - b.z);
                    if (dist < bestDist) {
                        bestDist = dist;
                        bestIdx = i;
                    }
                }
                const p = idlePeasants.splice(bestIdx, 1)[0];
                sq.shift();
                p.state = "training";
                p.targetBarracks = b;
                p.trainingConfig = { weapon: order.weapon, armors: order.armors, hasHorse: order.hasHorse, goldCost: order.goldCost || 0 };
                p.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
            } else {
                sq.shift();
                resources.gold += order.goldCost;
            }
        }
        if (faction === "red") updateBarracksQueueUI();
    });
}
function convertPeasantToSiegeUnit(peasant, shop) {
    const config = peasant.trainingConfig;
    if (!config) return;
    const sq = siegeTrainingQueue[peasant.faction];
    if (!sq) return;
    const qIndex = sq.findIndex(q => q.shopId === shop.id && q.type === config.type);
    if (qIndex === -1) {
        peasant.state = "wander";
        peasant.targetSiegeShop = null;
        peasant.trainingConfig = null;
        return;
    }
    const order = sq[qIndex];
    order.peasantsGathered++;
    peasant.state = "siege_waiting";
    if (peasant.mesh) {
        peasant.mesh.visible = false;
    }
    if (order.peasantsGathered >= order.peasantsNeeded) {
        // Spawn siege unit OUTSIDE the shop to avoid collision ejection
        const siegeStats = BASE_STATS["siege_" + order.type.toLowerCase()];
        const unitRadius = siegeStats ? siegeStats.radius : 1.0;
        const shopHW = (shop.dimX !== undefined ? shop.dimX : ((shop.radius || 0.5) * 2)) / 2;
        const shopHZ = (shop.dimZ !== undefined ? shop.dimZ : ((shop.radius || 0.5) * 2)) / 2;
        const clearance = 0.3; // Small gap so they don't touch the building
        let spawnX = shop.x + shopHW + unitRadius + clearance; // Default Right fallback
        let spawnZ = shop.z;
        let validSideFound = false;
        const testOffsets = [
            { dx: shopHW + unitRadius + clearance, dz: 0 }, // Right
            { dx: -shopHW - unitRadius - clearance, dz: 0 }, // Left
            { dx: 0, dz: shopHZ + unitRadius + clearance }, // Front
            { dx: 0, dz: -shopHZ - unitRadius - clearance }  // Back
        ];
        // Find immediate adjacent space
        for (let off of testOffsets) {
            const tx = shop.x + off.dx;
            const tz = shop.z + off.dz;
            const gx = Math.floor(tx) + 150;
            const gz = Math.floor(tz) + 150;
            if (gx >= 0 && gx < 300 && gz >= 0 && gz < 300) {
                const idx = gz * 300 + gx;
                if (!pathGrid[idx]) {
                    spawnX = tx;
                    spawnZ = tz;
                    validSideFound = true;
                    break;
                }
            }
        }
        // If all 4 adjacent sides are blocked, spiral search up to 6 tiles away
        if (!validSideFound) {
            let spiralFound = false;
            let bestDist = Infinity;
            for (let r = 2; r <= 6; r++) {
                for (let ox = -r; ox <= r; ox++) {
                    for (let oz = -r; oz <= r; oz++) {
                        if (Math.abs(ox) !== r && Math.abs(oz) !== r) continue;
                        const gx = Math.floor(shop.x + ox) + 150;
                        const gz = Math.floor(shop.z + oz) + 150;
                        if (gx >= 1 && gx < 299 && gz >= 1 && gz < 299) {
                            let spaceClear = true;
                            // Check a 2x2 area to ensure it fits the siege unit
                            for (let cx = 0; cx <= 1; cx++) {
                                for (let cz = 0; cz <= 1; cz++) {
                                    const cidx = (gz + cz) * 300 + (gx + cx);
                                    if (pathGrid[cidx]) {
                                        spaceClear = false;
                                        break;
                                    }
                                }
                                if (!spaceClear) break;
                            }
                            if (spaceClear) {
                                const px = gx - 150 + 0.5;
                                const pz = gz - 150 + 0.5;
                                const distSq = ox*ox + oz*oz;
                                if (distSq < bestDist) {
                                    bestDist = distSq;
                                    spawnX = px;
                                    spawnZ = pz;
                                    spiralFound = true;
                                }
                            }
                        }
                    }
                }
                if (spiralFound) break;
            }
            if (!spiralFound) {
                // Utterly blocked. Refund and abort!
                if (shop.faction === "red") {
                    resources.gold += order.gold;
                    resources.wood += order.wood;
                    resources.iron += order.iron;
                    showStatusLog("No space to spawn " + order.type + "! Resources refunded.", "#ff4444");
                }
                // Return peasants to wander, put them on the roof of the shop
                entities.forEach(e => {
                    if (e.type === "peasant" && e.state === "siege_waiting" && e.targetSiegeShop === shop && e.trainingConfig && e.trainingConfig.type === config.type) {
                        e.state = "wander";
                        e.targetSiegeShop = null;
                        e.trainingConfig = null;
                        e.visible = true;
                        if (e.mesh) e.mesh.visible = true;
                        e.y = shop.y + (shop.height || 2.0); // Safe fallback
                    }
                });
                sq.splice(qIndex, 1);
                if (shop.faction === "red") updateSiegeShopQueueUI();
                return;
            }
        }
        const spawnY = getTerrainHeight(spawnX, spawnZ);
        let siegeTypeStr = "siege_" + order.type.toLowerCase();
        let siegeEnt = createEntity(siegeTypeStr, shop.faction, spawnX, spawnZ);
        if (order.type === "Ballista" || order.type === "Catapult" || order.type === "Trebuchet") {
            siegeEnt.weapon = order.type;
        }
        siegeEnt.homeBuildings = []; // Track population cost
        sq.splice(qIndex, 1);
        if (shop.faction === "red") updateSiegeShopQueueUI();
        let pilotsConverted = 0;
        entities.forEach(e => {
            if (pilotsConverted < order.peasantsNeeded && e.type === "peasant" && e.state === "siege_waiting" && e.targetSiegeShop === shop && e.trainingConfig && e.trainingConfig.type === config.type) {
                e.state = "siege_pilot";
                e.visible = false;
                if (!siegeEnt.pilots) siegeEnt.pilots = [];
                siegeEnt.pilots.push(e);
                if (e.mesh) {
                    scene.remove(e.mesh);
                    disposeHierarchy(e.mesh);
                    e.mesh = null;
                }
                pilotsConverted++;
            }
        });
        if (siegeEnt.faction === "red") window.uiNeedsUpdate = true;
    }
}
function processSiegeQueue(activePeasants) {
    const factions = ["red", "blue"];
    factions.forEach(faction => {
        let idlePeasants = activePeasants.filter(p => p.faction === faction && (p.state === "wander" || p.state === "going_home"));
        if (idlePeasants.length === 0) return;
        const sq = siegeTrainingQueue[faction];
        if (!sq || sq.length === 0) return;
        for (let i = 0; i < sq.length; i++) {
            if (idlePeasants.length === 0) break;
            const order = sq[i];
            const b = entities.find(e => e.id === order.shopId);
            if (b && b.state !== "dead") {
                while (idlePeasants.length > 0 && (order.peasantsDispatched || 0) < order.peasantsNeeded) {
                    let bestDist = Infinity;
                    let bestIdx = -1;
                    for (let j = 0; j < idlePeasants.length; j++) {
                        const p = idlePeasants[j];
                        const dist = Math.hypot(p.x - b.x, p.z - b.z);
                        if (dist < bestDist) {
                            bestDist = dist;
                            bestIdx = j;
                        }
                    }
                    const p = idlePeasants.splice(bestIdx, 1)[0];
                    p.state = "siege_training";
                    p.targetSiegeShop = b;
                    p.trainingConfig = { type: order.type };
                    p.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                    if (order.peasantsDispatched === undefined) order.peasantsDispatched = 0;
                    order.peasantsDispatched++;
                }
            } else {
                sq.splice(i, 1);
                i--;
            }
        }
    });
}
function processConstructionQueue(activePeasants, keeps, filterFn = null) {
    const factions = ["red", "blue"];
    factions.forEach(faction => {
        let idlePeasants = activePeasants.filter(p => p.faction === faction && (p.state === "wander" || p.state === "going_home"));
        if (idlePeasants.length === 0) return;
        const planned = entities.filter(e => e.faction === faction && e.isPlanned && e.state !== "dead" && !e.isUnreachable && (!filterFn || filterFn(e)));
        if (planned.length === 0) return;
        let needsWork = [];
        let currentlyCarriedMap = buildCarriedMap(faction);
        planned.forEach(b => {
            let currentlyCarried = currentlyCarriedMap.get(b) || 0;
            let unassignedCost = b.resourcesNeededTotal - b.resourcesDelivered - currentlyCarried;
            if (unassignedCost > 0 || (b.resourcesNeededTotal === 0 && b.constructionProgress < 1.0)) {
                needsWork.push({ b: b, unassignedCost: unassignedCost > 0 ? unassignedCost : 1 });
            }
        });
        if (needsWork.length === 0) return;
        const keep = keeps.find(k => k.faction === faction && !k.isPlanned);
        needsWork.sort((a, b) => {
            const getCat = (e) => {
                if (e.type === "house") return 5;
                if (e.type === "gatehouse") return 4;
                if (e.type === "wall_ramp") return 3;
                if (e.type === "tower" || e.type === "tower_tile") return 2;
                if (e.type === "wall_column") return 1;
                return 0;
            };
            const cA = getCat(a.b);
            const cB = getCat(b.b);
            if (cA !== cB) return cB - cA;
            if (a.b.type === "wall_column" && b.b.type === "wall_column" && keep) {
                let dA = Math.hypot(a.b.x - keep.x, a.b.z - keep.z);
                let dB = Math.hypot(b.b.x - keep.x, b.b.z - keep.z);
                let rA = Math.round(dA);
                let rB = Math.round(dB);
                if (rA !== rB) return rB - rA;
                let angA = Math.atan2(a.b.z - keep.z, a.b.x - keep.x);
                let angB = Math.atan2(b.b.z - keep.z, b.b.x - keep.x);
                return angA - angB;
            }
            const idxA = a.b.commandIndex || 0;
            const idxB = b.b.commandIndex || 0;
            if (idxA !== idxB) return idxA - idxB;
            if (a.b.type === "wall_ramp" && b.b.type === "wall_ramp") {
                const hA = a.b.height || 0;
                const hB = b.b.height || 0;
                return hB - hA;
            }
            return 0;
        });
        for (let task of needsWork) {
            if (idlePeasants.length === 0) break;
            let b = task.b;
            let unassigned = task.unassignedCost;
            if (unassigned <= 0) continue;
            let rType = b.material || ((b.type === "wall_column" || b.type === "gatehouse" || b.type === "wall_ramp") ? "stone" : "wood");
            let nearbyWallTasks = null;
            if (b.type === "wall_column" || b.type === "gatehouse" || b.type === "wall_ramp") {
                nearbyWallTasks = needsWork.filter(nw => {
                    if (nw.unassignedCost <= 0) return false;
                    if (nw.b.type !== "wall_column" && nw.b.type !== "gatehouse" && nw.b.type !== "wall_ramp") return false;
                    let nwType = nw.b.material || ((nw.b.type === "wall_column" || nw.b.type === "gatehouse" || nw.b.type === "wall_ramp") ? "stone" : "wood");
                    return nwType === rType;
                });
            }
            while (unassigned > 0 && idlePeasants.length > 0) {
                let bestDist = Infinity;
                let bestIdx = -1;
                for (let i = 0; i < idlePeasants.length; i++) {
                    const dist = Math.hypot(idlePeasants[i].x - b.x, idlePeasants[i].z - b.z);
                    if (dist < bestDist) {
                        bestDist = dist;
                        bestIdx = i;
                    }
                }
                let p = idlePeasants.splice(bestIdx, 1)[0];
                let availablePayload = (p.payloadAmount > 0 && p.payloadResource === rType) ? p.payloadAmount : 0;
                let fetchAmount = 0;
                let payloadUsed = 0;
                if (b.type === "wall_column" || b.type === "gatehouse" || b.type === "wall_ramp") {
                    for (let wTask of nearbyWallTasks) {
                        if (wTask.unassignedCost > 0) {
                            let totalCapacity = 20 - fetchAmount - payloadUsed;
                            if (totalCapacity <= 0) break;
                            let toTake = Math.min(totalCapacity, wTask.unassignedCost);
                            if (toTake > 0) {
                                let pUse = Math.min(toTake, availablePayload - payloadUsed);
                                payloadUsed += pUse;
                                wTask.unassignedCost -= pUse;
                                let fUse = toTake - pUse;
                                if (fUse > 0) {
                                    fetchAmount += fUse;
                                    wTask.unassignedCost -= fUse;
                                }
                            }
                        }
                    }
                    unassigned = task.unassignedCost;
                    if (fetchAmount === 0 && payloadUsed === 0) {
                        idlePeasants.push(p);
                        continue;
                    }
                } else {
                    let totalCapacity = Math.min(20, unassigned);
                    payloadUsed = Math.min(totalCapacity, availablePayload);
                    unassigned -= payloadUsed;
                    fetchAmount = totalCapacity - payloadUsed;
                    if (fetchAmount > 0) {
                        unassigned -= fetchAmount;
                    }
                    if (fetchAmount === 0 && payloadUsed === 0) {
                        idlePeasants.push(p);
                        continue;
                    }
                }
                if (fetchAmount > 0) {
                    p.state = "constructing_fetching";
                    p.intendedFetchAmount = fetchAmount;
                } else {
                    p.state = "constructing_delivering";
                    p.intendedFetchAmount = 0;
                }
                p.payloadResource = rType;
                p.workerBuilding = b;
                unassigned -= (fetchAmount + payloadUsed);
                if (p.state === "constructing_delivering") {
                    p.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                } else {
                    if (keep) {
                        p.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                    } else {
                        p.state = "wander";
                        unassigned = 0;
                        idlePeasants.push(p);
                    }
                }
            }
        }
    });
}
function updateEconomyWorkers(deltaTime, activeUnits, buildings) {
    const keeps = buildings.filter(e => e.type === "keep" && !e.isPlanned);
    const activePeasants = activeUnits.filter(e => e.type === "peasant");
    
    const workersByBuilding = new Map();
    activePeasants.forEach(p => {
        if (p.workerBuilding) {
            if (!workersByBuilding.has(p.workerBuilding)) workersByBuilding.set(p.workerBuilding, []);
            workersByBuilding.get(p.workerBuilding).push(p);
        }
    });
    activePeasants.forEach(p => {
        if ((p.state === "wander" || p.state === "idle") && p.payloadAmount > 0) {
            p.state = "returning_payload";
            const keep = keeps.find(k => k.faction === p.faction);
            if (keep) {
                p.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
            } else {
                p.payloadAmount = 0;
            }
        }
    });
    function popNearestIdlePeasant(pool, x, z) {
        let bestDist = Infinity;
        let bestIdx = -1;
        for (let i = 0; i < pool.length; i++) {
            const p = pool[i];
            const dist = Math.hypot(p.x - x, p.z - z);
            if (dist < bestDist) {
                bestDist = dist;
                bestIdx = i;
            }
        }
        if (bestIdx >= 0) {
            return pool.splice(bestIdx, 1)[0];
        }
        return null;
    }
    processConstructionQueue(activePeasants, keeps, e => e.type === "house");
    processSoldierQueue(activePeasants);
    processSiegeQueue(activePeasants);
    const idlePeasantPool = activePeasants.filter(e => e.faction === "red" && (e.state === "wander" || e.state === "going_home"));
    activePeasants.forEach(p => {
        if ((p.state === "constructing_fetching" || p.state === "constructing_delivering") && p.workerBuilding && p.workerBuilding.isUnreachable) {
            let rType = p.workerBuilding.material || ((p.workerBuilding.type === "wall_column" || p.workerBuilding.type === "gatehouse" || p.workerBuilding.type === "wall_ramp" || p.workerBuilding.type === "tower") ? "stone" : "wood");
            p.payloadResource = rType;
            if (p.state === "constructing_delivering" && p.payloadAmount > 0) {
                p.state = "returning_payload";
                const keep = keeps.find(k => k.faction === p.faction);
                if (keep) p.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                else { p.state = "wander"; p.payloadAmount = 0; }
            } else {
                p.state = "wander";
                p.payloadAmount = 0;
                p.intendedFetchAmount = 0;
            }
            p.workerBuilding = null;
            p.path = null;
        }
    });
    entities.forEach(b => {
        if (b.state === "dead" || b.type === "tree" || b.type === "gold" || b.type === "iron" || b.type === "stone" || b.baseSpeed > 0) return;
        // Skip inert buildings that are fully constructed (they don't need reachability or workflow updates)
        if (!b.isPlanned && (b.type === "wall_column" || b.type === "wall_ramp" || b.type === "gatehouse" || b.type === "house" || b.type === "keep")) return;
        // 0. REACHABILITY CHECK
        const bx = Math.max(0, Math.min(299, Math.round(b.x) + 150));
        const bz = Math.max(0, Math.min(299, Math.round(b.z) + 150));
        let isReachable = false;
        const bRadius = b.dimX ? Math.max(b.dimX, b.dimZ) / 2 : (b.radius || 0.5);
        const maxPathDist = bRadius + 1.2;
        const checkRad = Math.ceil(maxPathDist);
        for (let ox = -checkRad; ox <= checkRad && !isReachable; ox++) {
            for (let oz = -checkRad; oz <= checkRad && !isReachable; oz++) {
                if (ox * ox + oz * oz <= maxPathDist * maxPathDist) {
                    const cx = bx + ox;
                    const cz = bz + oz;
                    if (cx >= 0 && cx < 300 && cz >= 0 && cz < 300) {
                        const rId = regionGrid[cz * 300 + cx];
                        if (keepRegions.has(rId)) isReachable = true;
                    }
                }
            }
        }
        if (!isReachable) {
            if (!b.isUnreachable) {
                b.isUnreachable = true;
                if (b.mesh) {
                    b.mesh.traverse(c => {
                        if (c.isMesh && c.material) {
                            if (b.isPlanned) {
                                if (c.material.color) c.material.color.setHex(0xffa500); // Orange
                            } else {
                                if (c.material.emissive) {
                                    if (c.material.origEmissive === undefined) c.material.origEmissive = c.material.emissive.getHex();
                                    c.material.emissive.setHex(0xcc5500); // Dark Orange
                                }
                            }
                        }
                    });
                }
            }
            return; // Skip all functioning if unreachable!
        } else {
            if (b.isUnreachable) {
                b.isUnreachable = false;
                if (b.mesh) {
                    b.mesh.traverse(c => {
                        if (c.isMesh && c.material) {
                            if (b.isPlanned) {
                                if (c.material.color) c.material.color.setHex(0x00ff00);
                            } else if (b.isZzz && window.applyZzzTint) {
                                window.applyZzzTint(b, true);
                            } else {
                                if (c.material.emissive && c.material.origEmissive !== undefined) {
                                    c.material.emissive.setHex(c.material.origEmissive);
                                }
                            }
                        }
                    });
                }
            }
        }
        if (b.isPlanned || b.isZzz) return; // Wait until construction is finished or building is turned back on
        // 1. FARM WORKFLOW
        if (b.type === "farm") {
            // Ensure Farm has an assigned farmer
            let farmer = (workersByBuilding.get(b) || []).find(p => p.state === "farming" && p.workerBuilding === b);
            if (!farmer) {
                // Find walking farmer
                farmer = (workersByBuilding.get(b) || []).find(p => ["farmer_walking_to_farm", "farmer_walking_to_keep"].includes(p.state) && p.workerBuilding === b);
            }
            if (!farmer) {
                // Recruit nearest idle peasant
                const candidate = popNearestIdlePeasant(idlePeasantPool, b.x, b.z);
                if (candidate) {
                    candidate.state = "farmer_walking_to_farm";
                    candidate.workerBuilding = b;
                    candidate.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                }
            } else {
                // Update Farmer States
                if (farmer.state === "farmer_walking_to_farm") {
                    const dist = Math.hypot(b.x - farmer.x, b.z - farmer.z);
                    let arrived = dist <= (b.radius || 2.0) + 1.5;
                    if (arrived) {
                        farmer.state = "farming";
                        farmer.targetPosition = null;
                        farmer.workTimer = 0;
                    }
                } else if (farmer.state === "farming") {
                    farmer.workTimer += deltaTime;
                    farmer.cooldownTimer = (farmer.cooldownTimer || 0) + deltaTime;
                    if (farmer.cooldownTimer > 1.0) farmer.cooldownTimer = 0;
                    let cycleTime = (b && b.isFertile) ? 20.0 : 60.0;
                    if (farmer.workTimer >= cycleTime) { // 20s or 60s cycle based on fertility
                        farmer.state = "farmer_walking_to_keep";
                        const drop = findNearestDropoff(farmer.x, farmer.z, farmer.faction);
                        if (drop) {
                            farmer.targetBuilding = drop;
                            farmer.targetPosition = new THREE.Vector3(drop.x, getTerrainHeight(drop.x, drop.z), drop.z);
                        } else {
                            farmer.state = "wander"; // Dropoff destroyed
                        }
                    }
                } else if (farmer.state === "farmer_walking_to_keep") {
                    if (!farmer.targetBuilding || farmer.targetBuilding.state === "dead") {
                        farmer.targetBuilding = findNearestDropoff(farmer.x, farmer.z, farmer.faction);
                        if (farmer.targetBuilding) {
                            farmer.targetPosition = new THREE.Vector3(farmer.targetBuilding.x, getTerrainHeight(farmer.targetBuilding.x, farmer.targetBuilding.z), farmer.targetBuilding.z);
                        } else {
                            farmer.state = "wander";
                        }
                    }
                    if (!farmer.targetBuilding) return;
                    const drop = farmer.targetBuilding;
                    const dist = Math.hypot(drop.x - farmer.x, drop.z - farmer.z);
                    let arrived = dist <= (drop.radius || 3.0) + 2.0;
                    if (arrived) {
                        if (drop.type === "loadhouse") {
                            let currentStorage = Object.values(drop.storage || {}).reduce((a,b)=>a+b,0);
                            if (currentStorage >= 200) {
                                farmer.targetBuilding = null; // invalid on arrival, loop will re-seek next frame
                                return;
                            }
                        }
                        if (drop.type === "keep") {
                            if (farmer.faction === "red") {
                                resources.food += 20;
                                spawnFloatingText("+20 Food", drop.x, drop.y + 4.0, drop.z, 0x4caf50);
                            }
                        } else if (drop.type === "loadhouse") {
                            drop.storage = drop.storage || {};
                            drop.storage.food = (drop.storage.food || 0) + 20;
                            spawnFloatingText("+20 Food", drop.x, drop.y + 3.0, drop.z, 0x4caf50);
                        }
                        farmer.state = "farmer_walking_to_farm";
                        farmer.targetBuilding = null;
                        farmer.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                        updateUI();
                    }
                }
            }
        }
        // 2. WOODCUTTER WORKFLOW
        if (b.type === "woodcutter") {
            let woodcutter = (workersByBuilding.get(b) || []).find(p => ["woodcutter_walking_to_tree", "chopping", "woodcutter_walking_to_hut", "woodcutter_processing", "woodcutter_delivering", "woodcutter_waiting_for_tree"].includes(p.state) && p.workerBuilding === b);
            if (!woodcutter) {
                const orphan = (workersByBuilding.get(b) || []).find(p => (p.state === "wander" || p.state === "idle") && p.workerBuilding === b);
                if (orphan) {
                    orphan.state = "woodcutter_walking_to_tree";
                    orphan.targetTree = null;
                    woodcutter = orphan;
                }
            }
            if (!woodcutter) {
                const candidate = popNearestIdlePeasant(idlePeasantPool, b.x, b.z);
                if (candidate) {
                    candidate.state = "woodcutter_walking_to_tree";
                    candidate.workerBuilding = b;
                    candidate.carriedItem = null;
                }
            } else {
                if (woodcutter.state === "woodcutter_waiting_for_tree") {
                    woodcutter.workTimer += deltaTime;
                    if (woodcutter.workTimer > 3.0) {
                        woodcutter.state = "woodcutter_walking_to_tree";
                        woodcutter.targetTree = null;
                    }
                } else if (woodcutter.state === "woodcutter_walking_to_tree") {
                    if (!woodcutter.targetTree || woodcutter.targetTree.state === "dead") {
                        // Find nearest tree
                        const tree = findNearestTree(woodcutter.x, woodcutter.z);
                        if (tree) {
                            woodcutter.targetTree = tree;
                            woodcutter.targetPosition = new THREE.Vector3(tree.x, getTerrainHeight(tree.x, tree.z), tree.z);
                        } else {
                            // No trees, return to hut
                            woodcutter.state = "woodcutter_walking_to_hut";
                            woodcutter.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                        }
                    } else {
                        const dist = Math.hypot(woodcutter.targetTree.x - woodcutter.x, woodcutter.targetTree.z - woodcutter.z);
                        let arrived = dist <= 1.8;
                        if (arrived) {
                            woodcutter.state = "chopping";
                            woodcutter.targetPosition = null;
                            woodcutter.workTimer = 0;
                        }
                    }
                } else if (woodcutter.state === "chopping") {
                    woodcutter.workTimer += deltaTime;
                    woodcutter.cooldownTimer = (woodcutter.cooldownTimer || 0) + deltaTime;
                    if (woodcutter.cooldownTimer > 1.0) woodcutter.cooldownTimer = 0;
                    if (woodcutter.workTimer >= 3.0) { // 3s to chop
                        if (woodcutter.targetTree && woodcutter.targetTree.state !== "dead") {
                            triggerDeath(woodcutter.targetTree, null); // chop down tree
                            b.logsCount = (b.logsCount || 0) + 5;
                        }
                        woodcutter.state = "woodcutter_walking_to_hut";
                        woodcutter.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                    }
                } else if (woodcutter.state === "woodcutter_walking_to_hut") {
                    const dist = Math.hypot(b.x - woodcutter.x, b.z - woodcutter.z);
                    let arrived = dist <= (b.radius || 1.5) + 1.5;
                    if (arrived) {
                        if (b.logsCount && b.logsCount > 0) {
                            woodcutter.state = "woodcutter_processing";
                            woodcutter.targetPosition = null;
                            woodcutter.workTimer = 0;
                            woodcutter.mesh.visible = false; // Enter hut
                        } else {
                            woodcutter.state = "woodcutter_waiting_for_tree";
                            woodcutter.workTimer = 0;
                        }
                    }
                } else if (woodcutter.state === "woodcutter_processing") {
                    woodcutter.workTimer += deltaTime;
                    if (woodcutter.workTimer >= 10.0) { // wait 10s in hut
                        if (b.logsCount > 0) b.logsCount--;
                        woodcutter.state = "woodcutter_delivering";
                        woodcutter.mesh.visible = true; // Exit hut
                        const drop = findNearestDropoff(woodcutter.x, woodcutter.z, woodcutter.faction);
                        if (drop) {
                            woodcutter.targetBuilding = drop;
                            woodcutter.targetPosition = new THREE.Vector3(drop.x, getTerrainHeight(drop.x, drop.z), drop.z);
                        }
                    }
                } else if (woodcutter.state === "woodcutter_delivering") {
                    if (!woodcutter.targetBuilding || woodcutter.targetBuilding.state === "dead") {
                        woodcutter.targetBuilding = findNearestDropoff(woodcutter.x, woodcutter.z, woodcutter.faction);
                        if (woodcutter.targetBuilding) {
                            woodcutter.targetPosition = new THREE.Vector3(woodcutter.targetBuilding.x, getTerrainHeight(woodcutter.targetBuilding.x, woodcutter.targetBuilding.z), woodcutter.targetBuilding.z);
                        }
                    }
                    if (!woodcutter.targetBuilding) return;
                    const drop = woodcutter.targetBuilding;
                    const dist = Math.hypot(drop.x - woodcutter.x, drop.z - woodcutter.z);
                    let arrived = dist <= (drop.radius || 3.0) + 2.0;
                    if (arrived) {
                        if (drop.type === "loadhouse") {
                            let currentStorage = Object.values(drop.storage || {}).reduce((a,b)=>a+b,0);
                            if (currentStorage >= 200) {
                                woodcutter.targetBuilding = null;
                                return;
                            }
                        }
                        if (drop.type === "keep") {
                            if (woodcutter.faction === "red") {
                                resources.wood += 20;
                                spawnFloatingText("+20 Wood", drop.x, drop.y + 4.0, drop.z, 0x8d6e63);
                            }
                        } else {
                            if (!drop.storage) drop.storage = { wood: 0, stone: 0, gold: 0, iron: 0, food: 0, luxury: 0 };
                            drop.storage.wood += 20;
                            spawnFloatingText("+20 Wood", drop.x, drop.y + 3.0, drop.z, 0x8d6e63);
                        }
                        if (b.logsCount && b.logsCount > 0) {
                            woodcutter.state = "woodcutter_walking_to_hut";
                            woodcutter.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                        } else {
                            woodcutter.state = "woodcutter_walking_to_tree";
                            woodcutter.targetTree = null;
                        }
                        woodcutter.targetBuilding = null;
                        updateUI();
                    }
                }
            }
        }
        // 3. MINE WORKFLOW (Iron, Stone, Gold)
        if (b.type === "mine") {
            // Find assigned miners
            let miners = (workersByBuilding.get(b) || []).filter(p => ["miner", "mining", "miner_delivering", "miner_returning"].includes(p.state) && p.workerBuilding === b);
            // Recruit up to 3 miners
            while (miners.length < 3) {
                const candidate = popNearestIdlePeasant(idlePeasantPool, b.x, b.z);
                if (candidate) {
                    candidate.state = "miner";
                    candidate.workerBuilding = b;
                    candidate.targetPosition = new THREE.Vector3(b.x + (Math.random() - 0.5) * 1.5, getTerrainHeight(b.x, b.z), b.z + (Math.random() - 0.5) * 1.5);
                    miners.push(candidate);
                } else {
                    break;
                }
            }
            // Miners state and distance checking
            let minersPresentCount = 0;
            miners.forEach(miner => {
                const dist = Math.hypot(b.x - miner.x, b.z - miner.z);
                let arrived = dist <= (b.radius || 3.0) + 2.0;
                if (miner.state === "miner" && arrived) {
                    miner.state = "mining";
                    miner.mesh.visible = false; // enter mine
                }
                if (miner.state === "mining") {
                    minersPresentCount++;
                }
            });
            // If at least 2/3 miners present, run mining timer
            if (minersPresentCount >= 2) {
                b.workTimer = (b.workTimer || 0) + deltaTime;
                let mineTime = 20.0;
                if (b.mineResourceType === "stone") mineTime = 13.33333; // +50% speed
                else if (b.mineResourceType === "gold") mineTime = 6.66666; // +200% speed
                
                if (b.workTimer >= mineTime) {
                    b.workTimer = 0;
                    b.storedResources = Math.min(100, (b.storedResources || 0) + 20);
                }
            }
            const trans = miners[0];
            if (trans) {
                if (trans.state === "mining" && (b.storedResources || 0) >= 20) {
                    b.storedResources -= 20;
                    trans.state = "miner_delivering";
                    trans.mesh.visible = true; // exit mine
                    const drop = findNearestDropoff(trans.x, trans.z, trans.faction);
                    if (drop) {
                        trans.targetBuilding = drop;
                        trans.targetPosition = new THREE.Vector3(drop.x, getTerrainHeight(drop.x, drop.z), drop.z);
                    }
                } else if (trans.state === "miner_delivering") {
                    if (!trans.targetBuilding || trans.targetBuilding.state === "dead") {
                        trans.targetBuilding = findNearestDropoff(trans.x, trans.z, trans.faction);
                        if (trans.targetBuilding) {
                            trans.targetPosition = new THREE.Vector3(trans.targetBuilding.x, getTerrainHeight(trans.targetBuilding.x, trans.targetBuilding.z), trans.targetBuilding.z);
                        }
                    }
                    if (!trans.targetBuilding) return;
                    const drop = trans.targetBuilding;
                    const dist = Math.hypot(drop.x - trans.x, drop.z - trans.z);
                    let arrived = dist <= (drop.radius || 3.0) + 2.0;
                    if (arrived) {
                        if (drop.type === "loadhouse") {
                            let currentStorage = Object.values(drop.storage || {}).reduce((a,b)=>a+b,0);
                            if (currentStorage >= 200) {
                                trans.targetBuilding = null;
                                return;
                            }
                        }
                        const mType = b.mineResourceType || "gold";
                        if (drop.type === "keep") {
                            if (trans.faction === "red") {
                                resources[mType] += 20;
                                spawnFloatingText("+20 " + mType.toUpperCase(), drop.x, drop.y + 4.0, drop.z, mType === "gold" ? 0xffeb3b : (mType === "iron" ? 0x9e9e9e : 0x78909c));
                            }
                        } else if (drop.type === "loadhouse") {
                            drop.storage = drop.storage || {};
                            drop.storage[mType] = (drop.storage[mType] || 0) + 20;
                            spawnFloatingText("+20 " + mType.toUpperCase(), drop.x, drop.y + 3.0, drop.z, mType === "gold" ? 0xffeb3b : (mType === "iron" ? 0x9e9e9e : 0x78909c));
                        }
                        trans.state = "miner_returning";
                        trans.targetBuilding = null;
                        trans.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                        updateUI();
                    }
                } else if (trans.state === "miner_returning") {
                    const dist = Math.hypot(b.x - trans.x, b.z - trans.z);
                    let arrived = dist <= (b.radius || 3.0) + 2.0;
                    if (arrived) {
                        trans.state = "mining";
                        trans.mesh.visible = false; // re-enter mine
                    }
                }
            }
        }
        // 4. STABLES WORKFLOW (Passive Capacity - No worker logic needed)
        // 5. WEAPON WORKSHOP WORKFLOWS
        if (["poleturner", "gruntshop", "blacksmith", "fletcher", "knightarms", "tailor", "armorer", "stables", "bakery", "brewery", "carpenter", "jeweler"].includes(b.type)) {
            let worker = (workersByBuilding.get(b) || []).find(p => ["shop_worker", "worker_fetching", "worker_returning_to_shop", "worker_crafting", "worker_delivering_item"].includes(p.state) && p.workerBuilding === b);
            if (!worker) {
                const candidate = popNearestIdlePeasant(idlePeasantPool, b.x, b.z);
                if (candidate) {
                    candidate.state = "shop_worker";
                    candidate.workerBuilding = b;
                    candidate.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                }
            } else {
                const activeProd = WORKSHOP_PRODS[b.type][b.activeProductIdx || 0];
                if (worker.state === "shop_worker") {
                    if (worker.targetPosition) {
                        const distToShop = Math.hypot(b.x - worker.x, b.z - worker.z);
                        if (distToShop <= 7.0) {
                            worker.targetPosition = null;
                        }
                    }
                    if (b.type === "stables") {
                        b.inventory = b.inventory || { horse: 0 };
                        if (b.inventory.horse >= 5) return;
                    }
                    // Check resources in Keep to start crafting
                    const drop = findNearestDropoff(worker.x, worker.z, worker.faction, true);
                    if (drop) {
                        let canAfford = true;
                        if (worker.faction === "red") {
                            for (let resKey in activeProd.cost) {
                                if (drop.type === "keep") {
                                    if (resources[resKey] < activeProd.cost[resKey]) canAfford = false;
                                } else if (drop.type === "loadhouse") {
                                    if ((drop.storage[resKey] || 0) < activeProd.cost[resKey]) canAfford = false;
                                }
                            }
                        }
                        if (canAfford) {
                            worker.state = "worker_fetching";
                            worker.targetBuilding = drop;
                            worker.targetPosition = new THREE.Vector3(drop.x, getTerrainHeight(drop.x, drop.z), drop.z);
                            worker.path = null;
                        }
                    }
                } else if (worker.state === "worker_fetching") {
                    if (!worker.targetBuilding || worker.targetBuilding.state === "dead") {
                        worker.targetBuilding = findNearestDropoff(worker.x, worker.z, worker.faction, true);
                        if (worker.targetBuilding) {
                            worker.targetPosition = new THREE.Vector3(worker.targetBuilding.x, getTerrainHeight(worker.targetBuilding.x, worker.targetBuilding.z), worker.targetBuilding.z);
                        }
                    }
                    if (!worker.targetBuilding) return;
                    const drop = worker.targetBuilding;
                    const dist = Math.hypot(drop.x - worker.x, drop.z - worker.z);
                    let arrived = dist <= (drop.radius || 3.0) + 2.0;
                    if (arrived) {
                        // Check if resources available
                        let canAfford = true;
                        if (worker.faction === "red") {
                            for (let resKey in activeProd.cost) {
                                if (drop.type === "keep") {
                                    if (resources[resKey] < activeProd.cost[resKey]) canAfford = false;
                                } else if (drop.type === "loadhouse") {
                                    if ((drop.storage[resKey] || 0) < activeProd.cost[resKey]) canAfford = false;
                                }
                            }
                            if (canAfford) {
                                for (let resKey in activeProd.cost) {
                                    if (drop.type === "keep") {
                                        resources[resKey] -= activeProd.cost[resKey];
                                    } else if (drop.type === "loadhouse") {
                                        drop.storage[resKey] -= activeProd.cost[resKey];
                                    }
                                }
                                updateUI();
                                worker.state = "worker_returning_to_shop";
                                worker.targetBuilding = null;
                                worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                                worker.path = null;
                            } else {
                                worker.state = "shop_worker";
                                worker.targetBuilding = null;
                                worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                                worker.path = null;
                                return;
                            }
                        } else {
                            // AI always can afford crafting
                            worker.state = "worker_returning_to_shop";
                            worker.targetBuilding = null;
                            worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                            worker.path = null;
                        }
                    }
                } else if (worker.state === "worker_returning_to_shop") {
                    const dist = Math.hypot(b.x - worker.x, b.z - worker.z);
                    let arrived = dist <= (b.radius || 3.0) + 2.0;
                    if (arrived) {
                        worker.state = "worker_crafting";
                        worker.targetPosition = null;
                        worker.workTimer = 0;
                        if (worker.mesh) worker.mesh.visible = false;
                    }
                } else if (worker.state === "worker_crafting") {
                    worker.workTimer += deltaTime;
                    if (Math.random() < deltaTime * 5) {
                        if (b.type !== "carpenter" && b.type !== "jeweler") {
                            let sx = b.x;
                            let sz = b.z;
                            let sy = b.y + 4.0;
                            if (b.type === "bakery") { sx += 1.4; sz -= 1.4; }
                            else if (b.type === "poleturner") { sz -= 1.2; }
                            else if (b.type === "gruntshop") { sx -= 1.2; sz -= 1.2; }
                            else if (b.type === "blacksmith") { sx -= 1.2; }
                            else if (b.type === "knightarms") { sx -= 1.2; sz += 1.2; }
                            else if (b.type === "fletcher") { sz += 1.2; }
                            else if (b.type === "tailor") { sx += 1.2; sz += 1.2; }
                            else if (b.type === "armorer") { sx += 1.2; }
                            spawnSmoke(sx, sy, sz);
                        }
                    }
                    if (worker.workTimer >= activeProd.time) {
                        if (b.type === "stables") {
                            b.inventory = b.inventory || { horse: 0 };
                            if (b.inventory.horse < 5) {
                                b.inventory.horse++;
                                spawnFloatingText("+1 Horse", b.x, b.y + 3.0, b.z, 0xd4af37);
                            }
                            worker.state = "shop_worker";
                            worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                            if (worker.mesh) worker.mesh.visible = true;
                            updateUI();
                        } else {
                            // Craft complete! Find nearest dropoff
                            let drop = null;
                            if (activeProd.type === "premium_food" || activeProd.type === "brew" || activeProd.type === "furniture" || activeProd.type === "gem") {
                                drop = findNearestDropoff(worker.x, worker.z, worker.faction);
                            } else {
                                drop = findNearestMilitaryDropoff(worker.x, worker.z, worker.faction);
                            }
                            if (drop) {
                                worker.state = "worker_delivering_item";
                                worker.targetBuilding = drop;
                                worker.targetPosition = new THREE.Vector3(drop.x, getTerrainHeight(drop.x, drop.z), drop.z);
                                worker.craftedItem = activeProd.name;
                                worker.path = null;
                                if (worker.mesh) worker.mesh.visible = true;
                            } else {
                                // Standby at shop
                                worker.state = "shop_worker";
                                worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                                worker.path = null;
                                if (worker.mesh) worker.mesh.visible = true;
                            }
                        }
                    }
                } else if (worker.state === "worker_delivering_item") {
                    if (!worker.targetBuilding || worker.targetBuilding.state === "dead") {
                        if (worker.craftedItem === "Premium Food" || worker.craftedItem === "Brew" || worker.craftedItem === "Furniture" || worker.craftedItem === "Gem") {
                            worker.targetBuilding = findNearestDropoff(worker.x, worker.z, worker.faction);
                        } else {
                            worker.targetBuilding = findNearestMilitaryDropoff(worker.x, worker.z, worker.faction);
                        }
                        if (worker.targetBuilding) {
                            worker.targetPosition = new THREE.Vector3(worker.targetBuilding.x, getTerrainHeight(worker.targetBuilding.x, worker.targetBuilding.z), worker.targetBuilding.z);
                        }
                    }
                    if (!worker.targetBuilding) {
                        worker.state = "shop_worker";
                        worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                        worker.path = null;
                        return;
                    }
                    const drop = worker.targetBuilding;
                    const dist = Math.hypot(drop.x - worker.x, drop.z - worker.z);
                    let arrived = dist <= (drop.radius || 3.0) + 2.0;
                    if (arrived) {
                        if (worker.craftedItem === "Premium Food" || worker.craftedItem === "Brew" || worker.craftedItem === "Furniture" || worker.craftedItem === "Gem") {
                            const isBrew = worker.craftedItem === "Brew";
                            const isFurniture = worker.craftedItem === "Furniture";
                            const isGem = worker.craftedItem === "Gem";
                            const storageKey = isBrew ? "brew" : (isFurniture ? "furniture" : (isGem ? "gem" : "premium_food"));
                            const yieldAmt = isFurniture ? 10 : (isGem ? 1 : 20);
                            const floatColor = isGem ? 0x00ffff : (isFurniture ? 0x8b5a2b : (isBrew ? 0x8d6e63 : 0xffd700));
                            if (drop.type === "loadhouse") {
                                let currentStorage = Object.values(drop.storage || {}).reduce((a,b)=>a+b,0);
                                if (currentStorage >= 200) {
                                    worker.state = "shop_worker";
                                    worker.targetBuilding = null;
                                    worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                                    worker.path = null;
                                    return;
                                }
                                drop.storage = drop.storage || {};
                                drop.storage[storageKey] = (drop.storage[storageKey] || 0) + yieldAmt;
                                spawnFloatingText("+" + yieldAmt + " " + worker.craftedItem, drop.x, drop.y + 3.0, drop.z, floatColor);
                            } else if (drop.type === "keep") {
                                if (worker.faction === "red") {
                                    if (isBrew) resources.brew = (resources.brew || 0) + yieldAmt;
                                    else if (isFurniture) resources.furniture = (resources.furniture || 0) + yieldAmt;
                                    else if (isGem) resources.gem = (resources.gem || 0) + yieldAmt;
                                    else resources.premium_food += yieldAmt;
                                }
                                spawnFloatingText("+" + yieldAmt + " " + worker.craftedItem, drop.x, drop.y + 3.0, drop.z, floatColor);
                            }
                        } else {
                            if (drop.type === "loadhouse") {
                                let currentStorage = Object.values(drop.storage || {}).reduce((a,b)=>a+b,0);
                                if (currentStorage >= 200) {
                                    worker.state = "shop_worker";
                                    worker.targetBuilding = null;
                                    worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                                    worker.path = null;
                                    return;
                                }
                            }
                            if (drop.type === "barracks") {
                                drop.inventory[worker.craftedItem] = (drop.inventory[worker.craftedItem] || 0) + 1;
                            } else if (drop.type === "loadhouse") {
                                drop.storage = drop.storage || {};
                                drop.storage[worker.craftedItem] = (drop.storage[worker.craftedItem] || 0) + 1;
                            }
                            spawnFloatingText("+1 " + worker.craftedItem, drop.x, drop.y + 3.0, drop.z, 0xd4af37);
                        }
                        worker.craftedItem = null;
                        worker.state = "shop_worker";
                        worker.targetBuilding = null;
                        worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                        worker.path = null;
                        updateUI();
                    }
                }
            }
            if (b.lanternMaterials) {
                const isCrafting = worker && worker.state === "worker_crafting";
                b.lanternMaterials.forEach(mat => {
                    mat.emissive.setHex(isCrafting ? 0xffff00 : 0x000000);
                });
            }
        }
        // 6. MARKET WORKFLOW
        if (b.type === "market") {
            /* 
            // Temporarily disabled worker requirement for Market
            let worker = (workersByBuilding.get(b) || []).find(p => p.state === "market_worker" && p.workerBuilding === b);
            if (!worker) {
                const candidate = popNearestIdlePeasant(idlePeasantPool, b.x, b.z);
                if (candidate) {
                    candidate.state = "market_worker";
                    candidate.workerBuilding = b;
                    candidate.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                }
            } else {
                if (worker.targetPosition) {
                    const dist = Math.hypot(b.x - worker.x, b.z - worker.z);
                    let arrived = dist <= (b.radius || 3.0) + 2.0;
                    if (arrived) {
                        worker.targetPosition = null;
                    }
                }
            }
            */
        }
        // 7. LOADHOUSE WORKFLOW
        if (b.type === "loadhouse") {
            b.storage = b.storage || { food: 0, wood: 0, iron: 0, stone: 0, "Spear": 0, "Pike": 0, "Halberd": 0, "Poleaxe": 0, "Axe": 0, "Sword": 0, "Mace": 0, "Short Bow": 0, "Longbow": 0, "Crossbow": 0, "cloth": 0, "leather": 0, "chain": 0, "plate": 0 };
            b.wagon = b.wagon || { food: 0, wood: 0, iron: 0, stone: 0, "Spear": 0, "Pike": 0, "Halberd": 0, "Poleaxe": 0, "Axe": 0, "Sword": 0, "Mace": 0, "Short Bow": 0, "Longbow": 0, "Crossbow": 0, "cloth": 0, "leather": 0, "chain": 0, "plate": 0 };
            b.hasHorse = b.hasHorse || false;
            b.firstLoadTime = b.firstLoadTime || 0;
            let worker = (workersByBuilding.get(b) || []).find(p => ["loadhouse_worker", "loadhouse_fetching_horse", "wagon_delivering", "loadhouse_peasant_delivering"].includes(p.state) && p.workerBuilding === b);
            if (!worker) {
                const candidate = popNearestIdlePeasant(idlePeasantPool, b.x, b.z);
                if (candidate) {
                    candidate.state = "loadhouse_worker";
                    candidate.workerBuilding = b;
                    candidate.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                }
            } else {
                if (b.hasHorse && b.wantsHorse === false) {
                    let wagonTotal = Object.values(b.wagon).reduce((sum, val) => sum + val, 0);
                    if (worker.state === "loadhouse_worker" && wagonTotal === 0) {
                        b.hasHorse = false;
                        if (b.mesh) scene.remove(b.mesh);
                        b.mesh = buildEntityMesh(b); scene.add(b.mesh); b.mesh.position.set(b.x, b.y, b.z);
                        updateUI();
                    }
                }
                if (!b.hasHorse && b.wantsHorse !== false) {
                    if (worker.state === "loadhouse_worker" || worker.state === "wander") {
                        const stats = getHorseStats(worker.faction);
                        if (stats.used < stats.cap) {
                            b.hasHorse = true;
                            if (b.mesh) scene.remove(b.mesh);
                            b.mesh = buildEntityMesh(b); scene.add(b.mesh); b.mesh.position.set(b.x, b.y, b.z);
                            updateUI();
                        }
                    }
                }
                if (b.hasHorse) {
                    if (worker.state === "loadhouse_worker" || worker.state === "wander") {
                        worker.state = "loadhouse_worker";
                        worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                        const dist = Math.hypot(b.x - worker.x, b.z - worker.z);
                        let arrived = dist <= (b.radius || 3.0) + 2.0;
                        if (arrived) {
                            worker.targetPosition = null;
                            let wagonTotal = Object.values(b.wagon).reduce((sum, val) => sum + val, 0);
                            if (wagonTotal < 200) {
                                for (let key in b.storage) {
                                    while (b.storage[key] > 0 && wagonTotal < 200) {
                                        b.storage[key]--;
                                        b.wagon[key] = (b.wagon[key] || 0) + 1;
                                        wagonTotal++;
                                    }
                                }
                            }
                            let canLoadMoreWagon = false;
                            for (let key in b.storage) {
                                    if (b.storage[key] > 0) canLoadMoreWagon = true;
                            }
                            if (b.firstLoadTime === 0) b.firstLoadTime = Date.now();
                            const timeSinceFirst = b.firstLoadTime > 0 ? (Date.now() - b.firstLoadTime) / 1000 : 0;
                            if (wagonTotal >= 200 || (wagonTotal > 0 && !canLoadMoreWagon) || timeSinceFirst >= 10.0) {
                                worker.state = "wagon_delivering";
                                let hasKeepGoods = false;
                                let hasBarracksGoods = false;
                                for (let key in b.wagon) {
                                    if (b.wagon[key] > 0) {
                                        if (["food", "wood", "iron", "stone", "gold", "premium_food", "brew", "furniture", "gem"].includes(key)) hasKeepGoods = true;
                                        else hasBarracksGoods = true;
                                    }
                                }
                                worker.hasKeepGoods = hasKeepGoods;
                                worker.hasBarracksGoods = hasBarracksGoods;
                                worker.deliveryPhase = hasKeepGoods ? 0 : 1;
                                if (worker.deliveryPhase === 0) {
                                    const keep = keeps.find(k => k.faction === worker.faction);
                                    if (keep) {
                                        worker.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                                    } else {
                                        worker.deliveryPhase = 1;
                                    }
                                }
                                if (worker.deliveryPhase === 1) {
                                    const barracks = findNearestBarracks(worker.x, worker.z, worker.faction);
                                    if (barracks && worker.hasBarracksGoods) {
                                        worker.targetPosition = new THREE.Vector3(barracks.x, getTerrainHeight(barracks.x, barracks.z), barracks.z);
                                    } else {
                                        worker.deliveryPhase = 2;
                                        worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                                    }
                                }
                                b.wagonAway = true;
                                const wGroup = b.mesh.children.find(c => c.name === "wagonGroup");
                                if (wGroup) wGroup.visible = false; // Hide parked wagon
                                // Swap worker mesh to moving wagon
                                if (worker.mesh) {
                                    scene.remove(worker.mesh);
                                    if (worker.selectionRing) worker.mesh.remove(worker.selectionRing);
                                }
                                worker.mesh = buildWagonMesh(true, worker.faction);
                                if (worker.selectionRing) worker.mesh.add(worker.selectionRing);
                                scene.add(worker.mesh);
                                worker.meshSwappedEmpty = false;
                            }
                        }
                    } else if (worker.state === "wagon_delivering") {
                        if (worker.deliveryPhase === 0) {
                            const keep = keeps.find(k => k.faction === worker.faction);
                            if (keep && Math.hypot(keep.x - worker.x, keep.z - worker.z) <= 6.0) {
                                ["food", "wood", "iron", "stone", "gold", "premium_food", "brew", "furniture", "gem"].forEach(res => {
                                    if (b.wagon[res] > 0) {
                                        if (worker.faction === "red") resources[res] += b.wagon[res];
                                        spawnFloatingText("+" + b.wagon[res] + " " + res, keep.x, keep.y + 4.0, keep.z, 0xffffff);
                                        b.wagon[res] = 0;
                                    }
                                });
                                worker.deliveryPhase = 1;
                                const barracks = findNearestBarracks(worker.x, worker.z, worker.faction);
                                if (barracks && worker.hasBarracksGoods) {
                                    worker.targetPosition = new THREE.Vector3(barracks.x, getTerrainHeight(barracks.x, barracks.z), barracks.z);
                                } else {
                                    worker.deliveryPhase = 2;
                                    worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                                }
                            }
                        } else if (worker.deliveryPhase === 1) {
                            const barracks = findNearestBarracks(worker.x, worker.z, worker.faction);
                            if (barracks && Math.hypot(barracks.x - worker.x, barracks.z - worker.z) <= 6.0) {
                                for (let key in b.wagon) {
                                    if (!["food", "wood", "iron", "stone", "gold", "premium_food", "brew", "furniture", "gem"].includes(key) && b.wagon[key] > 0) {
                                        barracks.inventory[key] = (barracks.inventory[key] || 0) + b.wagon[key];
                                        spawnFloatingText("+" + b.wagon[key] + " " + key, barracks.x, barracks.y + 3.0, barracks.z, 0xffffff);
                                        b.wagon[key] = 0;
                                    }
                                }
                                worker.deliveryPhase = 2;
                                worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                            } else if (!barracks) {
                                worker.deliveryPhase = 2;
                                worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                            }
                        }
                        if (worker.deliveryPhase === 2) {
                            worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                            if (!worker.meshSwappedEmpty) {
                                worker.meshSwappedEmpty = true;
                                if (worker.mesh) {
                                    scene.remove(worker.mesh);
                                    if (worker.selectionRing) worker.mesh.remove(worker.selectionRing);
                                }
                                worker.mesh = buildWagonMesh(false, worker.faction);
                                if (worker.selectionRing) worker.mesh.add(worker.selectionRing);
                                scene.add(worker.mesh);
                            }
                            const dist = Math.hypot(b.x - worker.x, b.z - worker.z);
                            let arrived = dist <= (b.radius || 3.0) + 2.0;
                            if (arrived) {
                                worker.state = "loadhouse_worker";
                                worker.meshSwappedEmpty = false;
                                b.firstLoadTime = 0;
                                b.wagonAway = false;
                                const wGroup = b.mesh.children.find(c => c.name === "wagonGroup");
                                if (wGroup) wGroup.visible = true; // Show wagon again
                                // Revert to peasant mesh
                                if (worker.mesh) {
                                    scene.remove(worker.mesh);
                                    if (worker.selectionRing) worker.mesh.remove(worker.selectionRing);
                                }
                                worker.mesh = buildEntityMesh(worker);
                                if (worker.selectionRing) worker.mesh.add(worker.selectionRing);
                                scene.add(worker.mesh);
                                updateUI();
                            }
                        }
                    }
                } else {
                    // ON-FOOT LOGIC (No horse)
                    if (worker.state === "wander" || worker.state === "loadhouse_worker") {
                        worker.state = "loadhouse_worker";
                        worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                        const dist = Math.hypot(b.x - worker.x, b.z - worker.z);
                        let arrived = dist <= (b.radius || 3.0) + 2.0;
                        if (arrived) {
                            worker.targetPosition = null;
                            let load = worker.payloadAmount || 0;
                            let rType = worker.payloadResource || null;
                            if (load < 20) {
                                for (let key in b.storage) {
                                    while (b.storage[key] > 0 && load < 20 && (rType === null || rType === key)) {
                                        if (rType === null) rType = key;
                                        b.storage[key]--;
                                        load++;
                                        worker.payloadResource = key;
                                        worker.payloadAmount = load;
                                    }
                                }
                            }
                            let canLoadMore = false;
                            for (let key in b.storage) {
                                if (b.storage[key] > 0 && (rType === null || rType === key)) canLoadMore = true;
                            }
                            if (b.firstLoadTime === 0) b.firstLoadTime = Date.now();
                            const timeSinceFirst = b.firstLoadTime > 0 ? (Date.now() - b.firstLoadTime) / 1000 : 0;
                            if (load >= 20 || (load > 0 && !canLoadMore) || timeSinceFirst >= 10.0) {
                                worker.state = "loadhouse_peasant_delivering";
                                let isKeepGood = ["food", "wood", "iron", "stone", "gold", "premium_food", "brew", "furniture", "gem"].includes(worker.payloadResource);
                                worker.hasKeepGoods = isKeepGood;
                                worker.hasBarracksGoods = !isKeepGood;
                                worker.deliveryPhase = worker.hasKeepGoods ? 0 : 1;
                                if (worker.deliveryPhase === 0) {
                                    const keep = keeps.find(k => k.faction === worker.faction);
                                    if (keep) {
                                        worker.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                                    } else {
                                        worker.deliveryPhase = 1;
                                    }
                                }
                                if (worker.deliveryPhase === 1) {
                                    const barracks = findNearestBarracks(worker.x, worker.z, worker.faction);
                                    if (barracks && worker.hasBarracksGoods) {
                                        worker.targetPosition = new THREE.Vector3(barracks.x, getTerrainHeight(barracks.x, barracks.z), barracks.z);
                                    } else {
                                        worker.deliveryPhase = 2;
                                        worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                                    }
                                }
                            }
                        }
                    } else if (worker.state === "loadhouse_peasant_delivering") {
                        if (worker.deliveryPhase === 0) {
                            const keep = keeps.find(k => k.faction === worker.faction);
                            if (keep && Math.hypot(keep.x - worker.x, keep.z - worker.z) <= 6.0) {
                                if (["food", "wood", "iron", "stone", "gold", "premium_food", "brew", "furniture", "gem"].includes(worker.payloadResource)) {
                                    if (worker.faction === "red") resources[worker.payloadResource] += worker.payloadAmount;
                                    spawnFloatingText("+" + worker.payloadAmount + " " + worker.payloadResource, keep.x, keep.y + 4.0, keep.z, 0xffffff);
                                    worker.payloadAmount = 0;
                                }
                                worker.deliveryPhase = 1;
                                const barracks = findNearestBarracks(worker.x, worker.z, worker.faction);
                                if (barracks && worker.hasBarracksGoods) {
                                    worker.targetPosition = new THREE.Vector3(barracks.x, getTerrainHeight(barracks.x, barracks.z), barracks.z);
                                } else {
                                    worker.deliveryPhase = 2;
                                    worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                                }
                            }
                        } else if (worker.deliveryPhase === 1) {
                            const barracks = findNearestBarracks(worker.x, worker.z, worker.faction);
                            if (barracks && Math.hypot(barracks.x - worker.x, barracks.z - worker.z) <= 6.0) {
                                if (worker.payloadAmount > 0) {
                                    barracks.inventory[worker.payloadResource] = (barracks.inventory[worker.payloadResource] || 0) + worker.payloadAmount;
                                    spawnFloatingText("+" + worker.payloadAmount + " " + worker.payloadResource, barracks.x, barracks.y + 3.0, barracks.z, 0xffffff);
                                    worker.payloadAmount = 0;
                                }
                                worker.deliveryPhase = 2;
                                worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                            } else if (!barracks) {
                                worker.deliveryPhase = 2;
                                worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                            }
                        }
                        if (worker.deliveryPhase === 2) {
                            worker.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
                            const dist = Math.hypot(b.x - worker.x, b.z - worker.z);
                            let arrived = dist <= (b.radius || 3.0) + 2.0;
                            if (arrived) {
                                worker.state = "loadhouse_worker";
                                b.firstLoadTime = 0;
                                worker.payloadAmount = 0;
                                worker.payloadResource = null;
                            }
                        }
                    }
                }
            }
        }
    });
    processConstructionQueue(activePeasants, keeps, e => !["house", "gatehouse", "tower", "wall_column", "wall_ramp"].includes(e.type));
    processConstructionQueue(activePeasants, keeps, e => ["gatehouse", "tower", "wall_column", "wall_ramp"].includes(e.type));
}
// Helpers
function getHorseStats(faction) {
    const stables = entities.filter(e => e.type === "stables" && e.faction === faction && !e.isDead);
    let cap = 0;
    stables.forEach(s => {
        if (s.inventory && s.inventory.horse) cap += s.inventory.horse;
    });
    let used = 0;
    entities.forEach(e => {
        if (e.faction === faction && !e.isDead) {
            if (e.type === "soldier" && e.hasHorse) used++;
            if (e.type === "loadhouse" && e.hasHorse) used++;
            if (e.type === "peasant" && e.trainingConfig && e.trainingConfig.hasHorse) used++;
        }
    });
    if (typeof soldierTrainingQueue !== 'undefined' && soldierTrainingQueue[faction]) {
        soldierTrainingQueue[faction].forEach(q => {
            if (q.hasHorse) used++;
        });
    }
    return { cap, used };
}
function findNearestTree(x, z) {
    let bestDist = Infinity;
    let candidate = null;
    // Get all active peasants to see who is targeting what
    const activePeasants = entities.filter(e => e.type === "peasant" && e.state === "woodcutter_walking_to_tree");
    // Determine the worker's current region
    const sx = Math.max(0, Math.min(299, Math.round(x) + 150));
    const sz = Math.max(0, Math.min(299, Math.round(z) + 150));
    const unitRegion = regionGrid[sz * 300 + sx];
    entities.forEach(ent => {
        if (ent.type === "tree" && ent.state !== "dead") {
            // Check if tree is accessible from the unit's region
            let reachable = false;
            if (unitRegion === 0) {
                reachable = true;
            } else {
                const tx = Math.round(ent.x) + 150;
                const tz = Math.round(ent.z) + 150;
                for (let ox = -1; ox <= 1 && !reachable; ox++) {
                    for (let oz = -1; oz <= 1 && !reachable; oz++) {
                        const nx = tx + ox;
                        const nz = tz + oz;
                        if (nx >= 0 && nx < 300 && nz >= 0 && nz < 300) {
                            if (regionGrid[nz * 300 + nx] === unitRegion) {
                                reachable = true;
                            }
                        }
                    }
                }
            }
            if (!reachable) return;
            let targetingCount = 0;
            activePeasants.forEach(p => {
                if (p.targetTree === ent) targetingCount++;
            });
            // Add a heavy distance penalty for every peasant already targeting this tree
            const dist = Math.hypot(ent.x - x, ent.z - z) + (targetingCount * 20.0);
            if (dist < bestDist) {
                bestDist = dist;
                candidate = ent;
            }
        }
    });
    return candidate;
}
function findNearestDropoff(x, z, faction, onlyKeep = false) {
    let bestDist = Infinity;
    let target = null;
    entities.forEach(ent => {
        if (ent.state === "dead" || ent.isPlanned || ent.faction !== faction) return;
        if (ent.type === "keep") {
            const dist = Math.hypot(ent.x - x, ent.z - z);
            if (dist < bestDist) { bestDist = dist; target = ent; }
        } else if (ent.type === "loadhouse" && !onlyKeep) {
            const dist = Math.hypot(ent.x - x, ent.z - z);
            let lhTotal = 0;
            if (ent.storage) lhTotal = Object.values(ent.storage).reduce((a,b)=>a+b,0);
            if (dist < bestDist && lhTotal < 200) { bestDist = dist; target = ent; }
        }
    });
    return target;
}
function findNearestMilitaryDropoff(x, z, faction) {
    let bestDist = Infinity;
    let target = null;
    entities.forEach(ent => {
        if (ent.state === "dead" || ent.isPlanned || ent.faction !== faction) return;
        if (ent.type === "barracks") {
            const dist = Math.hypot(ent.x - x, ent.z - z);
            if (dist < bestDist) { bestDist = dist; target = ent; }
        } else if (ent.type === "loadhouse") {
            const dist = Math.hypot(ent.x - x, ent.z - z);
            let lhTotal = 0;
            if (ent.storage) lhTotal = Object.values(ent.storage).reduce((a,b)=>a+b,0);
            if (dist < bestDist && lhTotal < 200) { bestDist = dist; target = ent; }
        }
    });
    return target;
}
function findNearestBarracks(x, z, faction) {
    let bestDist = Infinity;
    let candidate = null;
    entities.forEach(ent => {
        if (ent.type === "barracks" && ent.faction === faction && ent.state !== "dead") {
            const dist = Math.hypot(ent.x - x, ent.z - z);
            if (dist < bestDist) {
                bestDist = dist;
                candidate = ent;
            }
        }
    });
    return candidate;
}
// --- SOLDIER TRAINING PROCESS ---
window.armorLockState = false;
window.toggleMount = function() {
    const rks = selectedEntities.filter(e => e.type === "soldier" && e.weapon === "RoyalKnight");
    if (rks.length === 0) return;
    // Check if any are unmounted to mount them, otherwise dismount all
    const anyUnmounted = rks.some(e => !e.hasHorse);
    if (anyUnmounted) {
        const stats = getHorseStats("red");
        let available = stats.cap - stats.used;
        rks.forEach(rk => {
            if (!rk.hasHorse && available > 0) {
                rk.isMounting = true;
                rk.mountTimer = 10.0;
                // Temporarily halt them while mounting
                rk.state = "idle";
                rk.targetPosition = null;
                rk.path = null;
                available--;
            }
        });
        if (available < rks.filter(e => !e.hasHorse).length) {
            showStatusLog("Not enough horses available for all knights!");
        }
    } else {
        // Dismount all
        rks.forEach(rk => {
            rk.hasHorse = false;
            rk.isMounting = false;
            rk.mountTimer = 0;
            if (rk.weapon === "RoyalKnight") {
                rk.speed = 2.0;
                rk.baseSpeed = rk.speed;
            }
            updateUnitToSoldierMesh(rk);
        });
        updateUI();
    }
    updateSelectionHUD();
};
window.toggleArmorLock = function() {
    window.armorLockState = !window.armorLockState;
    const btn = document.getElementById("btn-armor-lock");
    if (btn) {
        btn.innerText = window.armorLockState ? "\uD83D\uDD12" : "\uD83D\uDD13";
    }
};
window.trainMercenary = function(weapon, event) {
    let mult = 1;
    if (event && event.altKey) mult = 50;
    else if (event && event.shiftKey) mult = 10;
    let queuedCount = 0;
    
    for (let i = 0; i < mult; i++) {
        const b = selectedEntities.find(e => e.type === "mercenary_post" && e.faction === "red" && !e.isPlanned);
        if (!b) break;
        let goldCost = 0;
        if (weapon === "Grunt") goldCost = 30;
        else if (weapon === "Thug") goldCost = 177;
        else if (weapon === "Brute") goldCost = 400;
        else if (weapon === "Slinger") goldCost = 75;
        else if (weapon === "Spy") goldCost = 100;
        else if (weapon === "Assassin") goldCost = 500;
        else if (weapon === "Doppelsoldner") goldCost = 1000;
        else if (weapon === "RoyalKnight") goldCost = 1777;
        else break;
        
        if (resources.gold < goldCost) {
            if (i === 0) showStatusLog("Missing Gold! Required: " + goldCost + "g");
            break;
        }
        resources.gold -= goldCost;
        soldierTrainingQueue["red"].push({
            weapon: weapon,
            armors: [],
            hasHorse: false,
            goldCost: goldCost,
            barracksId: b.id
        });
        queuedCount++;
    }
    
    if (queuedCount > 0) {
        updateBarracksQueueUI();
        showStatusLog(queuedCount + " " + weapon + " queued for recruitment!");
        updateUI();
        updateSelectionHUD();
    }
};
window.trainUnitFromSelectedBarracks = function(weapon, event) {
    let mult = 1;
    if (event && event.altKey) mult = 50;
    else if (event && event.shiftKey) mult = 10;
    let queuedCount = 0;
    
    for (let i = 0; i < mult; i++) {
        const b = selectedEntities.find(e => e.type === "barracks" && e.faction === "red");
        if (!b) {
            if (i === 0) showStatusLog("No player barracks selected!");
            break;
        }
        const hasCloth = document.getElementById("chk-cloth").checked;
        const hasLeather = document.getElementById("chk-leather").checked;
        const hasChain = document.getElementById("chk-chain").checked;
        const hasPlate = document.getElementById("chk-plate").checked;
        const chkHorse = document.getElementById("chk-horse");
        const hasHorse = chkHorse ? chkHorse.checked : false;
        const armors = [];
        if (hasCloth) armors.push("cloth");
        if (hasLeather) armors.push("leather");
        if (hasChain) armors.push("chain");
        if (hasPlate) armors.push("plate");
        const goldCost = UNIT_GOLD_COSTS[weapon] || 0;
        if (resources.gold < goldCost) {
            if (i === 0) showStatusLog("Missing Gold! Required: " + goldCost + "g");
            break;
        }
        if ((b.inventory[weapon] || 0) < 1) {
            if (i === 0) showStatusLog("Missing " + weapon + " weapon inside Barracks inventory!");
            break;
        }
        const finalArmors = [];
        let missingArmor = false;
        for (let aKey of armors) {
            if ((b.inventory[aKey] || 0) < 1) {
                if (window.armorLockState) {
                    if (i === 0) showStatusLog("Missing " + ARMORS[aKey].name + " armor inside Barracks inventory!");
                    missingArmor = true;
                    break;
                } else {
                    continue;
                }
            }
            finalArmors.push(aKey);
        }
        if (missingArmor) break;
        if (hasHorse) {
            const stats = getHorseStats("red");
            if (stats.used >= stats.cap) {
                if (i === 0) showStatusLog("No available horses! Build more Stables.");
                break;
            }
        }
        resources.gold -= goldCost;
        b.inventory[weapon]--;
        finalArmors.forEach(aKey => b.inventory[aKey]--);
        soldierTrainingQueue["red"].push({
            weapon: weapon,
            armors: finalArmors,
            hasHorse: hasHorse,
            goldCost: goldCost,
            barracksId: b.id
        });
        queuedCount++;
    }
    if (queuedCount > 0) {
        updateBarracksQueueUI();
        showStatusLog(queuedCount + " Soldier(s) queued for training at Barracks!");
        updateUI();
        updateSelectionHUD();
    }
}
window.cancelMilitaryQueue = function(faction) {
    const queue = soldierTrainingQueue[faction];
    if (!queue || queue.length === 0) return;
    queue.forEach(item => {
        resources.gold += item.goldCost;
        const b = entities.find(e => e.id === item.barracksId);
        if (b && b.type === "barracks") {
            b.inventory[item.weapon] = (b.inventory[item.weapon] || 0) + 1;
            item.armors.forEach(aKey => {
                b.inventory[aKey] = (b.inventory[aKey] || 0) + 1;
            });
        }
    });
    soldierTrainingQueue[faction] = [];
    showStatusLog("Military training queue canceled and resources refunded.");
    updateUI();
    updateSelectionHUD();
    updateBarracksQueueUI();
};
function updateBarracksQueueUI() {
    const el = document.getElementById("barracks-queue-count");
    if (el) el.innerText = soldierTrainingQueue["red"].length;
    const weaponCounts = {
        "Spear": 0, "Pike": 0, "Halberd": 0, "Poleaxe": 0, "Axe": 0,
        "Sword": 0, "Mace": 0, "Short Bow": 0, "Longbow": 0, "Crossbow": 0, "Grunt": 0, "Thug": 0, "Brute": 0, "Slinger": 0, "Spy": 0, "Assassin": 0, "Doppelsoldner": 0, "RoyalKnight": 0
    };
    soldierTrainingQueue["red"].forEach(q => {
        if (weaponCounts[q.weapon] !== undefined) weaponCounts[q.weapon]++;
    });
    for (let w in weaponCounts) {
        const idStr = w === "Short Bow" ? "ShortBow" : w;
        const qEl = document.getElementById("queue-" + idStr);
        if (qEl) {
            qEl.innerText = weaponCounts[w] > 0 ? "+" + weaponCounts[w] : "";
        }
    }
}
function updateSiegeShopQueueUI() {
    const weaponCounts = {
        "Shield": 0, "Ballista": 0, "Catapult": 0, "Trebuchet": 0
    };
    siegeTrainingQueue["red"].forEach(q => {
        if (weaponCounts[q.type] !== undefined) weaponCounts[q.type]++;
    });
    for (let w in weaponCounts) {
        const qEl = document.getElementById("queue-" + w);
        if (qEl) {
            qEl.innerText = weaponCounts[w] > 0 ? "+" + weaponCounts[w] : "";
        }
    }
}
window.cancelSiegeQueue = function(faction) {
    const queue = siegeTrainingQueue[faction];
    if (!queue || queue.length === 0) return;
    queue.forEach(item => {
        const cost = SIEGE_UNIT_COSTS[item.type];
        if (cost) {
            resources.gold += cost.gold;
            resources.wood += cost.wood;
            resources.iron += cost.iron;
        }
    });
    siegeTrainingQueue[faction] = [];
    entities.forEach(e => {
        if (e.type === "peasant" && e.state === "siege_waiting" && e.faction === faction) {
            e.state = "wander";
            e.targetSiegeShop = null;
            e.trainingConfig = null;
            if (e.mesh) e.mesh.visible = true;
        }
    });
    showStatusLog("Siege training queue canceled and resources refunded.");
    updateUI();
    updateSelectionHUD();
    updateSiegeShopQueueUI();
};
window.trainSiegeUnitFromSelectedShop = function(type, event) {
    let mult = 1;
    if (event && event.altKey) mult = 50;
    else if (event && event.shiftKey) mult = 10;
    let queuedCount = 0;
    
    for (let i = 0; i < mult; i++) {
        const b = selectedEntities.find(e => e.type === "siegeshop" && e.faction === "red");
        if (!b) {
            if (i === 0) showStatusLog("No player siege shop selected!");
            break;
        }
        const cost = SIEGE_UNIT_COSTS[type];
        if (!cost) break;
        if (resources.gold < cost.gold) { if (i===0) showStatusLog("Missing Gold! Required: " + cost.gold + "g"); break; }
        if (resources.wood < cost.wood) { if (i===0) showStatusLog("Missing Wood! Required: " + cost.wood); break; }
        if (resources.iron < cost.iron) { if (i===0) showStatusLog("Missing Iron! Required: " + cost.iron); break; }
        resources.gold -= cost.gold;
        resources.wood -= cost.wood;
        resources.iron -= cost.iron;
        siegeTrainingQueue["red"].push({
            type: type,
            peasantsNeeded: cost.peasants,
            peasantsGathered: 0,
            shopId: b.id
        });
        queuedCount++;
    }
    
    if (queuedCount > 0) {
        updateSiegeShopQueueUI();
        showStatusLog(queuedCount + " " + type + " queued for construction!");
        updateUI();
        updateSelectionHUD();
    }
}
function applyEquipmentStats(peasant, config) {
    peasant.weapon = config.weapon;
    peasant.armors = config.armors;
    peasant.hasHorse = config.hasHorse || false;
    const base = BASE_STATS.soldier;
    const weaponConfig = WEAPONS[config.weapon] || WEAPONS["Sword"];
    let totalHpMod = weaponConfig.hpMod || 0;
    let totalSpeedMod = weaponConfig.speedMod || 0;
    let totalArmorMod = base.armor;
    config.armors.forEach(aKey => {
        const a = ARMORS[aKey];
        if (a) {
            totalHpMod += a.hpMod;
            totalSpeedMod += a.speedMod;
            totalArmorMod += a.armorMod;
        }
    });
    peasant.maxHealth = base.maxHp + totalHpMod;
    peasant.health = peasant.maxHealth;
    peasant.armor = totalArmorMod;
    peasant.speed = base.speed * (1.0 + totalSpeedMod) + (peasant.hasHorse ? 1.625 : 0.0);
    if (config.weapon === "Thug") {
        peasant.maxHealth = 175;
        peasant.health = 175;
        peasant.armor = 1;
    } else if (config.weapon === "Doppelsoldner") {
        peasant.maxHealth = 177;
        peasant.health = 177;
        peasant.armor = 4;
        peasant.speed = 2.5;
    } else if (config.weapon === "Brute") {
        peasant.maxHealth = 400;
        peasant.health = 400;
        peasant.armor = 2;
        peasant.speed = 1.9;
    } else if (config.weapon === "Slinger") {
        peasant.maxHealth = 50;
        peasant.health = 50;
    } else if (config.weapon === "RoyalKnight") {
        peasant.maxHealth = 500;
        peasant.health = 500;
        peasant.armor = 5;
        peasant.speed = 2.0 + (peasant.hasHorse ? 1.625 : 0.0);
    } else if (config.weapon === "Assassin") {
        peasant.maxHealth += 7;
        peasant.health = peasant.maxHealth;
        peasant.armor += 1;
    }
    peasant.baseSpeed = peasant.speed;
    peasant.radius = base.radius;
    peasant.height = base.height;
    updateUnitToSoldierMesh(peasant);
}
function applyCommandToUnit(unit, cmd) {
    if (unit.isMounting) {
        unit.isMounting = false;
        unit.mountTimer = 0;
    }
    if (unit.state === "training" && unit.trainingConfig && unit.targetBarracks && cmd.state !== "training") {
        if (!soldierTrainingQueue[unit.faction]) soldierTrainingQueue[unit.faction] = [];
        soldierTrainingQueue[unit.faction].unshift({
            barracksId: unit.targetBarracks.id,
            weapon: unit.trainingConfig.weapon,
            armors: unit.trainingConfig.armors,
            hasHorse: unit.trainingConfig.hasHorse,
            goldCost: unit.trainingConfig.goldCost || 0
        });
        unit.targetBarracks = null;
        unit.trainingConfig = null;
        if (unit.faction === "red") updateBarracksQueueUI();
    }
    if (unit.state === "siege_training" && unit.trainingConfig && unit.targetSiegeShop && cmd.state !== "siege_training") {
        const sq = siegeTrainingQueue[unit.faction];
        if (sq) {
            const order = sq.find(q => q.shopId === unit.targetSiegeShop.id && q.type === unit.trainingConfig.type);
            if (order && order.peasantsDispatched > 0) {
                order.peasantsDispatched--;
            }
        }
        unit.targetSiegeShop = null;
        unit.trainingConfig = null;
        if (unit.faction === "red") updateSiegeShopQueueUI();
    }
    unit.timeNearTarget = 0;
    unit.savedFightMoveDest = null;
    unit.path = null;
    unit.pathCooldown = 0;
    unit.workerBuilding = cmd.workerBuilding;
    unit.payloadResource = cmd.payloadResource;
    unit.intendedFetchAmount = cmd.intendedFetchAmount;
    unit.state = cmd.state;
    unit.targetPosition = cmd.targetPosition ? cmd.targetPosition.clone() : null;
    unit.targetEntity = cmd.targetEntity;
    unit.isExplicitAttack = (cmd.state === "attacking" || cmd.state === "attack_ground");
    unit.inCombatRange = false;
    unit.fightMoveDestination = cmd.fightMoveDestination ? cmd.fightMoveDestination.clone() : null;
    if (cmd.timeStationary !== undefined) unit.timeStationary = cmd.timeStationary;
}
function processNextCommand(unit) {
    if (unit.commandQueue && unit.commandQueue.length > 0) {
        const nextCmd = unit.commandQueue.shift();
        applyCommandToUnit(unit, nextCmd);
        return true;
    }
    return false;
}
function enqueueOrExecute(unit, e, cmd) {
    if (e.shiftKey) {
        unit.commandQueue = unit.commandQueue || [];
        unit.commandQueue.push(cmd);
        if (unit.state === "idle" || unit.state === "wander") {
            processNextCommand(unit);
        }
    } else {
        unit.commandQueue = [];
        applyCommandToUnit(unit, cmd);
    }
}
function convertPeasantToSoldier(peasant, barracks) {
    const config = peasant.trainingConfig || { weapon: "Sword", armors: [] };
    peasant.type = "soldier";
    peasant.state = "idle";
    if (config.weapon && WEAPONS[config.weapon] && (WEAPONS[config.weapon].type === "bow" || WEAPONS[config.weapon].type === "crossbow")) {
        peasant.isAggro = false;
    } else {
        peasant.isAggro = true;
    }
    applyEquipmentStats(peasant, config);
    if (config.weapon === "Spy") {
        peasant.isDisguised = true;
        peasant.disguiseTimer = 0;
    }
    const angle = Math.random() * Math.PI * 2;
    const finalX = barracks.x + Math.cos(angle) * 4.5;
    const finalZ = barracks.z + Math.sin(angle) * 4.5;
    peasant.targetPosition = new THREE.Vector3(finalX, getTerrainHeight(finalX, finalZ), finalZ);
    showStatusLog("Trained: " + config.weapon + " (" + config.armors.join("+") + ")");
        updateUI();
}

window.disbandUnit = function(id) {
    const ent = entities.find(e => e.id === id);
    if (!ent || ent.faction !== "red" || ent.type === "peasant" || ent.type === "king" || BUILDING_TYPES[ent.type]) return;
    performDisband(ent);
    updateSelectionHUD();
};

window.disbandSelectedUnits = function() {
    const toDisband = selectedEntities.filter(ent => ent.faction === "red" && ent.type !== "peasant" && ent.type !== "king" && !BUILDING_TYPES[ent.type]);
    toDisband.forEach(ent => performDisband(ent));
    updateSelectionHUD();
};

function performDisband(ent) {
    const pct = ent.health / ent.maxHealth;
    const config = { weapon: ent.weapon, armors: [...(ent.armors || [])], hasHorse: ent.hasHorse };
    const disbandGoods = (config.weapon || config.armors.length > 0 || config.hasHorse) ? config : null;
    const isSelected = selectedEntities.includes(ent);
    
    // Create new peasant (will be added to the end of entities array)
    createEntity("peasant", ent.faction, ent.x, ent.z, false, ent.homeBuilding);
    const peasant = entities[entities.length - 1];
    peasant.maxHealth = 50;
    peasant.health = Math.max(1, Math.floor(50 * pct));
    peasant.sillyName = ent.sillyName || peasant.sillyName;
    peasant.spawnTime = ent.spawnTime || peasant.spawnTime;
    
    if (disbandGoods) {
        peasant.state = "returning_payload"; // intercepting our custom payload logic
        peasant.disbandGoods = disbandGoods;
        const b = findNearestBarracks(peasant.x, peasant.z, peasant.faction);
        if (b) {
            peasant.targetPosition = new THREE.Vector3(b.x, getTerrainHeight(b.x, b.z), b.z);
            peasant.targetBuilding = b;
        } else {
            peasant.state = "wander";
        }
    } else {
        peasant.state = "wander";
    }
    
    // Remove old soldier silently
    ent.state = "dead";
    ent.isDead = true;
    selectedEntities = selectedEntities.filter(e => e !== ent);
    needsPathGridUpdate = true;
    if (ent.mesh) scene.remove(ent.mesh);
    
    if (ent.homeBuilding && ent.homeBuilding.spawnedPeasants) {
        ent.homeBuilding.spawnedPeasants = ent.homeBuilding.spawnedPeasants.filter(p => p !== ent);
    }
    
    const idx = entities.indexOf(ent);
    if (idx > -1) {
        // Deferred array removal to prevent iteration crashes during game loop
        ent.isDisbanded = true;
        setTimeout(() => {
            const i = entities.indexOf(ent);
            if (i > -1) entities.splice(i, 1);
        }, 0);
    }
    
    if (isSelected) {
        selectedEntities.push(peasant);
    }
}

// --- BUILDING PLACEMENT CONTROLS ---
function startPlacement(type) {
    if (placementMode) cancelPlacement();
    wallDrawMode = null;
    clearWallGhosts();
    // Check Wood and Gold building costs
    const config = BUILDING_TYPES[type];
    if (config.material === "stone") {
        if (resources.stone < config.cost) {
            showStatusLog("Missing Stone! Required: " + config.cost);
            return;
        }
    } else {
        if (resources.wood < config.cost) {
            showStatusLog("Missing Wood! Required: " + config.cost);
            return;
        }
    }
    if (config.ironCost && resources.iron < config.ironCost) {
        showStatusLog("Missing Iron! Required: " + config.ironCost);
        return;
    }
    if (resources.gold < config.goldCost) {
        showStatusLog("Missing Gold! Required: " + config.goldCost + "g");
        return;
    }
    placementMode = type;
    const ghostGroup = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.4 });
    const w = config.dimX !== undefined ? config.dimX : (config.radius || 0.5) * 2;
    const d = config.dimZ !== undefined ? config.dimZ : (config.radius || 0.5) * 2;
    const h = config.height || 2.0;
    // Use a box that perfectly represents the actual collision bounds
    const box = new THREE.Mesh(new THREE.BoxGeometry(w - 0.1, h, d - 0.1), mat);
    box.position.y = h / 2;
    ghostGroup.add(box);
    placementGhost = ghostGroup;
    scene.add(placementGhost);
    document.getElementById("placement-instructions").style.display = "block";
    updateSelectionHUD();
}
function cancelPlacement() {
    if (placementGhost) {
        scene.remove(placementGhost);
        disposeHierarchy(placementGhost);
        placementGhost = null;
    }
    placementMode = null;
    document.getElementById("placement-instructions").style.display = "none";
    updateSelectionHUD();
}
function getSnappedPoint(pt, e, mode) {
    if (!pt) return null;
    let res = pt.clone();
    let isEvenX = false;
    let isEvenZ = false;
    if (mode && BUILDING_TYPES[mode]) {
        const config = BUILDING_TYPES[mode];
        const w = config.dimX !== undefined ? config.dimX : (config.radius || 0.5) * 2;
        const d = config.dimZ !== undefined ? config.dimZ : (config.radius || 0.5) * 2;
        isEvenX = (Math.round(w) % 2 === 0);
        isEvenZ = (Math.round(d) % 2 === 0);
    }
    if (e.altKey) {
        let bestDist = Infinity;
        let nearest = null;
        entities.forEach(ent => {
            if (ent.baseSpeed === 0 && ent.type !== "tree" && ent.type !== "iron" && ent.type !== "gold" && ent.type !== "stone") {
                const dist = Math.hypot(ent.x - pt.x, ent.z - pt.z);
                if (dist < bestDist) {
                    bestDist = dist;
                    nearest = ent;
                }
            }
        });
        if (nearest) {
            res.x = nearest.x + Math.round(pt.x - nearest.x);
            res.z = nearest.z + Math.round(pt.z - nearest.z);
        }
    } else if (!e.ctrlKey) {
        res.x = isEvenX ? Math.round(res.x - 0.5) + 0.5 : Math.round(res.x);
        res.z = isEvenZ ? Math.round(res.z - 0.5) + 0.5 : Math.round(res.z);
    }
    return res;
}
function handlePlacementGhostUpdate(e) {
    if (!placementMode || !placementGhost) return;
    let pt = getTerrainIntersection(e.clientX, e.clientY);
    pt = getSnappedPoint(pt, e, placementMode);
    if (pt) {
        placementGhost.position.set(pt.x, getTerrainHeight(pt.x, pt.z), pt.z);
        let isValid = true;
        const config = BUILDING_TYPES[placementMode];
        // 1. Collisions check
        entities.forEach(entity => {
            if (entity.baseSpeed === 0) {
                const hwX = config.dimX !== undefined ? config.dimX / 2 : config.radius || 0.5;
                const hwZ = config.dimZ !== undefined ? config.dimZ / 2 : config.radius || 0.5;
                const eHwX = entity.dimX !== undefined ? entity.dimX / 2 : entity.radius || 0.5;
                const eHwZ = entity.dimZ !== undefined ? entity.dimZ / 2 : entity.radius || 0.5;
                const dx = Math.abs(entity.x - pt.x);
                const dz = Math.abs(entity.z - pt.z);
                if (dx < hwX + eHwX - 0.05 && dz < hwZ + eHwZ - 0.05) {
                    if (entity.type === "tower" && entity.footprint) {
                        const overlaps = entity.footprint.some(f => Math.abs(f.x - pt.x) < hwX + 0.5 - 0.05 && Math.abs(f.z - pt.z) < hwZ + 0.5 - 0.05);
                        if (overlaps) isValid = false;
                    } else {
                        isValid = false;
                    }
                }
            }
        });
        // 2. Resource placement checks (Farms & Mines)
        if (placementMode === "farm") {
            const hasLand = isBuildingOnResource(pt.x, pt.z, config.radius, "fertile");
            // Farms can now be placed anywhere
        } else if (placementMode === "mine") {
            const goldDep = isBuildingOnResource(pt.x, pt.z, config.radius, "gold");
            const ironDep = isBuildingOnResource(pt.x, pt.z, config.radius, "iron");
            const stoneDep = isBuildingOnResource(pt.x, pt.z, config.radius, "stone");
            if (!goldDep && !ironDep && !stoneDep) isValid = false;
        }
        // 3. Slope check
        if (isValid && placementMode !== "wall_column" && placementMode !== "wall_ramp" && placementMode !== "gatehouse") {
            const hwX = config.dimX !== undefined ? config.dimX / 2 : config.radius || 0.5;
            const hwZ = config.dimZ !== undefined ? config.dimZ / 2 : config.radius || 0.5;
            const h1 = getTerrainHeight(pt.x - hwX, pt.z - hwZ);
            const h2 = getTerrainHeight(pt.x + hwX, pt.z - hwZ);
            const h3 = getTerrainHeight(pt.x - hwX, pt.z + hwZ);
            const h4 = getTerrainHeight(pt.x + hwX, pt.z + hwZ);
            const minH = Math.min(h1, h2, h3, h4);
            const maxH = Math.max(h1, h2, h3, h4);
            let maxAllowed = 1.0;
            if (placementMode === "mine") {
                const span = Math.max(hwX * 2, hwZ * 2);
                maxAllowed = span * Math.tan(40 * Math.PI / 180);
            }
            if (maxH - minH > maxAllowed) isValid = false;
        }
        let isReachable = false;
        if (isValid) {
            const bx = Math.max(0, Math.min(299, Math.round(pt.x) + 150));
            const bz = Math.max(0, Math.min(299, Math.round(pt.z) + 150));
            const checkRad = Math.ceil((config.dimX ? Math.max(config.dimX, config.dimZ) / 2 : (config.radius || 0.5)) + 1.5);
            for (let ox = -checkRad; ox <= checkRad && !isReachable; ox++) {
                for (let oz = -checkRad; oz <= checkRad && !isReachable; oz++) {
                    const cx = bx + ox;
                    const cz = bz + oz;
                    if (cx >= 0 && cx < 300 && cz >= 0 && cz < 300) {
                        const rId = regionGrid[cz * 300 + cx];
                        if (keepRegions.has(rId)) isReachable = true;
                    }
                }
            }
        }
        placementGhost.traverse(child => {
            if (child.material) {
                if (!isValid) child.material.color.setHex(0xff0000); // Red
                else if (!isReachable) child.material.color.setHex(0xffa500); // Orange
                else if (placementMode === "farm" && !isBuildingOnResource(pt.x, pt.z, config.radius, "fertile")) child.material.color.setHex(0xffff00); // Yellow for barren farm
                else child.material.color.setHex(0x00ff00); // Green
            }
        });
    }
}
function tryPlaceBuilding(e) {
    let pt = getTerrainIntersection(e.clientX, e.clientY);
    pt = getSnappedPoint(pt, e, placementMode);
    if (!pt) return;
    const config = BUILDING_TYPES[placementMode];
    // Validate
    let isValid = true;
    entities.forEach(entity => {
        if (entity.baseSpeed === 0) {
            const hwX = config.dimX !== undefined ? config.dimX / 2 : config.radius || 0.5;
            const hwZ = config.dimZ !== undefined ? config.dimZ / 2 : config.radius || 0.5;
            const eHwX = entity.dimX !== undefined ? entity.dimX / 2 : entity.radius || 0.5;
            const eHwZ = entity.dimZ !== undefined ? entity.dimZ / 2 : entity.radius || 0.5;
            const dx = Math.abs(entity.x - pt.x);
            const dz = Math.abs(entity.z - pt.z);
            if (dx < hwX + eHwX - 0.05 && dz < hwZ + eHwZ - 0.05) {
                if (entity.type === "tower" && entity.footprint) {
                    const overlaps = entity.footprint.some(f => Math.abs(f.x - pt.x) < hwX + 0.5 - 0.05 && Math.abs(f.z - pt.z) < hwZ + 0.5 - 0.05);
                    if (overlaps) isValid = false;
                } else {
                    isValid = false;
                }
            }
        }
    });
    let targetDeposit = null;
    if (placementMode === "farm") {
            // Farms can be placed anywhere, fertility will be determined at creation
    } else if (placementMode === "mine") {
        const goldDep = isBuildingOnResource(pt.x, pt.z, config.radius, "gold");
        const ironDep = isBuildingOnResource(pt.x, pt.z, config.radius, "iron");
        const stoneDep = isBuildingOnResource(pt.x, pt.z, config.radius, "stone");
        targetDeposit = goldDep || ironDep || stoneDep;
        if (!targetDeposit) isValid = false;
    }
    let slopeTooSteep = false;
    if (isValid && placementMode !== "wall_column" && placementMode !== "wall_ramp" && placementMode !== "gatehouse") {
        const hwX = config.dimX !== undefined ? config.dimX / 2 : config.radius || 0.5;
        const hwZ = config.dimZ !== undefined ? config.dimZ / 2 : config.radius || 0.5;
        const h1 = getTerrainHeight(pt.x - hwX, pt.z - hwZ);
        const h2 = getTerrainHeight(pt.x + hwX, pt.z - hwZ);
        const h3 = getTerrainHeight(pt.x - hwX, pt.z + hwZ);
        const h4 = getTerrainHeight(pt.x + hwX, pt.z + hwZ);
        const minH = Math.min(h1, h2, h3, h4);
        const maxH = Math.max(h1, h2, h3, h4);
        let maxAllowed = 1.0;
        if (placementMode === "mine") {
            const span = Math.max(hwX * 2, hwZ * 2);
            maxAllowed = span * Math.tan(40 * Math.PI / 180);
        }
        if (maxH - minH > maxAllowed) {
            isValid = false;
            slopeTooSteep = true;
        }
    }
    if (!isValid) {
        if (slopeTooSteep) showStatusLog("Terrain too steep here!");
        else showStatusLog("Invalid construction site!");
        return;
    }
    // Verify cost against spendable ledger (do not deduct immediately, peasants will fetch it)
    const ledger = getLedger("red");
    if (config.material === "stone") {
        if (config.cost && ledger.stone.spendable < config.cost) {
            showStatusLog("Missing Stone! Required: " + config.cost);
            return;
        }
    } else {
        if (config.cost && ledger.wood.spendable < config.cost) {
            showStatusLog("Missing Wood! Required: " + config.cost);
            return;
        }
    }
    if (config.goldCost && ledger.gold.spendable < config.goldCost) {
        showStatusLog("Missing Gold! Required: " + config.goldCost);
        return;
    }
    if (config.ironCost && ledger.iron.spendable < config.ironCost) {
        showStatusLog("Missing Iron! Required: " + config.ironCost);
        return;
    }
    if (config.goldCost) resources.gold -= config.goldCost;
    if (config.ironCost) resources.iron -= config.ironCost;
    // Construct Planned Building
    const building = createEntity(placementMode, "red", pt.x, pt.z, true);
    building.escrow = config.cost || config.goldCost || 0;
    if (config.goldCost && !config.cost) {
        building.material = "gold";
    }
    if (WORKSHOP_PRODS[placementMode]) {
        window.workshopPreferences = window.workshopPreferences || {};
        building.activeProductIdx = window.workshopPreferences[placementMode] || 0;
    }
    // If mine, store resource type
    if (placementMode === "mine" && targetDeposit) {
        building.mineResourceType = targetDeposit.type;
        showStatusLog("Planned Red Mine (" + targetDeposit.type.toUpperCase() + ")!");
    } else {
        showStatusLog("Planned Red " + config.name + "!");
    }
    updateUI();
    
    // Free building must be constructed manually (b.resourcesNeededTotal === 0 handles time)
    
    // Auto-cancel if we can't afford another one
    if (resources.wood < config.cost || resources.gold < config.goldCost) {
        cancelPlacement();
    }
    currentCommandIndex++;
}
// Toggle active product in workshop
function toggleWorkshopProduct(prodIdx) {
    if (selectedEntities.length === 0 && placementMode && WORKSHOP_PRODS[placementMode]) {
        if (WORKSHOP_PRODS[placementMode].length > prodIdx) {
            window.workshopPreferences = window.workshopPreferences || {};
            window.workshopPreferences[placementMode] = prodIdx;
            showStatusLog("Planned " + placementMode + " set to: " + WORKSHOP_PRODS[placementMode][prodIdx].name);
            updateSelectionHUD();
        }
        return;
    }
    const workshops = selectedEntities.filter(ent => ["poleturner", "gruntshop", "blacksmith", "fletcher", "knightarms", "tailor", "armorer", "stables"].includes(ent.type) && ent.faction === "red");
    if (workshops.length > 0) {
        workshops.forEach(b => {
            b.activeProductIdx = prodIdx;
            // Reset worker to fetch resources for the new product
            const worker = entities.find(p => p.type === "peasant" && p.workerBuilding === b);
            if (worker && ["worker_fetching", "worker_returning_to_shop", "worker_crafting", "worker_delivering_item"].includes(worker.state)) {
                worker.state = "shop_worker";
                worker.craftedItem = null;
                if (worker.mesh) worker.mesh.visible = true;
            }
        });
        const b = workshops[0];
        window.workshopPreferences = window.workshopPreferences || {};
        window.workshopPreferences[b.type] = prodIdx;
        showStatusLog("Workshop production set to: " + WORKSHOP_PRODS[b.type][prodIdx].name);
        updateSelectionHUD();
    }
}
// Build Tab Toggles civilian vs military
function clearWallGhosts() {
    wallGhosts.forEach(m => { scene.remove(m); disposeHierarchy(m); });
    wallGhosts = [];
    const tooltip = document.getElementById("wall-cost-tooltip");
    if (tooltip) tooltip.style.display = "none";
}
function showBuildTab(tabKey) {
    if (tabKey === "demolish") {
        wallDrawMode = "delete_building";
        showStatusLog("Demolish mode active. Drag to delete any building/wall.");
        if (typeof cancelPlacement === "function") cancelPlacement();
        clearWallGhosts();
        return;
    }
    document.getElementById("tab-civilian").classList.remove("active");
    document.getElementById("tab-military").classList.remove("active");
    const tabWalls = document.getElementById("tab-walls");
    if (tabWalls) tabWalls.classList.remove("active");
    const tabLuxuries = document.getElementById("tab-luxuries");
    if (tabLuxuries) tabLuxuries.classList.remove("active");
    const tabDemolish = document.getElementById("tab-demolish");
    if (tabDemolish) tabDemolish.classList.remove("active");
    document.getElementById("group-civilian").style.display = "none";
    document.getElementById("group-military").style.display = "none";
    const groupWalls = document.getElementById("group-walls");
    if (groupWalls) groupWalls.style.display = "none";
    const groupLuxuries = document.getElementById("group-luxuries");
    if (groupLuxuries) groupLuxuries.style.display = "none";
    wallDrawMode = null;
    clearWallGhosts();
    if (typeof cancelPlacement === "function") cancelPlacement();
    if (tabKey === "civilian") {
        document.getElementById("tab-civilian").classList.add("active");
        document.getElementById("group-civilian").style.display = "flex";
    } else if (tabKey === "military") {
        document.getElementById("tab-military").classList.add("active");
        document.getElementById("group-military").style.display = "flex";
    } else if (tabKey === "luxuries") {
        if (tabLuxuries) tabLuxuries.classList.add("active");
        if (groupLuxuries) groupLuxuries.style.display = "flex";
    } else if (tabKey === "walls") {
        if (tabWalls) tabWalls.classList.add("active");
        if (groupWalls) groupWalls.style.display = "flex";
        // Auto-select freehand
        document.getElementById("btn-tool-freehand").click();
    }
}
// --- INPUT LISTENERS & SELECTION ---
function onMouseDown(e) {
    if (isGameOver || window.isPaused) return;
    if (e.target.tagName === 'BUTTON' || e.target.closest('#ui-layer') || e.target.closest('#selection-panel') || e.target.closest('#debug-overlay')) return;
    if (e.button === 0) { // Left click
        if (attackGroundMode) {
            attackGroundMode = false;
            document.body.style.cursor = "default";
            if (attackGroundIndicator) attackGroundIndicator.visible = false;
        }
        if (isRightDrag) {
            isRightDrag = false;
            rightDragFightMove = false;
            if (rightDragLine) rightDragLine.visible = false;
            rightDragPath = [];
            isFightMoveQueued = false;
            return;
        }
        if (placementMode) {
            tryPlaceBuilding(e);
            return;
        }
        if (wallDrawMode) {
            const pt = getTerrainIntersection(e.clientX, e.clientY);
            if (pt) {
                isDragging = true;
                wallDrawStart = pt.clone();
                window.lastWallDrawEndPt = pt.clone();
                wallFreehandPath = [pt.clone()];
            }
            return;
        }
        isDragging = true;
        isFightMoveQueued = false;
        dragStart.set(e.clientX, e.clientY);
        const dragBox = document.getElementById("drag-box");
        dragBox.style.display = "none";
        dragBox.style.left = e.clientX + "px";
        dragBox.style.top = e.clientY + "px";
        dragBox.style.width = "0px";
        dragBox.style.height = "0px";
    } else if (e.button === 2) { // Right click
        if (isDragging) {
            isDragging = false;
            if (wallDrawMode) {
                wallDrawStart = null;
                clearWallGhosts();
            } else {
                document.getElementById("drag-box").style.display = "none";
            }
            return;
        }
        if (placementMode) {
            cancelPlacement();
            return;
        }
        if (wallDrawMode) {
            wallDrawMode = null;
            clearWallGhosts();
            document.querySelectorAll("#group-walls button").forEach(b => b.classList.remove("active-prod"));
            return;
        }
        if (attackGroundMode) {
            attackGroundMode = false;
            document.body.style.cursor = "default";
            if (attackGroundIndicator) attackGroundIndicator.visible = false;
            const pt = getTerrainIntersection(e.clientX, e.clientY);
            if (pt) {
                let count = 0;
                selectedEntities.forEach(unit => {
                    const wStats = unit.weapon ? WEAPONS[unit.weapon] : null;
                    const isRanged = wStats && (wStats.type === "bow" || wStats.type === "crossbow" || wStats.type === "catapult");
                    if (unit.faction === "red" && ((unit.type.startsWith("siege_") && unit.type !== "siege_engineer") || isRanged)) {
                        let cmd = {
                            state: "attack_ground",
                            targetPosition: pt.clone(),
                            targetEntity: null,
                            savedFightMoveDest: null,
                            path: null,
                            pathCooldown: 0,
                            timeNearTarget: 0
                        };
                        if (unit.weapon === "Short Bow" || unit.weapon === "Longbow" || unit.weapon === "Catapult" || unit.weapon === "Trebuchet" || unit.weapon === "Mangonel" || unit.weapon === "Slinger") {
                            cmd.timeStationary = 0;
                        }
                        enqueueOrExecute(unit, e, cmd);
                        count++;
                    }
                });
                showStatusLog(e.shiftKey ? "Queued Attack Ground!" : "Attack Ground commanded.");
            }
            return;
        }
        // Deselect if only buildings are selected
        if (selectedEntities.length > 0) {
            console.log("selectedEntities baseSpeed:", selectedEntities.map(e => e.baseSpeed));
            const hasMobileUnit = selectedEntities.some(ent => ent.baseSpeed > 0);
            if (!hasMobileUnit) {
                selectedEntities.forEach(ent => {
                    if (ent.selectionRing) ent.selectionRing.material.visible = false;
                });
                selectedEntities = [];
                updateSelectionHUD();
                return;
            }
        }
        let pt = getTerrainIntersection(e.clientX, e.clientY);
        if (!pt) return;
        // Check if right-clicking an enemy
        let clickedEnemy = null;
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);
        const checkMeshes = entities.filter(ent => ent.state !== "dead" && ent.mesh).map(ent => ent.mesh);
        const intersects = raycaster.intersectObjects(checkMeshes, true);
        if (intersects.length > 0) {
            let root = intersects[0].object;
            while (root.parent && root.parent !== scene) {
                root = root.parent;
            }
            const hitEnt = entities.find(ent => ent.mesh === root);
            if (hitEnt && hitEnt.faction !== "red" && !isFightMoveQueued) {
                if (hitEnt.type !== "tree" || selectedEntities.some(e => e.type === "king")) {
                    clickedEnemy = hitEnt;
                }
            } else if (hitEnt && hitEnt.faction === "red" && hitEnt.isPlanned) {
                clickedEnemy = hitEnt;
            } else if (hitEnt && (hitEnt.type === "gatehouse" || hitEnt.type === "keep" || hitEnt.type === "tower")) {
                if (hitEnt.isPlanned) {
                    pt.y = getTerrainHeight(pt.x, pt.z);
                } else {
                    pt.x = intersects[0].point.x;
                    pt.z = intersects[0].point.z;
                    pt.y = hitEnt.y + (hitEnt.height || 6.0);
                }
            } else if (hitEnt && (hitEnt.type === "wall_column" || hitEnt.type === "wall_ramp")) {
                if (!hitEnt.isPlanned) {
                    pt.x = intersects[0].point.x;
                    pt.z = intersects[0].point.z;
                    pt.y = hitEnt.y + (hitEnt.blocks ? hitEnt.blocks.length : hitEnt.height || 6.0);
                } else {
                    pt.y = getTerrainHeight(pt.x, pt.z);
                }
            }
        }
        const hasMobile = selectedEntities.some(unit => unit.faction === "red" && unit.baseSpeed > 0);
        if (hasMobile) {
            isRightDrag = true;
            rightDragPath = [pt.clone()];
            rightDragTargetEntity = clickedEnemy;
            rightDragFightMove = isFightMoveQueued;
            if (!rightDragLine) {
                const geo = new THREE.BufferGeometry();
                const mat = new THREE.LineBasicMaterial({ color: rightDragFightMove ? 0xff0000 : 0x00ff00, linewidth: 2, depthTest: false, transparent: true, opacity: 0.8 });
                rightDragLine = new THREE.Line(geo, mat);
                rightDragLine.renderOrder = 999;
                rightDragLine.frustumCulled = false;
                scene.add(rightDragLine);
            }
            rightDragLine.material.color.setHex(rightDragFightMove ? 0xff0000 : 0x00ff00);
            rightDragLine.geometry.setFromPoints(rightDragPath);
            rightDragLine.visible = true;
        }
    }
}
function onMouseMove(e) {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
    if (isRightDrag) {
        const pt = getTerrainIntersection(e.clientX, e.clientY);
        if (pt) {
            const last = rightDragPath[rightDragPath.length - 1];
            if (!last || Math.hypot(last.x - pt.x, last.z - pt.z) >= 1.0) {
                rightDragPath.push(pt.clone());
                if (rightDragLine) {
                    rightDragLine.geometry.setFromPoints(rightDragPath);
                    rightDragLine.geometry.attributes.position.needsUpdate = true;
                }
            }
        }
        return;
    }
    if (wallTargetIndicator) wallTargetIndicator.visible = false;
    if (attackGroundMode && attackGroundIndicator) {
        const pt = getTerrainIntersection(e.clientX, e.clientY);
        if (pt) {
            attackGroundIndicator.position.set(pt.x, pt.y + 0.1, pt.z);
            attackGroundIndicator.visible = true;
        } else {
            attackGroundIndicator.visible = false;
        }
    } else if (attackGroundIndicator) {
        attackGroundIndicator.visible = false;
    }
    if (!isDragging && !placementMode && !wallDrawMode) {
        let hoveringEnemy = false;
        let hoveringBlueprint = false;
        if (selectedEntities.some(ent => ent.faction === "red" && ent.baseSpeed > 0)) {
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            );
            raycaster.setFromCamera(mouse, camera);
            // Enemy and Blueprint hover logic
            const hasKing = selectedEntities.some(e => e.type === "king");
            const hasPeasant = selectedEntities.some(e => e.type === "peasant");
            const checkMeshes = entities.filter(ent =>
                ent.state !== "dead" && ent.mesh &&
                (
                    (ent.faction !== "red" && ent.faction !== "neutral" && (ent.type !== "tree" || hasKing) && ent.type !== "stone" && ent.type !== "gold" && ent.type !== "iron") ||
                    (ent.faction === "red" && ent.isPlanned && hasPeasant)
                )
            ).map(ent => ent.mesh);
            const intersects = raycaster.intersectObjects(checkMeshes, true);
            if (intersects.length > 0) {
                let root = intersects[0].object;
                while (root.parent && root.parent !== scene) {
                    root = root.parent;
                }
                const hoveredEnt = entities.find(ent => ent.mesh === root);
                if (hoveredEnt) {
                    if (hoveredEnt.faction === "red" && hoveredEnt.isPlanned && hasPeasant) {
                        hoveringBlueprint = true;
                    } else if (hoveredEnt.faction !== "red" && (hoveredEnt.type !== "tree" || hasKing)) {
                        enemyTargetIndicator.position.copy(hoveredEnt.mesh.position);
                        enemyTargetIndicator.position.y += (hoveredEnt.height || 1.0) + 1.0;
                        enemyTargetIndicator.quaternion.copy(camera.quaternion);
                        enemyTargetIndicator.visible = true;
                        hoveringEnemy = true;
                    }
                }
            }
            // Wall hover logic
            const wallMeshes = entities.filter(ent => !ent.isDead && !ent.isPlanned && ent.mesh && (ent.type === "wall_column" || ent.type === "wall_ramp" || ent.type === "gatehouse" || ent.type === "keep" || ent.type === "tower")).map(ent => ent.mesh);
            const wallHits = raycaster.intersectObjects(wallMeshes, true);
            if (wallHits.length > 0 && !hoveringEnemy && !hoveringBlueprint) {
                wallTargetIndicator.position.copy(wallHits[0].point);
                wallTargetIndicator.position.y += 0.2;
                wallTargetIndicator.visible = true;
            }
        }
        if (!hoveringEnemy && enemyTargetIndicator) {
            enemyTargetIndicator.visible = false;
        }
        if (hoveringBlueprint) {
            document.body.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><text y=\'24\' font-size=\'24\'>🔨</text></svg>") 16 16, pointer';
        } else if (!attackGroundMode) {
            document.body.style.cursor = "default";
        }
    }
    if (placementMode) {
        handlePlacementGhostUpdate(e);
        return;
    }
    if (!isDragging && wallDrawMode) {
        const pt = getTerrainIntersection(e.clientX, e.clientY);
        if (pt) {
            updateWallGhosts(pt, pt);
        } else {
            clearWallGhosts();
            lastGhostUpdateKey = "";
        }
    }
    if (isDragging && wallDrawMode && wallDrawStart) {
        const pt = getTerrainIntersection(e.clientX, e.clientY);
        if (pt) {
            window.lastWallDrawEndPt = pt.clone();
            if (wallDrawMode === "freehand") {
                const last = wallFreehandPath[wallFreehandPath.length - 1];
                if (!last || Math.hypot(last.x - pt.x, last.z - pt.z) >= 0.5) {
                    wallFreehandPath.push(pt.clone());
                }
            }
            updateWallGhosts(wallDrawStart, pt);
        }
        return;
    }
    if (isDragging) {
        dragEnd.set(e.clientX, e.clientY);
        const dragBox = document.getElementById("drag-box");
        dragBox.style.display = "block";
        const left = Math.min(dragStart.x, dragEnd.x);
        const top = Math.min(dragStart.y, dragEnd.y);
        const width = Math.abs(dragStart.x - dragEnd.x);
        const height = Math.abs(dragStart.y - dragEnd.y);
        dragBox.style.left = left + "px";
        dragBox.style.top = top + "px";
        dragBox.style.width = width + "px";
        dragBox.style.height = height + "px";
    }
}
function onMouseUp(e) {
    if (isRightDrag) {
        isRightDrag = false;
        if (rightDragLine) {
            rightDragLine.visible = false;
        }
        let totalLength = 0;
        for (let i = 0; i < rightDragPath.length - 1; i++) {
            totalLength += Math.hypot(rightDragPath[i+1].x - rightDragPath[i].x, rightDragPath[i+1].z - rightDragPath[i].z);
        }
        const mobileUnits = selectedEntities.filter(unit => unit.faction === "red" && unit.baseSpeed > 0);
        if (totalLength > 2.0 && mobileUnits.length > 1) {
            const spacing = totalLength / (mobileUnits.length - 1);
            let currentDist = 0;
            let pathIdx = 0;
            let currentSegDist = 0;
            mobileUnits.forEach((unit, idx) => {
                let targetPos = rightDragPath[0].clone();
                if (idx === mobileUnits.length - 1) {
                    targetPos = rightDragPath[rightDragPath.length - 1].clone();
                } else if (idx > 0) {
                    const targetDist = idx * spacing;
                    while (pathIdx < rightDragPath.length - 1) {
                        const p1 = rightDragPath[pathIdx];
                        const p2 = rightDragPath[pathIdx + 1];
                        const segLen = Math.hypot(p2.x - p1.x, p2.z - p1.z);
                        if (currentDist + segLen >= targetDist) {
                            const t = (targetDist - currentDist) / segLen;
                            targetPos.x = p1.x + (p2.x - p1.x) * t;
                            targetPos.z = p1.z + (p2.z - p1.z) * t;
                            break;
                        } else {
                            currentDist += segLen;
                            pathIdx++;
                        }
                    }
                }
                targetPos.y = getFloorHeight({radius: 0.1, y: 10000}, targetPos.x, targetPos.z).y;
                let cmd = {
                    workerBuilding: null,
                    payloadResource: null,
                    intendedFetchAmount: 0,
                    state: "moving",
                    targetPosition: rightDragTargetEntity ? null : targetPos,
                    targetEntity: rightDragTargetEntity,
                    fightMoveDestination: null
                };
                if (rightDragTargetEntity) {
                    if (rightDragTargetEntity.faction === "red" && rightDragTargetEntity.isPlanned && unit.type === "peasant") {
                        cmd.workerBuilding = rightDragTargetEntity;
                        let rType = rightDragTargetEntity.material || ((rightDragTargetEntity.type === "wall_column" || rightDragTargetEntity.type === "gatehouse" || rightDragTargetEntity.type === "wall_ramp") ? "stone" : "wood");
                        cmd.payloadResource = rType;
                        if (unit.payloadAmount > 0 && unit.payloadResource === rType) {
                            cmd.state = "constructing_delivering";
                            cmd.intendedFetchAmount = 0;
                            cmd.targetPosition = new THREE.Vector3(rightDragTargetEntity.x, getTerrainHeight(rightDragTargetEntity.x, rightDragTargetEntity.z), rightDragTargetEntity.z);
                        } else {
                            cmd.state = "constructing_fetching";
                            cmd.intendedFetchAmount = 20;
                            const keep = entities.find(k => k.type === "keep" && k.faction === unit.faction && !k.isPlanned && k.state !== "dead");
                            if (keep) {
                                cmd.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                            } else {
                                cmd.targetPosition = new THREE.Vector3(unit.x, getTerrainHeight(unit.x, unit.z), unit.z);
                            }
                        }
                        cmd.targetEntity = null;
                    } else if (rightDragTargetEntity.faction !== "red") {
                        if (unit.weapon === "Catapult" || unit.weapon === "Trebuchet" || unit.weapon === "Mangonel") {
                            cmd.state = "attack_ground";
                            cmd.targetPosition = getPredictedTargetPosition(rightDragTargetEntity);
                            cmd.targetEntity = null;
                            cmd.timeStationary = 0;
                        } else {
                            cmd.state = "attacking";
                        }
                    } else {
                        cmd.state = "moving";
                    }
                } else if (rightDragFightMove) {
                    cmd.state = "fightmove";
                    cmd.fightMoveDestination = targetPos.clone();
                } else {
                    cmd.state = "moving";
                }
                enqueueOrExecute(unit, e, cmd);
            });
            showStatusLog(rightDragFightMove ? (e.shiftKey ? "Queued Fight Move Formation!" : "Fight Move Formation issued!") : (e.shiftKey ? "Queued Formation command!" : "Formation command issued."));
        } else if (rightDragPath.length > 0) {
            const pt = rightDragPath[0].clone();
            mobileUnits.forEach(unit => {
                let cmd = {
                    workerBuilding: null,
                    payloadResource: null,
                    intendedFetchAmount: 0,
                    state: "moving",
                    targetPosition: null,
                    targetEntity: null,
                    fightMoveDestination: null
                };
                if (rightDragTargetEntity) {
                    if (rightDragTargetEntity.faction === "red" && rightDragTargetEntity.isPlanned && unit.type === "peasant") {
                        cmd.workerBuilding = rightDragTargetEntity;
                        let rType = rightDragTargetEntity.material || ((rightDragTargetEntity.type === "wall_column" || rightDragTargetEntity.type === "gatehouse" || rightDragTargetEntity.type === "wall_ramp") ? "stone" : "wood");
                        cmd.payloadResource = rType;
                        if (unit.payloadAmount > 0 && unit.payloadResource === rType) {
                            cmd.state = "constructing_delivering";
                            cmd.intendedFetchAmount = 0;
                            cmd.targetPosition = new THREE.Vector3(rightDragTargetEntity.x, getTerrainHeight(rightDragTargetEntity.x, rightDragTargetEntity.z), rightDragTargetEntity.z);
                        } else {
                            cmd.state = "constructing_fetching";
                            cmd.intendedFetchAmount = 20;
                            const keep = entities.find(k => k.type === "keep" && k.faction === unit.faction && !k.isPlanned && k.state !== "dead");
                            if (keep) {
                                cmd.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                            } else {
                                cmd.targetPosition = new THREE.Vector3(unit.x, getTerrainHeight(unit.x, unit.z), unit.z);
                            }
                        }
                    } else if (rightDragTargetEntity.faction !== "red") {
                        if (unit.weapon === "Catapult" || unit.weapon === "Trebuchet" || unit.weapon === "Mangonel") {
                            cmd.state = "attack_ground";
                            cmd.targetPosition = getPredictedTargetPosition(rightDragTargetEntity);
                            cmd.timeStationary = 0;
                        } else {
                            cmd.targetEntity = rightDragTargetEntity;
                            cmd.state = "attacking";
                        }
                    } else {
                        cmd.targetPosition = pt.clone();
                        cmd.state = "moving";
                    }
                } else {
                    cmd.targetPosition = pt.clone();
                    if (rightDragFightMove) {
                        cmd.state = "fightmove";
                        cmd.fightMoveDestination = pt.clone();
                    } else {
                        cmd.state = "moving";
                    }
                }
                enqueueOrExecute(unit, e, cmd);
            });
            if (rightDragFightMove) {
                showStatusLog("Fight Move issued!");
            } else {
                if (rightDragTargetEntity && rightDragTargetEntity.faction === "red" && rightDragTargetEntity.isPlanned) {
                    showStatusLog("Construct order issued!");
                } else {
                    showStatusLog(rightDragTargetEntity ? "Attack order issued!" : "Movement command issued.");
                }
            }
        }
        rightDragFightMove = false;
        rightDragPath = [];
        isFightMoveQueued = false;
        return;
    }
    if (!isDragging) return;
    if (wallDrawMode && wallDrawStart) {
        const pt = getTerrainIntersection(e.clientX, e.clientY) || window.lastWallDrawEndPt;
        if (pt) {
            commitWallDraw(wallDrawStart, pt);
        }
        currentCommandIndex++;
        isDragging = false;
        wallDrawStart = null;
        if (pt) {
            updateWallGhosts(pt, pt);
        } else {
            clearWallGhosts();
        }
        return;
    }
    isDragging = false;
    const dragBox = document.getElementById("drag-box");
    dragBox.style.display = "none";
    dragEnd.set(e.clientX, e.clientY);
    if (!e.shiftKey) {
        selectedEntities.forEach(ent => {
            if (ent.selectionRing) ent.selectionRing.visible = false;
        });
    }
    const boxWidth = Math.abs(dragStart.x - dragEnd.x);
    const boxHeight = Math.abs(dragStart.y - dragEnd.y);
    if (boxWidth < 5 && boxHeight < 5) {
        // Single Click
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (dragStart.x / window.innerWidth) * 2 - 1,
            -(dragStart.y / window.innerHeight) * 2 + 1
        );
        raycaster.setFromCamera(mouse, camera);
        const checkMeshes = entities.filter(ent => ent.state !== "dead" && ent.mesh).map(ent => ent.mesh);
        const intersects = raycaster.intersectObjects(checkMeshes, true);
        if (intersects.length > 0) {
            let root = intersects[0].object;
            while (root.parent && root.parent !== scene) {
                root = root.parent;
            }
            const clicked = entities.find(ent => ent.mesh === root);
            if (clicked) {
                const now = performance.now();
                const isDoubleClick = (clicked === window.lastClickedEntity && (now - window.lastClickTime < 300));
                window.lastClickedEntity = clicked;
                window.lastClickTime = now;
                if (isDoubleClick) {
                    // Select all of this type on screen (red faction)
                    const onScreen = entities.filter(ent => {
                        if (ent.state === "dead" || ent.faction !== "red") return false;
                        if (!ent.mesh || !ent.mesh.visible) return false;
                        if (ent.type !== clicked.type) return false;
                        if (ent.weapon !== clicked.weapon) return false;
                        const tempV = new THREE.Vector3(ent.x, ent.y, ent.z);
                        tempV.project(camera);
                        return (tempV.x >= -1 && tempV.x <= 1 && tempV.y >= -1 && tempV.y <= 1 && tempV.z >= 0 && tempV.z <= 1);
                    });
                    if (!e.shiftKey) {
                        selectedEntities.forEach(ent => {
                            if (ent.selectionRing) ent.selectionRing.visible = false;
                        });
                        selectedEntities = [];
                    }
                    onScreen.forEach(ent => {
                        if (!selectedEntities.includes(ent)) {
                            selectedEntities.push(ent);
                            if (ent.selectionRing) ent.selectionRing.visible = true;
                        }
                    });
                } else if (e.shiftKey) {
                    if (!selectedEntities.includes(clicked)) {
                        selectedEntities.push(clicked);
                        if (clicked.selectionRing) clicked.selectionRing.visible = true;
                    }
                } else {
                    selectedEntities.forEach(ent => {
                        if (ent.selectionRing) ent.selectionRing.visible = false;
                    });
                    selectedEntities = [clicked];
                    if (clicked.selectionRing) clicked.selectionRing.visible = true;
                }
            } else {
                if (!e.shiftKey) {
                    selectedEntities.forEach(ent => {
                        if (ent.selectionRing) ent.selectionRing.visible = false;
                    });
                    selectedEntities = [];
                }
            }
        } else {
            if (!e.shiftKey) {
                selectedEntities.forEach(ent => {
                    if (ent.selectionRing) ent.selectionRing.visible = false;
                });
                selectedEntities = [];
            }
        }
    } else {
        // Box Select
        const left = Math.min(dragStart.x, dragEnd.x);
        const top = Math.min(dragStart.y, dragEnd.y);
        const right = Math.max(dragStart.x, dragEnd.x);
        const bottom = Math.max(dragStart.y, dragEnd.y);
        if (!e.shiftKey) {
            selectedEntities = [];
        }
        entities.forEach(ent => {
            if (ent.state === "dead") return;
            if (!ent.mesh || !ent.mesh.visible) return;
            const tempV = new THREE.Vector3(ent.x, ent.y, ent.z);
            tempV.project(camera);
            const screenX = (tempV.x *  .5 + .5) * window.innerWidth;
            const screenY = (tempV.y * -.5 + .5) * window.innerHeight;
            if (screenX >= left && screenX <= right && screenY >= top && screenY <= bottom) {
                if (ent.faction === "red") {
                    let shouldSelect = false;
                    const isBuilding = !!BUILDING_TYPES[ent.type];
                    const isUnit = !isBuilding;
                    if (e.ctrlKey && e.altKey) {
                        if (isUnit) shouldSelect = true;
                    } else if (e.ctrlKey) {
                        if (ent.type === "peasant") shouldSelect = true;
                    } else if (e.altKey) {
                        if (isBuilding) shouldSelect = true;
                    } else {
                        if (isUnit && ent.type !== "peasant" && ent.type !== "king") shouldSelect = true;
                    }
                    if (shouldSelect) {
                        if (!selectedEntities.includes(ent)) {
                            selectedEntities.push(ent);
                        }
                        if (ent.selectionRing) ent.selectionRing.visible = true;
                    }
                }
            }
        });
    }
    updateSelectionHUD();
}
function onMouseWheel(e) {
    if (keysPressed["Space"]) {
        customCameraAngle = THREE.MathUtils.clamp(customCameraAngle - e.deltaY * 0.001, -3.0, 1.0);
        updateCameraOffset();
        spacebarScrolled = true;
    } else {
        zoomFactor = THREE.MathUtils.clamp(zoomFactor + e.deltaY * 0.0015, 0.4, 2.5);
        updateCameraPosition();
    }
}
function onKeyDown(e) {
        if (e.code === "KeyX" && !keysPressed["KeyX"]) {
        let stoppedCount = 0;
        selectedEntities.forEach(ent => {
            if (ent.faction === "red" && (ent.baseSpeed > 0 || ent.type === "peasant") && ent.state !== "dead") {
                ent.state = (ent.type === "peasant") ? "wander" : "idle";
                ent.path = null;
                ent.targetPosition = null;
                ent.targetEntity = null;
                ent.savedFightMoveDest = null;
                ent.gatherTarget = null;
                ent.buildTarget = null;
                ent.workerBuilding = null;
                ent.commandQueue = [];
                stoppedCount++;
            }
        });
        if (stoppedCount > 0) {
            showStatusLog(`Stopped ${stoppedCount} unit(s).`);
        }
    }
    if (e.code === "KeyG" && !keysPressed["KeyG"] && document.getElementById("btn-attack-ground").style.display !== "none") {
        attackGroundMode = !attackGroundMode;
        document.body.style.cursor = attackGroundMode ? "crosshair" : "default";
        if (!attackGroundMode && attackGroundIndicator) attackGroundIndicator.visible = false;
    }
    if (e.code === "Backquote" && !keysPressed["Backquote"]) {
        const playerKing = entities.find(ent => ent.type === "king" && ent.faction === "red" && ent.state !== "dead");
        if (playerKing) {
            if (selectedEntities.length === 1 && selectedEntities[0] === playerKing) {
                cameraLookAt.x = playerKing.x;
                cameraLookAt.z = playerKing.z;
                updateCameraPosition();
            } else {
                selectedEntities.forEach(ent => {
                    if (ent.selectionRing) ent.selectionRing.visible = false;
                });
                selectedEntities = [playerKing];
                if (playerKing.selectionRing) playerKing.selectionRing.visible = true;
                updateSelectionHUD();
            }
        }
    }
    if (e.code === "Space" && !keysPressed["Space"]) {
        spacebarScrolled = false;
    }
    const selectBuildingHotkey = (type, name) => {
        const building = entities.find(ent => ent.type === type && ent.faction === "red" && ent.state !== "dead" && !ent.isPlanned);
        if (building) {
            if (selectedEntities.length === 1 && selectedEntities[0] === building) {
                cameraLookAt.x = building.x;
                cameraLookAt.z = building.z;
                updateCameraPosition();
            } else {
                selectedEntities.forEach(ent => {
                    if (ent.selectionRing) ent.selectionRing.visible = false;
                });
                selectedEntities = [building];
                if (building.selectionRing) building.selectionRing.visible = true;
                updateSelectionHUD();
            }
        } else {
            showStatusLog(`No active ${name} found.`, "warning");
        }
    };
    if (e.code === "KeyM" && !keysPressed["KeyM"]) selectBuildingHotkey("market", "market");
    if (e.code === "KeyB" && !keysPressed["KeyB"]) selectBuildingHotkey("barracks", "barracks");
    if (e.code === "KeyV" && !keysPressed["KeyV"]) selectBuildingHotkey("siegeshop", "siege shop");
    if (e.code === "KeyK" && !keysPressed["KeyK"]) selectBuildingHotkey("keep", "keep");
    if (e.code === "KeyN" && !keysPressed["KeyN"]) selectBuildingHotkey("mercenary_post", "mercenary post");
    keysPressed[e.code] = true;
    if (e.code === "Escape") {
        if (window.isPaused) {
            window.isPaused = false;
            document.getElementById("pause-menu").style.display = "none";
            return;
        }
        cancelPlacement();
        isFightMoveQueued = false;
        if (wallDrawMode) {
            wallDrawMode = null;
            clearWallGhosts();
            document.querySelectorAll("#group-walls button").forEach(b => b.classList.remove("active-prod"));
        }
        if (selectedEntities.length > 0) {
            selectedEntities.forEach(ent => {
                if (ent.selectionRing) ent.selectionRing.material.visible = false;
            });
            selectedEntities = [];
            updateSelectionHUD();
        }
    }
    // F key queues Fight Move (attack-move)
    if (e.code === "KeyF") {
        if (selectedEntities.some(u => u.baseSpeed > 0 && u.faction === "red")) {
            isFightMoveQueued = true;
            showStatusLog("Fight-Move mode active. Click ground to attack-move.");
        }
    }
    // Camera Rotation
    if (e.code === "KeyQ") {
        cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 4);
        updateCameraPosition();
    }
    if (e.code === "KeyE") {
        cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);
        updateCameraPosition();
    }
    // Control Groups
    if (e.code.startsWith("Digit")) {
        const num = parseInt(e.code.replace("Digit", ""));
        if (!isNaN(num) && num >= 0 && num <= 9) {
            if (e.ctrlKey || e.altKey) {
                // Override group
                controlGroups[num] = [...selectedEntities];
                showStatusLog(`Group ${num} saved (${selectedEntities.length} units).`);
            } else if (e.shiftKey) {
                // Add to group
                let added = 0;
                selectedEntities.forEach(ent => {
                    if (!controlGroups[num].includes(ent)) {
                        controlGroups[num].push(ent);
                        added++;
                    }
                });
                showStatusLog(`Added ${added} units to Group ${num}.`);
            } else {
                // Select group
                if (controlGroups[num].length > 0) {
                    // Filter out dead/missing entities
                    controlGroups[num] = controlGroups[num].filter(ent => ent.state !== "dead" && entities.includes(ent));
                    if (controlGroups[num].length > 0) {
                        const isAlreadySelected = selectedEntities.length === controlGroups[num].length &&
                            controlGroups[num].every(ent => selectedEntities.includes(ent));
                        if (isAlreadySelected) {
                            let cx = 0, cz = 0;
                            controlGroups[num].forEach(ent => {
                                cx += ent.x;
                                cz += ent.z;
                            });
                            cameraLookAt.x = cx / controlGroups[num].length;
                            cameraLookAt.z = cz / controlGroups[num].length;
                            cameraLookAt.y = getTerrainHeight(cameraLookAt.x, cameraLookAt.z);
                            updateCameraPosition();
                        } else {
                            isFightMoveQueued = false;
                            selectedEntities.forEach(ent => {
                                if (ent.selectionRing) ent.selectionRing.visible = false;
                            });
                            selectedEntities = [...controlGroups[num]];
                            selectedEntities.forEach(ent => {
                                if (ent.selectionRing) ent.selectionRing.visible = true;
                            });
                            updateSelectionHUD();
                        }
                    } else {
                        showStatusLog(`Group ${num} is empty.`);
                    }
                }
            }
        }
    }
}
function onKeyUp(e) {
    if (e.code === "Space") {
        if (!spacebarScrolled) {
            if (Math.abs(customCameraAngle - 0.0) > 0.01 && Math.abs(customCameraAngle - 1.0) > 0.01) {
                customCameraAngle = 0.0;
            } else {
                customCameraAngle = customCameraAngle < 0.5 ? 1.0 : 0.0;
            }
            updateCameraOffset();
        }
    }
    keysPressed[e.code] = false;
}
// --- KEYBOARD CAMERA MOVEMENT ---
function handleCameraMovement(deltaTime) {
    const forwardVec = new THREE.Vector3(-cameraOffset.x, 0, -cameraOffset.z).normalize();
    const rightVec = new THREE.Vector3(-forwardVec.z, 0, forwardVec.x);
    const step = panSpeed * zoomFactor * 60 * deltaTime;
    if (keysPressed["KeyW"] || keysPressed["ArrowUp"]) {
        cameraLookAt.addScaledVector(forwardVec, step);
    }
    if (keysPressed["KeyS"] || keysPressed["ArrowDown"]) {
        cameraLookAt.addScaledVector(forwardVec, -step);
    }
    if (keysPressed["KeyA"] || keysPressed["ArrowLeft"]) {
        cameraLookAt.addScaledVector(rightVec, -step);
    }
    if (keysPressed["KeyD"] || keysPressed["ArrowRight"]) {
        cameraLookAt.addScaledVector(rightVec, step);
    }
    cameraLookAt.x = THREE.MathUtils.clamp(cameraLookAt.x, -175, 175);
    cameraLookAt.z = THREE.MathUtils.clamp(cameraLookAt.z, -175, 175);
    cameraLookAt.y = getTerrainHeight(cameraLookAt.x, cameraLookAt.z);
    updateCameraPosition();
}
// --- BLUE FACTION AI ---
let aiActionTimer = 5.0;
function runAI(deltaTime) {
    if (isGameOver) return;
    aiActionTimer -= deltaTime;
    if (aiActionTimer > 0) return;
    aiActionTimer = 10.0 + Math.random() * 10.0;
    const blueKeep = entities.find(e => e.type === "keep" && e.faction === "blue");
    const blueKing = entities.find(e => e.type === "king" && e.faction === "blue");
    if (!blueKeep || !blueKing) return;
    const bluePeasants = entities.filter(e => e.type === "peasant" && e.faction === "blue" && e.state !== "dead");
    const blueSoldiers = entities.filter(e => e.type === "soldier" && e.faction === "blue" && e.state !== "dead");
    const blueHouses = entities.filter(e => e.type === "house" && e.faction === "blue" && e.state !== "dead");
    const blueBarracks = entities.filter(e => e.type === "barracks" && e.faction === "blue" && e.state !== "dead");
    // Base Construction
    if (blueHouses.length < 2) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 6 + Math.random() * 8;
        createEntity("house", "blue", blueKeep.x + Math.cos(angle) * dist, blueKeep.z + Math.sin(angle) * dist);
    } else if (blueBarracks.length === 0) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 7 + Math.random() * 6;
        createEntity("barracks", "blue", blueKeep.x + Math.cos(angle) * dist, blueKeep.z + Math.sin(angle) * dist);
    }
    // AI unit training (skips inventory check)
    if (blueBarracks.length > 0 && bluePeasants.length > 3) {
        const b = blueBarracks[Math.floor(Math.random() * blueBarracks.length)];
        const p = bluePeasants.find(e => e.state === "wander");
        if (p && b) {
            p.state = "training";
            p.targetBarracks = b;
            const validWeapons = Object.keys(WEAPONS).filter(w => w !== "Ballista" && w !== "Catapult" && w !== "Trebuchet" && w !== "Mangonel" && w !== "Shield");
            const rWeapon = validWeapons[Math.floor(Math.random() * validWeapons.length)];
            p.trainingConfig = { weapon: rWeapon, armors: [] };
            const angle = Math.random() * Math.PI * 2;
            const rx = b.x + Math.cos(angle) * 1.5;
            const rz = b.z + Math.sin(angle) * 1.5;
            p.targetPosition = new THREE.Vector3(rx, getTerrainHeight(rx, rz), rz);
        }
    }
    // Attack Waves
    if (blueSoldiers.length >= 4) {
        const playerKing = entities.find(e => e.type === "king" && e.faction === "red");
        if (playerKing) {
            blueSoldiers.forEach(soldier => {
                if (soldier.state !== "fightmove") {
                    soldier.targetEntity = null;
                    soldier.targetPosition = new THREE.Vector3(playerKing.x, playerKing.y, playerKing.z);
                    soldier.fightMoveDestination = soldier.targetPosition.clone();
                    soldier.state = "fightmove";
                    soldier.path = null;
                    soldier.pathCooldown = 0;
                }
            });
            showStatusLog("Blue faction is launching an attack wave!", "warning");
        }
    }
}
function spawnHardBotUnit() {
    const blueKeep = entities.find(e => e.type === "keep" && e.faction === "blue");
    if (!blueKeep) return;
    
    if (gameDifficulty === "easy") {
        const siegeChance = 0.025;
        const isSiege = Math.random() < siegeChance;
        if (isSiege) {
            const types = ["siege_catapult", "siege_ballista", "siege_trebuchet", "siege_shield", "siege_mangonel"];
            const u = createEntity(types[Math.floor(Math.random() * types.length)], "blue", blueKeep.x + 8, blueKeep.z);
            u.isWaveUnit = "building";
            u.state = "idle";
        } else {
            const u = createEntity("soldier", "blue", blueKeep.x + 8, blueKeep.z);
            let config = { weapon: "Sword", armors: [], hasHorse: false };
            if (Math.random() < 0.25) {
                const mercenaries = ["Grunt", "Slinger", "Spy", "Thug", "Brute", "Assassin", "Doppelsoldner", "RoyalKnight"];
                config.weapon = mercenaries[Math.floor(Math.random() * mercenaries.length)];
            } else {
                const validWeapons = ["Spear", "Pike", "Halberd", "Poleaxe", "Axe", "Sword", "Mace", "Short Bow", "Longbow", "Crossbow"];
                config.weapon = validWeapons[Math.floor(Math.random() * validWeapons.length)];
                const rArmor = Math.random();
                if (rArmor < 0.2) config.armors = [];
                else if (rArmor < 0.4) config.armors = ["cloth"];
                else if (rArmor < 0.6) config.armors = ["cloth", "leather"];
                else if (rArmor < 0.8) config.armors = ["cloth", "leather", "chain"];
                else config.armors = ["cloth", "leather", "chain", "plate"];
                config.hasHorse = Math.random() < 0.2;
            }
            if (Math.random() < 0.5) config.armors = [];
            applyEquipmentStats(u, config);
            u.isWaveUnit = "building";
            u.state = "idle";
        }
    } else {
        const rType = Math.random();
        if (rType < 0.05) {
            const types = ["siege_catapult", "siege_ballista", "siege_trebuchet", "siege_shield", "siege_mangonel"];
            const u = createEntity(types[Math.floor(Math.random() * types.length)], "blue", blueKeep.x + 8, blueKeep.z);
            u.isWaveUnit = "building";
            u.state = "idle";
        } else if (rType < 0.25) {
            const u = createEntity("soldier", "blue", blueKeep.x + 8, blueKeep.z);
            let config = { weapon: "Sword", armors: [], hasHorse: false };
            const mercenaries = ["Grunt", "Slinger", "Spy", "Thug", "Brute", "Assassin", "Doppelsoldner", "RoyalKnight"];
            config.weapon = mercenaries[Math.floor(Math.random() * mercenaries.length)];
            applyEquipmentStats(u, config);
            u.isWaveUnit = "building";
            u.state = "idle";
        } else {
            const u = createEntity("soldier", "blue", blueKeep.x + 8, blueKeep.z);
            let config = { weapon: "Sword", armors: [], hasHorse: false };
            const validWeapons = ["Spear", "Pike", "Halberd", "Poleaxe", "Axe", "Sword", "Mace", "Short Bow", "Longbow", "Crossbow"];
            config.weapon = validWeapons[Math.floor(Math.random() * validWeapons.length)];
            const rArmor = Math.random();
            if (rArmor < 0.30) config.armors = [];
            else if (rArmor < 0.55) config.armors = ["cloth"];
            else if (rArmor < 0.75) config.armors = ["cloth", "leather"];
            else if (rArmor < 0.90) config.armors = ["cloth", "leather", "chain"];
            else config.armors = ["cloth", "leather", "chain", "plate"];
            config.hasHorse = Math.random() < 0.2;
            applyEquipmentStats(u, config);
            u.isWaveUnit = "building";
            u.state = "idle";
        }
    }
}
function runHardModeAI(deltaTime) {
    if (isGameOver) return;

    if (pendingHardBotSpawns > 0) {
        hardBotSpawnTimer -= deltaTime;
        if (hardBotSpawnTimer <= 0) {
            spawnHardBotUnit();
            pendingHardBotSpawns--;
            const waveDuration = gameDifficulty === "easy" ? 120.0 : 60.0;
            hardBotSpawnTimer = waveDuration / hardBotWaveCount; 
        }
    }

    // Wave Spawning
    hardBotWaveTimer -= deltaTime;
    if (hardBotWaveTimer <= 0) {
        hardBotWaveTimer = gameDifficulty === "easy" ? 120.0 : 60.0;
        
        entities.forEach(u => {
            if (u.faction === "blue" && u.isWaveUnit === "building") {
                u.isWaveUnit = true;
            }
        });
        
        pendingHardBotSpawns = hardBotWaveCount;
        hardBotSpawnTimer = 0;
        hardBotAiTimer = 0;

        if (gameDifficulty === "medium" || gameDifficulty === "easy") {
            hardBotWaveCount += 1;
        } else {
            hardBotWaveCount += 2;
        }
        showStatusLog("A hostile wave is approaching!", "warning");
    }
    // AI Targeting Logic
    hardBotAiTimer -= deltaTime;
    if (hardBotAiTimer <= 0) {
        hardBotAiTimer = 10.0 + Math.random() * 10.0;
        const redKeep = entities.find(e => e.type === "keep" && e.faction === "red");
        entities.forEach(u => {
            if (u.faction === "blue" && u.state !== "dead" && u.isWaveUnit !== "building" && (u.isWaveUnit === true || u.type.startsWith("siege_"))) {
                let target = null;
                if (u.hasHorse && redKeep) {
                    const blueKeep = entities.find(e => e.type === "keep" && e.faction === "blue");
                    if (!u.flankPoint && blueKeep) {
                        const isTop = Math.random() < 0.5;
                        if (isTop) {
                            u.flankPoint = new THREE.Vector3(blueKeep.x, getTerrainHeight(blueKeep.x, redKeep.z - 30), redKeep.z - 30);
                        } else {
                            u.flankPoint = new THREE.Vector3(redKeep.x - 30, getTerrainHeight(redKeep.x - 30, blueKeep.z), blueKeep.z);
                        }
                    }
                    if (u.flankPoint && !u.flankReached) {
                        const distToFlank = Math.hypot(u.x - u.flankPoint.x, u.z - u.flankPoint.z);
                        if (distToFlank > 15.0) {
                            target = u.flankPoint;
                        } else {
                            u.flankReached = true;
                        }
                    }
                    if (!target || u.flankReached) {
                        // Furthest unit from redKeep
                        let maxDist = -1;
                        entities.forEach(e => {
                            if (e.faction === "red" && e.state !== "dead" && (e.type === "military" || e.type === "peasant" || e.type === "soldier")) {
                                const d = Math.hypot(e.x - redKeep.x, e.z - redKeep.z);
                                if (d > maxDist) { maxDist = d; target = e; }
                            }
                        });
                    }
                } else if (u.weapon === "Mace") {
                    // Walls or buildings
                    const bldgs = entities.filter(e => e.faction === "red" && e.state !== "dead" && (e.type === "wall_column" || e.type === "gatehouse" || e.type === "house" || e.type === "barracks"));
                    if (bldgs.length > 0) target = bldgs[Math.floor(Math.random() * bldgs.length)];
                } else if (u.type === "siege_catapult" || u.type === "siege_trebuchet" || u.type === "siege_ballista" || u.type === "siege_mangonel") {
                    target = redKeep;
                } else if (u.type === "siege_shield" && redKeep) {
                    let frontmostRanged = null;
                    let minDist = Infinity;
                    entities.forEach(e => {
                        if (e.faction === "blue" && e.state !== "dead" && (e.weapon === "Short Bow" || e.weapon === "Longbow" || e.weapon === "Crossbow")) {
                            const d = Math.hypot(e.x - redKeep.x, e.z - redKeep.z);
                            if (d < minDist) { minDist = d; frontmostRanged = e; }
                        }
                    });
                    if (frontmostRanged) {
                        const dirX = redKeep.x - frontmostRanged.x;
                        const dirZ = redKeep.z - frontmostRanged.z;
                        const len = Math.hypot(dirX, dirZ);
                        if (len > 0.1) {
                            const pushDist = 3.0; // Place shield 3 units in front
                            u.targetEntity = null;
                            u.targetPosition = new THREE.Vector3(
                                frontmostRanged.x + (dirX/len)*pushDist,
                                frontmostRanged.y,
                                frontmostRanged.z + (dirZ/len)*pushDist
                            );
                            u.fightMoveDestination = u.targetPosition.clone();
                            u.state = "fightmove";
                            u.path = null;
                            u.pathCooldown = 0;
                            return; // Skip standard target assignment
                        }
                    }
                    target = redKeep;
                } else if (u.weapon === "Sword") {
                    // Peasants
                    const peas = entities.filter(e => e.faction === "red" && e.state !== "dead" && e.type === "peasant");
                    if (peas.length > 0) target = peas[Math.floor(Math.random() * peas.length)];
                }
                if (!target) target = entities.find(e => e.type === "king" && e.faction === "red");
                if (target) {
                    u.targetEntity = null; // Free up targetEntity so handleCombat can auto-acquire from max range
                    u.targetPosition = new THREE.Vector3(target.x, target.y, target.z);
                    u.fightMoveDestination = u.targetPosition.clone();
                    u.state = "fightmove";
                    u.path = null;
                    u.pathCooldown = 0;
                }
            }
        });
    }
    // Spear/Pike Kiting logic
    entities.forEach(u => {
        if (u.faction === "blue" && u.kiteTimer > 0) {
            u.kiteTimer -= deltaTime;
            if (u.kiteTimer > 0) {
                u.state = "moving";
                u.targetEntity = null;
                u.path = null;
                const blueKeep = entities.find(e => e.type === "keep" && e.faction === "blue");
                if (blueKeep) {
                    u.targetPosition = new THREE.Vector3(blueKeep.x, getTerrainHeight(blueKeep.x, blueKeep.z), blueKeep.z);
                }
            } else {
                u.state = "fightmove";
                u.path = null;
                if (u.fightMoveDestination) {
                    u.targetPosition = u.fightMoveDestination.clone();
                }
            }
        }
    });
}
// --- UI UPDATE & SYNC ---
function getLedger(faction) {
    let ledger = {
        wood: { actual: resources.wood, spendable: resources.wood, limbo: 0 },
        stone: { actual: resources.stone, spendable: resources.stone, limbo: 0 },
        food: { actual: resources.food, spendable: resources.food, limbo: 0 },
        premium_food: { actual: resources.premium_food, spendable: resources.premium_food, limbo: 0 },
        brew: { actual: resources.brew || 0, spendable: resources.brew || 0, limbo: 0 },
        furniture: { actual: resources.furniture || 0, spendable: resources.furniture || 0, limbo: 0 },
        gem: { actual: resources.gem || 0, spendable: resources.gem || 0, limbo: 0 },
        gold: { actual: resources.gold, spendable: resources.gold, limbo: 0 },
        iron: { actual: resources.iron, spendable: resources.iron, limbo: 0 }
    };
    let totalNeeded = { wood: 0, stone: 0, food: 0, premium_food: 0, brew: 0, gold: 0, iron: 0, furniture: 0, gem: 0 };
    let alreadyCarried = { wood: 0, stone: 0, food: 0, premium_food: 0, brew: 0, gold: 0, iron: 0, furniture: 0, gem: 0 };
    entities.forEach(e => {
        if (e.faction === faction && e.state !== "dead") {
            if (e.isPlanned) {
                let rType = e.material || ((e.type === "wall_column" || e.type === "gatehouse" || e.type === "wall_ramp") ? "stone" : "wood");
                if (ledger[rType]) {
                    ledger[rType].limbo += (e.resourcesDelivered || 0);
                    totalNeeded[rType] += (e.resourcesNeededTotal || 0) - (e.resourcesDelivered || 0);
                }
                if (e.goldCost && ledger.gold) {
                    ledger.gold.limbo += (e.goldDelivered || 0);
                    totalNeeded.gold += e.goldCost - (e.goldDelivered || 0);
                }
            } else if (e.type === "peasant") {
                if (e.payloadAmount > 0 && e.payloadResource) {
                    if (ledger[e.payloadResource]) {
                        ledger[e.payloadResource].limbo += e.payloadAmount;
                        if (e.state === "constructing_delivering" && e.workerBuilding && e.workerBuilding.isPlanned) {
                            alreadyCarried[e.payloadResource] += e.payloadAmount;
                        }
                    }
                }
            }
        }
    });
    for (let r in ledger) {
        ledger[r].spendable = Math.max(0, ledger[r].actual - Math.max(0, totalNeeded[r] - alreadyCarried[r]));
    }
    return ledger;
}
function forceUpdateUI() {
    const hasMarket = entities.some(e => e.faction === "red" && e.type === "market");
    if (!hasMarket) {
        BUILDING_TYPES["market"].cost = 0;
        BUILDING_TYPES["market"].goldCost = 0;
    } else {
        BUILDING_TYPES["market"].cost = 20;
        BUILDING_TYPES["market"].goldCost = 10;
    }
    const redKeep = entities.find(e => e.type === "keep" && e.faction === "red" && e.state !== "dead");
    const redHouses = entities.filter(e => e.type === "house" && e.faction === "red" && e.state !== "dead");
    const redBarracks = entities.filter(e => e.type === "barracks" && e.faction === "red" && e.state !== "dead");
    let cap = redKeep ? BUILDING_TYPES.keep.peasantCap : 0;
    redHouses.forEach(() => { cap += BUILDING_TYPES.house.peasantCap; });
    let currentPop = 0;
    entities.forEach(ent => {
        if (ent.faction === "red" && ent.state !== "dead") {
            if (ent.homeBuilding) currentPop++;
            if (ent.homeBuildings) currentPop += ent.homeBuildings.length;
        }
    });
    // Sync Resource Numbers
    const ledger = getLedger("red");
    // Update Market Panel Quantities
    const marketList = document.getElementById("market-list");
    if (marketList) {
        Object.keys(ledger).forEach(res => {
            const el = document.getElementById("mkt-inv-" + res.replace(/\s+/g, "_"));
            if (el) {
                el.innerText = "(" + ledger[res].spendable + ")";
            }
        });
        const nonRawKeys = ["Spear", "Pike", "Halberd", "Poleaxe", "Axe", "Sword", "Mace", "Short Bow", "Longbow", "Crossbow", "cloth", "leather", "chain", "plate", "horse"];
        nonRawKeys.forEach(res => {
            const el = document.getElementById("mkt-inv-" + res.replace(/\s+/g, "_"));
            if (el) {
                let targetType = res === "horse" ? "stables" : "barracks";
                let available = 0;
                entities.forEach(e => {
                    if (e.type === targetType && e.faction === "red" && e.state !== "dead" && !e.isPlanned) {
                        available += (e.inventory[res] || 0);
                    }
                });
                el.innerText = "(" + available + ")";
            }
        });
    }

    const elGold = document.getElementById("res-gold");
    if (elGold) {
        elGold.innerText = ledger.gold.spendable;
        elGold.parentElement.title = `Gold (Used for training units)\nSpendable: ${ledger.gold.spendable} | Actual: ${ledger.gold.actual} | Limbo: ${ledger.gold.limbo}`;
    }
    const elFood = document.getElementById("res-food");
    const elPremiumFood = document.getElementById("res-premium_food");
    if (elFood && elPremiumFood) {
        elFood.innerText = ledger.food.spendable;
        elPremiumFood.innerText = ledger.premium_food.spendable;
        let tooltip = `Food (Used for tailoring armor)\nSpendable: ${ledger.food.spendable} | Actual: ${ledger.food.actual} | Limbo: ${ledger.food.limbo}\n`;
        tooltip += `Premium Food (Eaten for +1 Gold)\nSpendable: ${ledger.premium_food.spendable} | Actual: ${ledger.premium_food.actual} | Limbo: ${ledger.premium_food.limbo}`;
        elFood.parentElement.title = tooltip;
    }
    const elWood = document.getElementById("res-wood");
    if (elWood) {
        elWood.innerText = ledger.wood.spendable;
        elWood.parentElement.title = `Wood (Used for building and bows)\nSpendable: ${ledger.wood.spendable} | Actual: ${ledger.wood.actual} | Limbo: ${ledger.wood.limbo}`;
    }
    const elIron = document.getElementById("res-iron");
    if (elIron) {
        elIron.innerText = ledger.iron.spendable;
        elIron.parentElement.title = `Iron (Used for smithing weapons/armors)\nSpendable: ${ledger.iron.spendable} | Actual: ${ledger.iron.actual} | Limbo: ${ledger.iron.limbo}`;
    }
    const elStone = document.getElementById("res-stone");
    if (elStone) {
        elStone.innerText = ledger.stone.spendable;
        elStone.parentElement.title = `Stone (Used for mines/structures)\nSpendable: ${ledger.stone.spendable} | Actual: ${ledger.stone.actual} | Limbo: ${ledger.stone.limbo}`;
    }
    // Population Breakdown
    const allPeasants = entities.filter(e => e.type === "peasant" && e.faction === "red" && e.state !== "dead" && e.state !== "siege_pilot");
    const totalPeasants = allPeasants.length;
    const idlePeasants = allPeasants.filter(e => e.state === "wander" || e.state === "going_home" || e.state === "idle").length;
    const constructingPeasants = allPeasants.filter(e => e.state === "building" || e.state === "delivering_wood" || e.state === "delivering_stone").length;
    const workingPeasants = totalPeasants - idlePeasants - constructingPeasants;
    const elPop = document.getElementById("player-pop");
    if (elPop) elPop.innerText = currentPop + " / " + cap;
    const elPopTotal = document.getElementById("pop-total-peasants");
    if (elPopTotal) elPopTotal.innerText = totalPeasants;
    const elPopIdle = document.getElementById("pop-idle-peasants");
    if (elPopIdle) elPopIdle.innerText = idlePeasants;
    const elPopWorking = document.getElementById("pop-working-peasants");
    if (elPopWorking) elPopWorking.innerText = workingPeasants;
    const elPopConstructing = document.getElementById("pop-constructing-peasants");
    if (elPopConstructing) elPopConstructing.innerText = constructingPeasants;
    const elIdle = document.getElementById("player-idle");
    if (elIdle) elIdle.innerText = idlePeasants;
    // Military Breakdown
    const militaryEntities = entities.filter(e => e.type === "soldier" && e.faction === "red" && e.state !== "dead");
    const siegePilots = entities.filter(e => e.type === "peasant" && e.state === "siege_pilot" && e.faction === "red").length;
    const militaryCount = militaryEntities.length + siegePilots;
    const elMilitary = document.getElementById("player-military");
    if (elMilitary) elMilitary.innerText = militaryCount;
    const elPopArmy = document.getElementById("pop-total-army");
    if (elPopArmy) elPopArmy.innerText = militaryCount;
    const armyTypes = {};
    militaryEntities.forEach(e => {
        const wt = e.weapon || "Unarmed";
        armyTypes[wt] = (armyTypes[wt] || 0) + 1;
    });
    const armyListEl = document.getElementById("army-breakdown-list");
    if (armyListEl) {
        if (Object.keys(armyTypes).length === 0) {
            armyListEl.innerHTML = "None";
        } else {
            armyListEl.innerHTML = Object.entries(armyTypes).map(([type, count]) => `<div>${type}: <span>${count}</span></div>`).join("");
        }
    }
    const elSiegePilots = document.getElementById("army-siege-pilots");
    if (elSiegePilots) elSiegePilots.innerText = siegePilots;
    // Siege Breakdown
    const siegeEntities = entities.filter(e => e.type.startsWith("siege_") && e.faction === "red" && e.state !== "dead");
    const elSiege = document.getElementById("player-siege");
    if (elSiege) elSiege.innerText = siegeEntities.length;
    const siegeTypes = {};
    siegeEntities.forEach(e => {
        const typeName = e.type.replace("siege_", "").replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
        siegeTypes[typeName] = (siegeTypes[typeName] || 0) + 1;
    });
    const siegeListEl = document.getElementById("siege-breakdown-list");
    const armySiegeListEl = document.getElementById("army-siege-list");
    if (siegeListEl) {
        if (Object.keys(siegeTypes).length === 0) {
            siegeListEl.innerHTML = "None";
            if (armySiegeListEl) armySiegeListEl.innerHTML = "None";
        } else {
            const html = Object.entries(siegeTypes).map(([type, count]) => `<div>${type}: <span>${count}</span></div>`).join("");
            siegeListEl.innerHTML = html;
            if (armySiegeListEl) armySiegeListEl.innerHTML = html;
        }
    }
    // Horse Distribution
    const horseStats = getHorseStats("red");
    const ecoHorses = entities.filter(e => e.type === "loadhouse" && e.faction === "red" && e.hasHorse && !e.isDead).length;
    const armyHorses = militaryEntities.filter(e => e.hasHorse).length;
    const readyHorses = Math.max(0, horseStats.cap - horseStats.used);
    const elHorses = document.getElementById("player-horses");
    if (elHorses) elHorses.innerText = horseStats.used + " / " + horseStats.cap;
    const elHorseStables = document.getElementById("horses-stables");
    if (elHorseStables) elHorseStables.innerText = readyHorses;
    const elHorseEco = document.getElementById("horses-eco");
    if (elHorseEco) elHorseEco.innerText = ecoHorses;
    const elHorseArmy = document.getElementById("horses-army");
    if (elHorseArmy) elHorseArmy.innerText = armyHorses;
    // Keep Inventory
    const keepListEl = document.getElementById("keep-inv-list");
    if (keepListEl) {
        keepListEl.innerHTML = `
            <div>🪙 Gold: <span>${ledger.gold.spendable}</span></div>
            <div>🌾 Food: <span>${ledger.food.spendable}</span></div>
            <div>🥖 Premium Food: <span>${ledger.premium_food.spendable}</span></div>
            <div>🍻 Brew: <span>${ledger.brew.spendable}</span></div>
            <div>🪑 Furniture: <span>${ledger.furniture.spendable}</span></div>
            <div>💎 Gem: <span>${ledger.gem.spendable}</span></div>
            <div>🪵 Wood: <span>${ledger.wood.spendable}</span></div>
            <div>🪨 Stone: <span>${ledger.stone.spendable}</span></div>
            <div>⛓️ Iron: <span>${ledger.iron.spendable}</span></div>
        `;
    }
    // Sync Global Barracks Inventory Tooltip counts
    const globalInv = getCombinedBarracksInventory();
    for (let key in globalInv) {
        const idStr = "inv-" + key.replace(" ", "");
        const el = document.getElementById(idStr);
        if (el) {
            el.innerText = globalInv[key];
        }
    }
}
function getCombinedBarracksInventory() {
    const totals = { "Spear": 0, "Pike": 0, "Halberd": 0, "Poleaxe": 0, "Axe": 0, "Sword": 0, "Mace": 0, "Short Bow": 0, "Longbow": 0, "Crossbow": 0, "cloth": 0, "leather": 0, "chain": 0, "plate": 0 };
    let hasBarracks = false;
    entities.forEach(ent => {
        if (ent.type === "barracks" && ent.faction === "red" && ent.inventory) {
            hasBarracks = true;
            for (let key in ent.inventory) {
                totals[key] = (totals[key] || 0) + ent.inventory[key];
            }
        }
    });
    if (!hasBarracks) {
        for (let key in startingPool) {
            totals[key] = startingPool[key];
        }
    }
    return totals;
}
function toggleAggro() {
    let aggroOnCount = 0;
    let aggroOffCount = 0;
        let rkCount = 0;
        let rkMountedCount = 0;
    selectedEntities.forEach(ent => {
        if ((ent.baseSpeed > 0 || ent.speed > 0 || ent.type === "peasant") && ent.faction === "red") {
            if (ent.isAggro) aggroOnCount++;
            else aggroOffCount++;
                if (ent.type === "soldier" && ent.weapon === "RoyalKnight") {
                    rkCount++;
                    if (ent.hasHorse) rkMountedCount++;
                }
        }
    });
    const targetState = (aggroOnCount > 0 && aggroOffCount === 0) ? false : true;
              selectedEntities.forEach(ent => {
        if ((ent.baseSpeed > 0 || ent.speed > 0 || ent.type === "peasant") && ent.faction === "red") {
            ent.isAggro = targetState;
        }
    });
    updateSelectionHUD();
}
function resetAggro() {
    selectedEntities.forEach(ent => {
        if ((ent.baseSpeed > 0 || ent.speed > 0 || ent.type === "peasant") && ent.faction === "red") {
            if (ent.type === "peasant" || ent.type === "logistics_wagon" || ent.type === "king" || ent.type.startsWith("siege_")) {
                ent.isAggro = false;
            } else if (ent.type === "soldier") {
                if (ent.weapon && WEAPONS[ent.weapon] && (WEAPONS[ent.weapon].type === "bow" || WEAPONS[ent.weapon].type === "crossbow")) {
                    ent.isAggro = false;
                } else {
                    ent.isAggro = true;
                }
            } else {
                ent.isAggro = false;
            }
        }
    });
    updateSelectionHUD();
}
window.applyZzzTint = function(b, isZzz) {
    if (!b || !b.mesh) return;
    b.mesh.traverse(c => {
        if (c.isMesh && c.material) {
            if (isZzz) {
                if (c.material.emissive) {
                    if (c.material.origEmissive === undefined) c.material.origEmissive = c.material.emissive.getHex();
                    c.material.emissive.setHex(0x0055cc); // Blue tint
                }
            } else {
                if (c.material.emissive && c.material.origEmissive !== undefined) {
                    c.material.emissive.setHex(c.material.origEmissive);
                }
            }
        }
    });
};
window.abortWorkerWithZzz = function(unit, entities) {
    if (unit.workerBuilding && !unit.workerBuilding.isZzz) {
        const b = unit.workerBuilding;
        b.isZzz = true;
        if (window.applyZzzTint) window.applyZzzTint(b, true);
        const activePeasants = entities.filter(e => e.type === "peasant");
        activePeasants.forEach(p => {
            if (p.workerBuilding === b) {
                p.workerBuilding = null;
                p.state = "wander";
                p.targetPosition = null;
                p.path = null;
            }
        });
    }
    if (unit.type === "peasant") {
        unit.state = "wander";
    } else {
        unit.state = "idle";
    }
    unit.workerBuilding = null;
    unit.path = null;
};
window.toggleZzz = function() {
    let mixedZzz = false;
    let anyOn = false;
    let anyOff = false;
    const validBuildings = selectedEntities.filter(ent => ent.faction === "red" && !!BUILDING_TYPES[ent.type] && !["keep", "wall_column", "gatehouse", "barracks"].includes(ent.type));
    if (validBuildings.length === 0) return;
    validBuildings.forEach(ent => {
        if (ent.isZzz) anyOff = true;
        else anyOn = true;
    });
    const targetZzz = anyOn && anyOff ? true : (anyOff ? false : true);
    validBuildings.forEach(b => {
        b.isZzz = targetZzz;
        if (window.applyZzzTint) window.applyZzzTint(b, b.isZzz);
        if (b.isZzz) {
            // Fire workers
            const activePeasants = entities.filter(e => e.type === "peasant");
            activePeasants.forEach(p => {
                if (p.workerBuilding === b) {
                    p.workerBuilding = null;
                    p.state = "wander"; // Let engine magically return goods and go idle
                    p.targetPosition = null;
                    p.path = null;
                }
            });
            // If loadhouse, remove horse mesh if it exists
            if (b.type === "loadhouse" && b.hasHorse) {
                b.hasHorse = false;
                if (b.mesh) scene.remove(b.mesh);
                b.mesh = buildEntityMesh(b); scene.add(b.mesh); b.mesh.position.set(b.x, b.y, b.z);
            }
        }
    });
    updateSelectionHUD();
};
const WEAPON_SVGS = {
    "Spear": `<svg class="weapon-icon" viewBox="0 0 24 24"><line x1="4" y1="20" x2="18" y2="6" stroke="#8d6e63" stroke-width="2" stroke-linecap="round"/><polygon points="17,7 22,2 17,11" fill="#cfd8dc" stroke="#90a4ae" stroke-width="0.5"/></svg>`,
    "Pike": `<svg class="weapon-icon" viewBox="0 0 24 24"><line x1="2" y1="22" x2="20" y2="4" stroke="#8d6e63" stroke-width="2" stroke-linecap="round"/><polygon points="19,5 23,1 19,9" fill="#cfd8dc" stroke="#90a4ae" stroke-width="0.5"/></svg>`,
    "Axe": `<span class="btn-icon" style="font-size: 16px;">🪓</span>`,
    "Halberd": `<svg class="weapon-icon" viewBox="0 0 24 24"><line x1="5" y1="21" x2="14" y2="8" stroke="#8d6e63" stroke-width="2" stroke-linecap="round"/><polygon points="13,9 21,1 15,11" fill="#cfd8dc" stroke="#90a4ae" stroke-width="0.5"/><path d="M12,7 Q8,6 10,12 Q14,11 12,7 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width="0.5"/><polygon points="14,10 18,13 15,14" fill="#cfd8dc" stroke="#90a4ae" stroke-width="0.5"/></svg>`,
    "Sword": `<svg class="weapon-icon" viewBox="0 0 24 24"><line x1="5" y1="19" x2="9" y2="15" stroke="#5d4037" stroke-width="2" stroke-linecap="round"/><line x1="6" y1="14" x2="10" y2="18" stroke="#fbc02d" stroke-width="2" stroke-linecap="round"/><polygon points="9,15 21,3 15,9" fill="#cfd8dc" stroke="#90a4ae" stroke-width="0.5"/></svg>`,
    "Mace": `<svg class="weapon-icon" viewBox="0 0 24 24"><line x1="6" y1="22" x2="16" y2="12" stroke="#8d6e63" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="12" r="3.5" fill="#cfd8dc" stroke="#90a4ae" stroke-width="0.5"/><polygon points="16,8.5 17,6 15,6" fill="#cfd8dc"/><polygon points="16,15.5 17,18 15,18" fill="#cfd8dc"/><polygon points="19.5,12 22,11 22,13" fill="#cfd8dc"/><polygon points="12.5,12 10,11 10,13" fill="#cfd8dc"/><polygon points="18.5,9.5 21,7 19.5,7" fill="#cfd8dc"/></svg>`,
    "Poleaxe": `<svg class="weapon-icon" viewBox="0 0 24 24"><line x1="5" y1="21" x2="14" y2="8" stroke="#8d6e63" stroke-width="2" stroke-linecap="round"/><polygon points="13,9 18,3 15,11" fill="#cfd8dc" stroke="#90a4ae" stroke-width="0.5"/><path d="M12,7 Q8,6 10,12 Q14,11 12,7 Z" fill="#cfd8dc" stroke="#90a4ae" stroke-width="0.5"/><rect x="14" y="8" width="3" height="4" transform="rotate(45 14 8)" fill="#cfd8dc" stroke="#90a4ae" stroke-width="0.5"/></svg>`,
    "Crossbow": `<svg class="weapon-icon" viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="6" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/><path d="M4,10 Q12,6 20,10" fill="none" stroke="#8d6e63" stroke-width="2"/><line x1="4" y1="10" x2="12" y2="14" stroke="#90a4ae" stroke-width="1"/><line x1="20" y1="10" x2="12" y2="14" stroke="#90a4ae" stroke-width="1"/><line x1="12" y1="14" x2="12" y2="2" stroke="#cfd8dc" stroke-width="2"/><polygon points="12,2 10,6 14,6" fill="#cfd8dc"/></svg>`,
    "Short Bow": `<svg class="weapon-icon" viewBox="0 0 24 24"><path d="M16,3 Q20,12 16,21" fill="none" stroke="#8d6e63" stroke-width="2.5" stroke-linecap="round"/><polyline points="16,3 8,12 16,21" fill="none" stroke="#90a4ae" stroke-width="1"/><line x1="4" y1="12" x2="22" y2="12" stroke="#cfd8dc" stroke-width="2"/><polygon points="22,12 18,10 18,14" fill="#cfd8dc"/></svg>`,
    "Longbow": `<svg class="weapon-icon-large" viewBox="0 0 24 24" style="margin-top: -2px; margin-bottom: -2px;"><path d="M16,1 Q22,12 16,23" fill="none" stroke="#8d6e63" stroke-width="3" stroke-linecap="round"/><polyline points="16,1 6,12 16,23" fill="none" stroke="#90a4ae" stroke-width="1"/><line x1="2" y1="12" x2="24" y2="12" stroke="#cfd8dc" stroke-width="2.5"/><polygon points="24,12 19,9 19,15" fill="#cfd8dc"/></svg>`,
        "Grunt": `<span class="btn-icon" style="font-size: 16px;">🧢</span>`,
    "Thug": `<span class="btn-icon" style="font-size: 16px;">🕶️</span>`,
    "Brute": `<span class="btn-icon" style="font-size: 16px;">🦍</span>`,
    "Slinger": `<span class="btn-icon" style="font-size: 16px;">🪢</span>`,
    "Spy": `<span class="btn-icon" style="font-size: 16px;">🕵️</span>`,
    "Assassin": `<span class="btn-icon" style="font-size: 16px;">🥷</span>`,
    "Doppelsoldner": `<span class="btn-icon" style="font-size: 16px;">&#x2694;</span>`,
    "RoyalKnight": `<span class="btn-icon" style="font-size: 16px;">👑</span>`,
    "Peasant": `<svg class="weapon-icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#f5d0b5" stroke="#8d6e63" stroke-width="1"/><path d="M8,22 L8,14 Q12,12 16,14 L16,22" fill="#a1887f" stroke="#5d4037" stroke-width="1"/></svg>`,
    "King": `<svg class="weapon-icon" viewBox="0 0 24 24"><path d="M4,20 L4,10 L8,14 L12,8 L16,14 L20,10 L20,20 Z" fill="#ffd700" stroke="#b8860b" stroke-width="1"/></svg>`,
    "Shield": `<span class="btn-icon" style="font-size: 16px;">🟨</span>`,
    "Ballista": `<span class="btn-icon" style="font-size: 16px;">🏹</span>`,
    "Catapult": `<span class="btn-icon" style="font-size: 16px;">☄️</span>`,
    "Trebuchet": `<span class="btn-icon" style="font-size: 16px;">🌠</span>`,
    "horse": `<span class="btn-icon" style="font-size: 16px;">🐎</span>`,
    "wagon": `<span class="btn-icon" style="font-size: 16px;">🛒</span>`
};
function getWeaponSVG(w) {
    return WEAPON_SVGS[w] || `<svg class="weapon-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="#cfd8dc" stroke="#90a4ae" stroke-width="1"/></svg>`;
}
function updateSelectionHUD() {
    const btnAttackGround = document.getElementById("btn-attack-ground");
    if (btnAttackGround) {
        if (selectedEntities.some(ent => ent.faction === "red" && (
            (ent.type.startsWith("siege_") && ent.type !== "siege_engineer") ||
            (ent.weapon && WEAPONS[ent.weapon] && WEAPONS[ent.weapon].type !== "melee")
        ))) {
            btnAttackGround.style.display = "flex";
        } else {
            btnAttackGround.style.display = "none";
        }
    }
    const rightControl = document.getElementById("right-control-panel");
    const trainPanel = document.getElementById("training-panel");
    const wPanel = document.getElementById("workshop-panel");
    if (selectedEntities.length === 0) {
        const titleEl = document.getElementById("selection-title");
        if (titleEl) titleEl.innerText = "No Selection";
        const detailsEl = document.getElementById("selection-details");
        if (detailsEl) detailsEl.innerHTML = `<p class="placeholder-text">Select a unit or building to view details.</p>`;
        const aggroControls = document.getElementById("aggro-controls");
        if (aggroControls) aggroControls.style.display = "none";
        const zzzControls = document.getElementById("zzz-controls");
        if (zzzControls) zzzControls.style.display = "none";
        if (rightControl) rightControl.style.display = "none";
        if (trainPanel) trainPanel.style.display = "none";
        if (wPanel) wPanel.style.display = "none";
        const mPanel = document.getElementById("market-panel");
        if (mPanel) mPanel.style.display = "none";
        if (placementMode && WORKSHOP_PRODS[placementMode]) {
        if (rightControl) rightControl.style.display = "flex";
            if (wPanel) wPanel.style.display = "flex";
            document.getElementById("right-panel-title").innerText = "Set Output";
            const options = WORKSHOP_PRODS[placementMode];
            const p1 = options[0];
            const p2 = options[1];
            const btn1 = document.getElementById("btn-product-1");
            const btn2 = document.getElementById("btn-product-2");
            btn1.innerText = p1.name.toUpperCase() + " (" + p1.time + "s)";
            if (p2) {
                btn2.innerText = p2.name.toUpperCase() + " (" + p2.time + "s)";
                btn2.style.display = "block";
            } else {
                btn2.style.display = "none";
            }
            window.workshopPreferences = window.workshopPreferences || {};
            const activeIdx = window.workshopPreferences[placementMode] || 0;
            btn1.className = (activeIdx === 0) ? "wood-btn-gold active-prod" : "wood-btn-gold";
            btn2.className = (activeIdx === 1) ? "wood-btn-gold active-prod" : "wood-btn-gold";
        }
        const headerTabs = document.querySelector(".hud-tabs");
        const groupCiv = document.getElementById("group-civilian");
        const groupMil = document.getElementById("group-military");
        const groupBar = document.getElementById("group-barracks-training");
        const groupSiege = document.getElementById("group-siege-training");
        const defaultTabs = document.getElementById("default-header-tabs");
        const barHeader = document.getElementById("barracks-header-controls");
        const siegeHeader = document.getElementById("siegeshop-header-controls");
        const mktHeader = document.getElementById("market-header-controls");
        const actionHeaderTitle = document.querySelector(".action-header h3");
        const finePrint = document.getElementById("market-fine-print");
        if (finePrint) finePrint.style.display = "none";
        if (defaultTabs) defaultTabs.style.display = "flex";
        if (barHeader) barHeader.style.display = "none";
        if (siegeHeader) siegeHeader.style.display = "none";
        if (mktHeader) mktHeader.style.display = "none";
        if (actionHeaderTitle) actionHeaderTitle.innerText = "Actions & Construction";
        if (groupBar) groupBar.style.display = "none";
        if (groupSiege) groupSiege.style.display = "none";
        const groupMerc = document.getElementById("group-mercenary-training");
        if (groupMerc) groupMerc.style.display = "none";
        const groupWalls = document.getElementById("group-walls");
        if (groupCiv && groupMil) {
            const isMilActive = document.getElementById("tab-military")?.classList.contains("active");
            const isCivActive = document.getElementById("tab-civilian")?.classList.contains("active");
            const isWallsActive = document.getElementById("tab-walls")?.classList.contains("active");
            const isLuxActive = document.getElementById("tab-luxuries")?.classList.contains("active");
            groupCiv.style.display = isCivActive ? "flex" : "none";
            groupMil.style.display = isMilActive ? "flex" : "none";
            if (groupWalls) groupWalls.style.display = isWallsActive ? "flex" : "none";
            const groupLuxuries = document.getElementById("group-luxuries");
            if (groupLuxuries) groupLuxuries.style.display = isLuxActive ? "flex" : "none";
        }
        const groupMultiUnits = document.getElementById("group-multi-units");
        if (groupMultiUnits) groupMultiUnits.style.display = "none";
        return;
    }
    const first = selectedEntities[0];
    if (rightControl) rightControl.style.display = "none";
    if (trainPanel) trainPanel.style.display = "none";
    if (wPanel) wPanel.style.display = "none";
    const mPanel = document.getElementById("market-panel");
    if (mPanel) mPanel.style.display = "none";
    const headerTabs = document.querySelector(".hud-tabs");
    const groupCiv = document.getElementById("group-civilian");
    const groupMil = document.getElementById("group-military");
    const groupBar = document.getElementById("group-barracks-training");
    const groupSiege = document.getElementById("group-siege-training");
    const defaultTabs = document.getElementById("default-header-tabs");
    const barHeader = document.getElementById("barracks-header-controls");
    const siegeHeader = document.getElementById("siegeshop-header-controls");
    const mktHeader = document.getElementById("market-header-controls");
    const actionHeaderTitle = document.querySelector(".action-header h3");
        const finePrint = document.getElementById("market-fine-print");
        if (finePrint) finePrint.style.display = "none";
    if (defaultTabs) defaultTabs.style.display = "flex";
    if (barHeader) barHeader.style.display = "none";
    if (siegeHeader) siegeHeader.style.display = "none";
    if (mktHeader) mktHeader.style.display = "none";
    if (actionHeaderTitle) actionHeaderTitle.innerText = "Actions & Construction";
    if (groupBar) groupBar.style.display = "none";
    if (groupSiege) groupSiege.style.display = "none";
    const groupMerc = document.getElementById("group-mercenary-training");
    if (groupMerc) groupMerc.style.display = "none";
    const groupWalls = document.getElementById("group-walls");
    if (groupCiv && groupMil) {
        const isMilActive = document.getElementById("tab-military")?.classList.contains("active");
        const isCivActive = document.getElementById("tab-civilian")?.classList.contains("active");
        const isWallsActive = document.getElementById("tab-walls")?.classList.contains("active");
        const isLuxActive = document.getElementById("tab-luxuries")?.classList.contains("active");
        groupCiv.style.display = isCivActive ? "flex" : "none";
        groupMil.style.display = isMilActive ? "flex" : "none";
        if (groupWalls) groupWalls.style.display = isWallsActive ? "flex" : "none";
        const groupLuxuries = document.getElementById("group-luxuries");
        if (groupLuxuries) groupLuxuries.style.display = isLuxActive ? "flex" : "none";
    }
    const groupMultiUnits = document.getElementById("group-multi-units");
    if (groupMultiUnits) groupMultiUnits.style.display = "none";
    const isMultiSameBuilding = selectedEntities.length > 1 && selectedEntities.every(ent => ent.type === first.type && ent.faction === first.faction && BUILDING_TYPES[ent.type]);
    // Toggle conditional control segments on Barracks or Workshops
    if (selectedEntities.length > 1 && !isMultiSameBuilding) {
        if (defaultTabs) defaultTabs.style.display = "none";
        if (mktHeader) mktHeader.style.display = "none";
        if (actionHeaderTitle) actionHeaderTitle.innerText = "Multi-Selection";
        if (groupCiv) groupCiv.style.display = "none";
        if (groupMil) groupMil.style.display = "none";
        if (groupWalls) groupWalls.style.display = "none";
        const groupLuxuries = document.getElementById("group-luxuries");
        if (groupLuxuries) groupLuxuries.style.display = "none";
        if (groupMultiUnits) {
            groupMultiUnits.style.display = "flex";
            // Build the multi-selection content
            let weaponCounts = {};
            selectedEntities.forEach(ent => {
                let w = ent.weapon || (ent.type === "peasant" ? "Peasant" : (ent.type === "king" ? "King" : ent.type));
                if (w === "siege_shield") w = "Shield";
                if (w === "siege_ballista") w = "Ballista";
                if (w === "siege_catapult") w = "Catapult";
                if (w === "siege_trebuchet") w = "Trebuchet";
                if (!weaponCounts[w]) weaponCounts[w] = [];
                weaponCounts[w].push(ent);
            });
            const wKeys = Object.keys(weaponCounts);
            let html = '';
            if (wKeys.length > 1) {
                // Show weapon groups
                html += `<div style="font-weight: bold; margin-bottom: 5px; color: #3e2723; width: 100%;">Filter by Unit Type:</div>`;
                wKeys.forEach(w => {
                    html += `<button onmousedown="filterSelectionByWeapon(event, '${w}')" class="wood-btn barracks-train-btn" title="Click: Isolate ${w}&#10;Shift-Click: Remove ${w}">
                        <div class="train-label">${w}</div>
                        <div class="train-icons">
                            ${getWeaponSVG(w)}
                        </div>
                        <div class="train-numbers" style="font-size: 14px; margin-top: 5px; display: flex; justify-content: center; width: 100%;"><span class="stock-num">x${weaponCounts[w].length}</span></div>
                    </button>`;
                });
            } else if (wKeys.length === 1) {
                // Show armor combos for this single weapon type
                html += `<div style="font-weight: bold; margin-bottom: 5px; color: #3e2723; width: 100%;">${wKeys[0].toUpperCase()} - Filter by Armor:</div>`;
                let armorCounts = {};
                weaponCounts[wKeys[0]].forEach(ent => {
                    let a = (ent.armors && ent.armors.length > 0) ? ent.armors.join("+") : "bare";
                    if (ent.hasHorse) a += "+horse";
                    if (!armorCounts[a]) armorCounts[a] = [];
                    armorCounts[a].push(ent);
                });
                Object.keys(armorCounts).forEach(a => {
                    let displayA = a;
                    if (a === "bare") {
                        displayA = "Bare";
                    } else {
                        displayA = a.split('+').map(part => {
                            if (part === "cloth") return "👕";
                            if (part === "leather") return "👢";
                            if (part === "chain") return "⛓️";
                            if (part === "plate") return "🛡️";
                            if (part === "horse") return "🐎";
                            return part;
                        }).join('');
                    }
                    html += `<button onmousedown="filterSelectionByArmor(event, '${a}')" class="wood-btn barracks-train-btn" title="Click: Isolate ${a}&#10;Shift-Click: Remove ${a}">
                        <div class="train-label" style="font-size: 12px; line-height: 1.1; white-space: normal; overflow: hidden; max-height: 20px;">${displayA}</div>
                        <div class="train-icons">
                            ${getWeaponSVG(wKeys[0])}
                        </div>
                        <div class="train-numbers" style="font-size: 14px; margin-top: 2px; display: flex; justify-content: center; width: 100%;"><span class="stock-num">x${armorCounts[a].length}</span></div>
                    </button>`;
                });
            }
            groupMultiUnits.innerHTML = html;
        }
    } else if ((selectedEntities.length === 1 || isMultiSameBuilding) && first.faction === "red") {
        if (first.type === "barracks") {
            if (defaultTabs) defaultTabs.style.display = "none";
            if (mktHeader) mktHeader.style.display = "none";
            if (actionHeaderTitle) actionHeaderTitle.innerText = "Barracks Training";
            if (groupCiv) groupCiv.style.display = "none";
            if (groupMil) groupMil.style.display = "none";
            if (groupWalls) groupWalls.style.display = "none";
            const groupLuxuries = document.getElementById("group-luxuries");
            if (groupLuxuries) groupLuxuries.style.display = "none";
            if (groupBar && !first.isPlanned) groupBar.style.display = "flex";
            if (rightControl) rightControl.style.display = "none";
            if (barHeader && !first.isPlanned) barHeader.style.display = "flex";
            const armorCtrl = document.getElementById("barracks-armor-controls");
            if (armorCtrl) armorCtrl.style.display = (first.type === "mercenary_post") ? "none" : "flex";
            if (!first.isPlanned) {
                // Sync inventory numbers
                const keys = ["Spear", "Pike", "Halberd", "Poleaxe", "Axe", "Sword", "Mace", "ShortBow", "Longbow", "Crossbow", "cloth", "leather", "chain", "plate", "horse"];
                const hStats = getHorseStats("red");
                const availableHorses = Math.max(0, hStats.cap - hStats.used);
                keys.forEach(k => {
                    const mapK = k === "ShortBow" ? "Short Bow" : k;
                    const el = document.getElementById("stock-" + k);
                    if (el) {
                        if (k === "horse") {
                            el.innerText = availableHorses;
                        } else {
                            el.innerText = first.inventory[mapK] || 0;
                        }
                    }
                });
                updateBarracksQueueUI();
            }
        } else if (first.type === "mercenary_post") {
            if (defaultTabs) defaultTabs.style.display = "none";
            if (mktHeader) mktHeader.style.display = "none";
            if (actionHeaderTitle) actionHeaderTitle.innerText = "Mercenary Recruitment";
            if (groupCiv) groupCiv.style.display = "none";
            if (groupMil) groupMil.style.display = "none";
            if (groupWalls) groupWalls.style.display = "none";
            const groupLuxuries = document.getElementById("group-luxuries");
            if (groupLuxuries) groupLuxuries.style.display = "none";
            const groupMerc = document.getElementById("group-mercenary-training");
            if (groupMerc && !first.isPlanned) groupMerc.style.display = "flex";
            if (rightControl) rightControl.style.display = "none";
            if (barHeader && !first.isPlanned) barHeader.style.display = "flex";
            const armorCtrl = document.getElementById("barracks-armor-controls");
            if (armorCtrl) armorCtrl.style.display = (first.type === "mercenary_post") ? "none" : "flex";
            if (!first.isPlanned) {
                updateBarracksQueueUI();
            }
        } else if (first.type === "siegeshop") {
            if (defaultTabs) defaultTabs.style.display = "none";
            if (mktHeader) mktHeader.style.display = "none";
            if (actionHeaderTitle) actionHeaderTitle.innerText = "Siege Training";
            if (groupCiv) groupCiv.style.display = "none";
            if (groupMil) groupMil.style.display = "none";
            if (groupWalls) groupWalls.style.display = "none";
            const groupLuxuries = document.getElementById("group-luxuries");
            if (groupLuxuries) groupLuxuries.style.display = "none";
            if (groupSiege && !first.isPlanned) groupSiege.style.display = "flex";
            if (rightControl) rightControl.style.display = "none";
            if (siegeHeader && !first.isPlanned) siegeHeader.style.display = "flex";
            if (!first.isPlanned) updateSiegeShopQueueUI();
        } else if (["poleturner", "gruntshop", "blacksmith", "fletcher", "knightarms", "tailor", "armorer", "bakery", "brewery", "carpenter", "jeweler"].includes(first.type)) {
            rightControl.style.display = "flex";
            wPanel.style.display = "flex";
            document.getElementById("right-panel-title").innerText = "Shop Production";
            const options = WORKSHOP_PRODS[first.type];
            const p1 = options[0];
            const p2 = options[1];
            // Render buttons label and toggle active state
            const btn1 = document.getElementById("btn-product-1");
            const btn2 = document.getElementById("btn-product-2");
            btn1.innerText = p1.name.toUpperCase() + " (" + p1.time + "s)";
            btn1.className = (first.activeProductIdx === 0) ? "wood-btn-gold active-prod" : "wood-btn-gold";
            if (p2) {
                btn2.innerText = p2.name.toUpperCase() + " (" + p2.time + "s)";
                btn2.className = (first.activeProductIdx === 1) ? "wood-btn-gold active-prod" : "wood-btn-gold";
                btn2.style.display = "block";
            } else {
                btn2.style.display = "none";
            }
        } else if (first.type === "market") {
            if (rightControl) rightControl.style.display = "none";
            if (defaultTabs) defaultTabs.style.display = "none";
            if (barHeader) barHeader.style.display = "none";
            if (siegeHeader) siegeHeader.style.display = "none";
            if (mktHeader && !first.isPlanned) mktHeader.style.display = "flex";
            if (actionHeaderTitle) actionHeaderTitle.innerText = "Market Trade";
            if (finePrint && !first.isPlanned) {
                finePrint.style.display = "inline";
                if (window.currentAutoTradeItem) {
                    finePrint.innerText = "Hold Shift(x10) or Alt(x50) to adjust faster. Auto-trade checks once per second.";
                } else {
                    finePrint.innerText = "Click on item for autobuy/sell. Shift x10. Alt x50.";
                }
            }
            if (groupCiv) groupCiv.style.display = "none";
            if (groupMil) groupMil.style.display = "none";
            if (groupWalls) groupWalls.style.display = "none";
            const groupLuxuries = document.getElementById("group-luxuries");
            if (groupLuxuries) groupLuxuries.style.display = "none";
            if (mPanel && !first.isPlanned) {
                mPanel.style.display = "flex";
                const listEl = document.getElementById("market-list");
                let html = "";
                const marketPrices = {
                    "food": { buy: 4, sell: 2 },
                    "premium_food": { buy: 6, sell: 3 },
                    "brew": { buy: 6, sell: 3 },
                    "furniture": { buy: 12, sell: 6 },
                    "gem": { buy: 240, sell: 120 },
                    "wood": { buy: 2, sell: 1 },
                    "iron": { buy: 6, sell: 3 },
                    "stone": { buy: 4, sell: 2 },
                    "Spear": { buy: 30, sell: 15 },
                    "Pike": { buy: 60, sell: 30 },
                    "Halberd": { buy: 150, sell: 75 },
                    "Poleaxe": { buy: 300, sell: 150 },
                    "Axe": { buy: 90, sell: 45 },
                    "Sword": { buy: 180, sell: 90 },
                    "Mace": { buy: 180, sell: 90 },
                    "Short Bow": { buy: 60, sell: 30 },
                    "Longbow": { buy: 90, sell: 45 },
                    "Crossbow": { buy: 240, sell: 120 },
                    "cloth": { buy: 60, sell: 30 },
                    "leather": { buy: 120, sell: 60 },
                    "chain": { buy: 90, sell: 45 },
                    "plate": { buy: 180, sell: 90 }
                };
                const resourcesKeys = ["food", "wood", "iron", "stone"];
                const luxuriesKeys = ["premium_food", "brew", "furniture", "gem"];
                const armorKeys = ["cloth", "leather", "chain", "plate"];
                const weaponsKeys = Object.keys(marketPrices).filter(k => !resourcesKeys.includes(k) && !luxuriesKeys.includes(k) && !armorKeys.includes(k));
                let activeKeys = [];
                if (window.currentMarketTab === "luxuries") activeKeys = luxuriesKeys;
                else if (window.currentMarketTab === "weapons") activeKeys = weaponsKeys;
                else if (window.currentMarketTab === "armor") activeKeys = armorKeys;
                else activeKeys = resourcesKeys;
                if (window.currentAutoTradeItem) {
                    const res = window.currentAutoTradeItem;
                    const displayRes = res.charAt(0).toUpperCase() + res.slice(1);
                    window.autoTradeSettings = window.autoTradeSettings || {};
                    const s = window.autoTradeSettings[res] || { autoBuy: false, autoSell: false, buyAmount: 20, sellAmount: 21 };
                    const emoji = typeof getItemEmoji === "function" ? getItemEmoji(res) : "";
                    let initialAmt = 0;
                    const isRawRes = ["food", "wood", "iron", "stone", "premium_food", "brew", "furniture", "gem", "gold"].includes(res);
                    if (isRawRes) {
                        let ldg = getLedger("red");
                        if (ldg[res]) initialAmt = ldg[res].spendable;
                    } else {
                        let tType = res === "horse" ? "stables" : "barracks";
                        entities.forEach(e => {
                            if (e.type === tType && e.faction === "red" && e.state !== "dead" && !e.isPlanned) {
                                initialAmt += (e.inventory && e.inventory[res]) || 0;
                            }
                        });
                    }
                    html += `
                        <div style="display:flex; flex-direction:column; width:100%; height:100%; background:rgba(0,0,0,0.1); padding:8px; border-radius:4px; border: 1px solid rgba(0,0,0,0.2); box-sizing:border-box;">
                            
                            <div style="display:flex; align-items:center; margin-bottom:8px; width:100%;">
                                <strong style="color:#3e2723; font-size:16px; min-width: 150px;">
                                    ${emoji} ${displayRes} <span id="mkt-inv-${res.replace(/\s+/g, '_')}" style="margin-left: 4px; color: #5d4037; font-weight: normal;">(${initialAmt})</span>
                                </strong>
                                <div style="display:flex; flex:1; justify-content: space-around; align-items:center; gap: 10px;">
                                    <div style="display:flex; align-items:center; gap:4px;">
                                        <div onclick="toggleAutoTrade('${res}', 'buy'); event.preventDefault();" style="display:flex; align-items:center; gap:4px; font-size:14px; cursor:pointer;">
                                            <input type="checkbox" ${s.autoBuy ? 'checked' : ''} style="width:16px; height:16px; pointer-events:none;">
                                            Auto Buy to:
                                        </div>
                                        <div style="display:flex; align-items:center; gap:4px;">
                                            <button onclick="adjustAutoTradeAmount(event, '${res}', 'buy', -1)" class="wood-btn-gold" style="padding:2px 6px;">-</button>
                                            <span style="width:30px; text-align:center;">${s.buyAmount}</span>
                                            <button onclick="adjustAutoTradeAmount(event, '${res}', 'buy', 1)" class="wood-btn-gold" style="padding:2px 6px;">+</button>
                                        </div>
                                    </div>

                                    <div style="display:flex; align-items:center; gap:4px;">
                                        <div onclick="toggleAutoTrade('${res}', 'sell'); event.preventDefault();" style="display:flex; align-items:center; gap:4px; font-size:14px; cursor:pointer;">
                                            <input type="checkbox" ${s.autoSell ? 'checked' : ''} style="width:16px; height:16px; pointer-events:none;">
                                            Auto Sell above:
                                        </div>
                                        <div style="display:flex; align-items:center; gap:4px;">
                                            <button onclick="adjustAutoTradeAmount(event, '${res}', 'sell', -1)" class="wood-btn-gold" style="padding:2px 6px;">-</button>
                                            <span style="width:30px; text-align:center;">${s.sellAmount}</span>
                                            <button onclick="adjustAutoTradeAmount(event, '${res}', 'sell', 1)" class="wood-btn-gold" style="padding:2px 6px;">+</button>
                                        </div>
                                    </div>
                                </div>
                                <button onclick="closeAutoTradeMenu()" class="wood-btn-gold" style="padding:2px 8px; margin-left: 10px;">Back</button>
                            </div>
                            
                        </div>
                    `;
                } else {
                                        for (let res of activeKeys) {
                        const price = marketPrices[res];
                        const displayRes = res.charAt(0).toUpperCase() + res.slice(1);
                        const emoji = typeof getItemEmoji === "function" ? getItemEmoji(res) : "";
                        let initialAmt = 0;
                        const isRawRes = ["food", "wood", "iron", "stone", "premium_food", "brew", "furniture", "gem", "gold"].includes(res);
                        if (isRawRes) {
                            let ldg = getLedger("red");
                            if (ldg[res]) initialAmt = ldg[res].spendable;
                        } else {
                            let tType = res === "horse" ? "stables" : "barracks";
                            entities.forEach(e => {
                                if (e.type === tType && e.faction === "red" && e.state !== "dead" && !e.isPlanned) {
                                    initialAmt += (e.inventory && e.inventory[res]) || 0;
                                }
                            });
                        }
                        html += `
                            <div style="display:flex; flex: 1 1 120px; flex-direction:column; background:rgba(0,0,0,0.1); padding:4px; border-radius:4px; align-items:center; border: 1px solid rgba(0,0,0,0.2);">
                                <div style="width:100%; text-align:center; cursor:pointer;" onclick="openAutoTradeMenu('${res}')">
                                    <strong style="margin-bottom:4px; color:#3e2723; font-size:14px;">
                                        ${emoji} ${displayRes} <span id="mkt-inv-${res.replace(/\s+/g, '_')}" style="margin-left: 4px; color: #5d4037; font-weight: normal;">(${initialAmt})</span>
                                    </strong>
                                </div>
                                <div style="display:flex; gap:4px; width: 100%; justify-content: space-between;">
                                    <button onclick="tradeMarket(event, '${res}', 'buy')" class="wood-btn-gold" style="padding:4px; font-size:12px; flex:1;">Buy (${price.buy}g)</button>
                                    <button onclick="tradeMarket(event, '${res}', 'sell')" class="wood-btn-gold" style="padding:4px; font-size:12px; flex:1;">Sell (${price.sell}g)</button>
                                </div>
                            </div>
                        `;
                    }
                }
                let currentState = (window.currentMarketTab || "resources") + "_" + (window.currentAutoTradeItem || "none");
                if (listEl.dataset.renderedState !== currentState) {
                    listEl.innerHTML = html;
                    listEl.dataset.renderedState = currentState;
                }
            }
        }
    }
    let displayType = first.type;
    if (displayType === "siege_shield") displayType = "Shield";
    if (displayType === "siege_ballista") displayType = "Ballista";
    if (displayType === "siege_catapult") displayType = "Catapult";
    if (displayType === "siege_trebuchet") displayType = "Trebuchet";
    let titleStr = displayType.toUpperCase() + " (" + first.faction.toUpperCase() + ")";
    if (first.type === "soldier") {
        let soldierName = "SOLDIER";
        if (first.weapon) {
            const wNameMap = {
                "Spear": "SPEARMAN",
                "Pike": "PIKEMAN",
                "Axe": "AXEMAN",
                "Halberd": "HALBERDIER",
                "Sword": "SWORDSMAN",
                "Mace": "MACEMAN",
                "Poleaxe": "MFER",
                "Crossbow": "CROSSBOWMAN",
                "Short Bow": "SHORTBOWMAN",
                "Longbow": "LONGBOWMAN",
                "Grunt": "🧢 MERCENARY GRUNT",
                "Thug": "🕶️ MERCENARY THUG",
                "Brute": "🦍 MERCENARY BRUTE",
                "Slinger": "🪢 MERCENARY SLINGER",
                "Spy": "🕵️ MERCENARY SPY",
                "Assassin": "🥷 MERCENARY ASSASSIN",
                "Doppelsoldner": "\uD83D\uDC80 DOPPELSOLDNER",
                "RoyalKnight": "👑 ROYAL KNIGHT"
            };
            soldierName = wNameMap[first.weapon] || first.weapon.toUpperCase();
        }
        let armorIcons = "";
        if (first.armors && first.armors.length > 0) {
            first.armors.forEach(a => {
                if (a === "cloth") armorIcons += "👕";
                else if (a === "leather") armorIcons += "👢";
                else if (a === "chain") armorIcons += "⛓️";
                else if (a === "plate") armorIcons += "🛡️";
            });
        }
        if (first.hasHorse) {
            armorIcons += "🐎";
        }
        titleStr = `${soldierName} ${armorIcons} (${first.faction.toUpperCase()})`;
    }
    if (selectedEntities.length > 1) {
        titleStr = selectedEntities.length + " Units Selected";
    }
    const titleEl2 = document.getElementById("selection-title");
    if (titleEl2) titleEl2.innerText = titleStr;
    const aggroControls = document.getElementById("aggro-controls");
    const aggroBtn = document.getElementById("btn-toggle-aggro");
    const mountBtn = document.getElementById("btn-toggle-mount");
    const zzzControls = document.getElementById("zzz-controls");
    const zzzBtn = document.getElementById("btn-toggle-zzz");
    if (aggroControls && aggroBtn) {
        let hasMobiles = false;
        let aggroOnCount = 0;
        let aggroOffCount = 0;
        let rkCount = 0;
        let rkMountedCount = 0;
        selectedEntities.forEach(ent => {
            if ((ent.baseSpeed > 0 || ent.speed > 0 || ent.type === "peasant") && ent.faction === "red") {
                hasMobiles = true;
                if (ent.isAggro) aggroOnCount++;
                else aggroOffCount++;
                if (ent.type === "soldier" && ent.weapon === "RoyalKnight") {
                    rkCount++;
                    if (ent.hasHorse) rkMountedCount++;
                }
            }
        });
        if (hasMobiles) {
            aggroControls.style.display = "flex";
            if (aggroOnCount > 0 && aggroOffCount === 0) {
                aggroBtn.innerText = "😡";
                aggroBtn.title = "Aggro: ON (Click to turn OFF)";
            } else if (aggroOffCount > 0 && aggroOnCount === 0) {
                aggroBtn.innerText = "😌";
                aggroBtn.title = "Aggro: OFF (Click to turn ON)";
            } else {
                aggroBtn.innerText = "😐";
                aggroBtn.title = "Aggro: MIXED (Click to turn ON)";
            }
            if (mountBtn) {
                if (rkCount > 0) {
                    mountBtn.style.display = "flex";
                    if (rkMountedCount === rkCount) {
                        mountBtn.innerText = "\uD83D\uDC63";
                        mountBtn.title = "Dismount (Click to return horse to stable)";
                    } else {
                        mountBtn.innerText = "\uD83D\uDC0E";
                        mountBtn.title = "Mount (Requires 10s and available horse)";
                    }
                } else {
                    mountBtn.style.display = "none";
                }
            }
        } else {
            aggroControls.style.display = "none";
        }
    }
        if (zzzControls && zzzBtn) {
        if (selectedEntities.length > 0 && selectedEntities[0].faction === "red" && selectedEntities[0].type !== "peasant" && selectedEntities[0].type !== "soldier" && selectedEntities[0].type !== "king" && !selectedEntities[0].type.startsWith("siege_") && selectedEntities[0].type !== "logistics_wagon") {
            // Exclude keeps, wall columns, gatehouses, barracks
            const excludeTypes = ["keep", "wall_column", "gatehouse", "barracks"];
            let hasValidBuilding = false;
            let zzzOnCount = 0;
            let zzzOffCount = 0;
            selectedEntities.forEach(ent => {
                if (!excludeTypes.includes(ent.type) && !!BUILDING_TYPES[ent.type]) {
                    hasValidBuilding = true;
                    if (ent.isZzz) zzzOnCount++;
                    else zzzOffCount++;
                }
            });
            if (hasValidBuilding) {
                zzzControls.style.display = "flex";
                if (zzzOnCount > 0 && zzzOffCount === 0) {
                    zzzBtn.innerText = "OFF";
                    zzzBtn.style.color = "#88ccff";
                } else if (zzzOffCount > 0 && zzzOnCount === 0) {
                    zzzBtn.innerText = "ON";
                    zzzBtn.style.color = "#ffffff";
                } else {
                    zzzBtn.innerText = "MIX";
                    zzzBtn.style.color = "#aaaaaa";
                }
            } else {
                zzzControls.style.display = "none";
            }
        } else {
            zzzControls.style.display = "none";
        }
    }
    // Single Details Panel
    if (selectedEntities.length === 1) {
        const hpPercent = (first.health / first.maxHealth) * 100;
        let detailsHtml = `
            <div class="health-bar-container">
                <div class="health-bar-fill" style="width: ${hpPercent}%"></div>
                <div class="health-bar-text">${first.health} / ${first.maxHealth} HP</div>
            </div>
            <div style="margin-top: 8px;">
        `;
        if (first.baseSpeed > 0) {
            if (first.sillyName) {
                detailsHtml += `<div class="stat-row" style="color: #6d4c41; font-style: italic; border-bottom: 1px solid rgba(0,0,0,0.1); margin-bottom: 5px; padding-bottom: 5px; justify-content: center; gap: 10px;">
                    <span style="font-weight:bold;">${first.sillyName}</span>
                    <span style="font-size: 0.9em;">(Born ${first.spawnTime})</span>
                </div>`;
            }
            if (first.pilots && first.pilots.length > 0) {
                detailsHtml += `<div class="stat-row" style="color: #6d4c41; font-style: italic; border-bottom: 1px solid rgba(0,0,0,0.1); margin-bottom: 5px; padding-bottom: 5px; display: flex; flex-direction: column; align-items: flex-start;">
                    <div style="font-weight:bold; margin-bottom: 2px;">Crew:</div>`;
                first.pilots.forEach(p => {
                    detailsHtml += `<div style="font-size: 0.9em; margin-left: 10px;">- ${p.sillyName} (Born ${p.spawnTime})</div>`;
                });
                detailsHtml += `</div>`;
            }
            detailsHtml += `
                <div class="stat-row"><span>Armor Value:</span><span>🛡️ ${first.armor}</span></div>
                <div class="stat-row"><span>Walk Speed:</span><span>🏃 ${first.speed.toFixed(2)}</span></div>
                <div class="stat-row"><span>Kill Count:</span><span>💀 ${first.killCount}</span></div>
            `;
            let wStats = null;
            let displayWeaponName = "None";
            if (first.weapon) {
                wStats = WEAPONS[first.weapon];
                displayWeaponName = first.weapon;
            } else if (first.type === "king" || first.type === "peasant" || first.type === "soldier") {
                wStats = { range: (first.type === "king" ? 1.3 : 0.9), dmg: (first.type === "king" ? 25 : 5), cd: 1.0, type: "melee" };
                displayWeaponName = first.type === "king" ? "Royal Sword" : "Fists / Tools";
            }
            if (wStats) {
                let dmgDisplay = wStats.dmg;
                if (first.weapon === "Mangonel") dmgDisplay += " (x10)";
                detailsHtml += `
                    <div class="stat-row"><span>Weapon:</span><span>⚔️ ${displayWeaponName}</span></div>
                    <div class="stat-row"><span>Damage:</span><span>💥 ${dmgDisplay}</span></div>
                    <div class="stat-row"><span>Attack Range:</span><span>🎯 ${wStats.range}</span></div>
                    <div class="stat-row"><span>Attack Cooldown:</span><span>⏱️ ${wStats.cd}s</span></div>
                `;
                if (wStats.prepTime > 0) {
                    detailsHtml += `<div class="stat-row"><span>Windup Time:</span><span>⏳ ${wStats.prepTime}s</span></div>`;
                }
            }
            let displayState = first.state.toUpperCase();
            if (first.type === "peasant" && first.state === "wander") displayState = "IDLE";
            detailsHtml += `<div class="stat-row"><span>Current Action:</span><span>${displayState}</span></div>`;
            if (first.payloadAmount > 0) {
                detailsHtml += `<div class="stat-row"><span>Carrying:</span><span>${first.payloadAmount} ${(first.payloadResource || "Wood").toUpperCase()}</span></div>`;
            } else if (first.intendedFetchAmount > 0 && first.state === "constructing_fetching") {
                detailsHtml += `<div class="stat-row"><span>Fetching:</span><span>${first.intendedFetchAmount} ${(first.payloadResource || "Wood").toUpperCase()}</span></div>`;
            }
            if (first.type === "peasant") {
                detailsHtml += `
                    <div style="margin-top: 15px;">
                        <button onmousedown="killEntity(${first.id})" style="width:100%; padding:8px; background: #d32f2f; color: white; border: 1px solid #b71c1c; cursor: pointer; font-weight: bold; border-radius: 4px;">SELF-DESTRUCT</button>
                    </div>
                `;
            }
        } else {
            const mat = first.material || (["wall_column", "wall_ramp", "gatehouse"].includes(first.type) ? "stone" : "wood");
            detailsHtml += `
                <div class="stat-row"><span>Armor Value:</span><span>🛡️ ${first.armor || 0}</span></div>
                <div class="stat-row"><span>Material:</span><span style="text-transform: capitalize;">${mat}</span></div>
            `;
            if (first.type === "wall_column" || first.type === "wall_ramp" || first.type === "gatehouse") {
                const isDamaged = first.originalHeight && first.blocks && first.blocks.length < first.originalHeight;
                const actualH = (first.type === "wall_column" && first.blocks) ? first.blocks.length : (first.exactHeight !== undefined ? first.exactHeight.toFixed(1) : first.height);
                detailsHtml += `
                    <div class="stat-row"><span>Wall Height:</span><span>${actualH} m${isDamaged ? ' (Damaged)' : ''}</span></div>
                `;
            }
            if (first.type === "gatehouse" || first.type === "keep") {
                const mode = first.gateMode || "AUTO";
                detailsHtml += `
                    <div style="margin-top: 10px; display: flex; gap: 5px;">
                        <button onmousedown="toggleGatehouse(${first.id}, 'AUTO')" style="flex:1; padding:5px; background: ${mode === 'AUTO' ? '#2196f3' : '#333'};">AUTO</button>
                        <button onmousedown="toggleGatehouse(${first.id}, 'OPEN')" style="flex:1; padding:5px; background: ${mode === 'OPEN' ? '#4caf50' : '#333'};">OPEN</button>
                        <button onmousedown="toggleGatehouse(${first.id}, 'CLOSED')" style="flex:1; padding:5px; background: ${mode === 'CLOSED' ? '#f44336' : '#333'};">CLOSED</button>
                    </div>
                `;
            }
            // Building local inventory display
            if (first.type === "barracks") {
                detailsHtml += `<div class="stat-row"><strong>Barracks Storage Stock:</strong></div>`;
                for (let k in first.inventory) {
                    if (first.inventory[k] > 0) {
                        detailsHtml += `<div class="stat-row"><span>${k}:</span><span>📦 ${first.inventory[k]}</span></div>`;
                    }
                }
            } else if (first.type === "mine") {
                const stock = first.storedResources || 0;
                detailsHtml += `
                    <div class="stat-row"><span>ResourceType:</span><span>⛏️ ${(first.mineResourceType || "gold").toUpperCase()}</span></div>
                    <div class="stat-row"><span>Mine Storage:</span><span>📦 ${stock} / 100</span></div>
                `;
            } else if (["poleturner", "gruntshop", "blacksmith", "fletcher", "knightarms", "tailor", "armorer", "bakery", "brewery", "carpenter", "jeweler"].includes(first.type)) {
                const activeProd = WORKSHOP_PRODS[first.type][first.activeProductIdx || 0];
                detailsHtml += `<div class="stat-row"><span>Active Crafting:</span><span>${activeProd.name.toUpperCase()}</span></div>`;
                for (let r in activeProd.cost) {
                    detailsHtml += `<div class="stat-row"><span>- Needs ${r}:</span><span>${activeProd.cost[r]}</span></div>`;
                }
            } else if (first.type === "farm") {
                const isFertile = first.isFertile;
                const cycleTime = isFertile ? 20 : 60;
                detailsHtml += `<div class="stat-row"><span>Class:</span><span>Food Farm</span></div>`;
                detailsHtml += `<div class="stat-row"><span>Ground:</span><span style="color: ${isFertile ? '#4caf50' : '#ffa500'}">${isFertile ? 'Fertile' : 'Barren'}</span></div>`;
                detailsHtml += `<div class="stat-row"><span>Production:</span><span>20 Food / ${cycleTime}s</span></div>`;
            } else if (first.type === "house" || first.type === "keep") {
                const usedPop = entities.filter(e => e.homeBuilding === first && e.state !== "dead").length;
                const cap = BUILDING_TYPES[first.type].peasantCap;
                detailsHtml += `<div class="stat-row"><span>Population:</span><span>${usedPop} / ${cap}</span></div>`;
                if (first.spawnedPeasants && first.spawnedPeasants.length > 0) {
                    detailsHtml += `<div style="margin-top: 10px; border-top: 1px solid rgba(0,0,0,0.2); padding-top: 5px;"><strong>Living Residents:</strong></div>`;
                    first.spawnedPeasants.forEach(p => {
                        let state = p.state.toUpperCase();
                        if (p.type !== "peasant") state = "MILITARY (" + p.type.toUpperCase() + ")";
                        else if (p.state === "shop_worker") state = "WORKING IN SHOP";
                        else if (p.state === "wander") state = "IDLE";
                        detailsHtml += `<div class="stat-row"><span>${p.sillyName || "Resident"}:</span><span style="font-size: 0.8em; color: #388e3c; text-align: right;">Born ${p.spawnTime}<br>${state}</span></div>`;
                    });
                }
                if (first.deadPeasants && first.deadPeasants.length > 0) {
                    detailsHtml += `<div style="margin-top: 10px; border-top: 1px solid rgba(0,0,0,0.2); padding-top: 5px;"><strong>Graveyard:</strong></div>`;
                    first.deadPeasants.forEach(p => {
                        detailsHtml += `<div class="stat-row"><span style="text-decoration: line-through; color: #757575;">${p.name}:</span><span style="font-size: 0.8em; color: #d32f2f; text-align: right;">RIP ${p.died}<br>(${p.killerName})</span></div>`;
                    });
                }
            } else if (first.type === "stables") {
                const horsesMade = first.inventory && first.inventory.horse ? first.inventory.horse : 0;
                detailsHtml += `<div class="stat-row"><span>Horses Made:</span><span>${horsesMade} / 5</span></div>`;
                const stats = getHorseStats(first.faction);
                detailsHtml += `<div class="stat-row"><span>Global Horses Used:</span><span>${stats.used} / ${stats.cap}</span></div>`;
            } else if (first.type === "woodcutter") {
                const logs = first.logsCount || 0;
                detailsHtml += `<div class=\"stat-row\"><span>Stored Logs:</span><span>\uD83E\uDEB5 ${logs}</span></div>`;
            } else if (first.type === "loadhouse") {
                detailsHtml += `<div class="stat-row"><strong>Loadhouse Storage:</strong></div>`;
                if (first.storage) {
                    for (let k in first.storage) {
                        if (first.storage[k] > 0) {
                            detailsHtml += `<div class="stat-row"><span>${k.toUpperCase()}:</span><span>${first.storage[k]}</span></div>`;
                        }
                    }
                }
                if (first.hasHorse && first.wagon) {
                    detailsHtml += `<div class="stat-row"><strong>Wagon Storage:</strong></div>`;
                    for (let k in first.wagon) {
                        if (first.wagon[k] > 0) {
                            detailsHtml += `<div class="stat-row"><span>${k.toUpperCase()}:</span><span>${first.wagon[k]}</span></div>`;
                        }
                    }
                }
                const horseBtnColor = (first.wantsHorse !== false) ? '#4caf50' : '#f44336';
                const horseBtnText = (first.wantsHorse !== false) ? 'ON' : 'OFF';
                detailsHtml += `
                    <div style="margin-top: 10px; display: flex; align-items: center; justify-content: space-between;">
                        <span style="font-size: 14px; font-weight: bold; color: #3e2723;">Use Horse:</span>
                        <button onmousedown="toggleLoadhouseHorse(${first.id})" class="wood-btn-gold" style="padding: 4px 8px; flex: 0 0 auto; background: ${horseBtnColor}; color: white; border: 1px solid #2e1d15;">${horseBtnText}</button>
                    </div>
                `;
            }
            if (!first.isPlanned && !["keep", "house", "wall_column", "wall_ramp", "gatehouse", "tower", "barracks", "siegeshop"].includes(first.type)) {
                const workers = entities.filter(e => e.workerBuilding === first && e.state !== "dead");
                if (workers.length > 0) {
                    detailsHtml += `<div style="margin-top: 10px; border-top: 1px solid rgba(0,0,0,0.2); padding-top: 5px;"><strong>Assigned Workers:</strong></div>`;
                    workers.forEach(w => {
                        let displayState = w.state.toUpperCase();
                        if (w.state === "shop_worker") displayState = "WORKING IN SHOP";
                        detailsHtml += `<div class="stat-row"><span>${w.sillyName || "Worker"}:</span><span style="font-size: 0.85em; color: #5d4037;">${displayState}</span></div>`;
                    });
                } else {
                    detailsHtml += `<div style="margin-top: 10px; border-top: 1px solid rgba(0,0,0,0.2); padding-top: 5px; color: #d32f2f; font-weight: bold; font-style: italic;">Seeking Worker...</div>`;
                }
            }
        }
        if (first.isPlanned && first.faction === "red") {
            detailsHtml += `
                <div style="margin-top:10px;">
                    <button class="wood-btn-gold" style="background:#b71c1c; color:white; border-color:#5d4037;" onmousedown="cancelPlannedBuilding(${first.id})">Cancel Construction</button>
                </div>
            `;
        }
        if (first.type !== "peasant" && !BUILDING_TYPES[first.type] && first.faction === "red" && first.type !== "king") {
            detailsHtml += `
                <div style="margin-top: 15px; text-align: center;">
                    . . .<br>. . .<br>. . .<br>
                    <button onmousedown="disbandUnit(${first.id})" style="width:100%; padding:8px; background: #d32f2f; color: white; border: 1px solid #b71c1c; cursor: pointer; font-weight: bold; border-radius: 4px;">DISBAND</button>
                </div>
            `;
        }
        detailsHtml += `</div>`;
        const selDet = document.getElementById("selection-details");
        if (selDet) selDet.innerHTML = detailsHtml;
    } else {
        // Multi selection stats
        let avgHp = 0;
        let avgMaxHp = 0;
        selectedEntities.forEach(ent => {
            avgHp += ent.health;
            avgMaxHp += ent.maxHealth;
        });
        avgHp = Math.round(avgHp / selectedEntities.length);
        avgMaxHp = Math.round(avgMaxHp / selectedEntities.length);
        const hpPercent = (avgHp / avgMaxHp) * 100;
        const selDet2 = document.getElementById("selection-details");
        if (selDet2) {
            let breakdownHtml = `<div style="margin-top: 10px; font-weight: bold;">Unit Breakdown:</div>`;
            let typeCounts = {};
            let hasDisbandable = false;
            selectedEntities.forEach(ent => {
                let w = ent.weapon || (ent.type === "peasant" ? "Peasant" : (ent.type === "king" ? "King" : ent.type));
                if (w === "siege_shield") w = "Shield";
                if (w === "siege_ballista") w = "Ballista";
                if (w === "siege_catapult") w = "Catapult";
                if (w === "siege_trebuchet") w = "Trebuchet";
                if (!typeCounts[w]) typeCounts[w] = 0;
                typeCounts[w]++;
                if (ent.faction === "red" && ent.type !== "peasant" && ent.type !== "king" && !BUILDING_TYPES[ent.type]) {
                    hasDisbandable = true;
                }
            });
            for (let t in typeCounts) {
                breakdownHtml += `<div class="stat-row"><span>${t}:</span><span>${typeCounts[t]}</span></div>`;
            }

            let disbandHtml = "";
            if (hasDisbandable) {
                disbandHtml = `
                    <div style="margin-top: 15px; text-align: center;">
                        . . .<br>. . .<br>. . .<br>
                        <button onmousedown="disbandSelectedUnits()" style="width:100%; padding:8px; background: #d32f2f; color: white; border: 1px solid #b71c1c; cursor: pointer; font-weight: bold; border-radius: 4px;">DISBAND ALL</button>
                    </div>
                `;
            }

            selDet2.innerHTML = `
                <div class="health-bar-container">
                    <div class="health-bar-fill" style="width: ${hpPercent}%"></div>
                    <div class="health-bar-text">Avg HP: ${avgHp} / ${avgMaxHp}</div>
                </div>
                <div style="margin-top: 10px;">
                    <div class="stat-row"><span>Selected Units:</span><span>👥 ${selectedEntities.length}</span></div>
                </div>
                ${breakdownHtml}
                ${disbandHtml}
            `;
        }
    }
}
function showStatusLog(message, type = "normal") {
    const el = document.getElementById("game-status-text");
    if (!el) return;
    el.innerText = message;
    el.className = "";
    el.classList.add(type === "warning" ? "status-warning" : "status-normal");
}
window.filterSelectionByWeapon = function(e, w) {
    isFightMoveQueued = false;
    if (e && e.shiftKey) {
        selectedEntities = selectedEntities.filter(ent => {
            let entW = ent.weapon || (ent.type === "peasant" ? "Peasant" : (ent.type === "king" ? "King" : ent.type));
            if (entW === "siege_shield") entW = "Shield";
            if (entW === "siege_ballista") entW = "Ballista";
            if (entW === "siege_catapult") entW = "Catapult";
            if (entW === "siege_trebuchet") entW = "Trebuchet";
            return entW !== w;
        });
    } else {
        selectedEntities = selectedEntities.filter(ent => {
            let entW = ent.weapon || (ent.type === "peasant" ? "Peasant" : (ent.type === "king" ? "King" : ent.type));
            if (entW === "siege_shield") entW = "Shield";
            if (entW === "siege_ballista") entW = "Ballista";
            if (entW === "siege_catapult") entW = "Catapult";
            if (entW === "siege_trebuchet") entW = "Trebuchet";
            return entW === w;
        });
    }
    entities.forEach(ent => {
        if (ent.selectionRing) {
            ent.selectionRing.visible = selectedEntities.includes(ent);
        }
    });
    updateSelectionHUD();
};
window.filterSelectionByArmor = function(e, aStr) {
    isFightMoveQueued = false;
    if (e && e.shiftKey) {
        selectedEntities = selectedEntities.filter(ent => {
            let a = (ent.armors && ent.armors.length > 0) ? ent.armors.join("+") : "bare";
            if (ent.hasHorse) a += "+horse";
            return a !== aStr;
        });
    } else {
        selectedEntities = selectedEntities.filter(ent => {
            let a = (ent.armors && ent.armors.length > 0) ? ent.armors.join("+") : "bare";
            if (ent.hasHorse) a += "+horse";
            return a === aStr;
        });
    }
    entities.forEach(ent => {
        if (ent.selectionRing) {
            ent.selectionRing.visible = selectedEntities.includes(ent);
        }
    });
    updateSelectionHUD();
};
window.cancelPlannedBuilding = function(id) {
    let ent = entities.find(e => e.id === id);
    if (ent && ent.type === "tower_tile" && ent.parentId) {
        let parent = entities.find(e => e.id === ent.parentId);
        if (parent) ent = parent;
    }
    if (ent && ent.isPlanned && ent.faction === "red") {
        const base = BUILDING_TYPES[ent.type];
        triggerDeath(ent, null);
        selectedEntities = [];
        updateSelectionHUD();
        updateUI();
        showStatusLog("Construction Canceled.");
    }
}
window.undoLastBlueprint = function() {
    for (let i = entities.length - 1; i >= 0; i--) {
        const e = entities[i];
        if (e.isPlanned && e.faction === "red" && (!e.materialProvided || e.materialProvided === 0)) {
            window.cancelPlannedBuilding(e.id);
            return;
        }
    }
    showStatusLog("No untouched blueprints to undo.");
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
// --- GAME OVER LOGIC ---
function endGame(winner) {
    isGameOver = true;
    gameWinner = winner;
    const screen = document.getElementById("game-over-screen");
    const title = document.getElementById("game-over-title");
    const message = document.getElementById("game-over-message");
    screen.style.display = "flex";
    if (winner === "red") {
        title.innerText = "VICTORY!";
        title.style.color = "#2e7d32";
        message.innerText = "The enemy Blue King has fallen! Your kingdom is victorious.";
    } else {
        title.innerText = "DEFEAT!";
        title.style.color = "#d32f2f";
        message.innerText = "Your Red King has been slain. The crown falls to the enemy.";
    }
}
function restartGame() {
    entities.forEach(ent => {
        if (ent.mesh) scene.remove(ent.mesh);
    });
    projectiles.forEach(p => {
        if (p.mesh) scene.remove(p.mesh);
    });
    particleEffects.forEach(p => {
        if (p.mesh) scene.remove(p.mesh);
        if (p.parts && Array.isArray(p.parts)) {
            p.parts.forEach(part => {
                if (part && part.mesh) scene.remove(part.mesh);
            });
        }
    });
    entities.length = 0;
    projectiles.length = 0;
    particleEffects.length = 0;
    selectedEntities.length = 0;
    soldierTrainingQueue = { "red": [], "blue": [] };
    siegeTrainingQueue = { "red": [], "blue": [] };
    controlGroups = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 0: [] };
    // Reset starting inventory pool
    for (let k in startingPool) {
        startingPool[k] = 5;
    }
    isDragging = false;
    isGameOver = false;
    gameWinner = null;
    nextEntityId = 1;
    zoomFactor = 1.0;
    isFightMoveQueued = false;
    // Reset game state and timers
    isGameStarted = false;
    globalGameTime = 0;
    hardBotWaveTimer = 60.0;
    hardBotAiTimer = 10.0;
    globalFoodTimer = 20.0;
    starvationTimer = 1.0;
    cancelPlacement();
    
    // Regrow the forest
    growForest();
    buildingGridDirty = true;
    
    // Reset global settings
    window.autoTradeSettings = {};
    window.currentMarketTab = "resources";
    window.currentAutoTradeItem = null;
    window.workshopPreferences = {};
    window.armorLockState = false;
    const lockBtn = document.getElementById("btn-armor-lock");
    if (lockBtn) lockBtn.innerText = "\uD83D\uDD13";

    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "flex";
    updateUI();
    updateSelectionHUD();
}


let minimapBgCanvas = null;

function generateMinimapTerrain(w, h) {
    minimapBgCanvas = document.createElement("canvas");
    minimapBgCanvas.width = w;
    minimapBgCanvas.height = h;
    const ctx = minimapBgCanvas.getContext("2d");
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    const grass = [76, 175, 80];
    const dead = [210, 180, 140];
    const dirt = [141, 110, 99];
    const stone = [120, 144, 156];
    
    function lerp(a, b, t) { return [a[0] + (b[0]-a[0])*t, a[1] + (b[1]-a[1])*t, a[2] + (b[2]-a[2])*t]; }
    
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const worldX = (x / w) * 300 - 150;
            const worldZ = (y / h) * 300 - 150;
            
            const hL = getTerrainHeight(worldX - 1.5, worldZ);
            const hR = getTerrainHeight(worldX + 1.5, worldZ);
            const hU = getTerrainHeight(worldX, worldZ - 1.5);
            const hD = getTerrainHeight(worldX, worldZ + 1.5);
            
            let dhX = hR - hL;
            let dhZ = hD - hU;
            let ny = 3.0;
            
            let nlen = Math.sqrt(dhX*dhX + ny*ny + dhZ*dhZ);
            ny = ny / nlen;
            
            let color;
            if (ny >= 0.996) {
                color = grass;
            } else if (ny >= 0.95) {
                const t = (ny - 0.95) / (0.996 - 0.95);
                color = lerp(dead, grass, Math.pow(t, 4.0));
            } else if (ny >= 0.8) {
                const t = (ny - 0.8) / (0.95 - 0.8);
                color = lerp(dirt, dead, t);
            } else {
                const t = Math.max(0, (ny - 0.5) / (0.8 - 0.5));
                color = lerp(stone, dirt, t);
            }
            
            const idx = (y * w + x) * 4;
            data[idx] = color[0];
            data[idx+1] = color[1];
            data[idx+2] = color[2];
            data[idx+3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function drawMinimap() {
    const canvas = document.getElementById("minimap");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    
    if (!minimapBgCanvas) {
        generateMinimapTerrain(w, h);
    }
    
    ctx.drawImage(minimapBgCanvas, 0, 0);
    
    if (typeof resourceDeposits !== "undefined") {
        for (let i = 0; i < resourceDeposits.length; i++) {
            let dep = resourceDeposits[i];
            let cx = ((dep.x + 150) / 300) * w;
            let cz = ((dep.z + 150) / 300) * h;
            let r = (dep.radius / 300) * w;
            
            if (dep.type === "fertile") ctx.fillStyle = "rgba(56, 142, 60, 0.6)";
            else if (dep.type === "iron") ctx.fillStyle = "rgba(126, 87, 194, 0.8)";
            else if (dep.type === "stone") ctx.fillStyle = "rgba(120, 144, 156, 0.8)";
            else if (dep.type === "gold") ctx.fillStyle = "rgba(255, 179, 0, 0.8)";
            else ctx.fillStyle = "rgba(200, 200, 200, 0.5)";
            
            ctx.beginPath();
            ctx.arc(cx, cz, Math.max(1, r), 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < entities.length; i++) {
        let e = entities[i];
        if (e.state === "dead" || e.isPlanned) continue;
        
        let cx = ((e.x + 150) / 300) * w;
        let cz = ((e.z + 150) / 300) * h;
        
        if (e.type === "tree") {
            ctx.fillStyle = "rgba(34, 139, 34, 0.8)";
            ctx.fillRect(cx - 1, cz - 1, 2, 2);
        } else if (e.type === "peasant" || e.type === "soldier" || e.type === "king" || (e.type && e.type.startsWith("siege_"))) {
            ctx.fillStyle = e.faction === "red" ? "#ff4444" : "#4444ff";
            if (e.type === "king") ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(cx, cz, 1.2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = e.faction === "red" ? "#aa4444" : (e.faction ? "#4444aa" : "rgba(100, 100, 100, 0.8)");
            let bw = (e.dimX || 2) / 300 * w;
            let bh = (e.dimZ || 2) / 300 * h;
            ctx.fillRect(cx - bw/2, cz - bh/2, bw, bh);
        }
    }
    
    if (typeof cameraLookAt !== "undefined") {
        let camX = ((cameraLookAt.x + 150) / 300) * w;
        let camZ = ((cameraLookAt.z + 150) / 300) * h;
        
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 1;
        let viewW = (80 * (typeof zoomFactor !== "undefined" ? zoomFactor : 1.0)) / 300 * w;
        let viewH = (60 * (typeof zoomFactor !== "undefined" ? zoomFactor : 1.0)) / 300 * h;
        ctx.strokeRect(camX - viewW/2, camZ - viewH/2, viewW, viewH);
    }
}

// --- GAME LOOP ---
let lastTime = 0;
function gameLoop(timestamp) {
    if (!isGameStarted) {
        lastTime = timestamp; // Keep clock fresh so deltaTime doesn't jump
        requestAnimationFrame(gameLoop);
        return;
    }
    if (window.isPaused) {
        lastTime = timestamp;
        renderer.render(scene, camera);
        requestAnimationFrame(gameLoop);
        return;
    }
    gameFrameCount++;
    if (!lastTime) lastTime = timestamp;
    const deltaTime = Math.min((timestamp - lastTime) / 1000, 0.1);
    lastTime = timestamp;
    window.pathNodesEvaluatedThisFrame = 0;
    globalGameTime += deltaTime;
    const timerEl = document.getElementById("game-timer");
    if (timerEl) timerEl.innerText = formatGameTime(globalGameTime);
    if (window.uiNeedsUpdate) {
        forceUpdateUI();
        window.uiNeedsUpdate = false;
    }
    handleCameraMovement(deltaTime);
    if (needsPathGridUpdate) {
        updatePathGrid();
        updateRegionGrid();
        needsPathGridUpdate = false;
    }
    if (!isGameOver) {
        if (gameFrameCount % 30 === 0) handleSpawning(deltaTime * 30);
        if (gameFrameCount % 60 === 0 && window.handleAutoTrade) window.handleAutoTrade();
        if (gameFrameCount % 15 === 0) {
            if (selectedEntities.length > 0) updateSelectionHUD();
            entities.forEach(e => {
                if (e.type === "loadhouse" && e.cratesGroup) {
                    let currentStorage = 0;
                    if (e.storage) currentStorage = Object.values(e.storage).reduce((a,b)=>a+b,0);
                    const cratesToShow = Math.min(8, Math.ceil((currentStorage / 200) * 8));
                    e.cratesGroup.children.forEach((crate, idx) => {
                        crate.visible = idx < cratesToShow;
                    });
                }
            });
        }
        // Preallocated global arrays for gameLoop
        if (!window.__activeUnits) window.__activeUnits = [];
        if (!window.__combatants) window.__combatants = [];
        if (!window.__buildings) window.__buildings = [];
        if (!window.__activeShields) window.__activeShields = [];
        window.__activeUnits.length = 0;
        window.__combatants.length = 0;
        window.__buildings.length = 0;
        window.__activeShields.length = 0;
        let activeUnits = window.__activeUnits;
        let combatants = window.__combatants;
        let buildings = window.__buildings;
        let activeShields = window.__activeShields;
        entities.forEach(e => {
            if (e.state !== "dead" && e.state !== "siege_pilot") {
                if (e.type === "king" || (e.type === "soldier" && e.weapon === "RoyalKnight")) {
                    if (e.healCooldown > 0) {
                        e.healCooldown -= deltaTime;
                    } else if (e.health < (e.maxHealth || e.maxHp)) {
                        e.health += 1.0 * deltaTime;
                        if (e.health > (e.maxHealth || e.maxHp)) e.health = (e.maxHealth || e.maxHp);
                    }
                }
                if (e.type === "siege_shield") {
                    activeShields.push(e);
                }
                if (e.baseSpeed > 0) {
                    e._frameStartX = e.x;
                    e._frameStartZ = e.z;
                    e._frameStartY = e.y;
                    activeUnits.push(e);
                    // Add purely idle/military units to spatial grid
                    if (!(e.type === "peasant" && WORKER_STATES.has(e.state))) {
                        combatants.push(e);
                    }
                } else {
                    buildings.push(e);
                }
            }
        });
        entities.forEach(e => {
            if (e.type === "peasant" && e.state === "wander") {
                handlePeasantWander(e, deltaTime);
            }
        });
        if (gameDifficulty === "test") {
            runAI(deltaTime);
        } else {
            runHardModeAI(deltaTime);
        }
        if (gameFrameCount % 15 === 0) updateDefenses(deltaTime * 15);
        // --- FOOD CONSUMPTION & STARVATION ---
        globalFoodTimer -= deltaTime;
        if (globalFoodTimer <= 0) {
            globalFoodTimer = 20.0;
            const redInfantry = entities.filter(e => e.faction === "red" && e.state !== "dead" && (e.type === "peasant" || (e.type === "soldier" && !e.hasHorse)));
            const redCavalry = entities.filter(e => e.faction === "red" && e.state !== "dead" && e.type === "soldier" && e.hasHorse);
            const redSiege = entities.filter(e => e.faction === "red" && e.state !== "dead" && e.type.startsWith("siege_"));
            let siegePeasants = 0;
            redSiege.forEach(s => {
                if (s.type === "siege_shield") siegePeasants += 1;
                else if (s.type === "siege_ballista" || s.type === "siege_catapult") siegePeasants += 2;
                else if (s.type === "siege_trebuchet") siegePeasants += 3;
            });
            let needed = redInfantry.length * 1 + redCavalry.length * 2 + siegePeasants;
            let premiumConsumed = Math.min(needed, resources.premium_food);
            resources.premium_food -= premiumConsumed;
            needed -= premiumConsumed;
            if (premiumConsumed > 0) {
                resources.gold += premiumConsumed * 1;
                const keep = entities.find(e => e.type === "keep" && e.faction === "red" && e.state !== "dead");
                if (keep) {
                    spawnFloatingText("+" + premiumConsumed + " Gold", keep.x, keep.y + 4.0, keep.z, 0xffd700);
                }
            }
            let peopleCount = redInfantry.length + redCavalry.length + siegePeasants;
            let brewConsumed = Math.min(peopleCount, resources.brew || 0);
            if (brewConsumed > 0) {
                resources.brew -= brewConsumed;
                resources.gold += brewConsumed * 4;
                const keep = entities.find(e => e.type === "keep" && e.faction === "red" && e.state !== "dead");
                if (keep) {
                    spawnFloatingText("+" + (brewConsumed * 4) + " Gold (Brew)", keep.x, keep.y + 4.5, keep.z, 0xffd700);
                }
            }
            let furnConsumed = Math.min(peopleCount, resources.furniture || 0);
            if (furnConsumed > 0) {
                resources.furniture -= furnConsumed;
                resources.gold += furnConsumed * 7;
                const keep = entities.find(e => e.type === "keep" && e.faction === "red" && e.state !== "dead");
                if (keep) {
                    spawnFloatingText("+" + (furnConsumed * 7) + " Gold (Furn)", keep.x, keep.y + 5.0, keep.z, 0xffd700);
                }
            }
            let gemConsumed = Math.min(peopleCount, resources.gem || 0);
            if (gemConsumed > 0) {
                resources.gem -= gemConsumed;
                resources.gold += gemConsumed * 121;
                const keep = entities.find(e => e.type === "keep" && e.faction === "red" && e.state !== "dead");
                if (keep) {
                    spawnFloatingText("+" + (gemConsumed * 121) + " Gold (Gem)", keep.x, keep.y + 5.5, keep.z, 0x00ffff);
                }
            }
            resources.food -= needed;
            if (resources.food < 0) resources.food = 0;
        }
        starvationTimer -= deltaTime;
        if (starvationTimer <= 0) {
            starvationTimer = 1.0;
            if (resources.food <= 0 && (!resources.premium_food || resources.premium_food <= 0)) {
                let starvingGroup = entities.filter(e => e.faction === "red" && e.state !== "dead" && e.type === "peasant" && !(e.homeBuilding && e.homeBuilding.type === "keep"));
                if (starvingGroup.length === 0) {
                    starvingGroup = entities.filter(e => e.faction === "red" && e.state !== "dead" && e.type === "soldier");
                }
                if (starvingGroup.length > 0) {
                    starvingGroup.sort((a, b) => b.id - a.id); // Youngest first (highest id)
                    const numToStarve = Math.ceil(starvingGroup.length * 0.1);
                    for (let i = 0; i < numToStarve; i++) {
                        let target = starvingGroup[i];
                        if (target.state === "siege_waiting") {
                            continue; // Skip waiting peasants so they don't die invisibly at the shop
                        }
                        if (target.state === "siege_pilot") {
                            let parentSiege = entities.find(e => e.type.startsWith("siege_") && e.state !== "dead" && e.pilots && e.pilots.includes(target));
                            if (parentSiege) {
                                target = parentSiege;
                            }
                        }
                        let maxHealthForPercent = target.maxHealth || target.maxHp || (target.type && target.type.startsWith("siege_") ? 200 : 50);
                        let dmgAmount = Math.max(1, Math.floor(maxHealthForPercent * 0.10));
                        target.health -= dmgAmount;
                        spawnFloatingText("-" + dmgAmount + " Starved", target.x, target.y + (target.height || 1) + 0.5, target.z, 0xff0000);
                        if (target.health <= 0 && target.state !== "dead") {
                            triggerDeath(target, null);
                        }
                    }
                }
            }
            // Homelessness Logic
            let homeless = entities.filter(e =>
                (e.type === "peasant" || e.type === "soldier" || e.state === "siege_pilot") &&
                e.state !== "dead" &&
                (!e.homeBuilding || e.homeBuilding.state === "dead")
            );
            homeless.sort((a, b) => a.id - b.id);
            let homes = entities.filter(e =>
                (e.type === "keep" || e.type === "house") &&
                e.state !== "dead" && !e.isPlanned
            );
            for (let pop of homeless) {
                let viableHomes = homes.filter(h => h.faction === pop.faction && (h.spawnedPeasants ? h.spawnedPeasants.filter(p=>!p.isDead).length : 0) < BUILDING_TYPES[h.type].peasantCap);
                if (viableHomes.length > 0) {
                    viableHomes.sort((a, b) => a.id - b.id);
                    let newHome = viableHomes[0];
                    if (pop.homeBuilding && pop.homeBuilding.spawnedPeasants) {
                        pop.homeBuilding.spawnedPeasants = pop.homeBuilding.spawnedPeasants.filter(p => p !== pop);
                    }
                    pop.homeBuilding = newHome;
                    if (!newHome.spawnedPeasants) newHome.spawnedPeasants = [];
                    newHome.spawnedPeasants.push(pop);
                } else {
                    if (pop.faction === "red") {
                        let drawEntity = pop;
                        if (pop.state === "siege_pilot") {
                            let parentSiege = entities.find(e => e.type.startsWith("siege_") && e.state !== "dead" && e.pilots && e.pilots.includes(pop));
                            if (parentSiege) drawEntity = parentSiege;
                        }
                        if (resources.gold > 0) {
                            resources.gold -= 1;
                            if (drawEntity.mesh && drawEntity.mesh.visible) {
                                spawnFloatingText("-1 Gold (Homeless)", drawEntity.x, drawEntity.y + (drawEntity.height || 1) + 0.5, drawEntity.z, 0xff0000);
                            }
                        } else {
                            let dmg = Math.max(1, Math.floor((drawEntity.maxHealth || drawEntity.maxHp || 50) * 0.10));
                            drawEntity.health -= dmg;
                            if (drawEntity.mesh && drawEntity.mesh.visible) {
                                spawnFloatingText("-" + dmg + " Homeless HP", drawEntity.x, drawEntity.y + (drawEntity.height || 1) + 0.5, drawEntity.z, 0xff0000);
                            }
                            if (drawEntity.health <= 0 && drawEntity.state !== "dead") {
                                triggerDeath(drawEntity, null);
                            }
                        }
                    }
                }
            }
        }
        // Economy Harvesting & Workshop loops
        updateEconomyWorkers(deltaTime, activeUnits, buildings);
        handleMovementAndCollisions(deltaTime, activeUnits, buildings);
        handleCombat(deltaTime, combatants);
        updateProjectiles(deltaTime, activeShields);
        // Update move markers
        const movePos = [];
        const moveCol = [];
        activeUnits.forEach(unit => {
            if (unit.faction === "red") {
                if (unit.targetPosition && !unit.targetEntity) {
                    if (unit.state === "moving" || unit.state === "fightmove" || unit.state === "attack_ground") {
                        const x = unit.targetPosition.x;
                        const y = unit.targetPosition.y + 0.1;
                        const z = unit.targetPosition.z;
                        const isAttack = (unit.state === "fightmove" || unit.state === "attack_ground");
                        const r = isAttack ? 1 : 0;
                        const g = isAttack ? 0 : 1;
                        const b = 0;
                        const s = 0.2;
                        movePos.push(x - s, y, z - s, x + s, y, z + s);
                        moveCol.push(r, g, b, r, g, b);
                        movePos.push(x - s, y, z + s, x + s, y, z - s);
                        moveCol.push(r, g, b, r, g, b);
                    }
                }
                if (unit.commandQueue) {
                    unit.commandQueue.forEach(cmd => {
                        if (cmd.targetPosition && !cmd.targetEntity && (cmd.state === "moving" || cmd.state === "fightmove" || cmd.state === "attack_ground")) {
                            const x = cmd.targetPosition.x;
                            const y = cmd.targetPosition.y + 0.1;
                            const z = cmd.targetPosition.z;
                            const isAttack = (cmd.state === "fightmove" || cmd.state === "attack_ground");
                            const r = isAttack ? 0.5 : 0;
                            const g = 0;
                            const b = isAttack ? 0.5 : 1; // Purple for queued attack, Blue for queued move
                            const s = 0.15; // Slightly smaller for queued
                            movePos.push(x - s, y, z - s, x + s, y, z + s);
                            moveCol.push(r, g, b, r, g, b);
                            movePos.push(x - s, y, z + s, x + s, y, z - s);
                            moveCol.push(r, g, b, r, g, b);
                        }
                    });
                }
            }
        });
        if (moveMarkersLine) {
            moveMarkersLine.geometry.setAttribute('position', new THREE.Float32BufferAttribute(movePos, 3));
            moveMarkersLine.geometry.setAttribute('color', new THREE.Float32BufferAttribute(moveCol, 3));
        }
        const rangePos = [];
        const rangeCol = [];
        if (isFightMoveQueued || attackGroundMode) {
            const numSegments = 32;
            selectedEntities.forEach(ent => {
                if (ent.faction === "red" && ent.state !== "dead" && (ent.baseSpeed > 0 || ent.type === "peasant")) {
                    const wStats = ent.weapon ? WEAPONS[ent.weapon] : { range: 0.9 };
                    const r = wStats.range;
                    if (r > 0) {
                        const cx = ent.x;
                        const cy = ent.y + 0.15; // slightly above ground
                        const cz = ent.z;
                        let prevX = cx + r * Math.cos(0);
                        let prevZ = cz + r * Math.sin(0);
                        for (let i = 1; i <= numSegments; i++) {
                            const theta = (i / numSegments) * Math.PI * 2;
                            const nextX = cx + r * Math.cos(theta);
                            const nextZ = cz + r * Math.sin(theta);
                            rangePos.push(prevX, cy, prevZ, nextX, cy, nextZ);
                            rangeCol.push(1, 0, 0, 1, 0, 0); // fine red line
                            prevX = nextX;
                            prevZ = nextZ;
                        }
                    }
                }
            });
        }
        if (rangeMarkersLine) {
            rangeMarkersLine.geometry.setAttribute('position', new THREE.Float32BufferAttribute(rangePos, 3));
            rangeMarkersLine.geometry.setAttribute('color', new THREE.Float32BufferAttribute(rangeCol, 3));
        }
    }
    // Cleanup dead entities deferred to end of frame
    for (let i = entities.length - 1; i >= 0; i--) {
        if (entities[i].isDead) {
            entities.splice(i, 1);
        }
    }
    // Spy Disguise Mechanic
    const activeUnits = entities.filter(e => e.type === "soldier" || e.type === "peasant" || e.type === "king" || (e.type && e.type.startsWith("siege_")));
    entities.forEach(unit => {
        if (unit.weapon === "Spy" && unit.state !== "dead") {
            if (unit.disguiseTimer > 0) {
                unit.disguiseTimer -= deltaTime;
                if (unit.disguiseTimer <= 0) {
                    unit.isDisguised = true;
                }
            }
            // Check collisions to break disguise
            if (unit.isDisguised) {
                for (let i = 0; i < activeUnits.length; i++) {
                    const other = activeUnits[i];
                    if (other.state === "dead" || other === unit || other.faction === unit.faction) continue;
                    const dist = Math.hypot(unit.x - other.x, unit.z - other.z);
                    if (dist < (unit.radius || 0.5) + (other.radius || 0.5) + 0.1) {
                        unit.isDisguised = false;
                        unit.disguiseTimer = 10;
                        break;
                    }
                }
            }
            // Update mesh colors
            if (unit.mesh) {
                const body = unit.mesh.children.find(c => c.name === "spyBody");
                if (body) {
                    if (unit.isDisguised) {
                        body.material.color.setHex(unit.faction === "red" ? 0x800080 : 0xffffff);
                    } else {
                        body.material.color.setHex(0x222222);
                    }
                }
            }
        }
        // Assassin Stealth Mechanic
        if (unit.weapon === "Assassin" && unit.state !== "dead") {
            let minEnemyDist = Infinity;
            for (let i = 0; i < activeUnits.length; i++) {
                const other = activeUnits[i];
                if (other.state === "dead" || other === unit || other.faction === unit.faction) continue;
                const dist = Math.hypot(unit.x - other.x, unit.z - other.z);
                if (dist < minEnemyDist) minEnemyDist = dist;
            }
            let bodyOpacity = 1.0;
            let maskOpacity = 1.0;
            let isVisible = true;
            let hasMask = (unit.killCount > 0);
            
            if (unit.faction === "blue") {
                // Enemy assassin fading in for player
                if (hasMask) {
                    if (minEnemyDist > 16.0) {
                        bodyOpacity = 0.0;
                        maskOpacity = 0.0;
                        isVisible = false;
                    } else if (minEnemyDist > 10.0) {
                        bodyOpacity = 0.0;
                        maskOpacity = 1.0 - ((minEnemyDist - 10.0) / 6.0) * 0.9;
                    } else if (minEnemyDist > 5.0) {
                        bodyOpacity = 1.0 - ((minEnemyDist - 5.0) / 5.0) * 0.9;
                        maskOpacity = 1.0;
                    } else {
                        bodyOpacity = 1.0;
                        maskOpacity = 1.0;
                    }
                } else {
                    if (minEnemyDist > 16.0) {
                        bodyOpacity = 0.0;
                        isVisible = false;
                    } else if (minEnemyDist <= 10.0) {
                        bodyOpacity = 1.0;
                    } else {
                        bodyOpacity = 1.0 - ((minEnemyDist - 10.0) / 6.0) * 0.9;
                    }
                    maskOpacity = bodyOpacity;
                }
            } else {
                // Player's own assassin
                bodyOpacity = minEnemyDist <= 15.0 ? 1.0 : 0.6;
                maskOpacity = bodyOpacity;
            }
            if (unit.mesh) {
                unit.mesh.visible = isVisible;
                unit.mesh.traverse(c => {
                    if (c.isMesh && c.material) {
                        let isMaskPart = false;
                        let p = c;
                        while (p) {
                            if (p.name === "assassinMask") { isMaskPart = true; break; }
                            p = p.parent;
                        }
                        if (isMaskPart || c.name.startsWith("assassin")) {
                            c.material.opacity = isMaskPart ? maskOpacity : bodyOpacity;
                            c.material.transparent = true;
                            c.material.needsUpdate = true;
                        }
                    }
                });
            }
        }
    });
    updateParticles(deltaTime);
    if (gameFrameCount % 5 === 0) drawMinimap();
    renderer.render(scene, camera);
    requestAnimationFrame(gameLoop);
}
// Deal Damage
function dealDamage(attacker, victim, amount) {
    if (!victim || victim.state === "dead" || victim.isGroundTarget) return;

    if (victim.type === "tower_tile" && victim.parentId) {
        let parentTower = entities.find(e => e.id === victim.parentId);
        if (parentTower && parentTower.state !== "dead") {
            victim = parentTower;
        } else {
            return;
        }
    }

    if (attacker && attacker.weapon) {
        const wStats = WEAPONS[attacker.weapon];
        const isStone = (victim.material === "stone" || victim.type === "keep" || victim.type === "wall_column" || victim.type === "gatehouse" || victim.type === "wall_ramp");
        const isBuilding = (victim.maxHp !== undefined && victim.type !== "soldier" && victim.type !== "peasant" && victim.type !== "king");
        if (isStone && wStats && (wStats.type === "bow" || wStats.type === "crossbow")) {
            amount = 0;
        }
        if (attacker.weapon === "Assassin" && isBuilding) {
            amount = 10;
        }
        // Break attacker disguise
        if (attacker.weapon === "Spy") {
            attacker.isDisguised = false;
            attacker.disguiseTimer = 10;
        }
    }
    // Break victim disguise
    if (victim.weapon === "Spy") {
        victim.isDisguised = false;
        victim.disguiseTimer = 10;
    }
    // Spy Sabotage
    if (attacker && attacker.weapon === "Spy" && victim.maxHp && victim.type !== "soldier" && victim.type !== "peasant" && victim.type !== "king") {
        if (!victim.isZzz) {
            victim.isZzz = true;
            if (window.applyZzzTint) window.applyZzzTint(victim, true);
            const activePeasants = entities.filter(e => e.type === "peasant");
            activePeasants.forEach(p => {
                if (p.workerBuilding === victim) {
                    p.workerBuilding = null;
                    p.state = "wander";
                    p.targetPosition = null;
                    p.path = null;
                }
            });
        }
    }
    const finalDamage = Math.max(amount - victim.armor, 0);
    victim.health = Math.max(victim.health - finalDamage, 0);
    if (finalDamage > 0) victim.healCooldown = 10.0;
    spawnFloatingText("-" + finalDamage + " HP", victim.x, victim.y + (victim.height || 1) + 0.5, victim.z, attacker.faction === "red" ? 0xd32f2f : 0x1976d2);
    if (victim.type === "wall_column" && victim.blocks) {
        const expectedBlocks = Math.ceil(victim.health / 100);
        if (expectedBlocks < victim.blocks.length && expectedBlocks > 0) {
            victim.blocks.length = expectedBlocks;
            victim.height = expectedBlocks;
            scene.remove(victim.mesh);
            disposeHierarchy(victim.mesh);
            victim.mesh = buildEntityMesh(victim);
            victim.mesh.position.set(victim.x, victim.y, victim.z);
            scene.add(victim.mesh);
        }
    }
    if (victim.health <= 0) {
        triggerDeath(victim, attacker);
    }
    if (selectedEntities.includes(victim) || selectedEntities.includes(attacker)) {
        updateSelectionHUD();
    }
}
window.killEntity = function(id) {
    const e = entities.find(x => x.id === id);
    if (e) {
        triggerDeath(e, null);
        updateUI();
    }
};
// Death Trigger
function triggerDeath(victim, killer) {
    if (victim.state === "dead") return;
    victim.state = "dead";
    refundBlueprintResources(victim);
    victim.isDead = true;
    if (victim.pilots) {
        victim.pilots.forEach(p => triggerDeath(p, killer));
    }
    if (victim.type === "tower" && victim.childTiles) {
        victim.childTiles.forEach(tileId => {
            let tile = entities.find(e => e.id === tileId);
            if (tile && tile.state !== "dead") triggerDeath(tile, killer);
        });
    }
    if (victim.baseSpeed === 0) {
        buildingGridDirty = true;
        // Free any workers assigned to this destroyed building to prevent them from becoming stuck in zombie states
        entities.forEach(e => {
            if (e.type === "peasant" && e.workerBuilding === victim) {
                e.workerBuilding = null;
                if (e.payloadAmount > 0) {
                    e.state = "returning_payload";
                    const keep = entities.find(k => k.type === "keep" && k.faction === e.faction && k.state !== "dead" && !k.isPlanned);
                    if (keep) {
                        e.targetBuilding = keep;
                        e.targetPosition = new THREE.Vector3(keep.x, getTerrainHeight(keep.x, keep.z), keep.z);
                    } else {
                        e.state = "wander";
                        e.payloadAmount = 0;
                    }
                } else {
                    e.state = "wander";
                    e.intendedFetchAmount = 0;
                }
                e.path = null;
            }
        });
    }
    if (killer) {
        killer.killCount++;
        if (killer.weapon === "Assassin" && killer.mesh) {
            const mask = killer.mesh.getObjectByName("assassinMask");
            if (mask) mask.visible = true;
        }
    }
    if (victim.type === "tree" && killer && killer.type === "king") {
        resources.wood += 20;
        spawnFloatingText("+20 Wood", victim.x, victim.y + 2.0, victim.z, 0x00ff00);
        window.uiNeedsUpdate = true;
    }
    selectedEntities = selectedEntities.filter(e => e !== victim);
    spawnDeathSplatter(victim.x, victim.y, victim.z, victim.radius);
    needsPathGridUpdate = true;
    scene.remove(victim.mesh);
    disposeHierarchy(victim.mesh);
    const index = entities.indexOf(victim);
    if (index > -1) {
        // entities.splice(index, 1); // Deferred to end of frame to prevent iteration crashes
    }
    if (victim.type === "king") {
        endGame(victim.faction === "red" ? "blue" : "red");
    }
    if (victim.homeBuilding) {
        victim.homeBuilding.spawnedPeasants = victim.homeBuilding.spawnedPeasants.filter(p => p !== victim);
        victim.homeBuilding.deadPeasants = victim.homeBuilding.deadPeasants || [];
        victim.homeBuilding.deadPeasants.push({
            name: victim.sillyName || victim.type,
            born: victim.spawnTime,
            died: formatGameTime(globalGameTime),
            killerName: killer ? (killer.sillyName || killer.type) : "Unknown Causes"
        });
    }
    if (victim.faction) {
        showStatusLog(victim.type.toUpperCase() + " (" + victim.faction.toUpperCase() + ") was slain!");
    } else {
        showStatusLog((victim.type || "Entity").toUpperCase() + " was destroyed!");
    }
        updateUI();
}
// Particles
function spawnSmoke(x, y, z) {
    const geo = new THREE.SphereGeometry(0.2, 4, 4);
    const mat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.8 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x + (Math.random() - 0.5) * 0.2, y, z + (Math.random() - 0.5) * 0.2);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(mesh);
    particleEffects.push({
        type: "smoke",
        mesh: mesh,
        vx: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        life: 2.0 + Math.random(),
        maxLife: 3.0
    });
}
function spawnAssassinSmoke(unit, x, y, z) {
    if (!unit || !unit.mesh) return;
    const afterimage = unit.mesh.clone();
    
    const rings = [];
    afterimage.traverse(child => {
        if (child.isMesh && child.geometry && child.geometry.type === 'RingGeometry') rings.push(child);
    });
    rings.forEach(r => {
        if (r.parent) r.parent.remove(r);
    });

    const blackMat = new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.85 });
    afterimage.traverse(child => {
        if (child.isMesh) {
            child.material = blackMat;
        }
    });
    afterimage.position.set(x, y, z);
    scene.add(afterimage);
    particleEffects.push({
        type: "afterimage", // Uses custom fading logic for group meshes
        mesh: afterimage,
        vx: 0,
        vz: 0,
        life: 1.5,
        maxLife: 1.5
    });
}
function spawnFloatingText(text, x, y, z, colorHex) {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    ctx.font = "bold 20px Outfit";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;
    ctx.strokeText(text, 10, 24);
    ctx.fillText(text, 10, 24);
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);
    sprite.position.set(x, y, z);
    sprite.scale.set(2, 0.5, 1);
    scene.add(sprite);
    particleEffects.push({
        mesh: sprite,
        type: "float",
        x: x,
        y: y,
        z: z,
        life: 1.0,
        maxLife: 1.0
    });
}
function spawnSlashEffect(x, y, z) {
    const geometry = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const count = 6;
    const parts = [];
    for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        scene.add(mesh);
        parts.push({
            mesh: mesh,
            vx: (Math.random() - 0.5) * 4.0,
            vy: (Math.random()) * 5.0,
            vz: (Math.random() - 0.5) * 4.0
        });
    }
    particleEffects.push({
        type: "burst",
        parts: parts,
        life: 0.4,
        maxLife: 0.4
    });
}
function spawnDeathSplatter(x, y, z, radius) {
    const geometry = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const material = new THREE.MeshBasicMaterial({ color: 0x4e342e });
    const count = 10;
    const parts = [];
    for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x + (Math.random() - 0.5) * radius, y + 0.3, z + (Math.random() - 0.5) * radius);
        scene.add(mesh);
        parts.push({
            mesh: mesh,
            vx: (Math.random() - 0.5) * 3,
            vy: 2 + Math.random() * 4,
            vz: (Math.random() - 0.5) * 3
        });
    }
    particleEffects.push({
        type: "burst",
        parts: parts,
        life: 0.8,
        maxLife: 0.8
    });
}
function updateParticles(deltaTime) {
    for (let i = particleEffects.length - 1; i >= 0; i--) {
        const p = particleEffects[i];
        p.life -= deltaTime;
        if (p.life <= 0) {
            if (p.type === "float" || p.type === "smoke" || p.type === "afterimage") {
                scene.remove(p.mesh);
                disposeHierarchy(p.mesh);
            } else if (p.type === "burst") {
                p.parts.forEach(part => { scene.remove(part.mesh); disposeHierarchy(part.mesh); });
            }
            particleEffects.splice(i, 1);
        } else {
            if (p.type === "float") {
                p.y += deltaTime * 1.5;
                p.mesh.position.y = p.y;
                p.mesh.material.opacity = p.life / p.maxLife;
            } else if (p.type === "afterimage") {
                p.mesh.position.y += deltaTime * 1.0;
                const opacity = (p.life / p.maxLife) * 0.85;
                p.mesh.traverse(child => {
                    if (child.isMesh && child.material) {
                        child.material.opacity = opacity;
                    }
                });
            } else if (p.type === "smoke") {
                p.mesh.position.y += deltaTime * 2.0;
                p.mesh.position.x += p.vx * deltaTime;
                p.mesh.position.z += p.vz * deltaTime;
                p.mesh.scale.addScalar(deltaTime * 1.5);
                p.mesh.rotation.y += deltaTime;
                p.mesh.rotation.x += deltaTime * 0.5;
                p.mesh.material.opacity = (p.life / p.maxLife) * 0.8;
            } else if (p.type === "burst") {
                p.parts.forEach(part => {
                    part.mesh.position.x += part.vx * deltaTime;
                    part.mesh.position.y += part.vy * deltaTime;
                    part.mesh.position.z += part.vz * deltaTime;
                    part.vy -= 9.8 * deltaTime;
                    const floor = getTerrainHeight(part.mesh.position.x, part.mesh.position.z);
                    if (part.mesh.position.y < floor) {
                        part.mesh.position.y = floor;
                        part.vx *= 0.5;
                        part.vz *= 0.5;
                    }
                });
            }
        }
    }
}
window.currentMarketTab = "resources";
window.setMarketTab = function(tab) {
    window.currentAutoTradeItem = null;
    window.currentMarketTab = tab;
    const tabs = ["resources", "luxuries", "weapons", "armor"];
    tabs.forEach(t => {
        const el = document.getElementById(`tab-market-${t}`);
        if (el) {
            if (t === tab) el.classList.add("active");
            else el.classList.remove("active");
        }
    });
    updateSelectionHUD();
};

window.autoTradeSettings = window.autoTradeSettings || {};
window.currentAutoTradeItem = null;

window.openAutoTradeMenu = function(res) {
    window.currentAutoTradeItem = res;
    if (!window.autoTradeSettings[res]) {
        window.autoTradeSettings[res] = { autoBuy: false, autoSell: false, buyAmount: 20, sellAmount: 21 };
    }
        updateUI();
};

window.closeAutoTradeMenu = function() {
    window.currentAutoTradeItem = null;
        updateUI();
};

window.toggleAutoTrade = function(res, type) {
    const s = window.autoTradeSettings[res];
    if (!s) return;
    if (type === 'buy') s.autoBuy = !s.autoBuy;
    if (type === 'sell') s.autoSell = !s.autoSell;
        updateUI();
    const el = document.getElementById("market-list");
    if (el) el.dataset.renderedState = "";
    if (typeof updateSelectionHUD === "function") updateSelectionHUD();
};

window.adjustAutoTradeAmount = function(event, res, type, delta) {
    const s = window.autoTradeSettings[res];
    if (!s) return;
    let mult = 1;
    if (event && event.shiftKey) mult = 10;
    if (event && event.altKey) mult = 50;
    if (type === 'buy') {
        s.buyAmount = Math.max(0, s.buyAmount + delta * mult);
        if (s.buyAmount >= s.sellAmount) s.sellAmount = s.buyAmount + 1;
    }
    if (type === 'sell') {
        s.sellAmount = Math.max(0, s.sellAmount + delta * mult);
        if (s.sellAmount <= s.buyAmount) s.buyAmount = Math.max(0, s.sellAmount - 1);
    }
        updateUI();
    const el = document.getElementById("market-list");
    if (el) el.dataset.renderedState = "";
    if (typeof updateSelectionHUD === "function") updateSelectionHUD();
};

window.handleAutoTrade = function() {
    if (!window.autoTradeSettings) return;
    const hasMarket = entities.some(e => e.faction === "red" && e.type === "market" && e.state !== "dead" && !e.isPlanned);
    if (!hasMarket) return;
    
    for (const [res, s] of Object.entries(window.autoTradeSettings)) {
        if (!s.autoBuy && !s.autoSell) continue;
        
        let available = 0;
        const isRaw = ["food", "wood", "iron", "stone", "premium_food", "brew", "furniture", "gem"].includes(res);
        if (isRaw) {
            available = resources[res] || 0;
        } else {
            let targetType = res === "horse" ? "stables" : "barracks";
            entities.forEach(e => {
                if (e.type === targetType && e.faction === "red" && e.state !== "dead" && !e.isPlanned) {
                    available += (e.inventory && e.inventory[res]) || 0;
                }
            });
        }

        if (s.autoSell && available > s.sellAmount) {
            let toSell = available - s.sellAmount;
            window.tradeMarket(null, res, "sell", toSell);
        } else if (s.autoBuy && available < s.buyAmount) {
            let toBuy = s.buyAmount - available;
            window.tradeMarket(null, res, "buy", toBuy);
        }
    }
};

window.tradeMarket = function(event, item, action, overrideMultiplier = null) {
    const marketPrices = {
        "food": { buy: 4, sell: 2 },
        "premium_food": { buy: 6, sell: 3 },
        "brew": { buy: 6, sell: 3 },
        "furniture": { buy: 12, sell: 6 },
        "gem": { buy: 240, sell: 120 },
        "wood": { buy: 2, sell: 1 },
        "iron": { buy: 6, sell: 3 },
        "stone": { buy: 4, sell: 2 },
        "Spear": { buy: 30, sell: 15 },
        "Pike": { buy: 60, sell: 30 },
        "Halberd": { buy: 150, sell: 75 },
        "Poleaxe": { buy: 300, sell: 150 },
        "Axe": { buy: 90, sell: 45 },
        "Sword": { buy: 180, sell: 90 },
        "Mace": { buy: 180, sell: 90 },
        "Short Bow": { buy: 60, sell: 30 },
        "Longbow": { buy: 90, sell: 45 },
        "Crossbow": { buy: 240, sell: 120 },
        "cloth": { buy: 60, sell: 30 },
        "leather": { buy: 120, sell: 60 },
        "chain": { buy: 90, sell: 45 },
        "plate": { buy: 180, sell: 90 }
    };
    const price = marketPrices[item];
    if (!price) return;
    let multiplier = overrideMultiplier;
    if (multiplier === null) {
        multiplier = (event && event.altKey) ? 50 : ((event && event.shiftKey) ? 10 : 1);
    }
    const isRaw = ["food", "wood", "iron", "stone", "premium_food", "brew", "furniture", "gem"].includes(item);
    if (action === "buy") {
        let maxAffordable = Math.floor(resources.gold / price.buy);
        let toBuy = Math.min(multiplier, maxAffordable);
        if (toBuy > 0) {
            resources.gold -= toBuy * price.buy;
            if (isRaw) {
                resources[item] += toBuy;
            } else {
                let targetType = item === "horse" ? "stables" : "barracks";
                let b = entities.find(e => e.type === targetType && e.faction === "red" && e.state !== "dead" && !e.isPlanned);
                if (!b) {
                    resources.gold += toBuy * price.buy; // Refund
                    showStatusLog("Need a " + (targetType === "stables" ? "Stables" : "Barracks") + " to store " + item);
                    return;
                }
                b.inventory[item] = (b.inventory[item] || 0) + toBuy;
            }
            showStatusLog(`Bought ${toBuy} ${item} for ${toBuy * price.buy}g`);
            updateUI();
        } else {
            showStatusLog("Not enough gold to buy " + item);
        }
    } else if (action === "sell") {
        let available = 0;
        if (isRaw) {
            available = resources[item];
        } else {
            let targetType = item === "horse" ? "stables" : "barracks";
            entities.forEach(e => {
                if (e.type === targetType && e.faction === "red" && e.state !== "dead" && !e.isPlanned) {
                    available += (e.inventory[item] || 0);
                }
            });
        }
        let toSell = Math.min(multiplier, available);
        if (toSell > 0) {
            if (isRaw) {
                resources[item] -= toSell;
            } else {
                let remainingToSell = toSell;
                let targetType = item === "horse" ? "stables" : "barracks";
                entities.forEach(e => {
                    if (e.type === targetType && e.faction === "red" && e.state !== "dead" && !e.isPlanned && remainingToSell > 0) {
                        let take = Math.min(e.inventory[item] || 0, remainingToSell);
                        e.inventory[item] -= take;
                        remainingToSell -= take;
                    }
                });
            }
            resources.gold += toSell * price.sell;
            showStatusLog(`Sold ${toSell} ${item} for ${toSell * price.sell}g`);
            updateUI();
        } else {
            showStatusLog("Not enough " + item + " to sell");
        }
    }
};
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 1);
} else {
    document.addEventListener("DOMContentLoaded", init);
}
// --- WALLS & DEFENSES LOGIC ---
function getWallPoints(startPt, endPt, mode) {
    const pts = [];
    const sx = Math.round(startPt.x);
    const sz = Math.round(startPt.z);
    const ex = Math.round(endPt.x);
    const ez = Math.round(endPt.z);
    const thickness = parseInt(document.getElementById("wall-thickness")?.value) || 1;
    const addPt = (x, z) => {
        if (thickness === 1) {
            pts.push({x, z});
            return;
        }
        const rad = Math.floor(thickness / 2);
        const isEven = thickness % 2 === 0;
        let shouldTrim = false;
        if (thickness >= 3) {
            if (mode === "circle" || mode === "freehand") {
                shouldTrim = true;
            } else if (mode === "line" || mode === "ramp") {
                if (sx !== ex && sz !== ez) shouldTrim = true;
            }
        }
        for(let ox = -rad; ox <= rad; ox++) {
            for(let oz = -rad; oz <= rad; oz++) {
                if(isEven && (ox === rad || oz === rad)) continue;
                // Trim the corners of the square brush for thicknesses >= 3
                // This prevents diagonal walls and circles from becoming extra thick
                if (shouldTrim) {
                    if (!isEven && Math.abs(ox) === rad && Math.abs(oz) === rad) continue;
                    if (isEven && (ox === -rad || ox === rad - 1) && (oz === -rad || oz === rad - 1)) continue;
                }
                pts.push({x: x + ox, z: z + oz});
            }
        }
    };
    if (mode === "line" || mode === "ramp") {
        const steps = Math.max(1, Math.max(Math.abs(ex - sx), Math.abs(ez - sz)));
        for (let i = 0; i <= steps; i++) {
            addPt(Math.round(sx + (ex - sx) * (i / steps)), Math.round(sz + (ez - sz) * (i / steps)));
        }
    } else if (mode === "box") {
        const minX = Math.min(sx, ex);
        const maxX = Math.max(sx, ex);
        const minZ = Math.min(sz, ez);
        const maxZ = Math.max(sz, ez);
        for (let x = minX; x <= maxX; x++) {
            addPt(x, minZ);
            addPt(x, maxZ);
        }
        for (let z = minZ + 1; z <= maxZ - 1; z++) {
            addPt(minX, z);
            addPt(maxX, z);
        }
    } else if (mode === "circle") {
        const radius = Math.round(Math.hypot(ex - sx, ez - sz));
        for (let x = sx - radius; x <= sx + radius; x++) {
            for (let z = sz - radius; z <= sz + radius; z++) {
                if (Math.abs(Math.hypot(x - sx, z - sz) - radius) <= 0.5) {
                    addPt(x, z);
                }
            }
        }
    } else if (mode === "tower") {
        const radius = Math.max(1, Math.min(5, Math.round(Math.hypot(ex - sx, ez - sz))));
        for (let x = sx - radius; x <= sx + radius; x++) {
            for (let z = sz - radius; z <= sz + radius; z++) {
                if (Math.hypot(x - sx, z - sz) <= radius + 0.3) {
                    addPt(x, z);
                }
            }
        }
    } else if (mode === "freehand") {
        if (!isDragging) {
            addPt(sx, sz);
        } else {
            for (let i = 0; i < wallFreehandPath.length - 1; i++) {
                const p1 = wallFreehandPath[i];
                const p2 = wallFreehandPath[i+1];
                const dist = Math.hypot(p2.x - p1.x, p2.z - p1.z);
                const steps = Math.max(1, Math.ceil(dist * 2));
                for (let j = 0; j <= steps; j++) {
                    addPt(Math.round(p1.x + (p2.x - p1.x) * (j / steps)), Math.round(p1.z + (p2.z - p1.z) * (j / steps)));
                }
            }
            if (wallFreehandPath.length === 1) {
                addPt(Math.round(wallFreehandPath[0].x), Math.round(wallFreehandPath[0].z));
            }
        }
    }
    const unique = [];
    const seen = new Set();
    pts.forEach(p => {
        const k = `${p.x},${p.z}`;
        if (!seen.has(k)) {
            seen.add(k);
            unique.push(p);
        }
    });
    return unique;
}
let lastGhostUpdateKey = "";
function updateWallGhosts(startPt, endPt) {
    const hVal = parseInt(document.getElementById("wall-height")?.value, 10);
    const height = isNaN(hVal) ? 3 : hVal;
    const slopeDeg = parseInt(document.getElementById("wall-slope")?.value) || 0;
    const sx = Math.round(startPt.x), sz = Math.round(startPt.z);
    const ex = Math.round(endPt.x), ez = Math.round(endPt.z);
    const materialElem = document.querySelector('input[name="wall-material"]:checked');
    const material = materialElem ? materialElem.value : "stone";
    const crenulatedElem = document.getElementById("chk-wall-crenulated");
    const doCrenulate = crenulatedElem ? crenulatedElem.checked : false;
    let key = `${wallDrawMode}_${sx}_${sz}_${ex}_${ez}_${height}_${slopeDeg}_${material}_${doCrenulate}`;
    if (wallDrawMode === "freehand") key += `_${wallFreehandPath.length}`;
    if (key === lastGhostUpdateKey && wallGhosts.length > 0) return;
    lastGhostUpdateKey = key;
    clearWallGhosts();
    if (wallDrawMode === "delete" || wallDrawMode === "delete_building") {
        const minX = Math.min(Math.round(startPt.x), Math.round(endPt.x));
        const maxX = Math.max(Math.round(startPt.x), Math.round(endPt.x));
        const minZ = Math.min(Math.round(startPt.z), Math.round(endPt.z));
        const maxZ = Math.max(Math.round(startPt.z), Math.round(endPt.z));
        const dimX = Math.max(1, maxX - minX + 1);
        const dimZ = Math.max(1, maxZ - minZ + 1);
        const mat = new THREE.MeshBasicMaterial({ color: 0xd32f2f, transparent: true, opacity: 0.5 });
        const geo = new THREE.BoxGeometry(dimX, 0.5, dimZ);
        const mesh = new THREE.Mesh(geo, mat);
        const cx = minX + dimX/2 - 0.5;
        const cz = minZ + dimZ/2 - 0.5;
        const cy = getFloorHeight({faction: "red", y:100}, cx, cz).y;
        mesh.position.set(cx, cy + 0.25, cz);
        scene.add(mesh);
        wallGhosts.push(mesh);
        return;
    }
    const pts = getWallPoints(startPt, endPt, wallDrawMode);
    const ptSet = new Set(pts.map(p => `${p.x},${p.z}`));
    pts.forEach(p => {
        const isInner = ptSet.has(`${p.x},${p.z-1}`) && ptSet.has(`${p.x},${p.z+1}`) && ptSet.has(`${p.x-1},${p.z}`) && ptSet.has(`${p.x+1},${p.z}`);
        p.isOuter = !isInner;
        p.isCren = (doCrenulate || wallDrawMode === 'tower') && p.isOuter && wallDrawMode !== 'gatehouse';
    });
    const matColor = material === "wood" ? 0xd2a679 : 0x00ff00;
    const mat = new THREE.MeshBasicMaterial({ color: matColor, transparent: true, opacity: 0.4 });
    const blockingBuildings = entities.filter(o => BUILDING_TYPES[o.type] && o.type !== "keep" && o.type !== "gatehouse" && o.type !== "wall_column" && o.type !== "wall_ramp" && o.type !== "tower");
    const gatehouses = entities.filter(o => o.type === "gatehouse" && !o.isPlanned);
    if (wallDrawMode === "gatehouse" || wallDrawMode === "tower") {
        let minX = Math.min(Math.round(startPt.x), Math.round(endPt.x));
        let maxX = Math.max(Math.round(startPt.x), Math.round(endPt.x));
        let minZ = Math.min(Math.round(startPt.z), Math.round(endPt.z));
        let maxZ = Math.max(Math.round(startPt.z), Math.round(endPt.z));
        if (wallDrawMode === "tower") {
            const radius = Math.max(1, Math.min(5, Math.round(Math.hypot(Math.round(endPt.x) - Math.round(startPt.x), Math.round(endPt.z) - Math.round(startPt.z)))));
            minX = Math.round(startPt.x) - radius;
            maxX = Math.round(startPt.x) + radius;
            minZ = Math.round(startPt.z) - radius;
            maxZ = Math.round(startPt.z) + radius;
        }
        const isBlocked = blockingBuildings.some(o => {
            const hw = (o.dimX !== undefined ? o.dimX : ((o.radius || 0.5) * 2)) / 2;
            const hd = (o.dimZ !== undefined ? o.dimZ : ((o.radius || 0.5) * 2)) / 2;
            if (o.type === "tower" && o.footprint) {
                return pts.some(p => o.footprint.some(f => Math.abs(f.x - p.x) < 0.5 && Math.abs(f.z - p.z) < 0.5));
            } else if (wallDrawMode === "tower") {
                return pts.some(p => Math.abs(o.x - p.x) < hw + 0.5 - 0.05 && Math.abs(o.z - p.z) < hd + 0.5 - 0.05);
            }
            return Math.max(minX - 0.5, o.x - hw) < Math.min(maxX + 0.5, o.x + hw) - 0.05 &&
                   Math.max(minZ - 0.5, o.z - hd) < Math.min(maxZ + 0.5, o.z + hd) - 0.05;
        });
        const allOverlaps = entities.filter(o => {
            if (!(o.type === "wall_column" || o.type === "wall_ramp" || o.type === "gatehouse" || o.type === "tower")) return false;
            if (o.type === "tower" && o.footprint) {
                return pts.some(p => o.footprint.some(f => Math.abs(f.x - p.x) < 0.5 && Math.abs(f.z - p.z) < 0.5));
            }
            return o.x >= minX - 0.5 && o.x <= maxX + 0.5 && o.z >= minZ - 0.5 && o.z <= maxZ + 0.5;
        });
        let totalCost = 0;
        const dimX = Math.max(1, maxX - minX + 1);
        const dimZ = Math.max(1, maxZ - minZ + 1);
        if (wallDrawMode === "tower") {
            totalCost = pts.length * (height + 2) * 2;
        } else {
            totalCost = dimX * height * dimZ * 2;
        }
        const ledger = getLedger("red");
        const available = material === "stone" ? ledger.stone.spendable : ledger.wood.spendable;
        let isPoor = false;
        if (isBlocked) {
            mat.color.setHex(0xff0000);
        } else if (totalCost > available) {
            mat.color.setHex(0xff8c00); // Orange
            isPoor = true;
        } else if (allOverlaps.length > 0) {
            mat.color.setHex(0xffff00);
        }
        const tooltip = document.getElementById("wall-cost-tooltip");
        if (tooltip) {
            tooltip.style.display = "block";
            tooltip.style.left = (window.mouseX + 15) + "px";
            tooltip.style.top = (window.mouseY + 15) + "px";
            tooltip.style.color = isPoor ? "#ff5252" : "white";
            tooltip.innerHTML = `Cost: ${totalCost} ${material === "stone" ? "Stone" : "Wood"}`;
        }
        if (wallDrawMode === "tower") {
            pts.forEach(p => {
                const geo = new THREE.BoxGeometry(1.0, height + 2, 1.0);
                const mesh = new THREE.Mesh(geo, mat);
                const floorData = getFloorHeight({faction: "red", y:100}, p.x, p.z);
                mesh.position.set(p.x, floorData.y + (height + 2)/2, p.z);
                scene.add(mesh);
                wallGhosts.push(mesh);
            });
            return;
        }
        const geo = new THREE.BoxGeometry(dimX, height, dimZ);
        const mesh = new THREE.Mesh(geo, mat);
        const cx = minX + dimX/2 - 0.5;
        const cz = minZ + dimZ/2 - 0.5;
        const cy = getFloorHeight({faction: "red", y:100}, cx, cz).y;
        mesh.position.set(cx, cy + height/2, cz);
        scene.add(mesh);
        wallGhosts.push(mesh);
        return;
    }
    const startRamp = { x: Math.round(startPt.x), z: Math.round(startPt.z) };
    const endRamp = { x: Math.round(endPt.x), z: Math.round(endPt.z) };
    const totalDist = Math.hypot(endRamp.x - startRamp.x, endRamp.z - startRamp.z);
    let dirX = 0, dirZ = 0;
    if (totalDist > 0) {
        dirX = (endRamp.x - startRamp.x) / totalDist;
        dirZ = (endRamp.z - startRamp.z) / totalDist;
    }
    const pivotX = startRamp.x - dirX * 0.5;
    const pivotZ = startRamp.z - dirZ * 0.5;
    let existingHeight = 0;
    const startOldWall = entities.find(o => (o.type === "wall_column" || o.type === "gatehouse") && !o.isPlanned && Math.hypot(o.x - startRamp.x, o.z - startRamp.z) < 0.5);
    if (startOldWall) {
        existingHeight = startOldWall.type === "wall_column" && startOldWall.blocks ? startOldWall.blocks.length : startOldWall.height;
    }
    const startRoofY = getTerrainHeight(startRamp.x, startRamp.z) + Math.max(height, existingHeight);
    let endExistingHeight = -1;
    const endOldWall = entities.find(o => (o.type === "wall_column" || o.type === "gatehouse") && !o.isPlanned && Math.hypot(o.x - endRamp.x, o.z - endRamp.z) < 1.5);
    if (endOldWall) {
        endExistingHeight = endOldWall.type === "wall_column" && endOldWall.blocks ? endOldWall.blocks.length : endOldWall.height;
    }
    let totalCost = pts.reduce((sum, p) => {
        let actualH = height;
        if (wallDrawMode === "ramp") {
            const relativeDist = (p.x - startRamp.x)*dirX + (p.z - startRamp.z)*dirZ;
            if (relativeDist < -0.1) {
                p.skip = true;
                return sum;
            }
            const dist = (p.x - pivotX)*dirX + (p.z - pivotZ)*dirZ;
            const dh = Math.tan(Math.abs(slopeDeg) * -1 * Math.PI / 180) * dist;
            const exactRoofY = startRoofY + dh;
            const floorY = getTerrainHeight(p.x, p.z);
            if (exactRoofY <= floorY) actualH = 0;
            else if (Math.abs(dist - totalDist) < 0.5 && endExistingHeight >= 0 && Math.abs((exactRoofY - floorY) - endExistingHeight) <= 1.0) actualH = endExistingHeight;
            else actualH = exactRoofY - floorY;
        } else if (height === 0) {
            actualH = 0;
        }
        return sum + Math.max(1, Math.round(actualH) + (p.isCren ? 1 : 0));
    }, 0);
    const ledger = getLedger("red");
    const available = material === "stone" ? ledger.stone.spendable : ledger.wood.spendable;
    let isPoor = false;
    if (totalCost > available) {
        mat.color.setHex(0xff8c00);
        isPoor = true;
    }
    const tooltip = document.getElementById("wall-cost-tooltip");
    if (tooltip) {
        tooltip.style.display = "block";
        tooltip.style.left = (window.mouseX + 15) + "px";
        tooltip.style.top = (window.mouseY + 15) + "px";
        tooltip.style.color = isPoor ? "#ff5252" : "white";
        tooltip.innerHTML = `Cost: ${totalCost} ${material === "stone" ? "Stone" : "Wood"}`;
    }
    pts.forEach(p => {
        const blockingBuilding = blockingBuildings.find(o => {
            if (o.type === "tower" && o.footprint) {
                return o.footprint.some(f => Math.abs(f.x - p.x) < 0.5 && Math.abs(f.z - p.z) < 0.5);
            }
            const hw = (o.dimX !== undefined ? o.dimX : ((o.radius || 0.5) * 2)) / 2;
            const hd = (o.dimZ !== undefined ? o.dimZ : ((o.radius || 0.5) * 2)) / 2;
            return p.x >= o.x - hw && p.x <= o.x + hw && p.z >= o.z - hd && p.z <= o.z + hd;
        });
        const blockingGatehouse = gatehouses.find(o => {
            const hw = (o.dimX !== undefined ? o.dimX : ((o.radius || 0.5) * 2)) / 2;
            const hd = (o.dimZ !== undefined ? o.dimZ : ((o.radius || 0.5) * 2)) / 2;
            return p.x >= o.x - hw && p.x <= o.x + hw && p.z >= o.z - hd && p.z <= o.z + hd;
        });
        let actualH = height;
        let isBlockRamp = false;
        let exactRoofY = startRoofY;
        let isSidewalk = false;
        if (wallDrawMode === "ramp") {
            const relativeDist = (p.x - startRamp.x)*dirX + (p.z - startRamp.z)*dirZ;
            if (relativeDist < -0.1) return;
            const dist = (p.x - pivotX)*dirX + (p.z - pivotZ)*dirZ;
            const dh = Math.tan(Math.abs(slopeDeg) * -1 * Math.PI / 180) * dist;
            exactRoofY = startRoofY + dh;
            const floorY = getTerrainHeight(p.x, p.z);
            if (exactRoofY <= floorY) {
                isSidewalk = true;
                actualH = 0;
                isBlockRamp = true;
            } else if (Math.abs(dist - totalDist) < 0.5 && endExistingHeight >= 0 && Math.abs((exactRoofY - floorY) - endExistingHeight) <= 1.0) {
                actualH = endExistingHeight;
            } else {
                actualH = exactRoofY - floorY;
                isBlockRamp = true;
            }
        } else if (height === 0) {
            isSidewalk = true;
            actualH = 0;
        }
        let geo;
        if (isSidewalk) {
            geo = new THREE.BoxGeometry(1.0, 0.2, 1.0);
            const pos = geo.attributes.position;
            const floorY = getTerrainHeight(p.x, p.z);
            for (let i = 0; i < pos.count; i++) {
                const vx = pos.getX(i);
                const vz = pos.getZ(i);
                const terrainY = getTerrainHeight(p.x + vx, p.z + vz);
                pos.setY(i, (terrainY - floorY) + (pos.getY(i) > 0 ? 0.2 : 0));
            }
            geo.computeVertexNormals();
        } else {
            let baseH = isBlockRamp ? Math.max(3.0, actualH + 2.0) : actualH;
            if (actualH === 0 && !isBlockRamp) {
                geo = new THREE.BoxGeometry(1.0, 0.2, 1.0);
            } else {
                geo = new THREE.BoxGeometry(1.05, baseH + 0.05, 1.05);
            }
            if (isBlockRamp) {
                const pos = geo.attributes.position;
                for (let i = 0; i < pos.count; i++) {
                    if (pos.getY(i) > 0) {
                        const vx = pos.getX(i);
                        const vz = pos.getZ(i);
                        const dot = vx * dirX + vz * dirZ;
                        const extraH = dot * Math.tan(Math.abs(slopeDeg) * -1 * Math.PI / 180);
                        const desiredLocalY = (actualH / 2) + extraH;
                        pos.setY(i, desiredLocalY);
                    }
                }
                geo.computeVertexNormals();
            }
        }
        const oldWall = entities.find(o => {
            if (o.isPlanned) return false;
            if (o.type === "wall_column" || o.type === "gatehouse") {
                return o.x === p.x && o.z === p.z;
            }
            if (o.type === "tower" && o.footprint) {
                return o.footprint.some(f => Math.abs(f.x - p.x) < 0.5 && Math.abs(f.z - p.z) < 0.5);
            }
            return false;
        });
        let pMat = mat;
        if (blockingBuilding || blockingGatehouse) {
            pMat = mat.clone();
            pMat.color.setHex(0xff0000);
        } else if (oldWall) {
            pMat = mat.clone();
            pMat.color.setHex(0xffff00);
        }
        let finalObj;
        if (p.isCren && !isBlockRamp && actualH > 0) {
            finalObj = new THREE.Group();
            const mesh = new THREE.Mesh(geo, pMat);
            mesh.position.y = actualH/2;
            finalObj.add(mesh);
            const crenSlope = new THREE.BoxGeometry(1.0, 0.5, 1.0);
            const pos = crenSlope.attributes.position;
            for(let i=0; i<pos.count; i++) {
                if (pos.getY(i) > 0) {
                    pos.setX(i, pos.getX(i) * 0.5);
                    pos.setZ(i, pos.getZ(i) * 0.5);
                }
            }
            crenSlope.computeVertexNormals();
            const meshSlope = new THREE.Mesh(crenSlope, pMat);
            meshSlope.position.y = actualH + 0.25;
            finalObj.add(meshSlope);
            const crenTop = new THREE.BoxGeometry(0.5, 1.0, 0.5);
            const meshTop = new THREE.Mesh(crenTop, pMat);
            meshTop.position.y = actualH + 0.5;
            finalObj.add(meshTop);
        } else {
            finalObj = new THREE.Mesh(geo, pMat);
            if (actualH === 0 && !isSidewalk) finalObj.position.y = 0;
            else finalObj.position.y = actualH/2;
        }
        if (actualH === 0 && !isSidewalk) {
            finalObj.position.set(p.x, getTerrainHeight(p.x, p.z), p.z);
        } else {
            const cy = getTerrainHeight(p.x, p.z);
            finalObj.position.x = p.x;
            finalObj.position.y += cy;
            finalObj.position.z = p.z;
        }
        const overlapWall = entities.find(o => (o.type === "wall_column" || o.type === "wall_ramp" || o.type === "gatehouse") && !o.isPlanned && o.x === p.x && o.z === p.z);
        if (overlapWall) {
            finalObj.traverse(c => {
                if (c.material) c.material.color.setHex(0xffff00);
            });
        }
        scene.add(finalObj);
        wallGhosts.push(finalObj);
    });
}
function commitWallDraw(startPt, endPt) {
    if (wallDrawMode === "delete_building" || wallDrawMode === "delete") {
        const minX = Math.min(startPt.x, endPt.x);
        const maxX = Math.max(startPt.x, endPt.x);
        const minZ = Math.min(startPt.z, endPt.z);
        const maxZ = Math.max(startPt.z, endPt.z);
        let toDelete = [];
        if (wallDrawMode === "delete") {
            toDelete = entities.filter(e =>
                e.faction === "red" && (e.type === "wall_column" || e.type === "gatehouse" || e.type === "tower") &&
                e.x >= minX - e.radius && e.x <= maxX + e.radius &&
                e.z >= minZ - e.radius && e.z <= maxZ + e.radius
            );
        } else {
            toDelete = entities.filter(e =>
                e.faction === "red" && e.baseSpeed === 0 && e.type !== "tree" && e.type !== "iron" && e.type !== "stone" && e.type !== "gold" && e.type !== "keep" &&
                e.x >= minX - e.radius && e.x <= maxX + e.radius &&
                e.z >= minZ - e.radius && e.z <= maxZ + e.radius
            );
        }
        toDelete.forEach(e => {
            if (!e.isPlanned) {
                let hpRatio = e.health / (e.maxHealth || 1);
                if (isNaN(hpRatio) || hpRatio < 0) hpRatio = 0;
                const factor = 0.5 * hpRatio;
                if (e.type === "wall_column" || e.type === "gatehouse" || e.type === "wall_ramp" || e.type === "tower") {
                    const cost = e.resourcesNeededTotal || 1;
                    const rType = e.material || "stone";
                    resources[rType] += Math.floor(cost * factor);
                } else if (BUILDING_TYPES[e.type]) {
                    let rType = e.material || ((e.type === "wall_column" || e.type === "gatehouse" || e.type === "wall_ramp" || e.type === "tower") ? "stone" : "wood");
                    resources[rType] += Math.floor((BUILDING_TYPES[e.type].cost || 0) * factor);
                    resources.gold += Math.floor((BUILDING_TYPES[e.type].goldCost || 0) * factor);
                    if (BUILDING_TYPES[e.type].ironCost) {
                        resources.iron += Math.floor((BUILDING_TYPES[e.type].ironCost || 0) * factor);
                    }
                }
            }
            triggerDeath(e, null);
        });
        updateUI();
        return;
    }
    const pts = getWallPoints(startPt, endPt, wallDrawMode);
    const materialElem = document.querySelector('input[name="wall-material"]:checked');
    const material = materialElem ? materialElem.value : "stone";
    const crenulatedElem = document.getElementById("chk-wall-crenulated");
    const doCrenulate = crenulatedElem ? crenulatedElem.checked : false;
    const ptSet = new Set(pts.map(p => `${p.x},${p.z}`));
    pts.forEach(p => {
        const isInner = ptSet.has(`${p.x},${p.z-1}`) && ptSet.has(`${p.x},${p.z+1}`) && ptSet.has(`${p.x-1},${p.z}`) && ptSet.has(`${p.x+1},${p.z}`);
        p.isOuter = !isInner;
        p.isCren = (doCrenulate || wallDrawMode === 'tower') && p.isOuter && wallDrawMode !== 'gatehouse';
    });
    // Check costs
    let totalCost = 0;
    const hVal = parseInt(document.getElementById("wall-height").value, 10);
    const height = isNaN(hVal) ? 3 : hVal;
    if (wallDrawMode === "gatehouse" || wallDrawMode === "tower") {
        let minX = Math.min(Math.round(startPt.x), Math.round(endPt.x));
        let maxX = Math.max(Math.round(startPt.x), Math.round(endPt.x));
        let minZ = Math.min(Math.round(startPt.z), Math.round(endPt.z));
        let maxZ = Math.max(Math.round(startPt.z), Math.round(endPt.z));
        if (wallDrawMode === "tower") {
            const radius = Math.max(1, Math.min(5, Math.round(Math.hypot(Math.round(endPt.x) - Math.round(startPt.x), Math.round(endPt.z) - Math.round(startPt.z)))));
            minX = Math.round(startPt.x) - radius;
            maxX = Math.round(startPt.x) + radius;
            minZ = Math.round(startPt.z) - radius;
            maxZ = Math.round(startPt.z) + radius;
        }
        const blockingBuildings = entities.filter(o => BUILDING_TYPES[o.type] && o.type !== "keep" && o.type !== "wall_column" && o.type !== "wall_ramp" && o.type !== "gatehouse" && o.type !== "tower");
        const isBlocked = blockingBuildings.some(o => {
            const hw = (o.dimX !== undefined ? o.dimX : ((o.radius || 0.5) * 2)) / 2;
            const hd = (o.dimZ !== undefined ? o.dimZ : ((o.radius || 0.5) * 2)) / 2;
            if (o.type === "tower" && o.footprint) {
                return pts.some(p => o.footprint.some(f => Math.abs(f.x - p.x) < 0.5 && Math.abs(f.z - p.z) < 0.5));
            } else if (wallDrawMode === "tower") {
                return pts.some(p => Math.abs(o.x - p.x) < hw + 0.5 - 0.05 && Math.abs(o.z - p.z) < hd + 0.5 - 0.05);
            }
            return Math.max(minX - 0.5, o.x - hw) < Math.min(maxX + 0.5, o.x + hw) - 0.05 &&
                   Math.max(minZ - 0.5, o.z - hd) < Math.min(maxZ + 0.5, o.z + hd) - 0.05;
        });
        
        const dimX = Math.max(1, maxX - minX + 1);
        const dimZ = Math.max(1, maxZ - minZ + 1);
        let allOverlaps = [];
        if (wallDrawMode === "gatehouse") {
            allOverlaps = entities.filter(o => {
                if (!(o.type === "wall_column" || o.type === "wall_ramp" || o.type === "gatehouse" || o.type === "tower")) return false;
                if (o.type === "tower" && o.footprint) {
                    return o.footprint.some(f => f.x >= minX - 0.5 && f.x <= maxX + 0.5 && f.z >= minZ - 0.5 && f.z <= maxZ + 0.5);
                }
                return o.x >= minX - 0.5 && o.x <= maxX + 0.5 && o.z >= minZ - 0.5 && o.z <= maxZ + 0.5;
            });
        } else if (wallDrawMode === "tower") {
            const cx = minX + dimX/2 - 0.5;
            const cz = minZ + dimZ/2 - 0.5;
            const identicalTower = entities.find(o => o.type === "tower" && Math.abs(o.x - cx) < 0.1 && Math.abs(o.z - cz) < 0.1 && Math.abs(o.dimX - dimX) < 0.1);
            if (identicalTower) {
                showStatusLog(`Cannot stack identical towers!`);
                return;
            }
        }
        
        if (isBlocked) {
            showStatusLog(`Cannot place ${wallDrawMode} over buildings!`);
            return;
        }
        if (wallDrawMode === "tower") {
            totalCost = pts.length * (height + 2) * 2;
        } else {
            totalCost = dimX * height * dimZ * 2;
        }
        const ledger = getLedger("red");
        if (material === "stone" && ledger.stone.spendable < totalCost) {
            showStatusLog("Missing Stone! Required: " + totalCost);
            return;
        } else if (material === "wood" && ledger.wood.spendable < totalCost) {
            showStatusLog("Missing Wood! Required: " + totalCost);
            return;
        }
        const cx = minX + dimX/2 - 0.5;
        const cz = minZ + dimZ/2 - 0.5;
        const plannedOverlaps = allOverlaps.filter(o => o.isPlanned);
        const builtOverlaps = allOverlaps.filter(o => !o.isPlanned);
        plannedOverlaps.forEach(o => cancelPlannedBuilding(o.id));
        const e = createEntity(wallDrawMode === "tower" ? "tower" : "gatehouse", "red", cx, cz, true);
        e.material = material;
        e.armor = material === "wood" ? 5 : 9;
        e.resourcesNeededTotal = totalCost;
        e.escrow = 0;
        if (builtOverlaps.length > 0) {
            e.replacesEntityIds = builtOverlaps.map(o => o.id);
        }
        e.dimX = dimX;
        e.dimY = wallDrawMode === "tower" ? height + 2 : height;
        e.height = e.dimY;
        e.dimZ = dimZ;
        if (wallDrawMode === "tower") {
            e.radius = (dimX - 1) / 2;
            e.footprint = pts.map(p => ({ x: p.x, z: p.z, isCren: p.isCren }));
            e.maxHp = pts.length * e.height * 100;
            e.childTiles = [];
            pts.forEach(p => {
                const child = createEntity("tower_tile", "red", p.x, p.z, true);
                child.parentId = e.id;
                child.material = material;
                child.dimX = 1;
                child.dimY = e.height;
                child.dimZ = 1;
                child.height = e.height;
                child.maxHealth = e.maxHp;
                child.health = e.maxHp;
                e.childTiles.push(child.id);
            });
        } else {
            e.isOpen = true;
            e.maxHp = dimX * height * dimZ * 50;
        }
        e.maxHealth = e.maxHp;
        e.health = 1;
        scene.remove(e.mesh);
        disposeHierarchy(e.mesh);
        e.mesh = buildEntityMesh(e);
        e.mesh.position.set(e.x, e.y, e.z);
        scene.add(e.mesh);
    } else {
        // Pre-calculate heights to determine accurate total cost for ramps
        const slopeDeg = parseInt(document.getElementById("wall-slope")?.value) || -45;
        const startRamp = { x: Math.round(startPt.x), z: Math.round(startPt.z) };
        const endRamp = { x: Math.round(endPt.x), z: Math.round(endPt.z) };
        const totalDist = Math.hypot(endRamp.x - startRamp.x, endRamp.z - startRamp.z);
        let dirX = 0, dirZ = 0;
        if (totalDist > 0) {
            dirX = (endRamp.x - startRamp.x) / totalDist;
            dirZ = (endRamp.z - startRamp.z) / totalDist;
        }
        const pivotX = startRamp.x - dirX * 0.5;
        const pivotZ = startRamp.z - dirZ * 0.5;
        let existingHeight = 0;
        const startOldWall = entities.find(o => (o.type === "wall_column" || o.type === "gatehouse") && !o.isPlanned && Math.hypot(o.x - startRamp.x, o.z - startRamp.z) < 0.5);
        if (startOldWall) {
            existingHeight = startOldWall.type === "wall_column" && startOldWall.blocks ? startOldWall.blocks.length : startOldWall.height;
        }
        const startRoofY = getTerrainHeight(startRamp.x, startRamp.z) + Math.max(height, existingHeight);
        let endExistingHeight = -1;
        const endOldWall = entities.find(o => (o.type === "wall_column" || o.type === "gatehouse") && !o.isPlanned && Math.hypot(o.x - endRamp.x, o.z - endRamp.z) < 1.5);
        if (endOldWall) {
            endExistingHeight = endOldWall.type === "wall_column" && endOldWall.blocks ? endOldWall.blocks.length : endOldWall.height;
        }
        pts.forEach(p => {
            p.actualH = height;
            p.exactRoofY = startRoofY;
            if (wallDrawMode === "ramp") {
                const relativeDist = (p.x - startRamp.x)*dirX + (p.z - startRamp.z)*dirZ;
                if (relativeDist < -0.1) {
                    p.skip = true;
                    return;
                }
                const dist = (p.x - pivotX)*dirX + (p.z - pivotZ)*dirZ;
                const dh = Math.tan(Math.abs(slopeDeg) * -1 * Math.PI / 180) * dist;
                p.exactRoofY = startRoofY + dh;
                const floorY = getTerrainHeight(p.x, p.z);
                if (p.exactRoofY <= floorY) {
                    p.actualH = 0;
                } else if (Math.abs(dist - totalDist) < 0.5 && endExistingHeight >= 0 && Math.abs((p.exactRoofY - floorY) - endExistingHeight) <= 1.0) {
                    p.actualH = endExistingHeight;
                } else {
                    p.actualH = p.exactRoofY - floorY;
                }
                if (p.exactRoofY < floorY - 0.5) p.skip = true;
            } else if (height === 0) {
                p.actualH = 0;
            }
        });
        let totalCost = pts.reduce((sum, p) => {
            if (p.skip) return sum;
            return sum + Math.max(1, Math.round(p.actualH) + (p.isCren ? 1 : 0));
        }, 0);
        const ledger = getLedger("red");
        if (material === "stone" && ledger.stone.spendable < totalCost) {
            showStatusLog("Missing Stone! Required: " + totalCost);
            return;
        } else if (material === "wood" && ledger.wood.spendable < totalCost) {
            showStatusLog("Missing Wood! Required: " + totalCost);
            return;
        }
        const blockingBuildings = entities.filter(o => BUILDING_TYPES[o.type] && o.type !== "keep" && o.type !== "wall_column" && o.type !== "wall_ramp" && o.type !== "gatehouse" && o.type !== "tower");
        pts.forEach(p => {
            const blockingBuilding = blockingBuildings.find(o => {
                if (o.type === "tower" && o.footprint) {
                    return o.footprint.some(f => Math.abs(f.x - p.x) < 0.5 && Math.abs(f.z - p.z) < 0.5);
                }
                const hw = (o.dimX !== undefined ? o.dimX : ((o.radius || 0.5) * 2)) / 2;
                const hd = (o.dimZ !== undefined ? o.dimZ : ((o.radius || 0.5) * 2)) / 2;
                return p.x >= o.x - hw && p.x <= o.x + hw && p.z >= o.z - hd && p.z <= o.z + hd;
            });
            if (blockingBuilding) return;
            const oldWall = entities.find(o => {
                if (o.isPlanned) return false;
                if (o.type === "wall_column" || o.type === "gatehouse") {
                    return o.x === p.x && o.z === p.z;
                }
                if (o.type === "tower" && o.footprint) {
                    return o.footprint.some(f => Math.abs(f.x - p.x) < 0.5 && Math.abs(f.z - p.z) < 0.5);
                }
                return false;
            });
            let exactRoofY = p.exactRoofY;
            let actualH = p.actualH;
            let isBlockRamp = false;
            let isSidewalk = false;
            if (p.skip) return;
            if (wallDrawMode === "ramp") {
                if (actualH === 0 && exactRoofY <= getTerrainHeight(p.x, p.z)) {
                    isSidewalk = true;
                    isBlockRamp = true;
                } else {
                    isBlockRamp = true;
                }
            } else if (height === 0) {
                isSidewalk = true;
            }
            const e = createEntity("wall_column", "red", p.x, p.z, true);
            const wallCost = Math.max(1, Math.round(p.actualH) + (p.isCren ? 1 : 0));
            e.material = material;
            e.isCrenulated = p.isCren;
            e.resourcesNeededTotal = wallCost;
            e.escrow = 0;
            if (oldWall && oldWall.type !== 'tower') e.replacesEntityId = oldWall.id;
            if (isBlockRamp) {
                e.height = actualH <= 0 ? 0 : Math.max(1, Math.round(actualH));
                e.exactHeight = actualH;
                e.originalHeight = e.height;
                e.isRamp = true;
                e.rampDx = dirX;
                e.rampDz = dirZ;
                e.rampSlope = Math.abs(slopeDeg) * -1;
            } else {
                e.height = actualH;
                e.exactHeight = actualH;
                e.originalHeight = actualH;
                e.isRamp = false;
            }
            e.blocks = [];
            for(let i=0; i<e.height; i++) e.blocks.push({ hp: 100 });
            e.maxHp = Math.max(100, e.height * 100);
            e.maxHealth = e.maxHp;
            e.health = 1;
            e.armor = material === "wood" ? 5 : 9;
            scene.remove(e.mesh);
            disposeHierarchy(e.mesh);
            e.mesh = buildEntityMesh(e);
            e.mesh.position.set(e.x, e.y, e.z);
            scene.add(e.mesh);
        });
    }
    needsPathGridUpdate = true;
    updateUI();
    showStatusLog("Wall plans placed!");
}
window.toggleGatehouse = function(id, mode) {
    const gate = entities.find(e => e.id === id);
    if (gate && (gate.type === "gatehouse" || gate.type === "keep")) {
        const toToggle = (selectedEntities.length > 1 && selectedEntities.includes(gate)) ? selectedEntities : [gate];
        toToggle.forEach(g => {
            if (g.type === gate.type) {
                g.gateMode = mode;
                let shouldBeOpen = g.isOpen;
                if (mode === "OPEN") shouldBeOpen = true;
                else if (mode === "CLOSED") shouldBeOpen = false;
                else if (mode === "AUTO") {
                    const enemyNear = entities.some(en => en.faction !== g.faction && en.state !== "dead" && Math.hypot(en.x - g.x, en.z - g.z) <= 7);
                    shouldBeOpen = !enemyNear;
                }
                if (g.isOpen !== shouldBeOpen) {
                    g.isOpen = shouldBeOpen;
                    const door = g.mesh.children.find(c => c.name === "gatehouseDoor");
                    if (door) door.visible = !shouldBeOpen;
                    needsPathGridUpdate = true;
                }
            }
        });
        updateSelectionHUD();
    }
}
window.toggleLoadhouseHorse = function(id) {
    const house = entities.find(e => e.id === id);
    if (house && house.type === "loadhouse") {
        const toToggle = (selectedEntities.length > 1 && selectedEntities.includes(house)) ? selectedEntities : [house];
        const newWantsHorse = house.wantsHorse === false ? true : false;
        toToggle.forEach(h => {
            if (h.type === house.type) {
                h.wantsHorse = newWantsHorse;
            }
        });
        updateSelectionHUD();
    }
}
function updateDefenses(deltaTime) {
    entities.forEach(e => {
        if ((e.type === "gatehouse" || e.type === "keep") && !e.isDead && !e.isPlanned) {
            e.gateMode = e.gateMode || "AUTO";
            let shouldBeOpen = e.isOpen;
            if (e.gateMode === "OPEN") {
                shouldBeOpen = true;
            } else if (e.gateMode === "CLOSED") {
                shouldBeOpen = false;
            } else if (e.gateMode === "AUTO") {
                const enemyNear = getEntitiesInSplashRadius(e.x, e.z, 7).some(hit => {
                    const en = hit.ent;
                    return (en.type === "peasant" || en.type === "soldier" || en.type === "king") && en.faction && en.faction !== e.faction && en.state !== "dead" && !(en.weapon === "Spy" && en.isDisguised);
                });
                shouldBeOpen = !enemyNear;
            }
            if (e.isOpen !== shouldBeOpen) {
                e.isOpen = shouldBeOpen;
                const door = e.mesh.getObjectByName("gatehouseDoor");
                if (door) door.visible = !shouldBeOpen;
                needsPathGridUpdate = true;
                if (selectedEntities.includes(e)) updateSelectionHUD();
            }
        }
    });
}
