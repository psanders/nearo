import { observable } from "mobx"

class PostsStore {
    @observable posts = []

    setData (posts) {
      this.posts = posts
    }
}

export const postsStore = new PostsStore()
