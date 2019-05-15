
export class Role {
    roleId = 0;
    role = '';

    constructor(roleId = 0, role = '') {
        this.roleId = roleId;
        this.role = role;
    }

    static constructViaObject(any): Role {
        if (any) {
            return any;
        }
        return new Role(any.roleId, any.role);
    }
}