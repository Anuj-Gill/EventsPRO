import ExpressApp from "./src/server/app";
import { miscConfig } from "./src/config";

const app = ExpressApp();
//middleware()
//routerMiddleware(app);

app.listen(miscConfig.port, async () => {
  //await DbCon();
  console.log(`server started at ${miscConfig.port}`);
});
