import "dotenv/config";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { User, Post } from "../../../../data/index.js";
import { ContentError, NotFoundError } from "com/errors.js";
import getPosts from "../../../../logic/posts/getPosts.js";

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe("getPosts", () => {
  before(async () => await mongoose.connect(MONGO_TEST_URI));

  beforeEach(async () => {
    await Promise.all([User.deleteMany(), Post.deleteMany()]);
  });

  it("succeeds when the posts are returned", async () => {
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

    const posts = await getPosts(user.id);

    expect(posts).to.be.an("array");
    expect(posts).to.have.lengthOf(1);
    expect(posts[0]).to.include({
      title: "Post title",
      image:
        "https://imgs.search.brave.com/wWVzfAneB1zJ8mc1yhf5F4YTISoTGd_2aPl-MG_wJSU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcm                 dlLXByZXZp/ZXdzLzllMS90ZXN0/LTQtMTQ4NjQ2MC5q/cGc_Zm10",
      description: "Post description",
    });

    expect(posts[0].author).to.include({
      username: "tester",
    });
    expect(posts[0].likes).to.be.an("array").that.is.empty;
    expect(new Date(posts[0].date)).to.be.a("date");

    expect(posts[0].author.id).to.equal(user._id.toString());
    expect(posts[0].id).to.equal(post._id.toString());
  });

  it("fails when the user is not found", async () => {
    await expect(getPosts("66998f609e4a02acb2927f4e")).to.be.rejectedWith(
      NotFoundError,
      "user not found",
    );
  });

  it("fails when the id is not valid", () => {
    expect(() => getPosts("invalid id")).to.throw(
      ContentError,
      "Id is not valid",
    );
  });

  after(async () => {
    await Promise.all([User.deleteMany(), Post.deleteMany()]);
    await mongoose.disconnect();
  });
});
