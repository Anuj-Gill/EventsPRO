import miscellaneousConfig from "./miscellaneous.config";
import { configDotenv } from "dotenv";
configDotenv();

const miscConfig = miscellaneousConfig(process.env);

export { miscConfig };
