import { logBrew, getLatestBrew } from "./slack/handlers";

export default [
    {
        path: "/log-coffee",
        method: "get",
        handler: logBrew 
    },
    {
        path: "/latest-coffee",
        method: "post",
        handler: getLatestBrew
    }
];