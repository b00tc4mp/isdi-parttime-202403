import "dotenv/config";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { User } from "../../../../data/index.js";
import { NotFoundError, ContentError } from "com/errors.js";
import getUsersName from "../../../../logic/users/getUsersName.js";

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe("getUsersName", () => {
  before(async () => await mongoose.connect(MONGO_TEST_URI));

  beforeEach(async () => await User.deleteMany());

  it("succeeds when the target user's name is returned", async () => {
    const hash = await bcryptjs.hash("123123123", 8);
    const [user1, user2] = await Promise.all([
      User.create({
        name: "Rei",
        surname: "Ayanami",
        email: "rei@ayanami.com",
        username: "eva00",
        password: hash,
      }),
      User.create({
        name: "Asuka",
        surname: "Shikinami",
        email: "asuka@shikinami.com",
        username: "eva02",
        password: hash,
      }),
    ]);

    await expect(getUsersName(user1.id, user2.id))
      .to.eventually.be.a("string")
      .and.equal("Asuka");
  });

  it("fails when the user is not found", async () => {
    const hash = await bcryptjs.hash("123123123", 8);
    const targetUser = await User.create({
      name: "Asuka",
      surname: "Shikinami",
      email: "asuka@shikinami.com",
      username: "eva02",
      password: hash,
    });

    await expect(
      getUsersName("66998f609e4a02acb2927f4e", targetUser.id),
    ).to.be.rejectedWith(NotFoundError, "user not found");
  });

  it("fails when the target user is not found", async () => {
    const hash = await bcryptjs.hash("123123123", 8);
    const user = await User.create({
      name: "Rei",
      surname: "Ayanami",
      email: "rei@ayanami.com",
      username: "eva00",
      password: hash,
    });

    await expect(
      getUsersName(user.id, "66998f609e4a02acb2927f4e"),
    ).to.be.rejectedWith(NotFoundError, "target user was not found");
  });

  it("fails when the user id is not valid", () => {
    expect(() => {
      getUsersName("invalid userId", "66998f609e4a02acb2927f4e");
    }).to.throw(ContentError, "User ID is not valid");
  });

  it("fails when the target user id is not valid", () => {
    expect(() => {
      getUsersName("66998f609e4a02acb2927f4e", "invalid targetId");
    }).to.throw(ContentError, "TargetUser ID is not valid");
  });

  after(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });
});
