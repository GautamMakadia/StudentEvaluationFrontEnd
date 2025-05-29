import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("./routes/index.tsx"),
    route("/login", "./routes/auth/login.tsx"),
    route("/noauth", "./routes/error/noauth.tsx"),

    ...prefix("faculty", [
        layout("./routes/faculty/layout.tsx", [
            route("home", "./routes/faculty/page.tsx"),

            ...prefix("tasks", [
                route("create", "./routes/faculty/create_task/page.tsx", [
                    route("quiz", "./routes/faculty/create_task/quiz/page.tsx"),
                    route("practical", "./routes/faculty/create_task/practical/page.tsx"),
                ]),
            ]),

            ...prefix("/eval", [
                index("./routes/faculty/evaluate/page.tsx"),
                route("/:type/:taskId", "./routes/faculty/evaluate/task.tsx")
            ]),
        ])
    ]),

    ...prefix("student", [
        layout("./routes/student/layout.tsx", [
            route("home","./routes/student/page.tsx"),

            ...prefix("tasks", [
                index("./routes/student/tasks/page.tsx"),
                route("quiz/:taskId", "./routes/student/tasks/quiz.tsx"),
                route("practical/:taskId", "./routes/student/tasks/practical.tsx")
            ])
        ])
    ])
] satisfies RouteConfig;