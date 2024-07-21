import "dotenv/config";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { User, Post } from "../../../../data/index.js";
import { ContentError, NotFoundError } from "com/errors.js";
import createPost from "../../../../logic/posts/createPost.js";

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe("createPost", () => {
  before(async () => await mongoose.connect(MONGO_TEST_URI));

  beforeEach(async () => {
    await Promise.all([User.deleteMany(), Post.deleteMany()]);
  });

  it("succeeds when the post is created", async () => {
    const hash = await bcryptjs.hash("123123123", 8);
    const user = await User.create({
      name: "Tester",
      surname: "TesterSurname",
      email: "tester@surname.com",
      username: "tester",
      password: hash,
    });

    await createPost(
      user.id,
      "Test post",
      "https://imgs.search.brave.com/wWVzfAneB1zJ8mc1yhf5F4YTISoTGd_2aPl-MG_wJSU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcm                 dlLXByZXZp/ZXdzLzllMS90ZXN0/LTQtMTQ4NjQ2MC5q/cGc_Zm10",
      "Post description",
    );

    const posts = await Post.find({}).lean();
    expect(posts).to.be.a("array");
    expect(posts).to.have.lengthOf(1);

    const post = posts[0];
    expect(post.title).to.equal("Test post");
    expect(post.image).to.equal(
      "https://imgs.search.brave.com/wWVzfAneB1zJ8mc1yhf5F4YTISoTGd_2aPl-MG_wJSU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcm                 dlLXByZXZp/ZXdzLzllMS90ZXN0/LTQtMTQ4NjQ2MC5q/cGc_Zm10",
    );
    expect(post.description).to.equal("Post description");
    expect(post.author.toString()).to.equal(user.id);
  });

  it("fails when the user is not found", async () => {
    await expect(
      createPost("66998f609e4a02acb2927f4e", "title", "https", "description"),
    ).to.be.rejectedWith(NotFoundError, "user not found");
  });

  it("fails when the user id is invalid", () => {
    expect(() => {
      createPost("invalid user id", "title", "http", "description");
    }).to.throw(ContentError, "User ID is not valid");
  });

  it("fails when the title is invalid", () => {
    expect(() => {
      createPost("66998f609e4a02acb2927f4e", 123, "https", "description");
    }).to.throw(ContentError, "Title is not valid");
  });

  it("fails when the image is invalid", () => {
    expect(() => {
      createPost("66998f609e4a02acb2927f4e", "title", 123, "description");
    }).to.throw(ContentError, "Image is not valid");
  });

  it("fails when the description is not valid", () => {
    expect(() => {
      createPost("66998f609e4a02acb2927f4e", "title", "http", 123);
    }).to.throw(ContentError, "Description is not valid");
  });

  after(async () => {
    await Promise.all([User.deleteMany(), Post.deleteMany()]);
    await mongoose.disconnect();
  });
});
