import { ResolverMap } from "./types/utils";
import bcrypt from "bcryptjs";
import { User } from "./entities/User";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Bye ${name || "World"}`,
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword,
      });
      await user.save()
      return true;
    },
  },
};
