"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _, res) => {
    if (err instanceof Error) {
        res.status(500).json({ error: 'Internal server error' });
    }
    else {
        res.status(err.statusCode).json({ error: err.message });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map