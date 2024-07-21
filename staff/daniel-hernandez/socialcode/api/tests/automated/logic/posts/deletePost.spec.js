import "dotenv/config";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { User, Post } from "../../../../data/index.js";
import { ContentError, MatchError, NotFoundError } from "com/errors.js";
import deletePost from "../../../../logic/posts/deletePost.js";

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe("deletePost", () => {
  before(async () => await mongoose.connect(MONGO_TEST_URI));

  beforeEach(async () => {
    await Promise.all([User.deleteMany(), Post.deleteMany()]);
  });

  it("succeeds when the post is deleted", async () => {
    const hash = await bcryptjs.hash("123123123", 8);
    const user = await User.create({
      name: "Tester",
      surname: "TesterSurname",
      email: "tester@surname.com",
      username: "tester",
      password: hash,
    });
    const post = await Post.create({
      author: user.id,
      title: "Post title",
      image:
        "https://imgs.search.brave.com/wWVzfAneB1zJ8mc1yhf5F4YTISoTGd_2aPl-MG_wJSU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcm                 dlLXByZXZp/ZXdzLzllMS90ZXN0/LTQtMTQ4NjQ2MC5q/cGc_Zm10",
      description: "Post description",
    });

    await deletePost(user.id, post.id);

    const deletedPost = await Post.findById(post.id).lean();
    expect(deletedPost).to.be.null;
  });

  it("fails when the user is not found", async () => {
    await expect(
      deletePost("66998f609e4a02acb2927f4e", "669c2f04a028848eb0aeb742"),
    ).to.be.rejectedWith(NotFoundError, "user not found");
  });

  it("fails when the post is not found", async () => {
    const hash = await bcryptjs.hash("123123123", 8);
    const user = await User.create({
      name: "Tester",
      surname: "TesterSurname",
      email: "tester@surname.com",
      username: "tester",
      password: hash,
    });

    await expect(
      deletePost(user.id, "669c2f04a028848eb0aeb742"),
    ).to.be.rejectedWith(NotFoundError, "post not found");
  });

  it("fails when the post author does not match the user", async () => {
    const hash = await bcryptjs.hash("123123123", 8);
    const [user1, user2] = await Promise.all([
      User.create({
        name: "Tester",
        surname: "TesterSurname",
        email: "tester@surname.com",
        username: "tester",
        password: hash,
      }),
      User.create({
        name: "TesterTwo",
        surname: "TesterTwoSurname",
        email: "testertwo@surname.com",
        username: "tester2",
        password: hash,
      }),
    ]);
    const post = await Post.create({
      author: user1.id,
      title: "Post title",
      image:
        "https://imgs.search.brave.com/wWVzfAneB1zJ8mc1yhf5F4YTISoTGd_2aPl-MG_wJSU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcm                 dlLXByZXZp/ZXdzLzllMS90ZXN0/LTQtMTQ4NjQ2MC5q/cGc_Zm10",
      description: "Post description",
    });

    await expect(deletePost(user2.id, post.id)).to.be.rejectedWith(
      MatchError,
      "post author does not match user",
    );
  });

  it("fails when the user id is invalid", () => {
    expect(() => {
      deletePost("invalid user id", "669c2f04a028848eb0aeb742");
    }).to.throw(ContentError, "User ID is not valid");
  });

  it("fails when the post id is invalid", () => {
    expect(() => {
      deletePost("66998f609e4a02acb2927f4e", "invalid post id");
    }).to.throw(ContentError, "Post ID is not valid");
  });

  after(async () => {
    await Promise.all([User.deleteMany(), Post.deleteMany()]);
    await mongoose.disconnect();
  });
});
