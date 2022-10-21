import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { WildersResolver } from "./resolvers/Wilders";
import { dataSource } from "./utils";

const PORT = 5000;

async function bootstrap(): Promise<void> {
  const schema = await buildSchema({
    resolvers: [WildersResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  // Start the server
  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);

  try {
    await dataSource.initialize();
    console.log("Connected !");
  } catch (err) {
    console.log("Connection failed");
    console.log(err);
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
