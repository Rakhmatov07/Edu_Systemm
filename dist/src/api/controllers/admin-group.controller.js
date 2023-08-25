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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = exports.deleteGroup = exports.getGroup = exports.getGroups = void 0;
const group_validation_1 = require("../../validations/group.validation");
const customError_1 = require("../../utils/customError");
const typeorm_1 = require("../../database/typeorm");
const group_entity_1 = require("../../entities/group.entity");
function getGroups(_, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groupRepository = typeorm_1.dataSource.getRepository(group_entity_1.Group);
            const groups = yield groupRepository.find();
            res.status(200).json({ message: 'Success', groups });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getGroups = getGroups;
function getGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { groupId } = req.params;
            const groupRepository = typeorm_1.dataSource.getRepository(group_entity_1.Group);
            const group = yield groupRepository.findOneBy({ groupId });
            res.status(200).json({ message: 'Success', group });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getGroup = getGroup;
function deleteGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { groupId } = req.params;
            const groupRepository = typeorm_1.dataSource.getRepository(group_entity_1.Group);
            const deletedGroup = yield groupRepository.findOneBy({ groupId });
            yield groupRepository.delete(groupId);
            res.status(200).json({ message: 'Success', deletedGroup });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteGroup = deleteGroup;
function createGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { groupName } = req.body;
            const groupRepository = typeorm_1.dataSource.getRepository(group_entity_1.Group);
            const isValid = (0, group_validation_1.groupValidate)({ groupName });
            if (isValid)
                throw new customError_1.CustomError(isValid, 400);
            const group = yield groupRepository.findOne({ where: { groupName } });
            if (group)
                throw new customError_1.CustomError(`${groupName} already exists`, 409);
            const newGroup = groupRepository.create({ groupName });
            yield groupRepository.save(newGroup);
            res.status(201).json({ message: 'Success', newGroup });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createGroup = createGroup;
//# sourceMappingURL=admin-group.controller.js.map