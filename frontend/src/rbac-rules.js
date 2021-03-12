const rules = {
    visitor: {
        static: ["posts:list", "profile:visit"]
    },
    author: {
        static: [
            "posts:list",
            "posts:create",
            "users:getSelf",
            "profile:visit"
        ],
        dynamic: {
            "posts:edit": ({ username, postOwner }) => {
                if (!username || !postOwner) return false;
                return username === postOwner;
            },
            "profile:edit": ({ username, profileOwner }) => {
                if (!username || !profileOwner) return false;
                return username === profileOwner;
            }
        }
    }
}

export default rules;