import React, { Component } from 'react';
import rules from '../../rbac-rules';

class Can extends Component {
    constructor(props) {
        super(props);
    }

    check = (rules, role, action, data) => {
        const permissions = rules[role];
        if (!permissions) {
            console.log("The permission", action, "is not defined for", role);
            return false;
        }

        const staticPermissions = permissions.static;
        if (staticPermissions && staticPermissions.includes(action)) {
            console.log("The static permission", action, "is defined for", role);
            return true;
        }

        const dynamicPermissions = permissions.dynamic;
        if (dynamicPermissions) {
            console.log("The dynamic permission", action, "is defined for", role);
            const permissionCondition = dynamicPermissions[action];
            if (!permissionCondition) {
                console.log("The dynamic permission", action, "is DENIED for", role);
                return false;
            }
            return permissionCondition(data);
        }

        return false;
    };

    render() {
        console.log("permission:", this.check(rules, this.props.role, this.props.perform, this.props.data))
        return this.check(rules, this.props.role, this.props.perform, this.props.data)
            ? this.props.yes()
            : this.props.no();
    }
}

// const check = (rules, role, action, data) => {
//     const permissions = rules[role];

//     if (!permissions) {
//         return false;
//     }

//     const staticPermissions = permissions.static;
//     if (staticPermissions && staticPermissions.includes(action)) {
//         return true;
//     }

//     const dynamicPermissions = permissions.dynamic;
//     if (dynamicPermissions) {
//         const permissionCondition = dynamicPermissions[action];
//         if (!permissionCondition) {
//             return false;
//         }

//         return permissionCondition(data);
//     }

//     return false;
// };

// const Can = props => {
//     check(rules, props.role, props.action, props.data)
//         ? props.yes()
//         : props.no();
// };

Can.defaultProps = {
    yes: () => null,
    no: () => null
};

export default Can;
