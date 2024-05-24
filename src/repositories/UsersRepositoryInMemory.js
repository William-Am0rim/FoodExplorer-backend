class UsersRepositoryInMemory {
  users = [];

  async create({ name, email, password, is_admin }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password,
      is_admin,
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }
}

module.exports = UsersRepositoryInMemory;
