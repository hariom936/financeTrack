"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var action = process.argv;
function main(arg) {
    return __awaiter(this, void 0, void 0, function () {
        var seedCommand, filesName, allSeedingFiles, tempFiles, _loop_1, _i, filesName_1, file;
        var _a;
        return __generator(this, function (_b) {
            seedCommand = arg[2];
            filesName = (_a = arg[3]) === null || _a === void 0 ? void 0 : _a.split(',');
            allSeedingFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, '../', 'appData/seeds'));
            tempFiles = [];
            if (!filesName) {
                seeding(allSeedingFiles, seedCommand);
            }
            else {
                _loop_1 = function (file) {
                    var indexVal = allSeedingFiles.findIndex(function (item) { return item.includes(file); });
                    if (indexVal !== -1) {
                        tempFiles.push(allSeedingFiles[indexVal]);
                    }
                    else {
                        console.error("File ".concat(file, " not found in seeding files."));
                    }
                };
                for (_i = 0, filesName_1 = filesName; _i < filesName_1.length; _i++) {
                    file = filesName_1[_i];
                    _loop_1(file);
                }
                seeding(tempFiles, seedCommand);
            }
            return [2 /*return*/];
        });
    });
}
function seeding(fileNames_1) {
    return __awaiter(this, arguments, void 0, function (fileNames, seedCommand) {
        var _i, fileNames_2, file, fileName, seeder, err_1;
        if (seedCommand === void 0) { seedCommand = 'up'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, fileNames_2 = fileNames;
                    _a.label = 1;
                case 1:
                    if (!(_i < fileNames_2.length)) return [3 /*break*/, 6];
                    file = fileNames_2[_i];
                    fileName = path_1.default.basename(file, '.js');
                    seeder = void 0;
                    try {
                        seeder = require("../appData/seeds/".concat(fileName));
                    }
                    catch (err) {
                        console.error("Error requiring file: ../appData/seeds/".concat(fileName, ".js"));
                        console.error(err);
                        return [3 /*break*/, 5];
                    }
                    if (typeof seeder[seedCommand] !== 'function') {
                        console.error("Error: ".concat(seedCommand, " is not a function in ").concat(file));
                        return [3 /*break*/, 5];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, seeder[seedCommand]()];
                case 3:
                    _a.sent();
                    console.log("  ".concat(file, " \u001B[92m \u2714 \u001B[0m"));
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error("Error executing ".concat(seedCommand, " in ").concat(file));
                    console.error(err_1);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    console.log('Done!');
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
main(action);
//# sourceMappingURL=populateDB.js.map