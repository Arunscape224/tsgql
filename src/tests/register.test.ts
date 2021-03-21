import { request } from "graphql-request";
import { User } from "../entities/User";
// import { createTypeOrmConnection } from "..//utils/createTypeOrmConnection";

import { startServer } from "../startServer";
let getHost = () => "";

beforeAll(async () => {
  // await createTypeOrmConnection();
  const app = await startServer();
  const { port }: any = app.address();
  getHost = () => `http://127.0.0.1:${port}`;
});

const email = "jimmy@gmail.com";
const password = "password";

const mutation = `
    mutation {
        register(email: "${email}", password: "${password}")
    }
`;

test("register mutation works", async () => {
  let response = await request(getHost(), mutation);
  expect(response).toEqual({ register: true });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});
