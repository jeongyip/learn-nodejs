const Post = {
  id: 1,
  posts: [
    {
      id: 1,
      title: '제목',
      body: '내용',
    },
  ],
  create({ title, body }) {
    this.id += 1;
    const post = {
      id: this.id,
      title,
      body,
    };
    this.posts.push(post);
    return post;
  },
  getPostIndex(id) {
    // id 로 포스트 인덱스 조회
    return this.posts.findIndex(post => post.id === id);
  },
  findPostById(id) {
    // id 로 포스트 조회
    return this.posts.find(post => post.id === id);
  },
  removePostById(id) {
    // id 로 포스트 제거
    const index = this.getPostIndex(id);
    this.posts.splice(index, 1);
  },
  updatePost(id, data, replace) {
    // id 로 포스트를 업데이트 하거나 대체함
    const index = this.getPostIndex(id);
    if (replace) {
      this.posts[index] = {
        ...data,
        id,
      };
    } else {
      this.posts[index] = {
        ...this.posts[index],
        ...data,
        id,
      };
    }
    return this.posts[index];
  },

};



exports.write = (ctx) => {
  const post = Post.create(ctx.request.body);
  ctx.body = post;
};

exports.list = (ctx) => {
  ctx.body = Post.posts;
};

exports.read = (ctx) => {
  const id = parseInt(ctx.params.id, 10);
  ctx.body = Post.findPostById(id);
};

exports.remove = (ctx) => {
  const id = parseInt(ctx.params.id, 10);
  ctx.body = Post.removePostById(id);
  ctx.status = 204; // 딱히 반환할 데이터는 없는데, 너의 요청은 성공했어! 라고 알려주는 것
};

exports.replace = (ctx) => {
  // ctx.body = '통째로 교체';
  const id = parseInt(ctx.params.id, 10);
  const post = Post.updatePost(id, ctx.request.body, true);
  ctx.body = post;
};

exports.update = (ctx) => {
  // ctx.body = '일부만 수정';
  const id = parseInt(ctx.params.id, 10);
  const post = Post.updatePost(id, ctx.request.body, false);
  ctx.body = post;
};
