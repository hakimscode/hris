"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
exports.HashPassword = async (password) => {
    const salt = await bcrypt_1.genSalt(10);
    return bcrypt_1.hash(password, salt);
};
//# sourceMappingURL=hash.util.js.map