"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenter = void 0;
class UserPresenter {
    static toDTO(user) {
        let dto = {
            id: user.id.toString(),
            name: user.name,
            cpf: user.cpf,
            email: user.email
        };
        return dto;
    }
}
exports.UserPresenter = UserPresenter;
