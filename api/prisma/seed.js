const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { saltRounds } = require("../src/config");

const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync(Number(saltRounds));

const mockPass = ["Mock123!", "Mock123@", "Mock123#"];

const hash = [];
mockPass.forEach((pass) => {
  hash.push(bcrypt.hashSync(pass, salt));
});

const main = async () => {
  const projectsData = [
    { title: "Project 1" },
    { title: "Project 2" },
    { title: "Project 3" },
    { title: "Project 4" },
    { title: "Project 5" },
  ];

  const projects = [];

  for (let i = 0; i < 5; i += 1) {
    const project = await prisma.project.create({ data: projectsData[i] });
    projects.push(project);
  }

  const tasksData = [
    {
      projectId: projects[0].id,
      description: "Lorem ispum dolor 1",
      done: false,
    },
    {
      projectId: projects[0].id,
      description: "Lorem ispum dolor 2",
      done: false,
    },
    {
      projectId: projects[0].id,
      description: "Lorem ispum dolor 3",
      done: false,
    },
    {
      projectId: projects[0].id,
      description: "Lorem ispum dolor 4",
      done: false,
    },
    {
      projectId: projects[0].id,
      description: "Lorem ispum dolor 5",
      done: true,
    },
    {
      projectId: projects[0].id,
      description: "Lorem ispum dolor 6",
      done: true,
    },
    {
      projectId: projects[0].id,
      description: "Lorem ispum dolor 7",
      done: true,
    },
    {
      projectId: projects[1].id,
      description: "Lorem ispum dolor 8",
      done: false,
    },
    {
      projectId: projects[1].id,
      description: "Lorem ispum dolor 9",
      done: false,
    },
    {
      projectId: projects[1].id,
      description: "Lorem ispum dolor 10",
      done: false,
    },
    {
      projectId: projects[1].id,
      description: "Lorem ispum dolor 11",
      done: true,
    },
    {
      projectId: projects[2].id,
      description: "Lorem ispum dolor 12",
      done: false,
    },
    {
      projectId: projects[2].id,
      description: "Lorem ispum dolor 13",
      done: false,
    },
    {
      projectId: projects[2].id,
      description: "Lorem ispum dolor 14",
      done: false,
    },
    {
      projectId: projects[2].id,
      description: "Lorem ispum dolor 15",
      done: true,
    },
  ];

  const tasks = [];

  for (let i = 0; i < 15; i += 1) {
    const task = await prisma.task.create({ data: tasksData[i] });
    tasks.push(task);
  }

  const usersData = [
    {
      name: "Mock 1",
      email: "mock1@bolttech.com",
      password: hash[0],
    },
    {
      name: "Mock 2",
      email: "mock2@bolttech.com",
      password: hash[1],
    },
    {
      name: "Mock 3",
      email: "mock3@bolttech.com",
      password: hash[2],
    },
  ];

  const users = [];

  for (let i = 0; i < 3; i += 1) {
    const user = await prisma.user.create({ data: usersData[i] });
    users.push(user);
  }

  const userInProjects = await prisma.userInProjects.createMany({
    data: [
      { userId: users[0].id, projectId: projects[0].id },
      { userId: users[0].id, projectId: projects[1].id },
      { userId: users[0].id, projectId: projects[2].id },
      { userId: users[1].id, projectId: projects[3].id },
      { userId: users[2].id, projectId: projects[4].id },
    ],
  });

  console.log({ projects, users, userInProjects, tasks });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
