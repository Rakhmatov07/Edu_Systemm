"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_group_controller_1 = require("../controllers/admin-group.controller");
const isAdmin_1 = require("../middlewares/isAdmin");
exports.router = (0, express_1.Router)();
exports.router.get('/admin/group', isAdmin_1.isAdmin, admin_group_controller_1.getGroups);
exports.router.get('/admin/group/:groupId', isAdmin_1.isAdmin, admin_group_controller_1.getGroup);
exports.router.post('/admin/group', isAdmin_1.isAdmin, admin_group_controller_1.createGroup);
exports.router.delete('/admin/group/:groupId', isAdmin_1.isAdmin, admin_group_controller_1.deleteGroup);
// Working Properly
//# sourceMappingURL=admin-group.route.js.map