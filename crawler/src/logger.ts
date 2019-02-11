import {createLogger, format, transports} from "winston";

export function initLogger(config) {
    return createLogger({
        format: format.combine(
            format.colorize(),
            format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss"
            }),
            format.splat(),
            format.printf(info => `[${info.timestamp}][${info.level}] : ${info.message}`)
        ),
        level: config.level,
        transports: [
            new transports.File({ filename: "error.log", level: "error" }),
            new transports.Console()
        ]
    });

}
