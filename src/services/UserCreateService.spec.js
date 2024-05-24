const UserCreateService = require("./UserCreateService");
const UsersRepositoryInMemory = require("..//repositories/UsersRepositoryInMemory");

it("user should be create", async () => {
  const user = {
    name: "User Test",
    email: "User@test.com",
    password: "123",
  };

  const usersRepositoryInMemory = new UsersRepositoryInMemory();
  const userCreateService = new UserCreateService(usersRepositoryInMemory);
  const userCreated = await userCreateService.execute(user);

  expect(userCreated).toHaveProperty("id");
});
