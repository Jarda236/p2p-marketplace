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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../client");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var user1, user2, fundsAccount1, fundsAccount2, item1, item2, offer1, offer2, counterOffer1, counterOffer2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client_1.default.user.create({
                        data: {
                            name: 'John Doe',
                            password_hash: 'password123',
                            email: 'john@example.com',
                            phone: '1234567890',
                            city: 'New York',
                            rating_sum: 4.5,
                            rating_count: 10,
                        },
                    })];
                case 1:
                    user1 = _a.sent();
                    return [4 /*yield*/, client_1.default.user.create({
                            data: {
                                name: 'Jane Smith',
                                password_hash: 'password456',
                                email: 'jane@example.com',
                                phone: '9876543210',
                                city: 'Los Angeles',
                                rating_sum: 4.2,
                                rating_count: 8,
                            },
                        })];
                case 2:
                    user2 = _a.sent();
                    return [4 /*yield*/, client_1.default.fundsAccount.create({
                            data: {
                                userId: user1.id,
                                balance: 100.0,
                                balanceBlocked: 50.0,
                            },
                        })];
                case 3:
                    fundsAccount1 = _a.sent();
                    return [4 /*yield*/, client_1.default.fundsAccount.create({
                            data: {
                                userId: user2.id,
                                balance: 200.0,
                                balanceBlocked: 25.0,
                            },
                        })];
                case 4:
                    fundsAccount2 = _a.sent();
                    return [4 /*yield*/, client_1.default.item.create({
                            data: {
                                name: 'Item 1',
                                description: 'This is item 1',
                                category: 'Electronics',
                                userId: user1.id,
                                image: 'item1.jpg',
                                blocked: true,
                            },
                        })];
                case 5:
                    item1 = _a.sent();
                    return [4 /*yield*/, client_1.default.item.create({
                            data: {
                                name: 'Item 2',
                                description: 'This is item 2',
                                category: 'Furniture',
                                userId: user2.id,
                                image: 'item2.jpg',
                                blocked: true,
                            },
                        })];
                case 6:
                    item2 = _a.sent();
                    return [4 /*yield*/, client_1.default.offer.create({
                            data: {
                                itemId: item1.id,
                                price: 50.0,
                                image: 'offer1.jpg',
                                userName: user1.name,
                                userId: user1.id,
                            },
                        })];
                case 7:
                    offer1 = _a.sent();
                    return [4 /*yield*/, client_1.default.offer.create({
                            data: {
                                itemId: item2.id,
                                price: 75.0,
                                image: 'offer2.jpg',
                                userName: user2.name,
                                userId: user2.id,
                            },
                        })];
                case 8:
                    offer2 = _a.sent();
                    return [4 /*yield*/, client_1.default.counterOffer.create({
                            data: {
                                userId: user2.id,
                                offerId: offer1.id,
                                status: null,
                                price: 45.0,
                            },
                        })];
                case 9:
                    counterOffer1 = _a.sent();
                    return [4 /*yield*/, client_1.default.counterOffer.create({
                            data: {
                                userId: user1.id,
                                offerId: offer2.id,
                                status: true,
                                price: 70.0,
                            },
                        })];
                case 10:
                    counterOffer2 = _a.sent();
                    console.log('Seeding completed!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (error) {
    console.error(error);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client_1.default.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
